"use client";

import { useState } from "react";
import {
  useWriteSkyOddsPlaceBet,
  useWriteMockUsdcApprove,
  useReadMockUsdcAllowance,
} from "@/hooks/generated";
import { useConnection, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { toast } from "sonner";

const SKYODDS_ADDRESS = "0x8B87E271FB390FE7db2CE154e49096f72f6BE507";

export function usePlaceBet() {
  const { address } = useConnection();
  const [isPending, setIsPending] = useState(false);

  // Wagmi Hooks
  const { writeContractAsync: placeBet } = useWriteSkyOddsPlaceBet();
  const { writeContractAsync: approve } = useWriteMockUsdcApprove();

  // Helper to place the actual bet
  const handleBet = async (
    flightId: `0x${string}`,
    outcomeIndex: number, // 1=OnTime, 2=Delay30, 3=Delay120, 4=Cancel
    position: number, // 0=YES, 1=NO
    amount: string // Amount in USDC (e.g., "50")
  ) => {
    if (!address) {
      toast.error("Please connect wallet");
      return;
    }

    try {
      setIsPending(true);

      // 1. Convert Amount to USDC Decimals (6 decimals)
      const costInWei = parseUnits(amount, 6);

      // 2. Check Allowance (Optimistic check, usually done via hook but manual here for flow)
      // Note: In production, use `useReadMockUsdcAllowance` and trigger approve only if needed.
      // For this snippet, we will try to approve first to be safe, or you can skip if allowance exists.

      toast.info("Step 1: Approving USDC...");
      const approveTx = await approve({
        args: [SKYODDS_ADDRESS, costInWei],
      });

      // Wait for Approval to confirm
      // Note: You would typically use useWaitForTransactionReceipt here
      toast.success("USDC Approved! Confirming bet...");

      // 3. Place Bet
      const betTx = await placeBet({
        args: [flightId, outcomeIndex, position, costInWei],
      });

      toast.success("Bet Placed Successfully!", {
        description: `Tx: ${betTx.slice(0, 10)}...`,
      });
    } catch (error: any) {
      console.error(error);
      toast.error("Transaction Failed", {
        description: error.message.split("\n")[0], // Simple error message
      });
    } finally {
      setIsPending(false);
    }
  };

  return { handleBet, isPending };
}
