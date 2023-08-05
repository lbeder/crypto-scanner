import Decimal from "decimal.js";
import { ETH_WEI } from "../utils/constants";
import { Base } from "./base";

export class Balance extends Base {
  async getBalance(address: string): Promise<Decimal> {
    const balance = await this.provider.getBalance(address);

    return new Decimal(balance.toString()).div(ETH_WEI);
  }
}
