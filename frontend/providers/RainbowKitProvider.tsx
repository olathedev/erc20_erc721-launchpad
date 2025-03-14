"use client";
import React, { ReactNode } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { ConnectKitProvider } from "connectkit";

const config = getDefaultConfig({
  appName: "alajo",
  projectId: "1d26e3b9bc5a24bc32a6f92da8f54a85",
  chains: [sepolia],
  ssr: true,
});

const queryClient = new QueryClient();

const CustomRainbowKitProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#A457FF",
            accentColorForeground: "#ffffff",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default CustomRainbowKitProvider;
