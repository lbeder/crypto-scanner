import Decimal from "decimal.js";

declare module "decimal.js" {
  interface Decimal {
    toCSV(): string;
  }
}

Decimal.prototype.toCSV = function (this: Decimal) {
  return Number(this).toLocaleString();
};
