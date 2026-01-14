// "use client";

// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import { Search, Plane, Calendar, MapPin, Loader2, Plus, ChevronDown, AlertCircle, ExternalLink } from "lucide-react";
// import { useFlightFetch, FlightData, generateFlightId } from "@/hooks/useFlightFetch";
// import { useWriteSkyOddsCreateFlightMarket, useReadSkyOddsAdminRole, useReadSkyOddsHasRole } from "@/hooks/generated";
// import { useAllMarkets } from "@/hooks/useMarketData";
// import { Badge } from "@/components/ui/badge";
// import { toast } from "sonner";
// import { cn } from "@/lib/utils";
// import { useAccount, useBalance } from "wagmi";
// import { formatUnits } from "viem";

// export function CreateMarketForm() {
//     const [upcomingFlights, setUpcomingFlights] = useState<FlightData[]>([]);
//     const [selectedFlight, setSelectedFlight] = useState<FlightData | null>(null);
//     const [liquidity, setLiquidity] = useState("100");
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     const { address, isConnected } = useAccount();
//     const { data: mntBalance } = useBalance({ address });
//     const { data: adminRole } = useReadSkyOddsAdminRole();
//     const { data: hasAdminRole, isLoading: isRoleLoading } = useReadSkyOddsHasRole({
//         args: [adminRole!, address!],
//         query: { enabled: !!adminRole && !!address }
//     });

//     const { markets, isLoading: isMarketsLoading } = useAllMarkets();
//     const { fetchUpcoming, isLoading: isFetching, error } = useFlightFetch();
//     const { writeContractAsync, isPending: isCreating } = useWriteSkyOddsCreateFlightMarket();

//     // Load upcoming flights and filter out those that already have markets
//     useEffect(() => {
//         const loadFlights = async () => {
//             console.log("Loading upcoming flights for dropdown...");
//             const rawFlights = await fetchUpcoming();
//             if (!rawFlights) return;

//             const transformed: FlightData[] = rawFlights.map((f: any) => ({
//                 flightNumber: f.flight.iata || f.flight.number,
//                 departureCode: f.departure.iata,
//                 destinationCode: f.arrival.iata,
//                 airlineCode: f.airline.iata,
//                 scheduledDeparture: Math.floor(new Date(f.departure.scheduled).getTime() / 1000),
//                 status: f.flight_status,
//             }));

//             // Filter out flights that already have markets
//             const filtered = transformed.filter(f => {
//                 const id = generateFlightId(f.flightNumber, f.departureCode, f.destinationCode, f.scheduledDeparture);
//                 return !markets.some(m => m.id.toLowerCase() === id.toLowerCase());
//             });

//             setUpcomingFlights(filtered);
//             console.log("Filtered Upcoming Flights:", filtered);
//         };

//         if (!isMarketsLoading) {
//             loadFlights();
//         }
//     }, [isMarketsLoading, markets.length]);

//     const handleCreate = async () => {
//         if (!selectedFlight) return;

//         try {
//             await writeContractAsync({
//                 args: [
//                     selectedFlight.flightNumber,
//                     selectedFlight.departureCode,
//                     selectedFlight.destinationCode,
//                     selectedFlight.airlineCode,
//                     BigInt(selectedFlight.scheduledDeparture),
//                     BigInt(liquidity) * (10n ** 18n), // Scale liquidity
//                 ],
//             });
//             toast.success("Market creation transaction submitted!");
//             setSelectedFlight(null);
//             // Remove from list after creation
//             setUpcomingFlights(prev => prev.filter(f => f !== selectedFlight));
//         } catch (err: any) {
//             console.error(err);
//             toast.error(err.message || "Failed to create market");
//         }
//     };

//     return (
//         <div className="space-y-6 max-w-2xl mx-auto">
//             <Card className="border-zinc-200">
//                 <CardHeader>
//                     <CardTitle className="text-2xl font-bold flex items-center gap-2 text-zinc-900">
//                         <Plane className="w-6 h-6" /> Create New Market
//                     </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                     {/* PERMISSION & GAS CHECKS */}
//                     {!isRoleLoading && hasAdminRole === false && isConnected && address && (
//                         <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3 text-red-700">
//                             <AlertCircle className="w-5 h-5 shrink-0" />
//                             <div className="text-sm">
//                                 <p className="font-bold">Missing Permissions</p>
//                                 <p className="opacity-90">Only authorized admins can initialize new markets. Your wallet (`{address.slice(0, 6)}...{address.slice(-4)}`) does not have the `ADMIN_ROLE`.</p>
//                             </div>
//                         </div>
//                     )}

//                     {isConnected && mntBalance && parseFloat(formatUnits(mntBalance.value, mntBalance.decimals)) < 0.01 && (
//                         <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3 text-amber-700">
//                             <AlertCircle className="w-5 h-5 shrink-0" />
//                             <div className="text-sm">
//                                 <p className="font-bold">Low MNT Balance</p>
//                                 <p className="opacity-90 mb-2">You need Mantle Sepolia (MNT) tokens to pay for gas when creating markets.</p>
//                                 <a
//                                     href="https://faucet.mantle.xyz/"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="inline-flex items-center gap-1 font-bold underline hover:opacity-80"
//                                 >
//                                     Get MNT from Faucet <ExternalLink className="w-3 h-3" />
//                                 </a>
//                             </div>
//                         </div>
//                     )}

//                     {/* FLIGHT SELECTION DROPDOWN */}
//                     <div className="relative">
//                         <label className="text-sm font-semibold text-zinc-700 block mb-2">
//                             Select Upcoming Flight
//                         </label>
//                         <button
//                             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                             disabled={isFetching || upcomingFlights.length === 0}
//                             className={cn(
//                                 "w-full flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-xl transition-all hover:border-zinc-400 text-left",
//                                 upcomingFlights.length === 0 && "opacity-50 cursor-not-allowed"
//                             )}
//                         >
//                             <div className="flex items-center gap-3">
//                                 {isFetching ? (
//                                     <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
//                                 ) : (
//                                     <Plane className="w-5 h-5 text-zinc-400" />
//                                 )}
//                                 <span className={cn("font-medium", !selectedFlight ? "text-zinc-400" : "text-zinc-900")}>
//                                     {isFetching
//                                         ? "Fetching flights..."
//                                         : selectedFlight
//                                             ? `${selectedFlight.flightNumber} (${selectedFlight.departureCode} → ${selectedFlight.destinationCode})`
//                                             : upcomingFlights.length === 0
//                                                 ? "No new flights available"
//                                                 : "Choose a flight..."
//                                     }
//                                 </span>
//                             </div>
//                             <ChevronDown className={cn("w-5 h-5 text-zinc-400 transition-transform", isDropdownOpen && "rotate-180")} />
//                         </button>

//                         {isDropdownOpen && upcomingFlights.length > 0 && (
//                             <div className="absolute z-50 w-full mt-2 bg-white border border-zinc-200 rounded-xl shadow-xl max-h-[300px] overflow-y-auto overflow-x-hidden animate-in fade-in slide-in-from-top-2 duration-200">
//                                 {upcomingFlights.map((flight, idx) => (
//                                     <button
//                                         key={idx}
//                                         onClick={() => {
//                                             setSelectedFlight(flight);
//                                             setIsDropdownOpen(false);
//                                         }}
//                                         className="w-full flex items-center justify-between p-4 hover:bg-zinc-50 transition-colors border-b border-zinc-100 last:border-0"
//                                     >
//                                         <div className="flex flex-col">
//                                             <span className="font-bold text-zinc-900">{flight.flightNumber}</span>
//                                             <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
//                                                 {flight.departureCode} → {flight.destinationCode}
//                                             </span>
//                                         </div>
//                                         <div className="text-right">
//                                             <span className="text-xs font-mono font-bold text-zinc-400">
//                                                 {new Date(flight.scheduledDeparture * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                             </span>
//                                         </div>
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//                     {/* SELECTED FLIGHT DETAILS */}
//                     {selectedFlight && (
//                         <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
//                             <div className="flex justify-between items-start">
//                                 <div>
//                                     <h3 className="text-2xl font-black text-zinc-900 tracking-tighter">{selectedFlight.flightNumber}</h3>
//                                     <p className="text-zinc-500 text-sm font-semibold uppercase tracking-widest">{selectedFlight.airlineCode} Airways</p>
//                                 </div>
//                                 <Badge variant="outline" className="bg-white text-zinc-600 border-zinc-200 py-1 px-3">
//                                     {selectedFlight.status}
//                                 </Badge>
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-1">
//                                     <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Route</span>
//                                     <div className="flex items-center gap-2 text-zinc-900 font-bold">
//                                         <MapPin className="w-4 h-4 text-zinc-300" />
//                                         {selectedFlight.departureCode} → {selectedFlight.destinationCode}
//                                     </div>
//                                 </div>
//                                 <div className="space-y-1">
//                                     <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Scheduled</span>
//                                     <div className="flex items-center gap-2 text-zinc-900 font-bold">
//                                         <Calendar className="w-4 h-4 text-zinc-300" />
//                                         {new Date(selectedFlight.scheduledDeparture * 1000).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="space-y-2 pt-4 border-t border-zinc-200">
//                                 <div className="flex justify-between items-center mb-1">
//                                     <label className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">Market Liquidity (b)</label>
//                                     <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded italic">Higher b = Stable Price</span>
//                                 </div>
//                                 <Input
//                                     type="number"
//                                     value={liquidity}
//                                     onChange={(e) => setLiquidity(e.target.value)}
//                                     placeholder="100"
//                                     className="max-w-[140px] font-mono h-12 bg-white"
//                                 />
//                             </div>
//                         </div>
//                     )}
//                 </CardContent>
//                 {selectedFlight && (
//                     <CardFooter className="pt-2">
//                         <Button
//                             className="w-full bg-zinc-900 text-white hover:bg-black h-14 shadow-xl active:scale-[0.98] transition-all font-bold text-lg rounded-xl flex items-center justify-center gap-2"
//                             onClick={handleCreate}
//                             disabled={isCreating || !hasAdminRole}
//                         >
//                             {isCreating ? (
//                                 <Loader2 className="w-5 h-5 animate-spin" />
//                             ) : (
//                                 <Plus className="w-5 h-5" />
//                             )}
//                             {hasAdminRole ? "Initialize SkyOdds Market" : "Admin ONLY"}
//                         </Button>
//                     </CardFooter>
//                 )}
//             </Card>
//         </div>
//     );
// }

"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Plane,
  Calendar,
  MapPin,
  Loader2,
  Plus,
  Settings2,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { useWriteSkyOddsCreateFlightMarket } from "@/hooks/generated";
import { toast } from "sonner";

export function CreateMarketForm() {
  // --- STATE ---
  const [formData, setFormData] = useState({
    flightNumber: "BA249",
    airline: "BA",
    origin: "LHR",
    destination: "JFK",
    departureTime: "",
    liquidity: "1000",
  });

  // Default date setup
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(14, 30, 0, 0);
    const dateString = tomorrow.toISOString().slice(0, 16);
    setFormData((prev) => ({ ...prev, departureTime: dateString }));
  }, []);

  const { isConnected } = useAccount();

  // --- BLOCKCHAIN HOOKS ---
  // 1. Write Hook (Submit Transaction)
  const {
    writeContractAsync,
    data: hash, // We need the transaction hash to track it
    isPending: isSubmitting,
  } = useWriteSkyOddsCreateFlightMarket();

  // 2. Wait Hook (Wait for Confirmation)
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  // --- SUCCESS EFFECT ---
  // This watches for the blockchain confirmation
  useEffect(() => {
    if (isConfirmed) {
      toast.success("Market Created Successfully!", {
        description: `Market for flight ${formData.flightNumber} is now live.`,
        icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
        duration: 5000,
      });
      // Optional: Reset form or redirect
    }
  }, [isConfirmed, formData.flightNumber]);

  // --- HANDLER ---
  const handleCreate = async () => {
    if (!isConnected) {
      toast.error("Wallet Disconnected", {
        description: "Please connect your wallet first.",
      });
      return;
    }

    if (!formData.flightNumber || !formData.origin || !formData.destination) {
      toast.error("Missing Data", {
        description: "Please fill in all fields.",
      });
      return;
    }

    const unixTimestamp = Math.floor(
      new Date(formData.departureTime).getTime() / 1000
    );

    const toastId = toast.loading("Check your wallet...");

    try {
      await writeContractAsync({
        args: [
          formData.flightNumber.toUpperCase(),
          formData.origin.toUpperCase(),
          formData.destination.toUpperCase(),
          formData.airline.toUpperCase(),
          BigInt(unixTimestamp),
          parseUnits(formData.liquidity, 6),
        ],
      });

      // Update toast to show we are now waiting for the network
      toast.dismiss(toastId);
      toast.info("Transaction Submitted", {
        description: "Waiting for blockchain confirmation...",
        duration: 10000, // Keep visible longer
      });
    } catch (err: any) {
      console.error(err);
      toast.dismiss(toastId);
      toast.error("Creation Failed", {
        description: err.message.split("\n")[0] || "User rejected request",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate total loading state
  const isLoading = isSubmitting || isConfirming;

  return (
    <Card className="border-zinc-200 shadow-sm bg-white">
      <CardHeader className="pb-4 border-b border-zinc-100">
        <CardTitle className="text-xl font-bold flex items-center gap-2 text-zinc-900">
          <Settings2 className="w-5 h-5 text-zinc-500" />
          Manual Market Configuration
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* ROW 1: Flight ID & Airline */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-zinc-500 uppercase">
              Flight Number
            </Label>
            <div className="relative">
              <Plane className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
              <Input
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                placeholder="e.g. BA249"
                className="pl-9 font-mono uppercase bg-zinc-50/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-zinc-500 uppercase">
              Airline Code
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
              <Input
                name="airline"
                value={formData.airline}
                onChange={handleChange}
                placeholder="e.g. BA"
                maxLength={3}
                className="pl-9 font-mono uppercase bg-zinc-50/50"
              />
            </div>
          </div>
        </div>

        {/* ROW 2: Route */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-zinc-500 uppercase">
              Origin (IATA)
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
              <Input
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                placeholder="e.g. LHR"
                maxLength={3}
                className="pl-9 font-mono uppercase bg-zinc-50/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-zinc-500 uppercase">
              Destination (IATA)
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
              <Input
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="e.g. JFK"
                maxLength={3}
                className="pl-9 font-mono uppercase bg-zinc-50/50"
              />
            </div>
          </div>
        </div>

        {/* ROW 3: Date & Liquidity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-zinc-500 uppercase">
              Departure Time (Local)
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-zinc-400 z-10" />
              <Input
                type="datetime-local"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
                className="pl-9 font-mono bg-zinc-50/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold text-zinc-500 uppercase">
              Initial Liquidity (b)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-zinc-400 font-bold text-sm">
                b =
              </span>
              <Input
                type="number"
                name="liquidity"
                value={formData.liquidity}
                onChange={handleChange}
                placeholder="1000"
                className="pl-10 font-mono bg-zinc-50/50"
              />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-6">
        <Button
          className="w-full h-12 bg-zinc-900 text-white hover:bg-black font-bold text-sm rounded-lg shadow-lg shadow-zinc-200/50 transition-all active:scale-[0.98]"
          onClick={handleCreate}
          disabled={isLoading}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sign in Wallet...
            </>
          ) : isConfirming ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Confirming Transaction...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Initialize Market
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
