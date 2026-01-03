"use client";

import React from "react";
import { Coins, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFaucet } from "@/hooks/useFaucet";

export function FaucetButton() {
  const { handleMint, isLoading } = useFaucet();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleMint}
      disabled={isLoading}
      className="w-full justify-start text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-700"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Coins className="w-4 h-4 mr-2" />
      )}
      Get $1,000 Test USDC
    </Button>
  );
}
