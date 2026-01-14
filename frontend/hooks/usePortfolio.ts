"use client";

import { useAccount, useReadContracts } from "wagmi";
import { skyOddsAbi, skyOddsAddress } from "./generated";
import { formatUnits } from "viem";
import { useAllMarkets } from "./useMarketData";

export function usePortfolio() {
  const { address } = useAccount();
  const { markets, isLoading: isMarketsLoading } = useAllMarkets();

  // 1. Prepare Multicall: Check 4 outcomes for EVERY flight
  // This is heavy but necessary without a Subgraph
  const contracts = markets.flatMap((market) =>
    [1, 2, 3, 4].map((outcomeIndex) => ({
      address: skyOddsAddress,
      abi: skyOddsAbi,
      functionName: "getUserPosition",
      args: [market.id, address, outcomeIndex],
    }))
  ) as any[];

  const { data: results, isLoading: isPositionsLoading } = useReadContracts({
    contracts,
    query: {
      enabled: !!address && markets.length > 0,
      refetchInterval: 10_000,
    },
  });

  // 2. Process Data
  const positions: any = [];
  let totalInvested = 0;
  let totalPotentialValue = 0; // Assuming 1 Share = $1 Payout

  if (results && markets.length > 0) {
    // Each market has 4 calls. We iterate markets, then inside iterate the 4 results.
    markets.forEach((market, marketIdx) => {
      for (let i = 0; i < 4; i++) {
        const resultIdx = marketIdx * 4 + i;
        const result = results[resultIdx];

        if (result.status === "success") {
          const [yesSharesBN, noSharesBN, costBN] = result.result as [
            bigint,
            bigint,
            bigint,
          ];

          const processPosition = (bn: bigint, side: "YES" | "NO") => {
            if (bn > 0n) {
              //   const rawShares = parseFloat(formatUnits(bn, 18));
              const shares = Number(bn) / 10000; // Scaling Factor

              // Add to list
              positions.push({
                marketId: market.id,
                flightNumber: market.flightNumber,
                route: market.route,
                outcomeIndex: i + 1, // 1-based index
                outcomeLabel: getOutcomeLabel(i + 1),
                side,
                shares,
                value: shares, // 1 Share ~= $1
                status: market.status, // "Unresolved", "On Time", etc.
              });

              totalPotentialValue += shares;
            }
          };

          processPosition(yesSharesBN, "YES");
          processPosition(noSharesBN, "NO");

          // Cost is returned per outcome bucket.
          // Note: totalCost returned by contract is 6 decimals (USDC)
          const cost = parseFloat(formatUnits(costBN, 6));
          totalInvested += cost;
        }
      }
    });
  }

  return {
    positions,
    stats: {
      totalInvested,
      totalValue: totalPotentialValue,
      activeBets: positions.length,
    },
    isLoading: isMarketsLoading || isPositionsLoading,
  };
}

function getOutcomeLabel(index: number) {
  const labels = ["", "On Time", "Delayed > 30m", "Delayed > 2h", "Cancelled"];
  return labels[index] || "Unknown";
}
