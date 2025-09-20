// components/WalletConnect.tsx
"use client";

import dynamic from "next/dynamic";

// ВАЖНО: рендерим кнопку только на клиенте
const TonConnectButton = dynamic(
  async () => (await import("@tonconnect/ui-react")).TonConnectButton,
  { ssr: false }
);

export default function WalletConnect() {
  return (
    <div className="md:shadow-lg md:hover:shadow-xl sm:text-[9px] md:text-sm items-center justify-center md:bg-blue-500 md:hover:bg-blue-600 text-white rounded-full transition-shadow focus:outline-none md:focus:ring-2 md:focus:ring-blue-400">
      <TonConnectButton />
    </div>
  );
}
    {/** */}
