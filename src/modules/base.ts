import { AbstractProvider } from "ethers";

export class Base {
  protected readonly provider: AbstractProvider;

  constructor(provider: AbstractProvider) {
    this.provider = provider;
  }
}
