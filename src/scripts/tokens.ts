import fs from "fs";
import path from "path";
import { getAddress } from "ethers";
import { sortBy } from "lodash";
import fetch from "node-fetch";
import { Logger } from "../utils/logger";

const TOKENS_API = "https://tokens.coingecko.com/ethereum/all.json";

const TOKENS_JSON_PATH = path.resolve(path.join(__dirname, "../../data/tokens.json"));

const IGNORED_TOKENS = new Set<string>([
  "0xDadb4aE5B5D3099Dd1f586f990B845F2404A1c4c",
  "0x47140a767A861F7a1f3B0Dd22A2F463421c28814"
]);

interface TokenInfo {
  address: string;
  symbol: string;
  decimals: number;
}

interface Response {
  tokens: TokenInfo[];
}

const main = async () => {
  try {
    const response = await fetch(TOKENS_API);
    const tokens = ((await response.json()) as Response).tokens as TokenInfo[];

    const data = {
      date: new Date().toISOString(),
      tokens: Object.fromEntries(
        sortBy(
          tokens
            .filter(({ address }) => !IGNORED_TOKENS.has(getAddress(address)))
            .map(({ address, symbol, decimals }: TokenInfo) => [symbol, { address: getAddress(address), decimals }]),
          ([symbol]) => symbol
        )
      )
    };
    fs.writeFileSync(TOKENS_JSON_PATH, JSON.stringify(data, null, 2));

    Logger.info(`Updated ${TOKENS_JSON_PATH}`);
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
