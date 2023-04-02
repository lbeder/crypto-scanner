import { Config } from "./utils/config";
import "./utils/csv";
import { Logger } from "./utils/logger";
import inquirer from "inquirer";
import yargs from "yargs";
import { Watcher } from "./watcher";

const main = async () => {
  let watcher: Watcher;

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
          watcher.addAddresses(name, data as string[]);
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
          watcher.removeAddresses(name, data as string[]);
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
          watcher.removeLedger(name);
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
          watcher.addToken(symbol, address, decimals);
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
          watcher.removeToken(symbol);
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
