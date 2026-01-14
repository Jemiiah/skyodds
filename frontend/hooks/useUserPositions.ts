"use client";

import { useAccount, useConnection, useReadContracts } from "wagmi";
import { skyOddsAbi, skyOddsAddress } from "./generated";
import { formatUnits } from "viem";

export function useUserPositions(flightId: string) {
  const { address } = useConnection();

  // We need to check positions for all 4 outcomes (1, 2, 3, 4)
  // Outcomes: 1=OnTime, 2=Delayed30, 3=Delayed120, 4=Cancelled
  const outcomes = [1, 2, 3, 4];

  const contracts = outcomes.map((outcomeIndex) => ({
    address: skyOddsAddress,
    abi: skyOddsAbi,
    functionName: "getUserPosition",
    args: [flightId, address, outcomeIndex],
  }));

  // Append hasClaimed check as the last call
  const allContracts = [
    ...contracts,
    {
      address: skyOddsAddress,
      abi: skyOddsAbi,
      functionName: "hasClaimed",
      args: [flightId, address],
    },
  ] as any[];

  const {
    data: results,
    isLoading,
    refetch,
  } = useReadContracts({
    contracts: allContracts,
    query: {
      enabled: !!address && !!flightId,
      refetchInterval: 5000, // Auto-refresh every 5s to catch updates after betting
    },
  });

  const positions = [];
  let hasClaimed = false;

  if (results && address) {
    // Process Position Data (First 4 results)
    for (let i = 0; i < 4; i++) {
      const result = results[i];
      if (result.status === "success") {
        const [yesShares, noShares] = result.result as [bigint, bigint, bigint];

        console.log(yesShares, "yes shares");

        // Only add if user actually has shares
        if (yesShares > 0n) {
          positions.push({
            outcomeIndex: i + 1,
            side: "YES",
            shares: (Number(yesShares) / 10000).toFixed(2),
          });
        }
        if (noShares > 0n) {
          positions.push({
            outcomeIndex: i + 1,
            side: "NO",
            shares: (Number(noShares) / 10000).toFixed(2),
          });
        }
      }
    }

    // Process Claim Status (Last result)
    const claimResult = results[4];
    if (claimResult?.status === "success") {
      hasClaimed = claimResult.result as boolean;
    }
  }

  return { positions, hasClaimed, isLoading, refetch };
}
