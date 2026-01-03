"use client";

import { useReadSkyOddsGetAllFlightIds } from "@/hooks/generated";
import { useReadContracts } from "wagmi";
import { formatUnits } from "viem";
import skyOddsAbi from "../app/abis/SkyOdds.json";

const CONTRACT_ADDRESS = "0x8B87E271FB390FE7db2CE154e49096f72f6BE507";

// Helper to map enum to text
const STATUS_MAP = [
  "Unresolved",
  "On Time",
  "Delayed >30m",
  "Delayed >2h",
  "Cancelled",
];

export function useAllMarkets() {
  // 1. Fetch all Flight IDs first
  const { data: flightIds, isLoading: isIdsLoading } =
    useReadSkyOddsGetAllFlightIds();

  // 2. Prepare Multicall: For every ID, we want Info AND Prices
  const contracts = flightIds?.flatMap((id) => [
    {
      address: CONTRACT_ADDRESS,
      abi: skyOddsAbi,
      functionName: "getFlightInfo",
      args: [id],
    },
    {
      address: CONTRACT_ADDRESS,
      abi: skyOddsAbi,
      functionName: "getAllPrices",
      args: [id],
    },
  ]) as any[];

  // 3. Execute Batch Call
  const { data: results, isLoading: isDataLoading } = useReadContracts({
    contracts,
    query: {
      enabled: !!flightIds && flightIds.length > 0,
      staleTime: 10_000, // Cache data for 10 seconds
    },
  });

  const isLoading = isIdsLoading || isDataLoading;

  // 4. Transform Data for Frontend
  const markets = [];

  if (flightIds && results) {
    for (let i = 0; i < flightIds.length; i++) {
      const infoResult = results[i * 2];
      const priceResult = results[i * 2 + 1];

      if (infoResult.status === "success" && priceResult.status === "success") {
        const info = infoResult.result as any;
        const prices = priceResult.result as any;

        // Prices are in Wei (1e18). 1e18 = 100%.
        // We convert to 0-100 number for the UI.
        const formatPrice = (p: bigint) => {
          const num = parseFloat(formatUnits(p, 18)) * 100;
          return parseFloat(num.toFixed(2)); // Strict 2 decimal rounding
        };

        markets.push({
          id: flightIds[i],
          flightNumber: info[0],
          route: `${info[1]} -> ${info[2]}`, // Departure -> Destination
          departureTime: new Date(Number(info[3]) * 1000).toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          ),
          status: STATUS_MAP[info[5]],

          // Submarkets Data
          prices: {
            onTime: formatPrice(prices[0]),
            delayed30: formatPrice(prices[1]),
            delayed120: formatPrice(prices[2]),
            cancelled: formatPrice(prices[3]),
          },
        });
      }
    }
  }

  return { markets, isLoading };
}
