"use client";

import { useAccount, useConnection, useReadContract } from "wagmi";
import { mockUsdcAbi } from "./generated";
import { formatUnits } from "viem";

// The MockUSDC address you provided earlier
const USDC_ADDRESS = "0xFAEC032f2E8c85Da9d04b06947a6BdCf02Ad7a71";

export function useUserBalance() {
  const { address } = useConnection();

  const {
    data: balance,
    isLoading,
    refetch,
  } = useReadContract({
    address: USDC_ADDRESS,
    abi: mockUsdcAbi,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
      refetchInterval: 5000, // Refresh every 5s to catch faucet/bet updates
    },
  });

  // Format: 6 decimals for USDC
  const formattedBalance = balance
    ? parseFloat(formatUnits(balance as bigint, 6)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";

  return { balance: formattedBalance, isLoading, refetch };
}
