import fs from "fs";
import path from "path";
import chalk from "chalk";
import CliProgress from "cli-progress";
import Table from "cli-table";
import Decimal from "decimal.js";
import { JsonRpcProvider } from "ethers";
import { chunk, clone, isEmpty, padEnd, set, truncate } from "lodash";
import { Balance, Price, Token } from "./modules";
import { ETH, USD } from "./utils/constants";
import { Address, Assets, DB } from "./utils/db";
import { Logger } from "./utils/logger";

interface ScannerOptions {
  path: string;
  providerUrl: string;
  password: string;
  price: boolean;
  globalTokenList: boolean;
}

type Amounts = Record<string, Decimal>;
type Prices = Record<string, Decimal>;
type NamedAmounts = Record<string, Amounts>;
type LedgerAddressAmounts = Record<string, NamedAmounts>;

interface ScanOptions {
  csvOutputDir?: string;
  verbose: boolean | undefined;
  showEmptyAddresses: boolean;
  aggregateAssets: boolean;
}

export const DEFAULT_SYMBOL_PRICE = 1;

export class Scanner {
  private provider: JsonRpcProvider;
  private db: DB;
  private balance: Balance;
  private token: Token;
  private price?: Price;

  // Unfortunately, Coingecko no longer supports batch queries for free tier API.
  private static readonly PRICE_QUERY_BATCH_SIZE = 1;

  private static readonly CSV_ADDRESSES_REPORT = "addresses.csv";
  private static readonly CSV_PRICES_REPORT = "prices.csv";
  private static readonly CSV_TOTALS_REPORT = "totals.csv";

  constructor({ path, providerUrl, password, price, globalTokenList }: ScannerOptions) {
    this.provider = new JsonRpcProvider(providerUrl);

    this.balance = new Balance(this.provider);
    this.token = new Token(this.provider);

    if (price) {
      this.price = new Price(this.provider);
    }

    this.db = new DB({ path, password, globalTokenList });
  }

  public changePassword(newPassword: string) {
    this.db.changePassword(newPassword);

    Logger.info();
    Logger.info("Password has been successfully changed");
  }

  public exportDB(outputPath: string) {
    Logger.info(`DB has been exported to ${outputPath}`);

    this.db.export(outputPath);
  }

  public importDB(inputPath: string) {
    this.db.import(inputPath);

    Logger.info(`DB has been imported from ${inputPath}`);
  }

  public addAddresses(name: string, data: Address[]) {
    this.db.addAddresses(name, data);

    for (const { address, note } of data) {
      const desc = note ? ` (with a note: "${note}")` : "";

      Logger.info(`Added ${address} to ${name}${desc}`);
    }
  }

  public removeAddresses(name: string, data: string[]) {
    if (data.length === 0) {
      this.db.removeLedger(name);

      Logger.info(`Removed ${name}`);
    } else {
      this.db.removeAddresses(name, data as string[]);

      for (const address of data) {
        Logger.info(`Removed ${address} to ${name}`);
      }
    }
  }

  public addLedger(name: string) {
    this.db.addLedger(name);

    Logger.info(`Added ${name}`);
  }

  public removeLedger(name: string) {
    this.db.removeLedger(name);

    Logger.info(`Removed ${name}`);
  }

  public addToken(symbol: string, address: string, decimals: number) {
    this.db.addToken(symbol, address, decimals);

    Logger.info(`Added ${symbol} at ${address} with ${decimals} decimals`);
  }

  public removeToken(symbol: string) {
    this.db.removeToken(symbol);

    Logger.info(`Removed ${symbol}`);
  }

  public addAsset(name: string, quantity: number, price: number, symbol: string = USD) {
    this.db.addAsset(name, quantity, price, symbol);

    Logger.info(`Added ${quantity} units of ${name} at the price of ${price} ${symbol} per unit`);
  }

  public updateAsset(name: string, quantity: number, price: number, symbol: string = USD) {
    this.db.updateAsset(name, quantity, price, symbol);

    Logger.info(`Updated ${quantity} units of ${name} at the price of ${price} ${symbol} per unit`);
  }

  public removeAsset(name: string) {
    this.db.removeAsset(name);

    Logger.info(`Removed ${name}`);
  }

  public showDB() {
    Logger.title("DB");

    Logger.info(`Version: ${this.db.getVersion()}`);
    Logger.info();

    const ledgers = this.db.getLedgers();
    if (!isEmpty(ledgers)) {
      Logger.title("Ledgers");

      const ledgersTable = new Table({
        head: [chalk.cyanBright("Ledger"), chalk.cyanBright("Address"), chalk.cyanBright("Note")]
      });

      for (const [name, addresses] of Object.entries(ledgers)) {
        for (const { address, note } of addresses) {
          ledgersTable.push([name, address, note ?? ""]);
        }
      }

      Logger.table(ledgersTable);
    }

    const tokens = this.db.getTokens();
    if (!isEmpty(tokens)) {
      Logger.title("Tokens");

      const tokensTable = new Table({
        head: [chalk.cyanBright("Symbol"), chalk.cyanBright("Address"), chalk.cyanBright("Decimals")]
      });

      for (const [symbol, { address, decimals }] of Object.entries(tokens)) {
        tokensTable.push([symbol, address, decimals.toString()]);
      }

      Logger.table(tokensTable);
    }

    const assets = this.db.getAssets();
    if (!isEmpty(assets)) {
      Logger.title("Assets");

      const assetsTable = new Table({
        head: [chalk.cyanBright("Name"), chalk.cyanBright("Quantity"), chalk.cyanBright("Price")]
      });

      for (const [name, { quantity, price, symbol }] of Object.entries(this.db.getAssets())) {
        let fullPrice = new Decimal(price).toCSVAmount();
        if (symbol === USD) {
          fullPrice = `$${fullPrice}`;
        } else {
          fullPrice = `${fullPrice} ${symbol}`;
        }

        assetsTable.push([name, new Decimal(quantity).toCSVAmount(), fullPrice]);
      }

      Logger.table(assetsTable);
    }
  }

  public async scan({ csvOutputDir, verbose, showEmptyAddresses, aggregateAssets }: ScanOptions) {
    if (this.db.isGlobalTokenListEnabled()) {
      if (this.price) {
        throw new Error(
          "Due to the latest Coingecko's batch query restriction, fetching prices for the global token list is no longer supported"
        );
      }

      if (verbose) {
        Logger.warning("WARNING: Using the global token list in verbose mode isn't recommended!");
        Logger.warning();
      }

      if (!csvOutputDir) {
        Logger.warning(
          "WARNING: You're using a global token list. If you haven't passed the reporting option, the output will be hard to read"
        );
        Logger.warning();
      }
    }

    const totalAmounts: Amounts = {
      [ETH]: new Decimal(0)
    };

    const ledgerAddressAmounts: LedgerAddressAmounts = {};
    const ledgerAmounts: NamedAmounts = {};

    const ledgers = this.db.getLedgers();
    const tokens = this.db.getTokens();
    const notes: Record<string, string> = {};

    const prices = this.price ? await this.fetchPrices() : {};

    Logger.info("Scanning all addresses and tokens...");
    Logger.info();

    const addressCount = Object.values(ledgers).reduce((res, addresses) => res + addresses.length, 0);
    const tokenCount = Object.keys(tokens).length;

    const multiBar = new CliProgress.MultiBar(
      {
        format: "{label} | {bar} {percentage}% | ETA: {eta}s | {value}/{total}",
        autopadding: true
      },
      CliProgress.Presets.shades_classic
    );

    const ledgerBar = multiBar.create(addressCount, 0);
    const tokenBar = tokenCount > 0 ? multiBar.create(tokenCount, 0) : undefined;

    let addressIndex = 0;

    for (const [name, addresses] of Object.entries(ledgers)) {
      set(ledgerAmounts, [name, ETH], new Decimal(0));

      const ledgerTotal = ledgerAmounts[name];

      for (const { address, note } of addresses) {
        ledgerBar.update(addressIndex++, { label: `${Scanner.formatLabel(name)} | ${address}` });

        const ethBalance = await this.balance.getBalance(address);
        if (showEmptyAddresses || !ethBalance.isZero()) {
          set(ledgerAddressAmounts, [name, address, ETH], ethBalance);
          notes[address] = note;
        }

        totalAmounts[ETH] = totalAmounts[ETH].add(ethBalance);
        ledgerTotal[ETH] = ledgerTotal[ETH].add(ethBalance);

        for (const [tokenIndex, [symbol, token]] of Object.entries(tokens).entries()) {
          const { address: tokenAddress, decimals } = token;

          tokenBar?.update(tokenIndex, { label: `${Scanner.formatLabel(symbol)} | ${tokenAddress}` });

          if (totalAmounts[symbol] === undefined) {
            totalAmounts[symbol] = new Decimal(0);
          }

          if (ledgerTotal[symbol] === undefined) {
            ledgerTotal[symbol] = new Decimal(0);
          }

          let tokenBalance: Decimal = new Decimal(0);

          try {
            tokenBalance = await this.token.getTokenBalance(address, tokenAddress, decimals);
          } catch (e) {
            Logger.error();
            Logger.error(`Failed on ${symbol} (${tokenAddress}`);

            throw e;
          }

          if (!tokenBalance.isZero()) {
            set(ledgerAddressAmounts, [name, address, symbol], tokenBalance);
            notes[address] = note;
          }

          totalAmounts[symbol] = totalAmounts[symbol].add(tokenBalance);
          ledgerTotal[symbol] = ledgerTotal[symbol].add(tokenBalance);
        }
      }
    }

    ledgerBar.update(addressCount, { label: "Finished" });
    tokenBar?.update(tokenCount, { label: "Finished" });

    multiBar.stop();

    Logger.info();

    const totalAggregatedAmounts = clone(totalAmounts);

    const assets = this.db.getAssets();

    // Aggregate assets only if it was requested and there is at least one custom priced asset.
    const customPricedAssets = new Set<string>(
      Object.entries(assets)
        .filter(([_, { symbol }]) => symbol && (symbol === ETH || tokens[symbol] || assets[symbol]))
        .map(([name]) => name)
    );
    const shouldAggregateAssets = aggregateAssets && customPricedAssets.size > 0;

    if (!isEmpty(assets)) {
      for (const [name, { quantity, price, symbol }] of Object.entries(assets)) {
        totalAmounts[name] = (totalAmounts[name] ?? new Decimal(0)).add(quantity);

        // If the asset is priced in another token or asset - aggregate its price as well.
        if (shouldAggregateAssets && customPricedAssets.has(name)) {
          totalAggregatedAmounts[symbol] = (totalAggregatedAmounts[symbol] ?? new Decimal(0)).add(quantity * price);
        } else {
          totalAggregatedAmounts[name] = (totalAggregatedAmounts[name] ?? new Decimal(0)).add(quantity);
        }
      }
    }

    if (this.price) {
      this.showPrices(prices);
    }

    if (verbose) {
      this.showAddresses(ledgerAddressAmounts, notes, prices);
      this.showLedgerTotals(ledgerAmounts, prices);
      this.showAssets(assets, prices);
    }

    this.showTotals(totalAmounts, prices, "Total Amounts");
    if (shouldAggregateAssets) {
      this.showTotals(totalAggregatedAmounts, prices, "Total Aggregated Amounts");
    }

    if (csvOutputDir) {
      this.exportAddresses(csvOutputDir, ledgerAddressAmounts, notes, prices);
      this.exportPrices(csvOutputDir, prices);
      this.exportTotals(csvOutputDir, totalAmounts, prices);
    }
  }

  private showPrices(prices: Prices) {
    Logger.title("Prices");

    const pricesTable = new Table({
      head: [chalk.cyanBright("Symbol"), chalk.cyanBright("Price")]
    });

    for (const symbol of Object.keys(prices).sort()) {
      const price = prices[symbol];
      if (price.isZero()) {
        continue;
      }

      pricesTable.push([symbol, `$${price.toCSV()}`]);
    }

    Logger.table(pricesTable);
  }

  private showTotals(totalAmounts: Amounts, prices: Prices, title: string) {
    Logger.title(title);

    let totalValue = new Decimal(0);

    if (this.price) {
      for (const [symbol, amount] of Object.entries(totalAmounts)) {
        if (amount.isZero()) {
          continue;
        }

        const value = amount.mul(prices[symbol]);
        totalValue = totalValue.add(value);
      }
    }

    const totalsTableHead = [chalk.cyanBright("Name"), chalk.cyanBright("Amount")];
    if (this.price) {
      totalsTableHead.push(chalk.cyanBright("Value"), chalk.cyanBright("% of Total Value"));
    }

    const totalsTable = new Table({
      head: totalsTableHead
    });

    for (const [name, amount] of Object.entries(totalAmounts)) {
      if (amount.isZero()) {
        continue;
      }

      const values = [name, amount.toCSVAmount()];

      if (this.price) {
        const value = amount.mul(prices[name]);

        values.push(`$${value.toCSVAmount()}`, value.mul(100).div(totalValue).toPrecision(6).toString());
      }

      totalsTable.push(values);
    }

    if (this.price) {
      totalsTable.push(["", "Total Value", `$${totalValue.toCSVAmount()}`, ""]);
    }

    Logger.table(totalsTable);
  }

  private showAddresses(ledgerAddressAmounts: LedgerAddressAmounts, notes: Record<string, string>, prices: Prices) {
    if (isEmpty(ledgerAddressAmounts)) {
      return;
    }

    Logger.title("Addresses");

    const tokens = [ETH, ...Object.keys(this.db.getTokens())];
    const tokenHead = tokens.map((symbol) => chalk.cyanBright(symbol));
    const addressesTable = new Table({
      head: [chalk.cyanBright("Ledger"), chalk.cyanBright("Address"), ...tokenHead, chalk.cyanBright("Note")]
    });

    const totals: Amounts = {};

    for (const [name, addressAmounts] of Object.entries(ledgerAddressAmounts)) {
      for (const [address, amounts] of Object.entries(addressAmounts)) {
        const balances: string[] = [];

        for (const symbol of tokens) {
          const amount = amounts[symbol] ?? new Decimal(0);

          totals[symbol] = (totals[symbol] ?? new Decimal(0)).add(amount);
          balances.push(amount.toCSVAmount());
        }

        addressesTable.push([name, address, ...balances, notes[address] ?? ""]);
      }
    }

    addressesTable.push(["", "Total", ...tokens.map((symbol) => (totals[symbol] ?? new Decimal(0)).toCSVAmount()), ""]);

    addressesTable.push(["", "", ...tokenHead, ""]);

    if (this.price) {
      addressesTable.push([
        "",
        "Total Value",
        ...tokens.map((symbol) => `$${(totals[symbol] ?? new Decimal(0)).mul(prices[symbol]).toCSVAmount()}`),
        ""
      ]);
    }

    Logger.table(addressesTable);
  }

  private showLedgerTotals(ledgerAmounts: NamedAmounts, prices: Prices) {
    if (isEmpty(ledgerAmounts)) {
      return;
    }

    Logger.title("Ledgers");

    const tokens = [ETH, ...Object.keys(this.db.getTokens())];
    const tokenHead = tokens.map((symbol) => chalk.cyanBright(symbol));
    const ledgersTable = new Table({
      head: [chalk.cyanBright("Ledger"), ...tokenHead]
    });

    const totals: Amounts = {};

    for (const [name, amounts] of Object.entries(ledgerAmounts)) {
      const balances: Decimal[] = [];

      for (const symbol of tokens) {
        const amount = amounts[symbol] ?? new Decimal(0);

        totals[symbol] = (totals[symbol] ?? new Decimal(0)).add(amount);
        balances.push(amount);
      }

      ledgersTable.push([name, ...balances.map((b) => b.toCSVAmount())]);
    }

    ledgersTable.push(["Total", ...tokens.map((symbol) => (totals[symbol] ?? new Decimal(0)).toCSVAmount())]);

    ledgersTable.push(["", ...tokenHead]);

    if (this.price) {
      ledgersTable.push([
        "Total Value",
        ...tokens.map((symbol) => `$${(totals[symbol] ?? new Decimal(0)).mul(prices[symbol]).toCSVAmount()}`)
      ]);
    }

    Logger.table(ledgersTable);
  }

  private showAssets(assets: Assets, prices: Prices) {
    if (isEmpty(assets)) {
      return;
    }

    Logger.title("Assets");

    const assetsTableHead = [chalk.cyanBright("Name"), chalk.cyanBright("Quantity"), chalk.cyanBright("Price")];

    if (this.price) {
      assetsTableHead.push(chalk.cyanBright("Value"));
    }

    const assetsTable = new Table({
      head: assetsTableHead
    });

    for (const [name, { quantity, price, symbol }] of Object.entries(assets)) {
      let fullPrice = new Decimal(price).toCSVAmount();
      if (symbol === USD) {
        fullPrice = `$${fullPrice}`;
      } else {
        fullPrice = `${fullPrice} ${symbol}`;
      }

      const values = [name, new Decimal(quantity).toCSVAmount(), fullPrice];

      if (this.price) {
        const value = new Decimal(quantity)
          .mul(price)
          .mul(!symbol || symbol === USD ? DEFAULT_SYMBOL_PRICE : prices[symbol]);

        values.push(`$${value.toCSVAmount()}`);
      }

      assetsTable.push(values);
    }

    Logger.table(assetsTable);
  }

  private exportAddresses(
    outputDir: string,
    ledgerAddressAmounts: LedgerAddressAmounts,
    notes: Record<string, string>,
    prices: Prices
  ) {
    fs.mkdirSync(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, Scanner.CSV_ADDRESSES_REPORT);
    if (fs.existsSync(outputPath)) {
      fs.rmSync(outputPath);
    }

    const headers = ["Ledger", "Address", "Note", "Asset", "Amount"];
    if (this.price) {
      headers.push("Value");
    }

    fs.appendFileSync(outputPath, `${headers.join(",")}\n`);

    if (isEmpty(ledgerAddressAmounts)) {
      return;
    }

    for (const [name, addressAmounts] of Object.entries(ledgerAddressAmounts)) {
      for (const [address, amounts] of Object.entries(addressAmounts)) {
        for (const [symbol, amount] of Object.entries(amounts)) {
          const values = [name, address, `"${notes[address] ?? ""}"`, symbol, `"${amount.toCSV()}"`];
          if (this.price) {
            values.push(`"$${amount.mul(prices[symbol]).toCSV()}"`);
          }

          fs.appendFileSync(outputPath, `${values.join(",")}\n`);
        }
      }
    }

    Logger.info(`Exported address data to: ${outputPath}`);
  }

  private exportPrices(outputDir: string, prices: Prices) {
    fs.mkdirSync(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, Scanner.CSV_PRICES_REPORT);
    if (fs.existsSync(outputPath)) {
      fs.rmSync(outputPath);
    }

    fs.appendFileSync(outputPath, `${["Symbol", "Price"].join(",")}\n`);

    for (const symbol of Object.keys(prices).sort()) {
      const price = prices[symbol];
      if (price.isZero()) {
        continue;
      }

      fs.appendFileSync(outputPath, `${[symbol, `"$${price.toCSV()}"`].join(",")}\n`);
    }

    Logger.info(`Exported price data to: ${outputPath}`);
  }

  private exportTotals(outputDir: string, totalAmounts: Amounts, prices: Prices) {
    fs.mkdirSync(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, Scanner.CSV_TOTALS_REPORT);
    if (fs.existsSync(outputPath)) {
      fs.rmSync(outputPath);
    }

    const headers = ["Name", "Amount"];

    if (this.price) {
      headers.push("Value", "% of Total Value");
    }

    fs.appendFileSync(outputPath, `${headers.join(",")}\n`);

    let totalValue = new Decimal(0);

    if (this.price) {
      for (const [symbol, amount] of Object.entries(totalAmounts)) {
        if (amount.isZero()) {
          continue;
        }

        const value = amount.mul(prices[symbol]);
        totalValue = totalValue.add(value);
      }
    }

    for (const [name, amount] of Object.entries(totalAmounts)) {
      if (amount.isZero()) {
        continue;
      }

      const values = [name, `"${amount.toCSV()}"`];

      if (this.price) {
        const value = amount.mul(prices[name]);

        values.push(`"$${value.toCSV()}"`, value.mul(100).div(totalValue).toPrecision(6).toString());
      }

      fs.appendFileSync(outputPath, `${values.join(",")}\n`);
    }

    Logger.info(`Exported totals data to: ${outputPath}`);
  }

  private static formatLabel(label: string) {
    return `${padEnd(truncate(label, { length: 10 }), 14)}`;
  }

  private async fetchPrices(): Promise<Record<string, Decimal>> {
    const prices: Record<string, Decimal> = {};

    if (!this.price) {
      return prices;
    }

    Logger.info("Querying prices. This operation may take a very long time...");
    Logger.info();

    prices[ETH] = await this.price.getETHPrice();

    const tokens = this.db.getTokens();
    if (!tokens) {
      return prices;
    }

    const assets = this.db.getAssets();
    const tokenCount = Object.keys(tokens).length + (isEmpty(assets) ? 0 : Object.keys(assets).length);

    const bar = new CliProgress.SingleBar(
      {
        format: "{label} | {bar} {percentage}% | ETA: {eta}s | {value}/{total}",
        autopadding: true
      },
      CliProgress.Presets.shades_classic
    );

    bar.start(tokenCount, 0);

    const tokenAddresses = Object.values(tokens).map((t) => t.address);
    const symbolByAddress = Object.fromEntries(
      Object.entries(tokens).map(([symbol, { address }]) => [address, symbol])
    );
    let tokenIndex = 0;

    for (const batch of chunk(tokenAddresses, Scanner.PRICE_QUERY_BATCH_SIZE)) {
      bar.update(tokenIndex, {
        label: `${symbolByAddress[batch[0]]} - ${symbolByAddress[batch[batch.length - 1]]}`
      });

      const priceByAddress = await this.price.getTokenPrices(batch);

      for (const [address, price] of Object.entries(priceByAddress)) {
        prices[symbolByAddress[address]] = price;
      }

      tokenIndex += batch.length;
    }

    // Query the custom asset prices
    if (!isEmpty(assets)) {
      for (const [name, { price, symbol }] of Object.entries(assets)) {
        bar.update(++tokenIndex, {
          label: name
        });

        if (prices[name]) {
          continue;
        }

        if (!symbol || symbol === USD) {
          prices[name] = new Decimal(price);
        } else {
          if (!prices[symbol]) {
            const token = this.db.getTokens()[symbol];
            if (!token) {
              throw new Error(`Unknown token ${symbol}`);
            }

            prices[symbol] = await this.price.getTokenPrice(token.address);
          }

          prices[name] = new Decimal(price).mul(prices[symbol]);
        }
      }
    }

    // Set the prices of unmatched tokens to 0
    for (const symbol of Object.keys(tokens)) {
      if (!prices[symbol]) {
        prices[symbol] = new Decimal(0);
      }
    }

    bar.update(tokenCount, { label: "Finished" });
    bar.stop();

    Logger.info();

    return prices;
  }
}
