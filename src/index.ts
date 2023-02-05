import ERC20_API from "./erc20-abi.json";
import { CoinGecko } from "./utils/coingecko";
import { Config } from "./utils/config";
import { ETH, ETH_WEI } from "./utils/constants";
import { Logger } from "./utils/logger";
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import Decimal from "decimal.js";
import { Contract } from "ethers";
import inquirer from "inquirer";
import yargs from "yargs";

interface Totals {
  amounts: Record<string, Decimal>;
  prices: Record<string, Decimal>;
}

interface LedgerTotals {
  [device: string]: {
    amounts: Record<string, Decimal>;
  };
}

const toCSV = (value: Decimal) => Number(value.toFixed()).toLocaleString();

const main = async () => {
  let provider: StaticJsonRpcProvider;
  const coinGecko = new CoinGecko();
  let password: string;
  let config: Config;

  const getBalance = async (address: string): Promise<Decimal> => {
    const balance = await provider.getBalance(address);
    return new Decimal(balance.toString()).div(ETH_WEI);
  };

  const getTokenBalance = async (address: string, token: string, decimals: number): Promise<Decimal> => {
    const tokenContract = new Contract(token, ERC20_API, provider);
    const balance = await tokenContract.balanceOf(address);

    return new Decimal(balance.toString()).div(10 ** decimals);
  };

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
      .middleware(({ url }) => {
        provider = new StaticJsonRpcProvider(url);
      })
      .middleware(async () => {
        ({ password } = await inquirer.prompt([
          {
            type: "password",
            name: "password",
            message: "Enter password"
          }
        ]));

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
            totals.prices[ETH] = await coinGecko.ethPrice();
          }

          const ledgers = config.getLedgers();
          const tokens = config.getTokens();

          for (const [name, addresses] of Object.entries(ledgers)) {
            Logger.info(`Processing the "${name}" ledger...`);

            ledgerTotals[name] = { amounts: { [ETH]: new Decimal(0) } };
            const ledgerTotal = ledgerTotals[name];

            for (const address of addresses) {
              const ethBalance = await getBalance(address);
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

                const tokenBalance = new Decimal((await getTokenBalance(address, tokenAddress, decimals)).toString());
                if (!tokenBalance.isZero()) {
                  if (price && !totals.prices[symbol]) {
                    totals.prices[symbol] = await coinGecko.tokenPrice(tokenAddress);
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
                Logger.info(`  ${symbol}: $${toCSV(price)}`);
              }
            });

            Logger.info();
          }

          Logger.title("Total Amounts:");

          let totalValue = new Decimal(0);

          Object.entries(totals.amounts).forEach(([symbol, amount]) => {
            if (!amount.isZero()) {
              if (price) {
                const value = amount.mul(totals.prices[symbol]);

                Logger.info(`  ${symbol}: ${toCSV(amount)} ($${toCSV(value)})`);

                totalValue = totalValue.add(value);
              } else {
                Logger.info(`  ${symbol}: ${toCSV(amount)}`);
              }
            }
          });

          Logger.info();

          if (price) {
            Logger.info(`Total Value: $${toCSV(totalValue)}`);
            Logger.info();
          }

          Logger.title("Ledger Totals:");

          Object.entries(ledgerTotals).forEach(([description, devTotals]) => {
            let devTotalValue = new Decimal(0);

            Logger.info(description);

            Object.entries(devTotals.amounts).forEach(([symbol, amount]) => {
              if (!amount.isZero()) {
                if (price) {
                  const value = amount.mul(totals.prices[symbol]);

                  Logger.info(`  ${symbol}: ${toCSV(amount)} ($${toCSV(value)})`);

                  devTotalValue = devTotalValue.add(value);
                } else {
                  Logger.info(`  ${symbol}: ${toCSV(amount)}`);
                }
              }
            });

            Logger.info();

            if (price) {
              Logger.info(`  Value: $${toCSV(devTotalValue)}`);
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
