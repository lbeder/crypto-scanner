import { Balance, Token, Price } from "./modules";
import { Config, Assets } from "./utils/config";
import { ETH, USD } from "./utils/constants";
import { Logger } from "./utils/logger";
import chalk from "chalk";
import Table from "cli-table";
import Decimal from "decimal.js";
import { JsonRpcProvider } from "ethers";
import { set, isEmpty } from "lodash";

interface WatcherOptions {
  providerUrl: string;
  password: string;
  price: boolean;
}

type Amounts = Record<string, Decimal>;
type Prices = Record<string, Decimal>;
type NamedAmounts = Record<string, Amounts>;
type LedgerAddressAmounts = Record<string, NamedAmounts>;

interface PrintOptions {
  verbose: boolean | undefined;
}

export const DEFAULT_SYMBOL_PRICE = 1;

export class Watcher {
  private provider: JsonRpcProvider;
  private config: Config;
  private balance: Balance;
  private token: Token;
  private price?: Price;

  constructor({ providerUrl, password, price }: WatcherOptions) {
    this.provider = new JsonRpcProvider(providerUrl);

    this.balance = new Balance(this.provider);
    this.token = new Token(this.provider);

    if (price) {
      this.price = new Price(this.provider);
    }

    this.config = new Config(password);
  }

  public changePassword(newPassword: string) {
    this.config.changePassword(newPassword);

    Logger.info();
    Logger.info("Password has been successfully changed");
  }

  public addAddresses(name: string, data: string[]) {
    this.config.addAddresses(name, data);

    for (const address of data) {
      Logger.info(`Added ${address} to ${name}`);
    }
  }

  public removeAddresses(name: string, data: string[]) {
    if (data.length === 0) {
      this.config.removeLedger(name);

      Logger.info(`Removed ${name}`);
    } else {
      this.config.removeAddresses(name, data as string[]);

      for (const address of data) {
        Logger.info(`Removed ${address} to ${name}`);
      }
    }
  }

  public removeLedger(name: string) {
    this.config.removeLedger(name);

    Logger.info(`Removed ${name}`);
  }

  public addToken(symbol: string, address: string, decimals: number) {
    this.config.addToken(symbol, address, decimals);

    Logger.info(`Added ${symbol} at ${address} with ${decimals} decimals`);
  }

  public removeToken(symbol: string) {
    this.config.removeToken(symbol);

    Logger.info(`Removed ${symbol}`);
  }

  public addAsset(name: string, quantity: number, price: number, symbol: string = USD) {
    this.config.addAsset(name, quantity, price, symbol);

    Logger.info(`Added ${quantity} units of ${name} at the price of ${price} ${symbol} per unit`);
  }

  public updateAsset(name: string, quantity: number, price: number, symbol: string = USD) {
    this.config.updateAsset(name, quantity, price, symbol);

    Logger.info(`Updated ${quantity} units of ${name} at the price of ${price} ${symbol} per unit`);
  }

  public removeAsset(name: string) {
    this.config.removeAsset(name);

    Logger.info(`Removed ${name}`);
  }

  public printConfig() {
    Logger.title("Configuration");

    const ledgers = this.config.getLedgers();
    if (Object.keys(ledgers).length !== 0) {
      Logger.title("Ledgers");

      for (const [name, addresses] of Object.entries(ledgers)) {
        Logger.subtitle(name);

        const ledgersTable = new Table({
          head: [chalk.cyanBright("Address")]
        });

        for (const address of addresses) {
          ledgersTable.push([address]);
        }

        Logger.table(ledgersTable);
      }
    }

    const tokens = this.config.getTokens();
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

    const assets = this.config.getAssets();
    if (!isEmpty(assets)) {
      Logger.title("Assets");

      const assetsTable = new Table({
        head: [chalk.cyanBright("Name"), chalk.cyanBright("Quantity"), chalk.cyanBright("Price")]
      });

      for (const [name, { quantity, price, symbol }] of Object.entries(this.config.getAssets())) {
        let fullPrice = new Decimal(price).toCSV();
        if (symbol === USD) {
          fullPrice = `$${fullPrice}`;
        } else {
          fullPrice = `${fullPrice} ${symbol}`;
        }

        assetsTable.push([name, new Decimal(quantity).toCSV(), fullPrice]);
      }

      Logger.table(assetsTable);
    }
  }

  public async printData({ verbose }: PrintOptions) {
    const totalAmounts: Amounts = {
      [ETH]: new Decimal(0)
    };
    const prices: Prices = {
      [ETH]: new Decimal(0)
    };

    const ledgerAddressAmounts: LedgerAddressAmounts = {};
    const ledgerAmounts: NamedAmounts = {};

    if (this.price) {
      prices[ETH] = await this.price.getETHPrice();
    }

    const ledgers = this.config.getLedgers();
    const tokens = this.config.getTokens();
    const assets = this.config.getAssets();

    for (const [name, addresses] of Object.entries(ledgers)) {
      Logger.info(`Processing the "${name}" ledger...`);

      set(ledgerAmounts, [name, ETH], new Decimal(0));

      const ledgerTotal = ledgerAmounts[name];

      for (const address of addresses) {
        const ethBalance = await this.balance.getBalance(address);
        if (verbose && !ethBalance.isZero()) {
          set(ledgerAddressAmounts, [name, address, ETH], ethBalance);
        }

        totalAmounts[ETH] = totalAmounts[ETH].add(ethBalance);
        ledgerTotal[ETH] = ledgerTotal[ETH].add(ethBalance);

        for (const [symbol, token] of Object.entries(tokens)) {
          const { address: tokenAddress, decimals } = token;

          if (totalAmounts[symbol] === undefined) {
            totalAmounts[symbol] = new Decimal(0);
          }

          if (ledgerTotal[symbol] === undefined) {
            ledgerTotal[symbol] = new Decimal(0);
          }

          const tokenBalance = await this.token.getTokenBalance(address, tokenAddress, decimals);
          if (!tokenBalance.isZero()) {
            if (this.price && !prices[symbol]) {
              prices[symbol] = await this.price.getTokenPrice(tokenAddress);
            }

            if (verbose) {
              set(ledgerAddressAmounts, [name, address, symbol], tokenBalance);
            }
          }

          totalAmounts[symbol] = totalAmounts[symbol].add(tokenBalance);
          ledgerTotal[symbol] = ledgerTotal[symbol].add(tokenBalance);
        }
      }
    }

    for (const [name, { price, quantity, symbol }] of Object.entries(assets)) {
      if (totalAmounts[name] === undefined) {
        totalAmounts[name] = new Decimal(quantity);
      }

      if (this.price && !prices[name]) {
        if (!symbol || symbol === USD) {
          prices[name] = new Decimal(price);
        } else {
          if (!prices[symbol]) {
            const token = this.config.getTokens()[symbol];
            if (!token) {
              throw new Error(`Unknown token ${symbol}`);
            }

            prices[symbol] = await this.price.getTokenPrice(token.address);
          }

          prices[name] = new Decimal(price).mul(prices[symbol]);
        }
      }
    }

    Logger.info();

    if (this.price) {
      this.printPrices(prices);
    }

    if (verbose) {
      this.printAddresses(ledgerAddressAmounts);
      this.printLedgerTotals(ledgerAmounts, prices);
      this.printAssets(assets, prices);
    }

    this.printTotals(totalAmounts, prices);
  }

  private printPrices(prices: Prices) {
    Logger.title("Prices");

    const pricesTable = new Table({
      head: [chalk.cyanBright("Symbol"), chalk.cyanBright("Price")]
    });

    for (const [symbol, price] of Object.entries(prices)) {
      if (price.isZero()) {
        continue;
      }

      pricesTable.push([symbol, `$${price.toCSV()}`]);
    }

    Logger.table(pricesTable);
  }

  private printTotals(totalAmounts: Amounts, prices: Prices) {
    Logger.title("Total Amounts");

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

      const values = [name, amount.toCSV()];

      if (this.price) {
        const value = amount.mul(prices[name]);

        values.push(`$${value.toCSV()}`, value.mul(100).div(totalValue).toPrecision(6).toString());
      }

      totalsTable.push(values);
    }

    Logger.table(totalsTable);

    if (this.price) {
      Logger.notice(`Total Value: $${totalValue.toCSV()}`);
      Logger.info();
    }
  }

  private printAddresses(ledgerAddressAmounts: LedgerAddressAmounts) {
    if (isEmpty(ledgerAddressAmounts)) {
      return;
    }

    const tokens = [ETH, ...Object.keys(this.config.getTokens())];

    Logger.title("Addresses");

    for (const [name, addressAmounts] of Object.entries(ledgerAddressAmounts)) {
      Logger.subtitle(name);

      const addressesTable = new Table({
        head: [chalk.cyanBright("Address"), ...tokens.map((t) => chalk.cyanBright(t))]
      });

      for (const [address, amounts] of Object.entries(addressAmounts)) {
        const balances = tokens.map((t) => (amounts[t] || new Decimal(0)).toCSV());

        addressesTable.push([address, ...balances]);
      }

      Logger.table(addressesTable);
    }
  }

  private printLedgerTotals(ledgerAmounts: NamedAmounts, prices: Prices) {
    if (isEmpty(ledgerAmounts)) {
      return;
    }

    Logger.title("Ledgers");

    for (const [name, amounts] of Object.entries(ledgerAmounts)) {
      let ledgerTotalValue = new Decimal(0);

      Logger.subtitle(name);

      if (this.price) {
        for (const [symbol, amount] of Object.entries(amounts)) {
          if (amount.isZero()) {
            continue;
          }

          const value = amount.mul(prices[symbol]);

          ledgerTotalValue = ledgerTotalValue.add(value);
        }
      }

      const ledgersTableHead = [chalk.cyanBright("Symbol"), chalk.cyanBright("Amount")];
      if (this.price) {
        ledgersTableHead.push(chalk.cyanBright("Value"), chalk.cyanBright("% of Ledger Total Value"));
      }

      const ledgersTable = new Table({
        head: ledgersTableHead
      });

      for (const [symbol, amount] of Object.entries(amounts)) {
        if (amount.isZero()) {
          continue;
        }

        const values = [symbol, amount.toCSV()];

        if (this.price) {
          const value = amount.mul(prices[symbol]);

          values.push(`$${value.toCSV()}`, value.mul(100).div(ledgerTotalValue).toPrecision(6).toString());
        }

        ledgersTable.push(values);
      }

      Logger.table(ledgersTable);
    }
  }

  private printAssets(assets: Assets, prices: Prices) {
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
      let fullPrice = new Decimal(price).toCSV();
      if (symbol === USD) {
        fullPrice = `$${fullPrice}`;
      } else {
        fullPrice = `${fullPrice} ${symbol}`;
      }

      const values = [name, new Decimal(quantity).toCSV(), fullPrice];

      if (this.price) {
        const value = new Decimal(quantity)
          .mul(price)
          .mul(!symbol || symbol === USD ? DEFAULT_SYMBOL_PRICE : prices[symbol]);

        values.push(`$${value.toCSV()}`);
      }

      assetsTable.push(values);
    }

    Logger.table(assetsTable);
  }
}
