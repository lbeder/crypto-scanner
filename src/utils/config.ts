import crypto from "crypto";
import { utils } from "ethers";
import fs from "fs";
import path from "path";

const { getAddress } = utils;

const DATA_DIR = path.resolve(__dirname, "../../data");
const CONFIG_PATH = path.join(DATA_DIR, "config.data");

interface Token {
  address: string;
  decimals: number;
}

interface Data {
  ledgers: Record<string, string[]>;
  tokens: Record<string, Token>;
}

export class Config {
  private data: Data;
  private readonly password: string;

  constructor(password: string) {
    this.password = password;

    if (!fs.existsSync(CONFIG_PATH)) {
      this.data = {
        ledgers: {},
        tokens: {}
      };

      return;
    }

    this.data = JSON.parse(Config.decrypt(fs.readFileSync(CONFIG_PATH, "utf8"), password)) as Data;
  }

  public save() {
    const encryptedConfig = Config.encrypt(this.data, this.password);

    fs.writeFileSync(CONFIG_PATH, encryptedConfig, "utf8");
  }

  public getLedgers() {
    return this.data.ledgers;
  }

  public getLedger(name: string) {
    return this.data.ledgers[name];
  }

  public addLedger(name: string) {
    this.data.ledgers[name] = [];

    this.save();

    return this.getLedger(name);
  }

  public removeLedger(name: string) {
    if (!this.getLedger(name)) {
      return;
    }

    delete this.data.ledgers[name];

    this.save();
  }

  public addAddresses(name: string, addresses: string[]) {
    const ledger = this.data.ledgers[name] || this.addLedger(name);

    for (const address of addresses) {
      const checksummedAddress = getAddress(address);

      if (!ledger.includes(checksummedAddress)) {
        ledger.push(checksummedAddress);
      }
    }

    this.save();
  }

  public removeAddresses(name: string, addresses: string[]) {
    const ledger = this.data.ledgers[name];
    if (!ledger) {
      return;
    }

    const checksummedAddress = addresses.map((a) => utils.getAddress(a as string));
    this.data.ledgers[name] = ledger.filter((a) => !checksummedAddress.includes(a));

    this.save();
  }

  public getTokens() {
    return this.data.tokens;
  }

  public addToken(symbol: string, address: string, decimals: number) {
    this.data.tokens[symbol] = {
      address: getAddress(address),
      decimals
    };

    this.save();
  }

  public removeToken(symbol: string) {
    delete this.data.tokens[symbol];

    this.save();
  }

  private static decrypt(data: string, password: string) {
    const key = crypto.scryptSync(password, "salt", 32);
    const cipher = crypto.createDecipheriv("aes-256-cbc", key, Buffer.alloc(16, 0));
    let decrypted = cipher.update(data, "hex", "utf8");
    decrypted += cipher.final("utf8");

    return decrypted;
  }

  private static encrypt(data: any, password: string, format = true) {
    const key = crypto.scryptSync(password, "salt", 32);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, Buffer.alloc(16, 0));

    return cipher.update(format ? JSON.stringify(data, null, 2) : data, "utf8", "hex") + cipher.final("hex");
  }
}
