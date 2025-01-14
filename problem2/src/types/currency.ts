export interface CurrencyRes {
  currency: string;
  price: number;
}

export type Currency = "USD" | "bNEO" | "BUSD" | "ETH" | "LUNA" | "IBCX" | "OKT";

export interface SelectCurrency {
  value: string;
  name: string;
}
