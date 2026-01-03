"use client";

import React from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { PortfolioStats } from "@/components/portfolio/portfolio-stats";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function PortfolioPage() {
  const { positions, stats, isLoading } = usePortfolio();

  return (
    <div className="max-w-[1200px] mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
          My Portfolio
        </h1>
        <p className="text-zinc-500">
          Track your active positions and performance.
        </p>
      </div>

      {/* Stats Cards */}
      <PortfolioStats stats={stats} isLoading={isLoading} />

      {/* Positions Table */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50 flex justify-between items-center">
          <h3 className="font-bold text-zinc-900">Active Positions</h3>
          <span className="text-xs font-mono text-zinc-500">
            {positions.length} Records
          </span>
        </div>

        {isLoading ? (
          <div className="p-12 flex justify-center text-zinc-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading blockchain
            data...
          </div>
        ) : positions.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-zinc-500 mb-4">You have no active positions.</p>
            <Link href="/markets">
              <Button>Explore Markets</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white text-zinc-500 font-bold uppercase text-[10px] tracking-wider border-b border-zinc-100">
                <tr>
                  <th className="px-6 py-3">Flight</th>
                  <th className="px-6 py-3">Outcome Prediction</th>
                  <th className="px-6 py-3">Side</th>
                  <th className="px-6 py-3 text-right">Shares Held</th>
                  <th className="px-6 py-3 text-right">Est. Value</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {positions.map((pos: any, i: number) => (
                  <tr key={i} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-zinc-900">
                      {pos.flightNumber}
                      <span className="block text-[10px] font-normal text-zinc-400">
                        {pos.route}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-700">
                      {pos.outcomeLabel}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={cn(
                          "font-bold border-0",
                          pos.side === "YES"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        )}
                      >
                        {pos.side}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right font-mono">
                      {pos.shares.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-zinc-900">
                      ${pos.value.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        variant="outline"
                        className="text-zinc-500 bg-zinc-50"
                      >
                        {pos.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/markets/${pos.marketId}`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <ExternalLink className="w-4 h-4 text-zinc-400 hover:text-black" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
