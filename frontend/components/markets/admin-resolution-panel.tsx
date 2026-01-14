"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import skyOddsAbi from "../../app/abis/SkyOdds.json";
import { skyOddsAddress } from "@/hooks/generated";

// Replace with your actual admin wallet address
const ADMIN_ADDRESS = "0xB2914810724FE2Fb871960eB200Dea427854b1C7";

interface AdminResolutionPanelProps {
  marketId: string;
  departureTimestamp: number | bigint; // Accepts BigInt (e.g. 1768340825n)
  isResolved: boolean;
}

export function AdminResolutionPanel({
  marketId,
  departureTimestamp,
  isResolved,
}: AdminResolutionPanelProps) {
  const { address } = useAccount();
  const [canResolve, setCanResolve] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  const {
    writeContract: resolveMarket,
    data: hash,
    isPending,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Market Resolved", {
        description: "Winnings are now claimable by users.",
      });
      setTimeout(() => window.location.reload(), 1500);
    }
  }, [isSuccess]);

  // --- TIME LOGIC ---
  useEffect(() => {
    const checkTime = () => {
      // 1. Get Current Time in SECONDS (Date.now() is ms)
      const now = Math.floor(Date.now() / 1000);

      // 2. Safely convert Blockchain BigInt to Number
      // e.g., 1768340825n -> 1768340825
      const departureTimeSeconds = Number(departureTimestamp);

      // 3. Calculate Unlock Time (1 Hour after departure)
      const unlockTime = departureTimeSeconds + 3600;

      if (now >= unlockTime) {
        setCanResolve(true);
        setTimeRemaining("READY");
      } else {
        setCanResolve(false);
        const diff = unlockTime - now;

        // Calculate days, hours, minutes
        const days = Math.floor(diff / 86400);
        const hours = Math.floor((diff % 86400) / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;

        let timeString = "";
        if (days > 0) timeString += `${days}d `;
        if (hours > 0) timeString += `${hours}h `;
        timeString += `${minutes}m ${seconds}s`;

        setTimeRemaining(`UNLOCK IN ${timeString.trim()}`);
      }
    };

    checkTime();
    const timer = setInterval(checkTime, 1000); // Update every second for smooth countdown
    return () => clearInterval(timer);
  }, [departureTimestamp]);

  if (!address || address.toLowerCase() !== ADMIN_ADDRESS.toLowerCase()) {
    return null;
  }

  if (isResolved) return null;

  const handleResolve = (outcomeIndex: number) => {
    const toastId = toast.loading("Confirming resolution...");

    resolveMarket(
      {
        address: skyOddsAddress,
        abi: skyOddsAbi,
        functionName: "resolveMarket",
        args: [marketId as `0x${string}`, outcomeIndex],
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
          toast.error("Error", {
            description: err.message.split("\n")[0],
          });
        },
      }
    );
  };

  return (
    <Card className="border-2 border-dashed border-zinc-200 bg-zinc-50/50 shadow-none mt-12 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <CardHeader className="pb-3 border-b border-zinc-200/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black rounded-md text-white">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold text-zinc-900 uppercase tracking-widest">
                Admin Console
              </CardTitle>
              <p className="text-[10px] text-zinc-500 font-medium">
                Settlement Authority
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-white border-zinc-300 text-zinc-900 font-mono text-[10px] tracking-wider py-1"
          >
            STATUS: {timeRemaining}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4">
          <p className="text-xs text-zinc-500 font-medium leading-relaxed">
            Select the final verified outcome from FlightAware. <br />
            <span className="text-zinc-900 font-bold">Warning:</span> This will
            trigger payouts and cannot be reversed.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 1. ON TIME */}
            <Button
              variant="outline"
              className="h-12 border-zinc-200 hover:border-black hover:bg-zinc-50 text-zinc-700 hover:text-black font-bold transition-all"
              disabled={!canResolve || isPending || isConfirming}
              onClick={() => handleResolve(1)}
            >
              On Time
            </Button>

            {/* 2. DELAYED > 30 */}
            <Button
              variant="outline"
              className="h-12 border-zinc-200 hover:border-black hover:bg-zinc-50 text-zinc-700 hover:text-black font-bold transition-all"
              disabled={!canResolve || isPending || isConfirming}
              onClick={() => handleResolve(2)}
            >
              Delay {">"} 30m
            </Button>

            {/* 3. DELAYED > 120 */}
            <Button
              variant="outline"
              className="h-12 border-zinc-200 hover:border-black hover:bg-zinc-50 text-zinc-700 hover:text-black font-bold transition-all"
              disabled={!canResolve || isPending || isConfirming}
              onClick={() => handleResolve(3)}
            >
              Delay {">"} 2h
            </Button>

            {/* 4. CANCELLED */}
            <Button
              variant="outline"
              className="h-12 border-zinc-200 hover:border-black hover:bg-zinc-50 text-zinc-700 hover:text-black font-bold transition-all"
              disabled={!canResolve || isPending || isConfirming}
              onClick={() => handleResolve(4)}
            >
              Cancelled
            </Button>
          </div>

          {(isPending || isConfirming) && (
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-zinc-900 bg-zinc-100 p-3 rounded border border-zinc-200 animate-pulse">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Finalizing Settlement on Blockchain...</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
