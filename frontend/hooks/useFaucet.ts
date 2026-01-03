"use client";

import { useState } from "react";
import { useWriteMockUsdcFaucet } from "@/hooks/generated";
import { useAccount } from "wagmi";
import { parseUnits } from "viem";
import { toast } from "sonner";

export function useFaucet() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { writeContractAsync: mintTokens } = useWriteMockUsdcFaucet();

  const handleMint = async () => {
    if (!address) {
      toast.error("Connect wallet first");
      return;
    }

    try {
      setIsLoading(true);
      // Mint 1,000 USDC (6 decimals) -> 1,000 * 10^6
      const amount = parseUnits("1000", 6);

      const tx = await mintTokens({
        args: [amount],
      });

      toast.success("Minted $1,000 Mock USDC!", {
        description: "It may take a few seconds to appear in your balance.",
      });
    } catch (error: any) {
      toast.error("Mint Failed", {
        description: error.message.split("\n")[0],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleMint, isLoading };
}
