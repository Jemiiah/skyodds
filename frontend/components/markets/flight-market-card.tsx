"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FlightMarketProps {
  id: string;
  flightNumber: string; // e.g. "UA 920"
  route: string; // e.g. "LHR -> IAD" (Matches your hook output)
  departureTime: string;
  marketProbability: number; // 0 to 100 (Price from contract)
  aiProbability: number; // 0 to 100 (From Python backend)
  volume?: string; // e.g., "$12,450" (Optional)
  status: string; // Contract status string
}

export function FlightMarketCard({
  id,
  flightNumber,
  route,
  departureTime,
  marketProbability,
  aiProbability,
  volume = "$0.00", // Default if data missing
  status,
}: FlightMarketProps) {
  // Extract airline code from flight number (e.g. "UA" from "UA 920")
  const airline = flightNumber.split(" ")[0] || "FL";

  // Parse Route (e.g. "LHR -> IAD")
  const [origin, destination] = route.includes("->")
    ? route.split("->").map((s) => s.trim())
    : [route, ""];

  // Calculate Edge
  const edge = aiProbability - marketProbability;
  const isProfitable = edge > 10;

  // Determine Status Color based on contract string
  const getStatusColor = (s: string) => {
    const lower = s.toLowerCase();
    if (lower.includes("delayed") || lower.includes("cancel"))
      return "text-red-600 bg-red-50 border-red-100";
    if (lower.includes("boarding") || lower.includes("en route"))
      return "text-amber-600 bg-amber-50 border-amber-100";
    return "text-zinc-500 bg-zinc-50"; // Default / On Time
  };

  return (
    <Card className="group relative bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Top Banner for High Edge Markets */}
      {isProfitable && (
        <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
      )}

      {/* --- HEADER --- */}
      <CardHeader className="pb-3 pt-5 px-5 flex flex-row items-start justify-between space-y-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {/* Airline Code (Auto-extracted) */}
            <div className="font-mono text-[10px] bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded border border-zinc-200">
              {airline}
            </div>
            {/* Flight Number */}
            <span className="text-lg font-bold text-zinc-900 tracking-tight">
              {flightNumber}
            </span>
          </div>

          {/* Route Display */}
          <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
            <span>{origin}</span>
            {destination && <ArrowRight className="w-3 h-3 text-zinc-300" />}
            <span>{destination}</span>
          </div>
        </div>

        {/* Status Badge */}
        <Badge
          variant="outline"
          className={cn(
            "font-normal border-zinc-200 whitespace-nowrap",
            getStatusColor(status)
          )}
        >
          {status}
        </Badge>
      </CardHeader>

      <CardContent className="px-5 pb-4">
        {/* --- PROBABILITY VISUALIZATION --- */}
        <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-100 mb-4">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span className="text-xs font-bold text-black uppercase tracking-wide">
                AI Confidence
              </span>
            </div>
            {isProfitable && (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                +{edge.toFixed(0)}% EDGE
              </span>
            )}
          </div>

          {/* The Bar Chart */}
          <div className="relative h-2.5 w-full bg-zinc-200 rounded-full overflow-hidden mb-2">
            {/* Market Price (Gray) */}
            <div
              className="absolute top-0 left-0 h-full bg-zinc-400 z-10 transition-all duration-500"
              style={{ width: `${marketProbability}%` }}
            />
            {/* AI Prediction (Black) */}
            <div
              className="absolute top-0 left-0 h-full bg-black z-20 opacity-90 border-r-2 border-white transition-all duration-500"
              style={{ width: `${aiProbability}%` }}
            />
          </div>

          {/* Legend Row */}
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase mt-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-black" />
              <span>AI: {aiProbability}%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-zinc-400" />
              <span>Mkt: {marketProbability}%</span>
            </div>
          </div>
        </div>

        {/* Metadata Row */}
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{departureTime}</span>
          </div>
          {/* Only show volume if it exists */}
          {volume && volume !== "$0.00" && (
            <div className="font-medium text-zinc-600">Vol: {volume}</div>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-5 py-3 border-t border-zinc-100 bg-zinc-50/50">
        <Link href={`/markets/${id}`} className="w-full">
          <Button
            className="w-full bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 shadow-sm font-medium transition-all group-hover:border-zinc-400"
            size="sm"
          >
            Trade Market
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
