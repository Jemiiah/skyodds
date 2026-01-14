"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  ArrowUpDown,
  RefreshCw,
  Loader2,
  PlaneTakeoff,
  PlaneLanding,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Ban,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FlightMarketCard } from "@/components/markets/flight-market-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllMarkets } from "@/hooks/useMarketData";
import { cn } from "@/lib/utils";

// Filter Types for Past Markets
type PastFilterType = "all" | "pending" | "on_time" | "delayed" | "cancelled";

export default function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pastFilter, setPastFilter] = useState<PastFilterType>("all");

  // 1. Fetch Real Data
  const { markets, isLoading } = useAllMarkets();

  // 2. Time Logic
  const currentTime = Math.floor(Date.now() / 1000);

  // 3. Search Filter (Applied globally first)
  const searchedMarkets = markets.filter(
    (flight) =>
      flight.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 4. Split: Upcoming vs Past
  // Upcoming: Departure is in the future
  const upcomingMarkets = searchedMarkets.filter(
    (m) => m.departureTimestamp > currentTime
  );

  // Past: Departure is in the past
  const pastMarkets = searchedMarkets.filter(
    (m) => m.departureTimestamp <= currentTime
  );

  // 5. Apply "Past" Sub-filters
  const filteredPastMarkets = pastMarkets.filter((m) => {
    // "Pending" = Expired time, but status is still generic (Unresolved)
    const isPending = m.status === "Unresolved" || m.status === "Scheduled";

    switch (pastFilter) {
      case "pending":
        return isPending;
      case "on_time":
        return m.status === "On Time";
      case "delayed":
        return m.status.includes("Delayed");
      case "cancelled":
        return m.status === "Cancelled";
      default:
        return true;
    }
  });

  return (
    <div className="space-y-12 pb-20">
      {/* --- GLOBAL HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
            Global Aviation Markets
          </h1>
          <p className="text-zinc-500 text-sm font-medium mt-2">
            Trade on flight outcomes in real-time.
          </p>
        </div>

        {/* Global Search & Sort */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="Search Flight or Route..."
              className="pl-9 bg-white border-zinc-200 focus-visible:ring-black rounded-md shadow-sm h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.location.reload()}
            className="h-10 w-10 border-zinc-200 bg-white shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
          <p className="text-zinc-400 text-sm animate-pulse">
            Loading markets...
          </p>
        </div>
      ) : (
        <>
          {/* =========================================================
              SECTION 1: UPCOMING FLIGHTS
             ========================================================= */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-black rounded-lg text-white">
                <PlaneTakeoff className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-zinc-900">
                Live & Upcoming
              </h2>
              <Badge
                variant="secondary"
                className="bg-zinc-100 text-zinc-600 ml-2"
              >
                {upcomingMarkets.length}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {upcomingMarkets.length > 0 ? (
                upcomingMarkets.map((flight) => (
                  <FlightMarketCard
                    key={flight.id}
                    id={flight.id}
                    flightNumber={flight.flightNumber}
                    route={flight.route}
                    departureTime={flight.departureTime}
                    status={flight.status}
                    prices={flight.prices}
                    aiProbability={Math.min(flight.prices.delayed30 + 15, 99)}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
                  <p className="text-zinc-400 font-medium">
                    No upcoming flights found.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* =========================================================
              SECTION 2: PAST FLIGHTS
             ========================================================= */}
          <section className="space-y-6 pt-8 border-t border-zinc-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Header */}
              <div className="flex items-center gap-2">
                <div className="p-2 bg-zinc-100 rounded-lg text-zinc-500">
                  <PlaneLanding className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-900">
                    Past & Settled
                  </h2>
                  <p className="text-xs text-zinc-400 font-medium">
                    History and resolutions.
                  </p>
                </div>
              </div>

              {/* PAST FILTERS */}
              <div className="flex flex-wrap items-center gap-2 bg-zinc-50 p-1.5 rounded-lg border border-zinc-200">
                <FilterButton
                  active={pastFilter === "all"}
                  onClick={() => setPastFilter("all")}
                  label="All Past"
                />
                <FilterButton
                  active={pastFilter === "pending"}
                  onClick={() => setPastFilter("pending")}
                  label="Pending Resolution"
                  icon={<Clock className="w-3 h-3" />}
                  activeClass="bg-white text-amber-600 shadow-sm ring-1 ring-amber-100"
                />
                <FilterButton
                  active={pastFilter === "on_time"}
                  onClick={() => setPastFilter("on_time")}
                  label="On Time"
                  icon={<CheckCircle2 className="w-3 h-3" />}
                  activeClass="bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100"
                />
                <FilterButton
                  active={pastFilter === "delayed"}
                  onClick={() => setPastFilter("delayed")}
                  label="Delayed"
                  icon={<AlertTriangle className="w-3 h-3" />}
                  activeClass="bg-white text-amber-600 shadow-sm ring-1 ring-amber-100"
                />
                <FilterButton
                  active={pastFilter === "cancelled"}
                  onClick={() => setPastFilter("cancelled")}
                  label="Cancelled"
                  icon={<Ban className="w-3 h-3" />}
                  activeClass="bg-white text-red-600 shadow-sm ring-1 ring-red-100"
                />
              </div>
            </div>

            {/* Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredPastMarkets.length > 0 ? (
                  filteredPastMarkets.map((flight) => {
                    // Logic to show "Pending Resolution" text if it's past due but unresolved
                    const isPending =
                      flight.status === "Unresolved" ||
                      flight.status === "Scheduled";
                    const displayStatus = isPending
                      ? "Pending Resolution"
                      : flight.status;

                    return (
                      <motion.div
                        key={flight.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="opacity-75 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                          <FlightMarketCard
                            id={flight.id}
                            flightNumber={flight.flightNumber}
                            route={flight.route}
                            departureTime={flight.departureTime}
                            status={displayStatus} // Pass modified status
                            prices={flight.prices}
                            aiProbability={0}
                          />
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="col-span-full py-24 text-center border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
                    <p className="text-zinc-400 font-medium">
                      No past flights match this filter.
                    </p>
                    <Button variant="link" onClick={() => setPastFilter("all")}>
                      Clear Filter
                    </Button>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </section>
        </>
      )}
    </div>
  );
}

// --- SUB-COMPONENT: Filter Button ---
function FilterButton({
  active,
  onClick,
  label,
  icon,
  activeClass = "bg-white text-black shadow-sm ring-1 ring-zinc-200",
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
  activeClass?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5",
        active
          ? activeClass
          : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
