import crypto from "crypto";
import fs from "fs";
import path from "path";
import { getAddress, isAddress } from "ethers";
import { fromPairs, sortBy, toPairs } from "lodash";
import { GLOBAL_TOKEN_LIST } from "../data/tokens";
import { ETH, USD } from "./constants";

const VERSION = 1;

export interface Address {
  address: string;
  note: string;
}

export interface Token {
  address: string;
  decimals: number;
}

export interface Asset {
  quantity: number;
  price: number;
  symbol: string;
}

export type Ledgers = Record<string, Address[]>;
export type Tokens = Record<string, Token>;
export type Assets = Record<string, Asset>;

interface Data {
  version: number;
  ledgers: Ledgers;
  tokens: Tokens;
  assets: Assets;
}

export interface DBOptions {
  path: string;
  password: string;
  globalTokenList: boolean;
}

export class DB {
  private data: Data;
  private readonly path: string;
  private password: string;
  private globalTokenList: Tokens = {};
  private globalTokenListEnabled = false;

  constructor({ path: dbPath, password, globalTokenList }: DBOptions) {
    this.path = dbPath;
    this.password = password;

    const dbDir = path.dirname(this.path);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    if (!fs.existsSync(this.path)) {
      this.data = {
        version: VERSION,
        ledgers: {},
        tokens: {},
        assets: {}
      };

      return;
    }

    if (globalTokenList) {
      this.globalTokenList = Object.fromEntries(
        Object.entries(GLOBAL_TOKEN_LIST.tokens).map(([symbol, { address, decimals }]) => [
          symbol,
          { address: getAddress(address), decimals }
        ])
      );

      this.globalTokenListEnabled = true;
    }

    let data: Data;

    try {
      data = JSON.parse(DB.decrypt(fs.readFileSync(this.path, "utf8"), password)) as Data;

      // Sort the data
      data.ledgers = this.sort(data.ledgers);
      data.tokens = this.sort(data.tokens);
      data.assets = this.sort(data.assets);
    } catch {
      throw new Error("Invalid password");
    }

    // Backward compatibility
    data.version ??= VERSION;

    for (const [name, addresses] of Object.entries(data.ledgers)) {
      if (addresses.length > 0 && typeof addresses[0] === "string") {
        data.ledgers[name] = (addresses as any as string[]).map((a) => ({ address: a, note: "" }));
      }
    }

    this.data = data;
  }

  public changePassword(newPassword: string) {
    this.password = newPassword;

    this.save();
  }

  public export(outputPath: string) {
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(this.data, null, 2), "utf-8");
  }

  public import(inputPath: string) {
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input path ${inputPath} does not exist`);
    }

    const data = JSON.parse(fs.readFileSync(inputPath, "utf-8")) as Data;
    switch (data.version) {
      case undefined:
      case 1:
        break;

      default:
        throw new Error(`Unsupported version: ${data.version}`);
    }

    if (!data.ledgers) {
      throw new Error("Missing ledgers");
    }

    for (const [ledger, addresses] of Object.entries(data.ledgers)) {
      if (!ledger) {
        throw new Error("Invalid ledger name");
      }

      for (const { address } of addresses) {
        if (!isAddress(address)) {
          throw new Error(`Invalid address: ${address}`);
        }
      }
    }

    if (!data.tokens) {
      throw new Error("Missing tokens");
    }

    for (const [symbol, { address, decimals }] of Object.entries(data.tokens)) {
      if (!symbol) {
        throw new Error("Invalid token symbol");
      }

      if (!isAddress(address)) {
        throw new Error(`Invalid token's ${symbol} address: ${address}`);
      }

      if (!decimals) {
        throw new Error(`Invalid token's ${symbol} decimals`);
      }
    }

    if (!data.assets) {
      throw new Error("Missing assets");
    }

    for (const [name, { quantity, price }] of Object.entries(data.assets)) {
      if (!name) {
        throw new Error("Invalid asset name");
      }

      if (!name) {
        throw new Error("Invalid asset name");
      }

      if (!quantity) {
        throw new Error(`Invalid asset's ${name} quantity`);
      }

      if (!price) {
        throw new Error(`Invalid asset's ${name} price`);
      }
    }

    this.data = data;

    this.save();
  }

  public getVersion() {
    return this.data.version ?? VERSION;
  }

  public getLedgers() {
    return this.data.ledgers;
  }

  public getTokens() {
    return { ...this.data.tokens, ...this.globalTokenList };
  }

  public isGlobalTokenListEnabled() {
    return this.globalTokenListEnabled;
  }

  public getAssets() {
    return this.data.assets ?? {};
  }

  public addLedger(name: string) {
    if (!name) {
      throw new Error("Invalid data");
    }

    if (this.data.ledgers[name]) {
      throw new Error(`Ledger ${name} already exists`);
    }

    this.data.ledgers[name] = [];

    this.save();

    return this.data.ledgers[name];
  }

  public removeLedger(name: string) {
    if (!this.data.ledgers[name]) {
      throw new Error(`Ledger ${name} doesn't not exist`);
    }

    delete this.data.ledgers[name];

    this.save();
  }

  public addAddresses(name: string, addresses: Address[]) {
    const ledger = this.data.ledgers[name] ?? this.addLedger(name);

    for (const { address, note } of addresses) {
      const checksummedAddress = getAddress(address);

      const existing = ledger.find((a) => a.address === checksummedAddress);
      if (!existing) {
        ledger.push({ address: checksummedAddress, note });
      } else if (existing.note !== note) {
        existing.note = note;
      }
    }

    this.save();
  }

  public removeAddresses(name: string, addresses: string[]) {
    const ledger = this.data.ledgers[name];
    if (!ledger) {
      return;
    }

    const checksummedAddress = addresses.map((a) => getAddress(a as string));
    this.data.ledgers[name] = ledger.filter((a) => !checksummedAddress.includes(a.address));

    this.save();
  }

  public addToken(symbol: string, address: string, decimals: number) {
    if (!symbol || !address || decimals <= 0) {
      throw new Error("Invalid data");
    }

    if (this.data.tokens[symbol]) {
      throw new Error(`Token ${symbol} already exists`);
    }

    this.data.tokens[symbol] = {
      address: getAddress(address),
      decimals
    };

    this.save();
  }

  public removeToken(symbol: string) {
    if (!this.data.tokens[symbol]) {
      throw new Error(`Token ${symbol} doesn't exist`);
    }

    delete this.data.tokens[symbol];

    this.save();
  }

  public addAsset(name: string, quantity: number, price: number, symbol: string) {
    if (this.data.assets[name]) {
      throw new Error(`Asset ${name} already exists`);
    }

    if (!name || price <= 0 || quantity <= 0) {
      throw new Error("Invalid data");
    }

    if (symbol !== USD && symbol !== ETH) {
      const token = this.data.tokens[symbol];
      if (!token) {
        throw new Error(`Unknown token ${symbol}`);
      }
    }

    this.data.assets[name] = {
      quantity,
      price,
      symbol
    };

    this.save();
  }

  public updateAsset(name: string, quantity: number, price: number, symbol: string) {
    if (!this.data.assets[name]) {
      throw new Error(`Asset ${name} doesn't exist`);
    }

    if (!name || price <= 0 || quantity <= 0) {
      throw new Error("Invalid data");
    }

    if (symbol !== USD && symbol !== ETH) {
      const token = this.data.tokens[symbol];
      if (!token) {
        throw new Error(`Unknown token ${symbol}`);
      }
    }

    this.data.assets[name] = {
      quantity,
      price,
      symbol
    };

    this.save();
  }

  public removeAsset(name: string) {
    if (!this.data.assets[name]) {
      throw new Error(`Asset ${name} doesn't exist`);
    }

    delete this.data.assets[name];

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

  private save() {
    const encryptedDB = DB.encrypt(this.data, this.password);

    fs.writeFileSync(this.path, encryptedDB, "utf8");
  }

  private sort<T>(list: Record<string, T>) {
    return fromPairs(sortBy(toPairs(list), 0));
  }
}
