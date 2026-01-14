import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import skyOddsAbi from "./app/abis/SkyOdds.json";
import mockUsdcAbi from "./app/abis/MockUSDC.json";

export default defineConfig({
  out: "hooks/generated.ts",
  contracts: [
    {
      name: "SkyOdds",
      abi: skyOddsAbi as any,
      address: "0x431119E3f9A2108B0D53BF3Ebbba057bFdF552d7", // Mantle Testnet Address
    },
    {
      name: "MockUSDC",
      abi: mockUsdcAbi as any,
      address: "0xAB6a56DA5c42976953FE245F478f0b183B2479BF", // Mantle Testnet Address
    },
  ],
  plugins: [react()],
});
