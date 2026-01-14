// const MOCK_USDC_ADDRESS = "0xAB6a56DA5c42976953FE245F478f0b183B2479BF";
// "use client";

// import { useState } from "react";
// import { parseUnits } from "viem";
// import { toast } from "sonner";
// import { mockUsdcAbi } from "./generated";
// import { useAccount } from "@particle-network/connectkit";
// import { useWriteContract } from "wagmi";

// // Hardcode address for safety or import from constant
// const MOCK_USDC_ADDRESS = "0xAB6a56DA5c42976953FE245F478f0b183B2479BF";

// export function useFaucet() {
//   const { address, isConnected } = useAccount();
//   const [isLoading, setIsLoading] = useState(false);

//   // 2. USE STANDARD HOOK: This isolates the issue from the generated code
//   const { writeContractAsync } = useWriteContract();

//   const handleMint = async () => {
//     console.log(isConnected, address, "data");
//     if (!isConnected || !address) {
//       toast.error("Connect wallet first");
//       return;
//     }

//     try {
//       setIsLoading(true);

//       const amount = parseUnits("1000", 6);

//       console.log("Minting to:", address);
//       console.log("Amount:", amount.toString());

//       // 3. EXPLICIT CALL: We pass the ABI and Address directly here
//       await writeContractAsync({
//         address: MOCK_USDC_ADDRESS,
//         abi: mockUsdcAbi,
//         functionName: "faucet", // Make sure this matches your contract function name!
//         args: [amount], // Faucet usually takes amount, or sometimes (address, amount)
//       });

//       toast.success("Minted $1,000 Mock USDC!", {
//         description: "It may take a few seconds to appear in your balance.",
//       });
//     } catch (error: any) {
//       console.error("Faucet Error:", error);
//       toast.error("Mint Failed", {
//         description: error.message
//           ? error.message.split("\n")[0]
//           : "Transaction failed",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { handleMint, isLoading };
// }

"use client";
import { useState } from "react";
import { useWallets } from "@particle-network/connectkit"; // Use Particle's hook
import { parseUnits, encodeFunctionData } from "viem";
import { toast } from "sonner";
import { mockUsdcAbi } from "./generated";
// Ensure path is correct

const MOCK_USDC_ADDRESS = "0xAB6a56DA5c42976953FE245F478f0b183B2479BF";

export function useFaucet() {
  const [primaryWallet] = useWallets(); // Direct access to Particle Wallet
  const [isLoading, setIsLoading] = useState(false);

  const handleMint = async () => {
    if (!primaryWallet) {
      toast.error("Connect wallet first");
      return;
    }

    try {
      setIsLoading(true);

      // 2. Prepare Transaction Data
      // Since we aren't using useWriteContract, we encode the function call manually
      const amount = parseUnits("1000", 6);
      const data = encodeFunctionData({
        abi: mockUsdcAbi,
        functionName: "faucet", // Check if your ABI uses "faucet" or "mint"
        args: [amount],
      });

      // 3. Send Transaction directly via Particle Client
      const walletClient = primaryWallet.getWalletClient();

      toast.loading("Confirm in wallet...", { id: "tx" });

      const hash = await walletClient.sendTransaction({
        to: MOCK_USDC_ADDRESS,
        data: data,
        value: 0n, // 0 ETH value
        account: primaryWallet.accounts[0] as `0x${string}`,
        chain: undefined, // Let the client handle chain context
      });

      toast.dismiss("tx");
      toast.success("Minted $1,000 Mock USDC!", {
        description: "Transaction sent successfully",
      });

      console.log("Tx Hash:", hash);
    } catch (error: any) {
      console.error("Faucet Error:", error);
      toast.dismiss("tx");
      toast.dismiss("switch");
      toast.error("Mint Failed", {
        description: error.message?.split("\n")[0] || "Transaction rejected",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleMint, isLoading };
}
