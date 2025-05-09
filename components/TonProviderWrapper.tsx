"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function TonProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("🚀 TonConnect provider initialized");

  return (
    <TonConnectUIProvider manifestUrl="https://staking-mocha-iota.vercel.app/tonconnect-manifest.json">
    {children}
  </TonConnectUIProvider>
  
  
  );
}
