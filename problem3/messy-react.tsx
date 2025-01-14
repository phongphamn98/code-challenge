/* Issues and Anti-Patterns

1. Missing imports
   + BoxProps, React, useMemo, useWalletBalances, usePrices, WalletRow
2. Unused Variables
   Destructuring `children` from `props` is unnecessary since it is not used within the component.
3. Any Type
    + The blockchain parameter in the getPriority function is typed as any, which should be avoided in TypeScript.
4. Hardcoded Values
    + The getPriority function has hardcoded values for the priority of each blockchain, which should be avoided.
5. Missing type definitions
    + The WalletBalance is missing a type definition for the blockchain property.
6. lhsPriority is not defined, while balancePriority is defined but not used.
7. The formattedBalances array is not used.
8. Unnecessary dependencies in the useMemo hook
    + The sortedBalances array used in the useMemo hook, but the prices variable is not used in the hook.
9. Not sure, but the rows component should use formattedBalances array instead of sortedBalances.  
10. Should bring the getPriority func out of the component 
11. The key of the WalletRow component should be unique.
12. the filter function can be simplified by short-circuiting the condition.
*/

import React, { useMemo } from "react";
import { BoxProps } from "@mui/material";
import { useWalletBalances, usePrices } from "./hooks";
import { WalletRow } from "./WalletRow";
import classes from "./WalletPage.module.css";

type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface WalletBalance {
	currency: string;
	amount: number;
	blockchain: Blockchain;
}
interface FormattedWalletBalance {
	currency: string;
	amount: number;
	formatted: string;
}

interface Props extends BoxProps {}
const priorityMap: Record<Blockchain, number> = {
	Osmosis: 100,
	Ethereum: 50,
	Arbitrum: 30,
	Zilliqa: 20,
	Neo: 20,
};

export const WalletPage: React.FC<Props> = (props: Props) => {
	const { ...rest } = props;
	const balances = useWalletBalances();
	const prices = usePrices();

	const getPriority = (blockchain: Blockchain): number => {
		return priorityMap[blockchain] ?? -99;
	};

	const sortedBalances = useMemo(() => {
		return balances
			.filter((balance: WalletBalance) => {
				const balancePriority = getPriority(balance.blockchain);
				return balancePriority > -99 && balance.amount > 0;
			})
			.sort((lhs: WalletBalance, rhs: WalletBalance) => {
				const leftPriority = getPriority(lhs.blockchain);
				const rightPriority = getPriority(rhs.blockchain);
				return rightPriority - leftPriority;
			});
	}, [balances]);

	const formattedBalances = useMemo(() => {
		sortedBalances.map((balance: WalletBalance) => {
			return {
				...balance,
				formatted: balance.amount.toFixed(),
			};
		});
	}, [sortedBalances]);

	const rows = formattedBalances.map(
		(balance: FormattedWalletBalance, index: number) => {
			const usdValue = prices[balance.currency] * balance.amount;
			return (
				<WalletRow
					className={classes.row}
					key={index}
					amount={balance.amount}
					usdValue={usdValue}
					formattedAmount={balance.formatted}
				/>
			);
		}
	);

	return <div {...rest}>{rows}</div>;
};
