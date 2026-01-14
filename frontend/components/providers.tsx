"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mantleSepoliaTestnet } from "wagmi/chains";
import { ReactNode, useState } from "react";

// Simple Wagmi Config for Mantle
const config = createConfig({
  chains: [mantleSepoliaTestnet],
  transports: {
    [mantleSepoliaTestnet.id]: http(),
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

// "use client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactNode, useState } from "react";

// export function Providers({ children }: { children: ReactNode }) {
//   const [queryClient] = useState(() => new QueryClient());

//   return (
//     // REMOVED WagmiProvider here. ParticleConnectkit handles it.
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// }
