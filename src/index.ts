import { Config } from "./utils/config";
import { DEFAULT_DECIMALS } from "./utils/constants";
import "./utils/csv";
import { Logger } from "./utils/logger";
import { Watcher, DEFAULT_SYMBOL_PRICE } from "./watcher";
import inquirer from "inquirer";
import yargs from "yargs";

const main = async () => {
  let watcher: Watcher;

  try {
    await yargs(process.argv.slice(2))
      .parserConfiguration({ "parse-numbers": false })
      .scriptName("yarn")
      .option("url", {
        description: "Web3 provider's URL",
        type: "string",
        default: "http://127.0.0.1:8545"
      })
      .option("verbose", {
        description: "Verbose mode",
        type: "boolean",
        alias: "v"
      })
      .option("price", {
        description: "Query prices using Coingecko",
        type: "boolean",
        alias: "p",
        default: false
      })
      .middleware(async ({ url, price }) => {
        const { password } = await inquirer.prompt([
          {
            type: "password",
            name: "password",
            message: "Enter password"
          }
        ]);

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

        watcher = new Watcher({ providerUrl: url, price, password });
      })
      .command(
        "show",
        "Show the configuration",
        () => {},
        () => {
          watcher.printConfig();
        }
      )
      .command(
        "query",
        "Query all addresses and tokens",
        () => {},
        async ({ verbose }) => {
          await watcher.printData({ verbose });
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

          watcher.changePassword(newPassword2);
        }
      )
      .command(
        "add-addresses",
        "Add an address or a list of space-separated addresses to a named ledger",
        {
          name: {
            description: "The name of the ledger",
            type: "string",
            required: true
          },
          data: {
            description: "The addresses to add",
            type: "array",
            required: true
          }
        },
        ({ name, data }) => {
          watcher.addAddresses(name, data as string[]);
        }
      )
      .command(
        "remove-addresses",
        "Remove an address or a list of space-separated addresses from a named ledger",
        {
          name: {
            description: "The name of the ledger",
            type: "string",
            required: true
          },
          data: {
            description: "The addresses to remove",
            type: "array",
            default: []
          }
        },
        ({ name, data }) => {
          watcher.removeAddresses(name, data as string[]);
        }
      )
      .command(
        "remove-ledger",
        "Remove an entire named ledger",
        {
          name: {
            description: "The name of the ledger",
            type: "string",
            required: true
          }
        },
        ({ name }) => {
          watcher.removeLedger(name);
        }
      )
      .command(
        "add-token",
        "Add a token to the config",
        {
          symbol: {
            description: "The symbol of the token",
            type: "string",
            required: true
          },
          address: {
            description: "The address of the token",
            type: "string",
            required: true
          },
          decimals: {
            description: "The decimals of the token",
            type: "number",
            default: DEFAULT_DECIMALS
          }
        },
        ({ symbol, address, decimals }) => {
          watcher.addToken(symbol, address, decimals);
        }
      )
      .command(
        "remove-token",
        "Remove a token from the config",
        {
          symbol: {
            description: "The symbol of the token",
            type: "string",
            required: true
          }
        },
        ({ symbol }) => {
          watcher.removeToken(symbol);
        }
      )
      .command(
        "add-asset",
        "Add an asset to the config",
        {
          name: {
            description: "The name of the asset",
            type: "string",
            required: true
          },
          quantity: {
            type: "number",
            description: "The quantity of the asset",
            required: true
          },
          "unit-price": {
            description: "The unit price of the asset",
            type: "number"
          },
          symbol: {
            description: "The (optional) symbol of the token the asset is priced in",
            type: "string"
          }
        },
        ({ name, quantity, unitPrice: price, symbol }) => {
          if (symbol && !price) {
            price = DEFAULT_SYMBOL_PRICE;
          } else {
            throw new Error("Missing required argument: unit-price");
          }

          watcher.addAsset(name, quantity, price, symbol);
        }
      )
      .command(
        "update-asset",
        "Update an asset in the config",
        {
          name: {
            description: "The name of the asset",
            type: "string",
            required: true
          },
          quantity: {
            type: "number",
            description: "The new quantity of the asset",
            required: true
          },
          "unit-price": {
            description: "The new unit price of the asset",
            type: "number"
          },
          symbol: {
            description: "The symbol of the token the asset is priced in",
            type: "string"
          }
        },
        ({ name, quantity, unitPrice: price, symbol }) => {
          if (symbol && !price) {
            price = DEFAULT_SYMBOL_PRICE;
          } else {
            throw new Error("Missing required argument: unit-price");
          }

          watcher.updateAsset(name, quantity, price, symbol);
        }
      )
      .command(
        "remove-asset",
        "Remove an assert from the config",
        {
          name: {
            description: "The name of the asset",
            type: "string",
            required: true
          }
        },
        ({ name }) => {
          watcher.removeAsset(name);
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
