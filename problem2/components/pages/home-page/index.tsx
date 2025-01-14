"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrencyConverter } from "@/hooks/useCurrencyConverter";
import {
  CurrencyConvertFormValues,
  kFormSchemaCurrencyConvert,
} from "@/src/constants/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import SelectCurrency from "./select-currency";

export default function CurrencyConverter() {
  const {
    convertedAmount,
    isCalculating,
    loading,
    error,
    calculateConvertedAmount,
  } = useCurrencyConverter();

  const form = useForm<CurrencyConvertFormValues>({
    resolver: zodResolver(kFormSchemaCurrencyConvert),
    defaultValues: {
      amount: 1,
      source: "USD",
      target: "bNEO",
    },
  });

  function onSubmit(values: CurrencyConvertFormValues) {
    calculateConvertedAmount(values);
  }

  return (
    <div className="flex flex-col items-center justify-center  bg-background h-2/3 relative bg-gradient-to-l from-blue-800 to-blue-700 pt-[96px]">
      <div className="absolute z-10 top-[96px] left-1/2 -translate-x-1/2  h-full container mx-auto flex flex-col justify-center gap-12 rounded-3xl bg-white p-6 shadow-2xl md:p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-1/2 mx-auto"
          >
            <h1 className="text-4xl font-semibold text-center">
              Currency Converter
            </h1>
            {error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : (
              <div className=" flex flex-col gap-4">
                <div className="items-center grid grid-cols-2 gap-4">
                  <div className="col-span-1 flex items-center h-full gap-4">
                    <Label htmlFor="from">From</Label>
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem className="flex-1 h-full">
                          <FormControl>
                            <Input
                              disabled={loading}
                              type="number"
                              placeholder="Amount"
                              className="w-full h-full"
                              id="from"
                              {...field}
                              onChange={(value) =>
                                field.onChange(value.target.valueAsNumber)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-1">
                    <SelectCurrency form={form} name="source" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1 flex items-center justify-between">
                    <Label htmlFor="to">To</Label>
                    <div className="text-2xl font-bold">{convertedAmount}</div>
                  </div>
                  <div className="col-span-1">
                    <SelectCurrency form={form} name="target" />
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-center">
              <Button
                disabled={loading || isCalculating}
                type="submit"
                className="w-fit px-8 py-2 "
              >
                Convert{" "}
                {isCalculating && <Loader className="ml-2 animate-spin" />}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="absolute bottom-0 z-auto h-[200px] w-full overflow-hidden before:absolute before:bottom-[-100px] before:left-[-200px] before:right-[-200px] before:top-0 before:rounded-[100%] before:bg-white"></div>
    </div>
  );
}
