import { Balance, Token, Price } from "./modules";
import { Config } from "./utils/config";
import { ETH } from "./utils/constants";
import "./utils/csv";
import { Logger } from "./utils/logger";
import Decimal from "decimal.js";
import { JsonRpcProvider } from "ethers";
import inquirer from "inquirer";
import yargs from "yargs";

interface Totals {
  amounts: Record<string, Decimal>;
  prices: Record<string, Decimal>;
}

interface LedgerTotals {
  [ledger: string]: {
    amounts: Record<string, Decimal>;
  };
}

const main = async () => {
  let provider: JsonRpcProvider;
  let password: string;
  let config: Config;

  let balanceModule: Balance;
  let tokenModule: Token;
  let priceModule: Price;

  try {
    await yargs(process.argv.slice(2))
      .parserConfiguration({ "parse-numbers": false })
      .scriptName("yarn")
      .option("url", {
        type: "string",
        default: "http://localhost:8545",
        description: "Web3 provider's URL"
      })
      .option("verbose", {
        type: "boolean",
        description: "Verbose mode"
      })
      .option("price", {
        type: "boolean",
        description: "Query prices using Coingecko",
        default: false
      })
      .middleware(({ url, price }) => {
        provider = new JsonRpcProvider(url);

        balanceModule = new Balance(provider);
        tokenModule = new Token(provider);

        if (price) {
          priceModule = new Price(provider);
        }
      })
      .middleware(async () => {
        ({ password } = await inquirer.prompt([
          {
            type: "password",
            name: "password",
            message: "Enter password"
          }
        ]));

        if (!Config.exists()) {
          const { password2 } = await inquirer.prompt([
            {
              type: "password",
              name: "password2",
              message: "Confirm your password for the first time"
            }
          ]);

          if (password !== password2) {
            Logger.error("Passwords don't match or empty. Please try again");

            return;
          }
        }

        Logger.info();

        config = new Config(password);
      })
      .command(
        "show",
        "Show the configuration",
        () => {},
        () => {
          const ledgers = config.getLedgers();
          const tokens = config.getTokens();

          Logger.title("Configuration:");

          Logger.title("Ledgers:");
          Logger.info(JSON.stringify(ledgers, null, 2));

          Logger.info();

          Logger.title("Tokens:");
          Logger.info(JSON.stringify(tokens, null, 2));

          Logger.info();
        }
      )
      .command(
        "change-password",
        "Change the encryption password",
        () => {},
        async () => {
          const { newPassword } = await inquirer.prompt([
            {
              type: "password",
              name: "newPassword",
              message: "Enter new password"
            }
          ]);

          const { newPassword2 } = await inquirer.prompt([
            {
              type: "password",
              name: "newPassword2",
              message: "Confirm your new password"
            }
          ]);

          if (newPassword !== newPassword2) {
            Logger.error("Passwords don't match or empty. Please try again");

            return;
          }

          config.changePassword(newPassword2);

          Logger.info();
          Logger.info("Password has been successfully changed");
        }
      )
      .command(
        "add-addresses",
        "Add an address or a list of space-separated addresses to a named ledger",
        {
          name: {
            type: "string",
            required: true,
            description: "The name of the ledger"
          },
          data: {
            type: "array",
            required: true,
            description: "The addresses to add"
          }
        },
        ({ name, data }) => {
          config.addAddresses(name, data as string[]);
        }
      )
      .command(
        "remove-addresses",
        "Remove an address or a list of space-separated addresses from a named ledger",
        {
          name: {
            type: "string",
            required: true,
            description: "The name of the ledger"
          },
          data: {
            type: "array",
            description: "The addresses to remove",
            default: []
          }
        },
        ({ name, data }) => {
          if (data.length === 0) {
            config.removeLedger(name);
          } else {
            config.removeAddresses(name, data as string[]);
          }
        }
      )
      .command(
        "remove-ledger",
        "Remove an entire named ledger",
        {
          name: {
            type: "string",
            required: true,
            description: "The name of the ledger"
          }
        },
        ({ name }) => {
          config.removeLedger(name);
        }
      )
      .command(
        "add-token",
        "Add a token to the config",
        {
          symbol: {
            type: "string",
            required: true,
            description: "The symbol of the token"
          },
          address: {
            type: "string",
            required: true,
            description: "The address of the token"
          },
          decimals: {
            type: "number",
            description: "The decimals of the token",
            default: 18
          }
        },
        ({ symbol, address, decimals }) => {
          config.addToken(symbol, address, decimals);
        }
      )
      .command(
        "remove-token",
        "Remove a token from the config",
        {
          symbol: {
            type: "string",
            required: true,
            description: "The symbol of the token"
          }
        },
        ({ symbol }) => {
          config.removeToken(symbol);
        }
      )
      .command(
        "query",
        "Query all addresses and tokens",
        () => {},
        async ({ verbose, price }) => {
          const totals: Totals = {
            amounts: {
              [ETH]: new Decimal(0)
            },
            prices: {
              [ETH]: new Decimal(0)
            }
          };

          const ledgerTotals: LedgerTotals = {};

          if (price) {
            totals.prices[ETH] = await priceModule.getETHPrice();
          }

          const ledgers = config.getLedgers();
          const tokens = config.getTokens();

          for (const [name, addresses] of Object.entries(ledgers)) {
            Logger.info(`Processing the "${name}" ledger...`);

            ledgerTotals[name] = { amounts: { [ETH]: new Decimal(0) } };
            const ledgerTotal = ledgerTotals[name];

            for (const address of addresses) {
              const ethBalance = await balanceModule.getBalance(address);
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

                const tokenBalance = await tokenModule.getTokenBalance(address, tokenAddress, decimals);
                if (!tokenBalance.isZero()) {
                  if (price && !totals.prices[symbol]) {
                    totals.prices[symbol] = await priceModule.getTokenPrice(tokenAddress);
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

          if (price) {
            Logger.title("Prices:");

            Object.entries(totals.prices).forEach(([symbol, price]) => {
              if (!price.isZero()) {
                Logger.info(`  ${symbol}: $${price.toCSV()}`);
              }
            });

            Logger.info();
          }

          if (price) {
            Logger.title("Total Amounts and Values:");
          } else {
            Logger.title("Total Amounts:");
          }

          let totalValue = new Decimal(0);

          Object.entries(totals.amounts).forEach(([symbol, amount]) => {
            if (!amount.isZero()) {
              if (price) {
                const value = amount.mul(totals.prices[symbol]);

                Logger.info(`  ${symbol}: ${amount.toCSV()} ($${value.toCSV()})`);

                totalValue = totalValue.add(value);
              } else {
                Logger.info(`  ${symbol}: ${amount.toCSV()}`);
              }
            }
          });

          Logger.info();

          if (price) {
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

          if (price) {
            Logger.title("Ledger Total Amounts and Values:");
          } else {
            Logger.title("Ledger Total Amounts:");
          }

          Object.entries(ledgerTotals).forEach(([name, ledgerTotals]) => {
            let ledgerTotalValue = new Decimal(0);

            Logger.subtitle(`${name}:`);

            if (price) {
              Logger.title("Total Amounts and Values:");
            } else {
              Logger.title("Total Amounts:");
            }

            Object.entries(ledgerTotals.amounts).forEach(([symbol, amount]) => {
              if (!amount.isZero()) {
                if (price) {
                  const value = amount.mul(totals.prices[symbol]);

                  Logger.info(`  ${symbol}: ${amount.toCSV()} ($${value.toCSV()})`);

                  ledgerTotalValue = ledgerTotalValue.add(value);
                } else {
                  Logger.info(`  ${symbol}: ${amount.toCSV()}`);
                }
              }
            });

            Logger.info();

            if (price) {
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
      )
      .demandCommand()
      .help()
      .parse();

    process.exit(0);
  } catch (e) {
    if (e instanceof Error) {
      Logger.fatal(e.stack);
    } else {
      Logger.fatal(e);
    }

    process.exit(1);
  }
};

main();
