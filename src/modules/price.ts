import { Base } from "./base";
import { CoinGeckoClient } from "coingecko-api-v3";
import Decimal from "decimal.js";
import { AbstractProvider } from "ethers";

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
    const price = await this.client.simplePrice({ ids: "ethereum", vs_currencies: "USD" });

    return new Decimal(price.ethereum.usd);
  }

  public async getTokenPrice(address: string) {
    const price = await this.client.simpleTokenPrice({
      id: "ethereum",
      // eslint-disable-next-line camelcase
      contract_addresses: address,
      // eslint-disable-next-line camelcase
      vs_currencies: "USD"
    });

    return new Decimal(price[address.toLowerCase()].usd);
  }
}
