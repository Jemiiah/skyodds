"use client";
import { useAccount } from "@particle-network/connectkit";
import { mockUsdcAbi, mockUsdcAddress } from "./generated";
import { formatUnits } from "viem";
import { useReadContract } from "wagmi";

export function useUserBalance() {
  const { address, isConnected } = useAccount();

  const {
    data: balance,
    isLoading,
    refetch,
    isRefetching,
  } = useReadContract({
    address: mockUsdcAddress,
    abi: mockUsdcAbi,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
      refetchInterval: 60000,
    },
  });

  const formattedBalance = balance
    ? parseFloat(formatUnits(balance as bigint, 6)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";

  return { balance: formattedBalance, isLoading, refetch, isRefetching };
}
