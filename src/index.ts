#!/usr/bin/env node
import { Scanner, DEFAULT_SYMBOL_PRICE } from "./scanner";
import { DEFAULT_DECIMALS } from "./utils/constants";
import "./utils/csv";
import { DB } from "./utils/db";
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
      .options({
        "provider-url": {
          description: "Web3 provider's URL",
          type: "string",
          default: "http://localhost:8545"
        },
        price: {
          description: "Query prices using Coingecko",
          type: "boolean",
          alias: "p",
          default: false
        },
        "global-token-list": {
          description: "Use global token list (derived from https://tokens.coingecko.com/ethereum/all.json)",
          alias: "g",
          type: "boolean",
          default: false
        }
      })
      .middleware(async ({ providerUrl, price, globalTokenList }) => {
        const { password } = await inquirer.prompt([
          {
            type: "password",
            name: "password",
            message: "Enter password"
          }
        ]);

        if (!DB.exists()) {
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

        scanner = new Scanner({ providerUrl, password, price, globalTokenList });
      })
      .command(
        "show",
        "Show the DB",
        () => {},
        () => {
          scanner.showDB();
        }
      )
      .command(
        "scan",
        "Scans all addresses and tokens",
        {
          verbose: {
            description: "Verbose mode",
            type: "boolean",
            alias: "v"
          },
          "show-empty-addresses": {
            description: "Show empty addresses",
            alias: "e",
            type: "boolean",
            default: false
          }
        },
        async ({ verbose, showEmptyAddresses }) => {
          await scanner.scan({ verbose, showEmptyAddresses });
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
        "export-db",
        "Export the DB to an external file. Note that the export is *not* encrypted",
        {
          output: {
            description: "The output file path",
            type: "string",
            alias: "o",
            required: true
          }
        },
        ({ output }) => {
          scanner.exportDB(output);
        }
      )
      .command(
        "import-DB",
        "Import the DB from an external file. Note that the import should not be *not* encrypted",
        {
          input: {
            description: "The input file path",
            type: "string",
            alias: "i",
            required: true
          }
        },
        ({ input }) => {
          scanner.importDB(input);
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
        "Add a token to the DB",
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
        "Remove a token from the DB",
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
        "Add an asset to the DB",
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
        "Update an asset in the DB",
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
        "Remove an asset from the DB",
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
