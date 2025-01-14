import { z } from "zod";
import { SelectCurrency } from "../types/currency";

export const DEFAULT_CURRENCIES: SelectCurrency[] = [
  {
    value: "USD",
    name: "USD",
  },
  {
    value: "bNEO",
    name: "bNEO",
  },
  {
    value: "BUSD",
    name: "BUSD",
  },
  {
    value: "ETH",
    name: "ETH",
  },
  {
    value: "LUNA",
    name: "LUNA",
  },
  {
    value: "IBCX",
    name: "IBCX",
  },
  {
    value: "OKT",
    name: "OKT",
  },
];

const kAmountSchema = z
  .number()
  .min(0, { message: "Amount must be greater than 0" });

const kSelectSchema = z.string().nonempty();

export const kFormSchemaCurrencyConvert = z.object({
  amount: kAmountSchema,
  source: kSelectSchema,
  target: kSelectSchema,
});

export type CurrencyConvertFormValues = z.infer<
  typeof kFormSchemaCurrencyConvert
>;
