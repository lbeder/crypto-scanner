import { CoinGeckoClient } from "coingecko-api-v3";
import Decimal from "decimal.js";
import { AbstractProvider, getAddress } from "ethers";
import { USD } from "../utils/constants";
import { Logger } from "../utils/logger";
import { Base } from "./base";
import "dotenv/config";

export class Price extends Base {
  private readonly client: CoinGeckoClient;
  private readonly apiKey: string | undefined;
  private readonly isDemo: boolean = false;

  private readonly CG_DEMO_API_KEY = "x_cg_demo_api_key";

  constructor(provider: AbstractProvider) {
    super(provider);

    const { COINGECKO_API_KEY: apiKey, COINGECKO_DEMO_API_KEY: demoApiKey } = process.env;
    const options = {
      timeout: 10000,
      autoRetry: true
    };

    if (apiKey) {
      this.client = new CoinGeckoClient(options, apiKey);
    } else {
      if (demoApiKey) {
        Logger.warning("WARNING: Using CoinGecko demo API key");
        Logger.warning();

        this.isDemo = true;
      }

      this.client = new CoinGeckoClient(options);
    }

    this.apiKey = apiKey ?? demoApiKey;
  }

  public async getETHPrice() {
    // eslint-disable-next-line camelcase
    const options = { ids: "ethereum", vs_currencies: USD };
    // eslint-disable-next-line camelcase
    const extraOptions = this.isDemo ? { x_cg_demo_api_key: this.apiKey } : {};

    const price = await this.client.simplePrice({ ...options, ...extraOptions });

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
    // eslint-disable-next-line camelcase
    const options = {
      id: "ethereum",
      // eslint-disable-next-line camelcase
      contract_addresses: addresses.join(","),
      // eslint-disable-next-line camelcase
      vs_currencies: USD
    };
    // eslint-disable-next-line camelcase
    const extraOptions = this.isDemo ? { x_cg_demo_api_key: this.apiKey } : {};

    return this.client.simpleTokenPrice({ ...options, ...extraOptions } as any);
  }
}
