import { Balance, Token, Price } from "./modules";
import { Config } from "./utils/config";
import { ETH } from "./utils/constants";
import { Logger } from "./utils/logger";
import Decimal from "decimal.js";
import { JsonRpcProvider } from "ethers";

interface WatcherOptions {
  providerUrl: string;
  password: string;
  price: boolean;
}

interface Totals {
  amounts: Record<string, Decimal>;
  prices: Record<string, Decimal>;
}

interface LedgerTotals {
  [ledger: string]: {
    amounts: Record<string, Decimal>;
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
    const ledgers = this.config.getLedgers();
    const tokens = this.config.getTokens();

    Logger.title("Configuration:");

    Logger.title("Ledgers:");
    Logger.info(JSON.stringify(ledgers, null, 2));

    Logger.info();

    Logger.title("Tokens:");
    Logger.info(JSON.stringify(tokens, null, 2));

    Logger.info();
  }

  public async printData({ verbose }: PrintOptions) {
    const totals: Totals = {
      amounts: {
        [ETH]: new Decimal(0)
      },
      prices: {
        [ETH]: new Decimal(0)
      }
    };

    const ledgerTotals: LedgerTotals = {};

    if (this.price) {
      totals.prices[ETH] = await this.price.getETHPrice();
    }

    const ledgers = this.config.getLedgers();
    const tokens = this.config.getTokens();

    for (const [name, addresses] of Object.entries(ledgers)) {
      Logger.info(`Processing the "${name}" ledger...`);

      ledgerTotals[name] = { amounts: { [ETH]: new Decimal(0) } };
      const ledgerTotal = ledgerTotals[name];

      for (const address of addresses) {
        const ethBalance = await this.balance.getBalance(address);
        if (verbose && !ethBalance.isZero()) {
          Logger.info(address, ethBalance, ETH);
        }

        totals.amounts[ETH] = totals.amounts[ETH].add(ethBalance);
        ledgerTotal.amounts[ETH] = ledgerTotal.amounts[ETH].add(ethBalance);

        for (const [symbol, token] of Object.entries(tokens)) {
          const { address: tokenAddress, decimals } = token;

          if (totals.amounts[symbol] === undefined) {
            totals.amounts[symbol] = new Decimal(0);
          }

          if (ledgerTotal.amounts[symbol] === undefined) {
            ledgerTotal.amounts[symbol] = new Decimal(0);
          }

          const tokenBalance = await this.token.getTokenBalance(address, tokenAddress, decimals);
          if (!tokenBalance.isZero()) {
            if (this.price && !totals.prices[symbol]) {
              totals.prices[symbol] = await this.price.getTokenPrice(tokenAddress);
            }

            if (verbose) {
              Logger.info(address, tokenBalance, symbol);
            }
          }

          totals.amounts[symbol] = totals.amounts[symbol].add(tokenBalance);
          ledgerTotal.amounts[symbol] = ledgerTotal.amounts[symbol].add(tokenBalance);
        }
      }
    }

    Logger.info();

    if (this.price) {
      Logger.title("Prices:");

      Object.entries(totals.prices).forEach(([symbol, price]) => {
        if (!price.isZero()) {
          Logger.info(`  ${symbol}: $${price.toCSV()}`);
        }
      });

      Logger.info();
    }

    if (this.price) {
      Logger.title("Total Amounts and Values:");
    } else {
      Logger.title("Total Amounts:");
    }

    let totalValue = new Decimal(0);

    Object.entries(totals.amounts).forEach(([symbol, amount]) => {
      if (!amount.isZero()) {
        if (this.price) {
          const value = amount.mul(totals.prices[symbol]);

          Logger.info(`  ${symbol}: ${amount.toCSV()} ($${value.toCSV()})`);

          totalValue = totalValue.add(value);
        } else {
          Logger.info(`  ${symbol}: ${amount.toCSV()}`);
        }
      }
    });

    Logger.info();

    if (this.price) {
      Logger.info(`  Total Value: $${totalValue.toCSV()}`);
      Logger.info();

      Logger.title("Total Values %:");

      Object.entries(totals.amounts).forEach(([symbol, amount]) => {
        if (!amount.isZero()) {
          const value = amount.mul(totals.prices[symbol]);

          Logger.info(`  ${symbol}: ${value.mul(100).div(totalValue).toDecimalPlaces(4)}%`);
        }
      });

      Logger.info();
    }

    if (this.price) {
      Logger.title("Ledger Total Amounts and Values:");
    } else {
      Logger.title("Ledger Total Amounts:");
    }

    Object.entries(ledgerTotals).forEach(([name, ledgerTotals]) => {
      let ledgerTotalValue = new Decimal(0);

      Logger.subtitle(`${name}:`);

      if (this.price) {
        Logger.title("Total Amounts and Values:");
      } else {
        Logger.title("Total Amounts:");
      }

      Object.entries(ledgerTotals.amounts).forEach(([symbol, amount]) => {
        if (!amount.isZero()) {
          if (this.price) {
            const value = amount.mul(totals.prices[symbol]);

            Logger.info(`  ${symbol}: ${amount.toCSV()} ($${value.toCSV()})`);

            ledgerTotalValue = ledgerTotalValue.add(value);
          } else {
            Logger.info(`  ${symbol}: ${amount.toCSV()}`);
          }
        }
      });

      Logger.info();

      if (this.price) {
        Logger.info(`  Value: $${ledgerTotalValue.toCSV()}`);
        Logger.info();

        Logger.title("Total Values %:");

        Object.entries(ledgerTotals.amounts).forEach(([symbol, amount]) => {
          if (!amount.isZero()) {
            const value = amount.mul(totals.prices[symbol]);

            Logger.info(`  ${symbol}: ${value.mul(100).div(ledgerTotalValue).toDecimalPlaces(4)}%`);
          }
        });

        Logger.info();
      }
    });
  }
}
