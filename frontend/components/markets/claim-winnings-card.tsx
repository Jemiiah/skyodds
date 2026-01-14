"use client";

import { useEffect } from "react";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { formatUnits } from "viem";
import skyOddsAbi from "../../app/abis/SkyOdds.json";
import { skyOddsAddress } from "@/hooks/generated";
import { useAccount } from "@particle-network/connectkit";

interface ClaimWinningsCardProps {
  marketId: string;
  tokenDecimals?: number; // Default to 6 for USDC
  isResolved?: boolean;
}

export function ClaimWinningsCard({
  marketId,
  tokenDecimals = 6,
  isResolved = true,
}: ClaimWinningsCardProps) {
  const { address } = useAccount();

  // 1. Read 'calculateWinnings' directly from the contract
  // Returns tuple: [payout, fee, canClaim]
  const { data: winningsData, isLoading: isLoadingData } = useReadContract({
    address: skyOddsAddress,
    abi: skyOddsAbi,
    functionName: "calculateWinnings",
    args: address ? [marketId, address] : undefined,
    query: {
      enabled: !!address && isResolved,
      // Refetch slightly more often to catch state changes if needed
      refetchInterval: 10000,
    },
  });

  // 2. Destructure Data
  const [payoutBN, feeBN, canClaim] = (winningsData as [
    bigint,
    bigint,
    boolean,
  ]) || [0n, 0n, false];

  // 3. Format Values for Display
  const winningsAmount = Number(formatUnits(payoutBN, tokenDecimals));
  const feeAmount = Number(formatUnits(feeBN, tokenDecimals));

  // 4. Claim Hook
  const {
    writeContract: claim,
    data: hash,
    isPending: isClaiming,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleClaim = () => {
    const toastId = toast.loading("Processing claim...");

    claim(
      {
        address: skyOddsAddress,
        abi: skyOddsAbi,
        functionName: "claimWinnings",
        args: [marketId],
      },
      {
        onSuccess: () => {
          toast.dismiss(toastId);
          toast.info("Transaction Sent", {
            description: "Waiting for blockchain confirmation...",
          });
        },
        onError: (err) => {
          toast.dismiss(toastId);
          toast.error("Claim Failed", { description: err.message });
        },
      }
    );
  };

  // 5. Success Notification
  useEffect(() => {
    if (isSuccess) {
      toast.success("Winnings Claimed!", {
        description: `Successfully claimed ${winningsAmount.toFixed(2)} USDC.`,
      });
    }
  }, [isSuccess, winningsAmount]);

  // --- Render Conditions ---
  if (isLoadingData) return null;
  if (!isResolved) return null;

  // Logic: Show card if they CAN claim, OR if they JUST claimed successfully (to show the success UI)
  const shouldShow = (canClaim && winningsAmount > 0) || isSuccess;

  if (!shouldShow) return null;

  return (
    <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30 overflow-hidden relative mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Trophy className="w-24 h-24 text-green-400" />
      </div>

      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              {isSuccess ? "Payout Complete" : "You Won!"}
            </h3>
            <p className="text-sm text-green-200/70">
              {isSuccess
                ? "Funds have been transferred to your wallet."
                : "Your prediction was correct. Claim your earnings now."}
            </p>

            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-3xl font-bold text-white">
                {winningsAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                <span className="text-sm font-normal text-white/50 ml-1">
                  USDC
                </span>
              </p>

              {/* Optional: Show Fee if relevant */}
              {feeAmount > 0 && (
                <span className="text-xs text-green-500/50">
                  (after {feeAmount.toFixed(2)} fee)
                </span>
              )}
            </div>
          </div>

          <Button
            onClick={handleClaim}
            disabled={!canClaim || isClaiming || isConfirming || isSuccess}
            className={`w-full md:w-auto font-semibold h-12 px-6 transition-all shadow-lg ${
              isSuccess
                ? "bg-green-900/50 text-green-400 border border-green-500/50 cursor-default"
                : "bg-green-500 hover:bg-green-600 hover:scale-105 text-black shadow-green-900/20"
            }`}
          >
            {isClaiming || isConfirming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Claimed
              </>
            ) : (
              <>
                Claim Winnings
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
