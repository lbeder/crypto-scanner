import Decimal from "decimal.js";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { config } from "dotenv";

import DEVICES from "./addresses-eth.json";
import TOKENS from "./tokens-eth.json";
import ERC20_API from "./erc20-abi.json";

config();

const { WEB3_PROVIDER = "http://localhost:8545" } = process.env;

const ETH = new Decimal(10 ** 18);
const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER));

const getBalance = async (address: string): Promise<Decimal> => {
  const balance = await web3.eth.getBalance(address);
  return new Decimal(balance.toString()).div(ETH);
};

const getTokenBalance = async (address: string, token: string, decimals: number): Promise<Decimal> => {
  const tokenContract = new web3.eth.Contract(ERC20_API as AbiItem[], token);
  const balance = await tokenContract.methods.balanceOf(address).call();

  return new Decimal(balance.toString()).div(10 ** decimals);
};

export interface Totals {
  ETH: Decimal;
  [additionalProperties: string]: Decimal;
}

// tslint:disable: no-console
const main = async () => {
  const totals: Totals = { ETH: new Decimal(0) };

  for (const device of DEVICES) {
    console.log(device.description);

    for (const address of device.addresses) {
      const ethBalance = await getBalance(address);
      totals.ETH = totals.ETH.add(ethBalance);

      console.log(`  ${address}`);
      console.log("    ETH:", Number(ethBalance.toFixed()).toLocaleString());

      for (const token of TOKENS) {
        const { address: tokenAddress, symbol, decimals } = token;
        if (totals[symbol] === undefined) {
          totals[symbol] = new Decimal(0);
        }

        const tokenBalance = new Decimal((await getTokenBalance(address, tokenAddress, decimals)).toString());
        console.log(`    ${symbol}:`, Number(tokenBalance.toFixed()).toLocaleString());
        totals[symbol] = totals[symbol].add(tokenBalance);
      }

      console.log("");
    }
  }

  console.log("Totals:");
  Object.entries(totals).forEach(([symbol, value]) =>
    console.log(`${symbol}: ${Number(value.toFixed()).toLocaleString()}`)
  );
};

main();
