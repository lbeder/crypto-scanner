import fs from "fs";
import path from "path";
import axios from "axios";
import { getAddress } from "ethers";
import { sortBy } from "lodash";
import { Logger } from "../utils/logger";

const TOKENS_API = "https://tokens.coingecko.com/ethereum/all.json";

const TOKENS_PATH = path.resolve(path.join(__dirname, "../data/tokens.ts"));

const IGNORED_TOKENS = new Set<string>([
  "0xDadb4aE5B5D3099Dd1f586f990B845F2404A1c4c",
  "0x47140a767A861F7a1f3B0Dd22A2F463421c28814",
  "0x60867B79a68AbECB78351B2dbB5fdec4282C5aCB"
]);

interface TokenInfo {
  address: string;
  symbol: string;
  decimals: number;
}

const main = async () => {
  try {
    const response = await axios.get(TOKENS_API);
    const tokens = response.data.tokens as TokenInfo[];

    fs.writeFileSync(TOKENS_PATH, "export const TOKENS = ");

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
    fs.writeFileSync(TOKENS_PATH, `export const GLOBAL_TOKEN_LIST = ${JSON.stringify(data, null, 2)};\n\r`);

    Logger.info(`Updated ${TOKENS_PATH}`);
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
