#!/usr/bin/env node
import { DEFAULT_SYMBOL_PRICE, Scanner } from "./scanner";
import { DEFAULT_DECIMALS } from "./utils/constants";
import "./utils/csv";
import fs from "fs";
import os from "os";
import path from "path";
import inquirer from "inquirer";
import { zipWith } from "lodash";
import yargs, { Argv } from "yargs";
import { Logger } from "./utils/logger";

const VERSION = "6.5.0";

const main = async () => {
  let scanner: Scanner;

  try {
    await yargs(process.argv.slice(2))
      .parserConfiguration({ "parse-numbers": false })
      .scriptName("crypto-scanner")
      .wrap(120)
      .demandCommand()
      .help()
      .version(VERSION)
      .options({
        path: {
          description: "DB URL",
          type: "string",
          default: path.join(path.resolve(os.homedir(), ".crypto-scanner/"), "db")
        },
        "provider-url": {
          description: "Web3 provider's URL",
          type: "string",
          default: "http://localhost:8545"
        },
        price: {
          description: "Query prices using CoinGecko",
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
      .middleware(async ({ path: dbPath, providerUrl, price, globalTokenList }) => {
        const { password } = await inquirer.prompt([
          {
            type: "password",
            name: "password",
            message: "Enter password"
          }
        ]);

        if (!fs.existsSync(dbPath)) {
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

        scanner = new Scanner({ path: dbPath, providerUrl, password, price, globalTokenList });
      })
      .command(
        "scan",
        "Scan all addresses and tokens",
        {
          csv: {
            description: "The CSV reports output directory (optional)",
            type: "string",
            alias: "r",
            requiresArg: true
          },
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
          },
          "aggregate-assets": {
            description:
              "Aggregate custom-priced assets in totals (e.g., if an asset has a custom price of 3 ETH per unit, then instead of showing it separately, we will aggregate its amount with the total ETH amount)",
            alias: "a",
            type: "boolean",
            default: false
          }
        },
        async ({ csv, verbose, showEmptyAddresses, aggregateAssets }) => {
          await scanner.scan({ csvOutputDir: csv, verbose, showEmptyAddresses, aggregateAssets });
        }
      )
      .command(
        "list",
        "List all the ledgers, addresses, tokens, and assets",
        () => {},
        () => {
          scanner.showDB();
        }
      )
      .command("db", "DB management functions", (yargs: Argv) =>
        yargs
          .command(
            "show",
            "Show the DB",
            () => {},
            () => {
              scanner.showDB();
            }
          )
          .command(
            "export",
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
            "import",
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
      )
      .command("password", "Password management functions", (yargs: Argv) =>
        yargs.command(
          "set",
          "Set/change the encryption password",
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
      )
      .command("ledger", "Ledger management functions", (yargs: Argv) =>
        yargs
          .command(
            "add",
            "Add a new ledger",
            {
              name: {
                description: "The name of the ledger",
                type: "string",
                required: true
              }
            },
            ({ name }) => {
              scanner.addLedger(name);
            }
          )
          .command(
            "remove",
            "Remove an existing ledger",
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
      )
      .command("address", "Address management functions", (yargs: Argv) =>
        yargs
          .command(
            "add",
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
            "remove",
            "Remove an address or a list of space-separated addresses from a named ledger",
            {
              name: {
                description: "The name of the ledger",
                type: "string",
                required: true
              },
              addresses: {
                description: "The address (or multiple addresses) to remove",
                type: "array",
                default: []
              }
            },
            ({ name, addresses }) => {
              scanner.removeAddresses(name, addresses as string[]);
            }
          )
      )
      .command("token", "Token management functions", (yargs: Argv) =>
        yargs
          .command(
            "add",
            "Add a new token",
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
            "remove",
            "Remove a token from",
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
      )
      .command("asset", "Asset management functions", (yargs: Argv) =>
        yargs
          .command(
            "add",
            "Add a new asset",
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
                description: "The symbol of the token the asset is priced in (optional)",
                type: "string",
                requiresArg: true
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
            "update",
            "Update an existing asset",
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
                type: "string",
                requiresArg: true
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
            "remove",
            "Remove an existing asset",
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
