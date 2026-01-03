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
      address: "0x8B87E271FB390FE7db2CE154e49096f72f6BE507", // Mantle Testnet Address
    },
    {
      name: "MockUSDC",
      abi: mockUsdcAbi as any,
      address: "0xFAEC032f2E8c85Da9d04b06947a6BdCf02Ad7a71", // Mantle Testnet Address
    },
  ],
  plugins: [react()],
});
