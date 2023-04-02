import { Balance, Token, Price } from "./modules";
import { Config } from "./utils/config";
import { ETH } from "./utils/constants";
import { Logger } from "./utils/logger";
import chalk from "chalk";
import Table from "cli-table";
import Decimal from "decimal.js";
import { JsonRpcProvider } from "ethers";

interface WatcherOptions {
  providerUrl: string;
  password: string;
  price: boolean;
}

type Amounts = Record<string, Decimal>;
type Prices = Record<string, Decimal>;

interface LedgerAmounts {
  [ledger: string]: {
    amounts: Amounts;
  };
}

interface PrintOptions {
  verbose: boolean | undefined;
}

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

      Logger.info();
      Logger.info(`Removed ${name}`);
    } else {
      this.config.removeAddresses(name, data as string[]);

      Logger.info();

      for (const address of data) {
        Logger.info(`Removed ${address} to ${name}`);
      }
    }
  }

  public removeLedger(name: string) {
    this.config.removeLedger(name);

    Logger.info();
    Logger.info(`Removed ${name}`);
  }

  public addToken(symbol: string, address: string, decimals: number) {
    this.config.addToken(symbol, address, decimals);

    Logger.info();
    Logger.info(`Added ${symbol} at ${address} with ${decimals} decimals`);
  }

  public removeToken(symbol: string) {
    this.config.removeToken(symbol);

    Logger.info(`Removed ${symbol}`);
  }

  public printConfig() {
    Logger.title("Configuration");

    Logger.title("Ledgers");

    for (const [ledger, addresses] of Object.entries(this.config.getLedgers())) {
      const ledgers = new Table({
        head: [chalk.cyanBright(ledger)]
      });

      for (const address of addresses) {
        ledgers.push([address]);
      }

      Logger.table(ledgers);
    }

    Logger.title("Tokens");

    const tokens = new Table({
      head: [chalk.cyanBright("Symbol"), chalk.cyanBright("Address"), chalk.cyanBright("Decimals")]
    });

    for (const [symbol, token] of Object.entries(this.config.getTokens())) {
      tokens.push([symbol, token.address, token.decimals.toString()]);
    }

    Logger.table(tokens);
  }

  public async printData({ verbose }: PrintOptions) {
    const totalAmounts: Amounts = {
      [ETH]: new Decimal(0)
    };
    const prices: Prices = {
      [ETH]: new Decimal(0)
    };

    const ledgerAmounts: LedgerAmounts = {};

    if (this.price) {
      prices[ETH] = await this.price.getETHPrice();
    }

    const ledgers = this.config.getLedgers();
    const tokens = this.config.getTokens();

    for (const [name, addresses] of Object.entries(ledgers)) {
      Logger.info(`Processing the "${name}" ledger...`);

      ledgerAmounts[name] = { amounts: { [ETH]: new Decimal(0) } };
      const ledgerTotal = ledgerAmounts[name];

      for (const address of addresses) {
        const ethBalance = await this.balance.getBalance(address);
        if (verbose && !ethBalance.isZero()) {
          Logger.info(address, ethBalance, ETH);
        }

        totalAmounts[ETH] = totalAmounts[ETH].add(ethBalance);
        ledgerTotal.amounts[ETH] = ledgerTotal.amounts[ETH].add(ethBalance);

        for (const [symbol, token] of Object.entries(tokens)) {
          const { address: tokenAddress, decimals } = token;

          if (totalAmounts[symbol] === undefined) {
            totalAmounts[symbol] = new Decimal(0);
          }

          if (ledgerTotal.amounts[symbol] === undefined) {
            ledgerTotal.amounts[symbol] = new Decimal(0);
          }

          const tokenBalance = await this.token.getTokenBalance(address, tokenAddress, decimals);
          if (!tokenBalance.isZero()) {
            if (this.price && !prices[symbol]) {
              prices[symbol] = await this.price.getTokenPrice(tokenAddress);
            }

            if (verbose) {
              Logger.info(address, tokenBalance, symbol);
            }
          }

          totalAmounts[symbol] = totalAmounts[symbol].add(tokenBalance);
          ledgerTotal.amounts[symbol] = ledgerTotal.amounts[symbol].add(tokenBalance);
        }
      }
    }

    Logger.info();

    if (this.price) {
      this.printPrices(prices);
    }

    if (verbose) {
      this.printLedgerTotals(ledgerAmounts, prices);
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

    const totalsTable = new Table({
      head: [
        chalk.cyanBright("Symbol"),
        chalk.cyanBright("Amount"),
        chalk.cyanBright("Value"),
        chalk.cyanBright("% of Total Value")
      ]
    });

    for (const [symbol, amount] of Object.entries(totalAmounts)) {
      if (amount.isZero()) {
        continue;
      }

      if (this.price) {
        const value = amount.mul(prices[symbol]);

        totalsTable.push([
          symbol,
          amount.toCSV(),
          `$${value.toCSV()}`,
          value.mul(100).div(totalValue).toPrecision(6).toString()
        ]);

        totalValue = totalValue.add(value);
      } else {
        totalsTable.push([symbol, amount.toCSV()]);
      }
    }

    Logger.table(totalsTable);

    if (this.price) {
      Logger.info(`Total Value: $${totalValue.toCSV()}`);
    }
  }

  private printLedgerTotals(ledgerAmounts: LedgerAmounts, prices: Prices) {
    Logger.title("Ledger Total Amounts");

    for (const [name, ledger] of Object.entries(ledgerAmounts)) {
      let ledgerTotalValue = new Decimal(0);

      Logger.subtitle(name);

      if (this.price) {
        for (const [symbol, amount] of Object.entries(ledger.amounts)) {
          if (amount.isZero()) {
            continue;
          }

          const value = amount.mul(prices[symbol]);
          ledgerTotalValue = ledgerTotalValue.add(value);
        }
      }

      const ledgerAmountsTable = new Table({
        head: [
          chalk.cyanBright("Symbol"),
          chalk.cyanBright("Amount"),
          chalk.cyanBright("Value"),
          chalk.cyanBright("% of Ledger Total Value")
        ]
      });

      for (const [symbol, amount] of Object.entries(ledger.amounts)) {
        if (amount.isZero()) {
          continue;
        }

        if (this.price) {
          const value = amount.mul(prices[symbol]);

          ledgerAmountsTable.push([
            symbol,
            amount.toCSV(),
            `$${value.toCSV()}`,
            value.mul(100).div(ledgerTotalValue).toPrecision(6).toString()
          ]);

          ledgerTotalValue = ledgerTotalValue.add(value);
        } else {
          ledgerAmountsTable.push([symbol, amount.toCSV()]);
        }
      }

      Logger.table(ledgerAmountsTable);
    }
  }
}
