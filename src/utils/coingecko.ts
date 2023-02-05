import { CoinGeckoClient } from "coingecko-api-v3";
import Decimal from "decimal.js";

export class CoinGecko {
  private readonly client: CoinGeckoClient;

  constructor() {
    this.client = new CoinGeckoClient({
      timeout: 10000,
      autoRetry: true
    });
  }

  public async ethPrice() {
    // eslint-disable-next-line camelcase
    const price = await this.client.simplePrice({ ids: "ethereum", vs_currencies: "USD" });

    return new Decimal(price.ethereum.usd);
  }

  public async tokenPrice(address: string) {
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
