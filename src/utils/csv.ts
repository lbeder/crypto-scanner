import Decimal from "decimal.js";

declare module "decimal.js" {
  interface Decimal {
    toCSV(): string;
    toCSVAmount(): string;
  }
}

Decimal.prototype.toCSV = function (this: Decimal) {
  return Number(this).toLocaleString();
};

Decimal.prototype.toCSVAmount = function (this: Decimal) {
  if (this.abs() < new Decimal(1)) {
    return this.toCSV();
  }

  return Number(this.toDecimalPlaces(2)).toLocaleString();
};
