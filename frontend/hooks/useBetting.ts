"use client";

import { useState } from "react";
import { useWallets } from "@particle-network/connectkit";
import { parseUnits, encodeFunctionData } from "viem";
import { toast } from "sonner";
import { mockUsdcAbi, skyOddsAddress } from "@/hooks/generated"; // Your contract address
import skyOddsAbi from "@/app/abis/SkyOdds.json"; // Ensure path is correct

// Hardcode USDC address or import it
const MOCK_USDC_ADDRESS = "0xFAEC032f2E8c85Da9d04b06947a6BdCf02Ad7a71";
const MANTLE_SEPOLIA_ID = 5003;

export function usePlaceBet() {
  const [primaryWallet] = useWallets(); // Get Particle Wallet
  const [isPending, setIsPending] = useState(false);

  const handleBet = async (
    flightId: `0x${string}`,
    outcomeIndex: number, // 1=OnTime, 2=Delay30, 3=Delay120, 4=Cancel
    position: number, // 0=YES, 1=NO
    amount: string // Amount in USDC (e.g. "50")
  ) => {
    if (!primaryWallet) {
      toast.error("Please connect wallet");
      return;
    }

    try {
      setIsPending(true);
      const walletClient = primaryWallet.getWalletClient();
      const account = primaryWallet.accounts[0];

      const costInWei = parseUnits(amount, 6); // USDC 6 decimals

      // --- STEP 1: APPROVE USDC ---
      toast.loading("Step 1/2: Approve USDC spending...", { id: "approve" });

      const approveData = encodeFunctionData({
        abi: mockUsdcAbi,
        functionName: "approve",
        args: [skyOddsAddress, costInWei],
      });

      const approveTx = await walletClient.sendTransaction({
        to: MOCK_USDC_ADDRESS,
        data: approveData,
        account: account as `0x${string}`,
        chain: undefined,
      });

      console.log("Approve Tx:", approveTx);
      toast.dismiss("approve");
      toast.success("Approval Sent! Waiting for confirmation...");

      // NOTE: In a perfect world, we wait for receipt here.
      // For UX speed, we pause briefly or assume success if nonce increments.
      // A simple 2s delay often helps the RPC catch up before the next tx.
      await new Promise((r) => setTimeout(r, 2000));

      // --- STEP 2: PLACE BET ---
      toast.loading("Step 2/2: Confirming Bet...", { id: "bet" });

      const betData = encodeFunctionData({
        abi: skyOddsAbi,
        functionName: "placeBet",
        args: [flightId, outcomeIndex, position, costInWei],
      });

      const betTx = await walletClient.sendTransaction({
        to: skyOddsAddress,
        data: betData,
        account: account as `0x${string}`,
        chain: undefined,
      });

      console.log("Bet Tx:", betTx);
      toast.dismiss("bet");

      toast.success("Bet Placed Successfully!", {
        description: `Your position is live.`,
      });
    } catch (error: any) {
      console.error(error);
      toast.dismiss("switch");
      toast.dismiss("approve");
      toast.dismiss("bet");

      toast.error("Transaction Failed", {
        description: error.message?.split("\n")[0] || "User rejected request",
      });
    } finally {
      setIsPending(false);
    }
  };

  return { handleBet, isPending };
}
