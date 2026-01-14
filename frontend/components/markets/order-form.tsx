"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { usePlaceBet } from "@/hooks/useBetting";
import { useReadSkyOddsCalculateSharesForCost } from "@/hooks/generated";
import { parseUnits, formatUnits } from "viem";
import { useUserBalance } from "@/hooks/useUserBalance";

// --- UTILITY: DEBOUNCE HOOK ---
// This prevents spamming the RPC on every keystroke
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

interface OrderFormProps {
  market: {
    id: string; // Flight ID (Bytes32)
    label: string;
    price: number;
    outcomeIndex: number; // 1, 2, 3, 4
  };
  isResolved?: boolean;
}

export function OrderForm({ market, isResolved = false }: OrderFormProps) {
  const [isBuy, setIsBuy] = useState(true);
  const [outcome, setOutcome] = useState<"YES" | "NO">("YES");
  const [amount, setAmount] = useState<string>("");
  const { balance, isLoading } = useUserBalance();
  // Debounce the amount input (wait 500ms)
  const debouncedAmount = useDebounce(amount, 500);

  // Contract Logic: 0 = YES, 1 = NO
  const positionEnum = outcome === "YES" ? 0 : 1;

  // --- 1. CALL CONTRACT TO CALCULATE SHARES ---
  const { data: sharesData, isLoading: isCalculating } =
    useReadSkyOddsCalculateSharesForCost({
      args: [
        market.id as `0x${string}`,
        market.outcomeIndex,
        positionEnum,
        parseUnits(debouncedAmount || "0", 6), // USDC has 6 decimals
      ],
      query: {
        enabled: !!debouncedAmount && parseFloat(debouncedAmount) > 0,
      },
    });

  // --- 2. FORMAT RESULT ---
  // In prediction markets, 1 Share usually pays out 1 Unit (e.g. 1 USDC).
  // So "Potential Return" is equal to the Number of Shares.

  const calculatedShares = Number(sharesData) / 10000;

  const sharesDisplay =
    calculatedShares > 0 ? calculatedShares.toFixed(2) : "0.00";
  const potentialReturn = sharesDisplay; // 1 Share = $1 Payout

  // Prices for UI Display
  const yesPrice = market.price;
  const noPrice = parseFloat((100 - market.price).toFixed(2));

  // Hook Integration for Placing Bet
  const { handleBet, isPending } = usePlaceBet();

  const onConfirm = async () => {
    if (!amount) return;
    await handleBet(
      market.id as `0x${string}`,
      market.outcomeIndex,
      positionEnum,
      amount
    );
    setAmount("");
  };

  return (
    <Card className="bg-white border border-zinc-200 shadow-sm overflow-hidden py-0 ring-1 ring-black/5">
      {/* Tabs */}
      <div className="flex border-b border-zinc-100">
        <button
          onClick={() => setIsBuy(true)}
          className={cn(
            "flex-1 py-4 text-sm font-bold transition-all relative uppercase tracking-wider",
            isBuy
              ? "text-black"
              : "text-zinc-400 hover:text-black hover:bg-zinc-50/50"
          )}
        >
          Buy
          {isBuy && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
          )}
        </button>
        <button
          onClick={() => setIsBuy(false)}
          className={cn(
            "flex-1 py-4 text-sm font-bold transition-all relative uppercase tracking-wider",
            !isBuy
              ? "text-black"
              : "text-zinc-400 hover:text-black hover:bg-zinc-50/50"
          )}
        >
          Sell
          {!isBuy && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
          )}
        </button>
      </div>

      <div className="px-6 pb-6 space-y-8 mt-6">
        {/* Outcome Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setOutcome("YES")}
            className={cn(
              "py-2 px-4 border-2 transition-all flex flex-col items-center justify-center gap-1 group rounded-lg relative overflow-hidden",
              outcome === "YES"
                ? "bg-emerald-600 border-emerald-600 text-white shadow-md"
                : "bg-white border-zinc-200 text-zinc-500 hover:border-emerald-500 hover:text-emerald-600"
            )}
          >
            <span className="text-xs font-bold uppercase opacity-90 z-10">
              Yes
            </span>
            <span className="text-2xl font-mono font-bold tracking-tighter z-10">
              {yesPrice.toFixed(2)}¢
            </span>
            {outcome === "YES" && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            )}
          </button>

          <button
            onClick={() => setOutcome("NO")}
            className={cn(
              "py-2 px-4 border-2 transition-all flex flex-col items-center justify-center gap-1 group rounded-lg relative overflow-hidden",
              outcome === "NO"
                ? "bg-red-600 border-red-600 text-white shadow-md"
                : "bg-white border-zinc-200 text-zinc-500 hover:border-red-600 hover:text-red-600"
            )}
          >
            <span className="text-xs font-bold uppercase opacity-90 z-10">
              No
            </span>
            <span className="text-2xl font-mono font-bold tracking-tighter z-10">
              {noPrice.toFixed(2)}¢
            </span>
            {outcome === "NO" && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            )}
          </button>
        </div>

        {/* Amount Input */}
        <div className="space-y-6">
          <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
            <span>Enter Amount</span>
            <div className="flex items-center gap-1.5 text-black">
              <Wallet className="w-3 h-3" />
              {isLoading ? (
                <span className="animate-pulse text-zinc-400">...</span>
              ) : (
                <span className="font-mono">${balance}</span>
              )}
            </div>
          </div>

          <div className="relative flex items-center justify-center border-b border-zinc-200 pb-2">
            <span className="text-zinc-300 text-4xl font-light mr-2">$</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-transparent border-none text-right text-4xl font-extrabold text-black focus:ring-0 p-0 placeholder:text-zinc-100 font-mono tracking-tighter outline-none disabled:opacity-50"
              disabled={isResolved}
            />
          </div>

          <div className="flex justify-between gap-2">
            {["10", "50", "100", "Max"].map((val) => (
              <button
                key={val}
                onClick={() =>
                  val === "Max"
                    ? setAmount("2450")
                    : setAmount((prev) =>
                        (parseFloat(prev || "0") + parseFloat(val)).toString()
                      )
                }
                className="flex-1 py-2 text-[10px] font-bold text-zinc-600 border border-zinc-200 bg-white hover:bg-black hover:text-white hover:border-black transition-all uppercase tracking-wide rounded disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isResolved}
              >
                {val === "Max" ? "Max" : `+$${val}`}
              </button>
            ))}
          </div>
        </div>

        {/* Receipt */}
        {amount && (
          <div className="bg-zinc-50 p-4 border border-zinc-100 space-y-3 rounded-lg">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500 font-medium">Est. Shares</span>
              <span className="font-mono font-bold text-black flex items-center gap-2">
                {isCalculating ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  sharesDisplay
                )}
              </span>
            </div>
            <div className="w-full h-px bg-zinc-200" />
            <div className="flex justify-between items-baseline">
              <span className="text-base font-bold text-black capitalize">
                To Win 💵
              </span>
              <div className="text-right">
                <span className="block text-3xl font-mono font-bold text-green-600">
                  {isCalculating ? "..." : `$${potentialReturn}`}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          disabled={!amount || isPending || isCalculating || isResolved}
          onClick={onConfirm}
          className={cn(
            "w-full h-14 text-base font-bold shadow-none transition-all rounded-md active:scale-[0.99] text-white",
            outcome === "YES"
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-red-600 hover:bg-red-700"
          )}
        >
          {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {!isPending &&
            (isBuy ? (
              <ArrowUpRight className="w-4 h-4 mr-2" />
            ) : (
              <ArrowDownLeft className="w-4 h-4 mr-2" />
            ))}
          {isPending ? "Confirming..." : isResolved ? "Market Resolved" : `${isBuy ? "BUY" : "SELL"} ${outcome}`}
        </Button>
      </div>
    </Card>
  );
}
