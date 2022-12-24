import { CoinGecko } from "./coingecko";
import ERC20_API from "./erc20-abi.json";
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import crypto from "crypto";
import Decimal from "decimal.js";
import { Contract, utils } from "ethers";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import yargs from "yargs";

const ETH_WEI = new Decimal(10 ** 18);
const ETH = "ETH";

const DATA_DIR = path.resolve(__dirname, "../data");
const CONFIG_PATH = path.join(DATA_DIR, "config.data");

interface Token {
  address: string;
  decimals: number;
}

interface Config {
  ledgers: Record<string, string[]>;
  tokens: Record<string, Token>;
}

interface Totals {
  amounts: Record<string, Decimal>;
  prices: Record<string, Decimal>;
}

interface LedgerTotals {
  [device: string]: {
    amounts: Record<string, Decimal>;
  };
}

const decrypt = (data: string, password: string) => {
  const key = crypto.scryptSync(password, "salt", 32);
  const cipher = crypto.createDecipheriv("aes-256-cbc", key, Buffer.alloc(16, 0));
  let decrypted = cipher.update(data, "hex", "utf8");
  decrypted += cipher.final("utf8");
  return decrypted;
};

const encrypt = (data: any, password: string, format: boolean = true) => {
  const key = crypto.scryptSync(password, "salt", 32);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, Buffer.alloc(16, 0));
  return cipher.update(format ? JSON.stringify(data, null, 2) : data, "utf8", "hex") + cipher.final("hex");
};

const loadConfig = (password: string): Config => {
  if (!fs.existsSync(CONFIG_PATH)) {
    return {
      ledgers: {},
      tokens: {}
    };
  }

  return JSON.parse(decrypt(fs.readFileSync(CONFIG_PATH, "utf8"), password)) as Config;
};

const saveConfig = (config: Config, password: string) => {
  const encryptedConfig = encrypt(config, password);

  fs.writeFileSync(CONFIG_PATH, encryptedConfig, "utf8");
};

const toCSV = (value: Decimal) => Number(value.toFixed()).toLocaleString();

const title = (desc: string) => {
  console.log();
  console.log(desc);
  console.log("‾".repeat(desc.length));
  console.log();
};

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
      .option("url", {
        type: "string",
        default: "http://localhost:8545",
        description: "Web3 provider's URL"
      })
      .option("verbose", {
        type: "boolean",
        description: "Verbose mode"
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

        config = loadConfig(password);
      })
      .command(
        "show",
        "Shows the configuration",
        () => {},
        async () => {
          console.log(config);

          console.log();
        }
      )
      .command(
        "add-address",
        "Add an address or a list of addresses to a named ledger",
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
          if (!config.ledgers[name]) {
            config.ledgers[name] = [];
          }

          for (const rawAddress of data) {
            const address = utils.getAddress(rawAddress as string);
            if (!config.ledgers[name].includes(address)) {
              config.ledgers[name].push(address);
            }
          }

          saveConfig(config, password);
        }
      )
      .command(
        "remove-address",
        "Remove an address or a list of addresses from a named ledger",
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
          if (!config.ledgers[name]) {
            return;
          }

          if (data.length === 0) {
            delete config.ledgers[name];
          } else {
            const addresses = data.map((a) => utils.getAddress(a as string));
            config.ledgers[name] = config.ledgers[name].filter((a) => !addresses.includes(a));
          }

          saveConfig(config, password);
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
          config.tokens[symbol] = {
            address: utils.getAddress(address),
            decimals
          };

          saveConfig(config, password);
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
          delete config.tokens[symbol];

          saveConfig(config, password);
        }
      )
      .command(
        "query",
        "Queries all addresses and tokens",
        () => {},
        async ({ verbose }) => {
          const totals: Totals = {
            amounts: {
              [ETH]: new Decimal(0)
            },
            prices: {
              [ETH]: new Decimal(0)
            }
          };
          const ledgerTotals: LedgerTotals = {};

          totals.prices[ETH] = await coinGecko.ethPrice();

          const { ledgers, tokens } = config;

          for (const [name, addresses] of Object.entries(ledgers)) {
            console.log(`Processing ${name}...`);

            ledgerTotals[name] = { amounts: { [ETH]: new Decimal(0) } };
            const ledgerTotal = ledgerTotals[name];

            for (const address of addresses) {
              const ethBalance = await getBalance(address);
              if (verbose && !ethBalance.isZero()) {
                console.log(address, ethBalance, ETH);
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
                  if (!totals.prices[symbol]) {
                    totals.prices[symbol] = await coinGecko.tokenPrice(tokenAddress);
                  }

                  if (verbose) {
                    console.log(address, tokenBalance, symbol);
                  }
                }

                totals.amounts[symbol] = totals.amounts[symbol].add(tokenBalance);
                ledgerTotal.amounts[symbol] = ledgerTotal.amounts[symbol].add(tokenBalance);
              }
            }

            console.log();
          }

          title("Prices:");

          Object.entries(totals.prices).forEach(([symbol, price]) => {
            if (!price.isZero()) {
              console.log(`  ${symbol}: $${toCSV(price)}`);
            }
          });

          title("Total Amounts:");

          let totalValue = new Decimal(0);

          Object.entries(totals.amounts).forEach(([symbol, amount]) => {
            if (!amount.isZero()) {
              const value = amount.mul(totals.prices[symbol]);

              console.log(`  ${symbol}: ${toCSV(amount)} ($${toCSV(value)})`);

              totalValue = totalValue.add(value);
            }
          });

          console.log();
          console.log(`Total Value: $${toCSV(totalValue)}`);

          title("Ledger Totals:");

          Object.entries(ledgerTotals).forEach(([description, devTotals]) => {
            let devTotalValue = new Decimal(0);

            console.log(description);

            Object.entries(devTotals.amounts).forEach(([symbol, amount]) => {
              if (!amount.isZero()) {
                const value = amount.mul(totals.prices[symbol]);

                console.log(`  ${symbol}: ${toCSV(amount)} ($${toCSV(value)})`);

                devTotalValue = devTotalValue.add(value);
              }
            });

            console.log();
            console.log(`  Value: $${toCSV(devTotalValue)}`);

            console.log();
          });
        }
      )
      .demandCommand()
      .help()
      .parse();

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

main();
