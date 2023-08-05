import { CoinGeckoClient } from "coingecko-api-v3";
import Decimal from "decimal.js";
import { AbstractProvider, getAddress } from "ethers";
import { USD } from "../utils/constants";
import { Base } from "./base";

export class Price extends Base {
  private readonly client: CoinGeckoClient;

  constructor(provider: AbstractProvider) {
    super(provider);

    this.client = new CoinGeckoClient({
      timeout: 10000,
      autoRetry: true
    });
  }

  public async getETHPrice() {
    // eslint-disable-next-line camelcase
    const price = await this.client.simplePrice({ ids: "ethereum", vs_currencies: USD });

    return new Decimal(price.ethereum.usd);
  }

  public async getTokenPrice(address: string): Promise<Decimal> {
    const price = await this.getPrice([address]);

    return new Decimal(price[address.toLowerCase()].usd);
  }

  public async getTokenPrices(addresses: string[]): Promise<Record<string, Decimal>> {
    const prices = await this.getPrice(addresses);

    return Object.fromEntries(
      Object.entries(prices).map(([address, data]) => [getAddress(address), new Decimal(data.usd ?? 0)])
    );
  }

  private getPrice(addresses: string[]) {
    return this.client.simpleTokenPrice({
      id: "ethereum",
      // eslint-disable-next-line camelcase
      contract_addresses: addresses.join(","),
      // eslint-disable-next-line camelcase
      vs_currencies: USD
    });
  }
}
