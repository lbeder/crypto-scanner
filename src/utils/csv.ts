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
  const abs = this.abs();

  if (!abs.isZero() && abs.lessThan(new Decimal(1))) {
    if (abs.lessThan(new Decimal(0.0001))) {
      if (this.greaterThan(new Decimal(0))) {
        return "<0.0001";
      }

      return ">-0.0001";
    }

    return this.toDecimalPlaces(4).toString();
  }

  return Number(this.toDecimalPlaces(2)).toLocaleString();
};
