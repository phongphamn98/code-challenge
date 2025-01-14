"use client";

import React from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyConvertFormValues, DEFAULT_CURRENCIES } from "@/src/constants/currency";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<CurrencyConvertFormValues>;
  name: "source" | "target";
};

export default function SelectCurrency({ form, name }: Props) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {DEFAULT_CURRENCIES.map(({ value, name }) => {
                return (
                  <SelectItem key={value} value={value}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${value}.svg`}
                        alt={name}
                        width={30}
                        height={30}
                      />
                      <div className="font-semibold">{name}</div>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
