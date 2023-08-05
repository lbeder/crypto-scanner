import Decimal from "decimal.js";
import { Contract } from "ethers";
import ERC20_API from "../abi/erc20.json";
import { Base } from "./base";

export class Token extends Base {
  async getTokenBalance(address: string, token: string, decimals: number): Promise<Decimal> {
    const tokenContract = new Contract(token, ERC20_API, this.provider);
    const balance = await tokenContract.balanceOf.staticCall(address);

    return new Decimal(balance.toString()).div(10 ** decimals);
  }
}
