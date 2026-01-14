// "use client";

// import React from "react";
// import Link from "next/link";
// import { ArrowRight, Clock, Sparkles } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// interface FlightMarketProps {
//   id: string;
//   flightNumber: string; // e.g. "UA 920"
//   route: string; // e.g. "LHR -> IAD" (Matches your hook output)
//   departureTime: string;
//   marketProbability: number; // 0 to 100 (Price from contract)
//   aiProbability: number; // 0 to 100 (From Python backend)
//   volume?: string; // e.g., "$12,450" (Optional)
//   status: string; // Contract status string
// }

// export function FlightMarketCard({
//   id,
//   flightNumber,
//   route,
//   departureTime,
//   marketProbability,
//   aiProbability,
//   volume = "$0.00", // Default if data missing
//   status,
// }: FlightMarketProps) {
//   // Extract airline code from flight number (e.g. "UA" from "UA 920")
//   const airline = flightNumber.split(" ")[0] || "FL";

//   // Parse Route (e.g. "LHR -> IAD")
//   const [origin, destination] = route.includes("->")
//     ? route.split("->").map((s) => s.trim())
//     : [route, ""];

//   // Calculate Edge
//   const edge = aiProbability - marketProbability;
//   const isProfitable = edge > 10;

//   // Determine Status Color based on contract string
//   const getStatusColor = (s: string) => {
//     const lower = s.toLowerCase();
//     if (lower.includes("delayed") || lower.includes("cancel"))
//       return "text-red-600 bg-red-50 border-red-100";
//     if (lower.includes("boarding") || lower.includes("en route"))
//       return "text-amber-600 bg-amber-50 border-amber-100";
//     if (lower.includes("resolved") || lower.includes("ended"))
//       return "text-zinc-400 bg-zinc-50 border-zinc-200";
//     return "text-zinc-500 bg-zinc-50"; // Default / On Time
//   };

//   const isResolved = (status.toLowerCase().includes("resolved") && !status.toLowerCase().includes("unresolved")) || status.toLowerCase().includes("ended");

//   return (
//     <Card className={cn("group relative bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden", isResolved && "opacity-75 grayscale bg-zinc-50")}>
//       {/* Top Banner for High Edge Markets */}
//       {isProfitable && (
//         <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
//       )}

//       {/* --- HEADER --- */}
//       <CardHeader className="pb-3 pt-5 px-5 flex flex-row items-start justify-between space-y-0">
//         <div>
//           <div className="flex items-center gap-2 mb-1">
//             {/* Airline Code (Auto-extracted) */}
//             <div className="font-mono text-[10px] bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded border border-zinc-200">
//               {airline}
//             </div>
//             {/* Flight Number */}
//             <span className="text-lg font-bold text-zinc-900 tracking-tight">
//               {flightNumber}
//             </span>
//           </div>

//           {/* Route Display */}
//           <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
//             <span>{origin}</span>
//             {destination && <ArrowRight className="w-3 h-3 text-zinc-300" />}
//             <span>{destination}</span>
//           </div>
//         </div>

//         {/* Status Badge */}
//         <Badge
//           variant="outline"
//           className={cn(
//             "font-normal border-zinc-200 whitespace-nowrap",
//             getStatusColor(status)
//           )}
//         >
//           {status}
//         </Badge>
//       </CardHeader>

//       <CardContent className="px-5 pb-4">
//         {/* --- PROBABILITY VISUALIZATION --- */}
//         <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-100 mb-4">
//           {/* Header Row */}
//           <div className="flex items-center justify-between mb-3">
//             <div className="flex items-center gap-1.5">
//               <Sparkles className="w-3.5 h-3.5 text-black" />
//               <span className="text-xs font-bold text-black uppercase tracking-wide">
//                 AI Confidence
//               </span>
//             </div>
//             {isProfitable && (
//               <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
//                 +{edge.toFixed(0)}% EDGE
//               </span>
//             )}
//           </div>

//           {/* The Bar Chart */}
//           <div className="relative h-2.5 w-full bg-zinc-200 rounded-full overflow-hidden mb-2">
//             {/* Market Price (Gray) */}
//             <div
//               className="absolute top-0 left-0 h-full bg-zinc-400 z-10 transition-all duration-500"
//               style={{ width: `${marketProbability}%` }}
//             />
//             {/* AI Prediction (Black) */}
//             <div
//               className="absolute top-0 left-0 h-full bg-black z-20 opacity-90 border-r-2 border-white transition-all duration-500"
//               style={{ width: `${aiProbability}%` }}
//             />
//           </div>

//           {/* Legend Row */}
//           <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase mt-2">
//             <div className="flex items-center gap-1">
//               <div className="w-2 h-2 rounded-full bg-black" />
//               <span>AI: {aiProbability}%</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <div className="w-2 h-2 rounded-full bg-zinc-400" />
//               <span>Mkt: {marketProbability}%</span>
//             </div>
//           </div>
//         </div>

//         {/* Metadata Row */}
//         <div className="flex items-center justify-between text-xs text-zinc-400">
//           <div className="flex items-center gap-1.5">
//             <Clock className="w-3.5 h-3.5" />
//             <span>{departureTime}</span>
//           </div>
//           {/* Only show volume if it exists */}
//           {volume && volume !== "$0.00" && (
//             <div className="font-medium text-zinc-600">Vol: {volume}</div>
//           )}
//         </div>
//       </CardContent>

//       <CardFooter className="px-5 py-3 border-t border-zinc-100 bg-zinc-50/50">
//         <Link href={`/markets/${id}`} className="w-full">
//           <Button
//             className="w-full bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 shadow-sm font-medium transition-all group-hover:border-zinc-400"
//             size="sm"
//           >
//             Trade Market
//           </Button>
//         </Link>
//       </CardFooter>
//     </Card>
//   );
// }

"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Plane,
  AlertTriangle,
  CheckCircle2,
  Ban,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FlightMarketCardProps {
  id: string;
  flightNumber: string;
  route: string;
  departureTime: string;
  status: string;
  // UPDATED: Accept the full price object instead of a single number
  prices: {
    onTime: number;
    delayed30: number;
    cancelled: number;
  };
  aiProbability: number;
}

export function FlightMarketCard({
  id,
  flightNumber,
  route,
  departureTime,
  status,
  prices,
  aiProbability,
}: FlightMarketCardProps) {
  // Parse Route
  const [origin, dest] = route.includes("->")
    ? route.split("->").map((s) => s.trim())
    : ["ORG", "DES"];

  // Status Logic
  const statusColor =
    status === "Delayed" || status === "Cancelled"
      ? "bg-red-50 text-red-700 border-red-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";

  return (
    <Card className="group relative overflow-hidden border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between py-2">
      {/* --- TOP: FLIGHT INFO --- */}
      <div className="p-5 border-b border-zinc-100 bg-zinc-50/30">
        <div className="flex justify-between items-start mb-4">
          <Badge
            variant="outline"
            className="bg-white text-zinc-600 font-mono text-[10px] uppercase tracking-wider shadow-sm"
          >
            {flightNumber}
          </Badge>
          <Badge
            variant="outline"
            className={cn("text-[10px] font-bold border-0", statusColor)}
          >
            {status}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 text-2xl font-black text-zinc-900 tracking-tight">
              <span>{origin}</span>
              <Plane className="w-5 h-5 text-zinc-300 rotate-90" />
              <span>{dest}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-zinc-500">
              <Clock className="w-3.5 h-3.5" />
              <span>Departs {departureTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- MIDDLE: MARKET TICKER (New) --- */}
      <div className="px-5 py-6 grid grid-cols-3 divide-x divide-zinc-100">
        {/* 1. ON TIME */}
        <div className="flex flex-col items-center text-center gap-1">
          <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 uppercase tracking-wide">
            <CheckCircle2 className="w-3 h-3" /> On Time
          </span>
          <span className="text-2xl font-mono font-bold text-zinc-900">
            {prices.onTime.toFixed(0)}¢
          </span>
        </div>

        {/* 2. DELAYED */}
        <div className="flex flex-col items-center text-center gap-1">
          <span className="flex items-center gap-1 text-[9px] font-bold text-amber-600 uppercase tracking-wide">
            <Clock className="w-3 h-3" /> Delay (30)
          </span>
          <span className="text-2xl font-mono font-bold text-zinc-900">
            {prices.delayed30.toFixed(0)}¢
          </span>
        </div>

        {/* 3. CANCELLED */}
        <div className="flex flex-col items-center text-center gap-1">
          <span className="flex items-center gap-1 text-[9px] font-bold text-red-600 uppercase tracking-wide">
            <Ban className="w-3 h-3" /> Cancel
          </span>
          <span className="text-2xl font-mono font-bold text-zinc-900">
            {prices.cancelled.toFixed(0)}¢
          </span>
        </div>
      </div>

      {/* --- BOTTOM: ACTION --- */}
      <div className="px-5 pb-5">
        <Link href={`/markets/${id}`} className="block">
          <Button
            variant="default"
            className="w-full bg-black text-white hover:bg-zinc-800 font-bold group-hover:scale-[1.02] transition-transform shadow-lg shadow-zinc-200/50"
          >
            Trade Market
            <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
