"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function TonProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("🚀 TonConnect provider initialized");

  return (
    <TonConnectUIProvider manifestUrl="https://crypto-tawny-nine.vercel.app/tonconnect-manifest.json">
    {children}
  </TonConnectUIProvider>
  
  
  );
}
