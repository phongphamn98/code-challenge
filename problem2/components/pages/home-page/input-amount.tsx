"use client";

import { Input } from "@/components/ui/input";

type Props = {
  amount: number;
  setAmount: (amount: number) => void;
};

export default function InputAmount({ amount, setAmount }: Props) {
  return (
    <Input
      value={amount}
      onChange={(e) => setAmount(Number(e.target.value))}
      type="number"
      placeholder="Amount"
      className="h-full"
    />
  );
}
