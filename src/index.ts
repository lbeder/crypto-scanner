#!/usr/bin/env node
import { Scanner, DEFAULT_SYMBOL_PRICE } from "./scanner";
import { Config } from "./utils/config";
import { DEFAULT_DECIMALS } from "./utils/constants";
import "./utils/csv";
import { Logger } from "./utils/logger";
import inquirer from "inquirer";
import { zipWith } from "lodash";
import yargs from "yargs";

const main = async () => {
  let scanner: Scanner;

  try {
    await yargs(process.argv.slice(2))
      .parserConfiguration({ "parse-numbers": false })
      .scriptName("crypto-scanner")
      .wrap(120)
      .demandCommand()
      .help()
      .version()
      .option("url", {
        description: "Web3 provider's URL",
        type: "string",
        default: "http://localhost:8545"
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

        scanner = new Scanner({ providerUrl: url, price, password });
      })
      .command(
        "show",
        "Show the configuration",
        () => {},
        () => {
          scanner.printConfig();
        }
      )
      .command(
        "scan",
        "Scans all addresses and tokens",
        (yargs) =>
          yargs
            .option("verbose", {
              description: "Verbose mode",
              type: "boolean",
              alias: "v"
            })
            .option("show-empty-addresses", {
              alias: "e",
              type: "boolean",
              default: false
            }),
        async ({ verbose, showEmptyAddresses }) => {
          await scanner.printData({ verbose, showEmptyAddresses });
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

          scanner.changePassword(newPassword2);
        }
      )
      .command(
        "export-config",
        "Export the config to an external file. Note that the export is *not* encrypted",
        {
          output: {
            description: "The output file path",
            type: "string",
            alias: "o",
            required: true
          }
        },
        ({ output }) => {
          scanner.exportConfig(output);
        }
      )
      .command(
        "import-config",
        "Import the config from an external file. Note that the import should not be *not* encrypted",
        {
          input: {
            description: "The input file path",
            type: "string",
            alias: "i",
            required: true
          }
        },
        ({ input }) => {
          scanner.importConfig(input);
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
          addresses: {
            description: "The address (or multiple addresses) to add",
            type: "array",
            required: true
          },
          notes: {
            description: "The address notes (or multiple notes) to add",
            type: "array"
          }
        },
        ({ name, addresses, notes }) => {
          scanner.addAddresses(
            name,
            zipWith(addresses as string[], notes as string[], (address, note) => ({ address, note }))
          );
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
            description: "The address (or multiple addresses) to remove",
            type: "array",
            default: []
          }
        },
        ({ name, data }) => {
          scanner.removeAddresses(name, data as string[]);
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
          scanner.removeLedger(name);
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
          scanner.addToken(symbol, address, decimals);
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
          scanner.removeToken(symbol);
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
          if (symbol) {
            price ||= DEFAULT_SYMBOL_PRICE;
          } else if (!price) {
            throw new Error("Missing required argument: unit-price");
          }

          scanner.addAsset(name, quantity, price, symbol);
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
          if (symbol) {
            price ||= DEFAULT_SYMBOL_PRICE;
          } else if (!price) {
            throw new Error("Missing required argument: unit-price");
          }

          scanner.updateAsset(name, quantity, price, symbol);
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
          scanner.removeAsset(name);
        }
      )
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
