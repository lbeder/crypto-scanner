import fs from "fs";
import path from "path";
import yargs from "yargs/yargs";

import crypto from "crypto";
import Web3 from "web3";
import Decimal from "decimal.js";
import { WebsocketProvider } from "web3-core";
import { AbiItem } from "web3-utils";
import inquirer from "inquirer";

import ERC20_API from "./erc20-abi.json";

const ETH = new Decimal(10 ** 18);

interface Device {
  description: string;
  addresses: string[];
}

interface Totals {
  ETH: Decimal;
  [additionalProperties: string]: Decimal;
}

interface DeviceTotals {
  [device: string]: Totals;
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
  let encrypted = cipher.update(format ? JSON.stringify(data, null, 2) : data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decryptConfig = (password: string) => {
  const dataDir = path.resolve(__dirname, "../data");
  const addressesDbPath = path.join(dataDir, "addresses.data");
  const tokensDbPath = path.join(dataDir, "tokens.data");

  return {
    addresses: JSON.parse(decrypt(fs.readFileSync(addressesDbPath, "utf8"), password)),
    tokens: JSON.parse(decrypt(fs.readFileSync(tokensDbPath, "utf8"), password))
  };
};

// tslint:disable: no-console
const main = async () => {
  let web3: Web3;
  let password;
  let addresses: Device[];
  let tokens: [];

  const getBalance = async (address: string): Promise<Decimal> => {
    const balance = await web3.eth.getBalance(address);
    return new Decimal(balance.toString()).div(ETH);
  };

  const getTokenBalance = async (address: string, token: string, decimals: number): Promise<Decimal> => {
    const tokenContract = new web3.eth.Contract(ERC20_API as AbiItem[], token);
    const balance = await tokenContract.methods.balanceOf(address).call();

    return new Decimal(balance.toString()).div(10 ** decimals);
  };

  try {
    await yargs(process.argv.slice(2))
      .option("provider", {
        type: "string",
        default: "ws://localhost:8545",
        description: "Web3 provider's URL"
      })
      .option("verbose", {
        type: "boolean",
        description: "Verbose mode"
      })
      .middleware(({ provider }) => {
        web3 = new Web3(provider);
      })
      .middleware(async () => {
        ({ password } = await inquirer.prompt([
          {
            type: "password",
            name: "password",
            message: "Enter password"
          }
        ]));

        ({ addresses, tokens } = decryptConfig(password));
      })
      .command(
        "config",
        "Get the config",
        () => {}, // tslint:disable-line: no-empty
        () => {
          console.log(addresses);
          console.log(tokens);

          console.log();
        }
      )
      .command(
        "fetch",
        "Fetch the data",
        () => {}, // tslint:disable-line: no-empty
        async ({ verbose }) => {
          const totals: Totals = { ETH: new Decimal(0) };
          const deviceTotals: DeviceTotals = {};

          for (const device of addresses) {
            const { description, addresses: deviceAddresses } = device;
            console.log("Processing", description);

            deviceTotals[description] = { ETH: new Decimal(0) };
            const deviceTotal = deviceTotals[description];

            for (const address of deviceAddresses) {
              const ethBalance = await getBalance(address);
              if (verbose && !ethBalance.isZero()) {
                console.log(address, ethBalance, "ETH");
              }

              totals.ETH = totals.ETH.add(ethBalance);
              deviceTotal.ETH = deviceTotal.ETH.add(ethBalance);

              for (const token of tokens) {
                const { address: tokenAddress, symbol, decimals } = token;
                if (totals[symbol] === undefined) {
                  totals[symbol] = new Decimal(0);
                }
                if (deviceTotal[symbol] === undefined) {
                  deviceTotal[symbol] = new Decimal(0);
                }

                const tokenBalance = new Decimal((await getTokenBalance(address, tokenAddress, decimals)).toString());
                if (verbose && !tokenBalance.isZero()) {
                  console.log(address, tokenBalance, symbol);
                }

                totals[symbol] = totals[symbol].add(tokenBalance);
                deviceTotal[symbol] = deviceTotal[symbol].add(tokenBalance);
              }
            }

            console.log("");
          }

          console.log("");
          console.log("Totals:");
          Object.entries(totals).forEach(([symbol, value]) => {
            if (!value.isZero()) {
              console.log(`${symbol}: ${Number(value.toFixed()).toLocaleString()}`);
            }
          });

          console.log("");
          console.log("Device Totals:");
          Object.entries(deviceTotals).forEach(([description, devTotals]) => {
            console.log(description);

            Object.entries(devTotals).forEach(([symbol, value]) => {
              if (!value.isZero()) {
                console.log(`${symbol}: ${Number(value.toFixed()).toLocaleString()}`);
              }
            });

            console.log("");
          });
        }
      )
      .demandCommand()
      .onFinishCommand(() => {
        (web3.currentProvider as WebsocketProvider)?.disconnect(0, "OK");
      })
      .help()
      .parse();
  } catch (e) {
    console.error(e);
  }
};

main();
