"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Wallet, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioStatsProps {
  stats: {
    totalInvested: number;
    totalValue: number;
    activeBets: number;
  };
  isLoading: boolean;
}

export function PortfolioStats({ stats, isLoading }: PortfolioStatsProps) {
  // Simple PnL calc
  const pnl = stats.totalValue - stats.totalInvested;
  const pnlPercent =
    stats.totalInvested > 0 ? (pnl / stats.totalInvested) * 100 : 0;

  if (isLoading)
    return <div className="h-32 bg-zinc-100 animate-pulse rounded-xl mb-8" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Value */}
      <Card className="p-6 border-zinc-200 bg-white shadow-sm flex items-center gap-4">
        <div className="p-3 bg-black rounded-lg text-white">
          <Wallet className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Portfolio Value
          </p>
          <p className="text-2xl font-mono font-bold text-zinc-900">
            ${stats.totalValue.toFixed(2)}
          </p>
        </div>
      </Card>

      {/* P/L */}
      <Card className="p-6 border-zinc-200 bg-white shadow-sm flex items-center gap-4">
        <div
          className={cn(
            "p-3 rounded-lg text-white",
            pnl >= 0 ? "bg-emerald-500" : "bg-red-500"
          )}
        >
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Unrealized P/L
          </p>
          <div className="flex items-baseline gap-2">
            <p
              className={cn(
                "text-2xl font-mono font-bold",
                pnl >= 0 ? "text-emerald-600" : "text-red-600"
              )}
            >
              {pnl >= 0 ? "+" : ""}
              {pnl.toFixed(2)}
            </p>
            <span
              className={cn(
                "text-xs font-bold",
                pnl >= 0 ? "text-emerald-600" : "text-red-600"
              )}
            >
              ({pnlPercent.toFixed(1)}%)
            </span>
          </div>
        </div>
      </Card>

      {/* Active Bets */}
      <Card className="p-6 border-zinc-200 bg-white shadow-sm flex items-center gap-4">
        <div className="p-3 bg-zinc-100 rounded-lg text-black">
          <Activity className="w-6 h-6" />
        </div>
        <div className="text-center">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Active Positions
          </p>
          <p className="text-2xl font-mono font-bold text-zinc-900">
            {stats.activeBets}
          </p>
        </div>
      </Card>
    </div>
  );
}
