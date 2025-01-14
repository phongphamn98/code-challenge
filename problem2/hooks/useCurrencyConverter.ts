"use client";

import { CurrencyConvertFormValues } from "@/src/constants/currency";
import { Currency, CurrencyRes } from "@/src/types/currency";
import { useCallback, useEffect, useState } from "react";

export const useCurrencyConverter = () => {
  const [convertedAmount, setConvertedAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [exchangeRates, setExchangeRates] = useState<Record<
    Currency,
    number
  > | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const calculateConvertedAmount = useCallback(
    async (values: CurrencyConvertFormValues) => {
      if (exchangeRates) {
        setIsCalculating(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const { source, target, amount } = values;
        const targetCurrency = target as Currency;
        const rate =
          source === "USD"
            ? exchangeRates[targetCurrency]
            : exchangeRates[targetCurrency] / exchangeRates[source as Currency];
        const result = amount * rate;
        setConvertedAmount(result.toFixed(2));
        setIsCalculating(false);
      }else {
        setError("Error fetching exchange rates. Please try again.");
      }
    },
    [exchangeRates]
  );

  const fetchExchangeRates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://interview.switcheo.com/prices.json"
      );
      const data: CurrencyRes[] = await response.json();
      //convert to exchange rates object
      const exchangeRates: Record<Currency, number> = data.reduce(
        (acc, { currency, price }) => {
          acc[currency as Currency] = price;
          return acc;
        },
        {} as Record<Currency, number>
      );
      setExchangeRates(exchangeRates);
    } catch (error) {
      setError("Error fetching exchange rates." + error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  return {
    convertedAmount,
    loading,
    error,
    isCalculating,
    calculateConvertedAmount,
  };
};
