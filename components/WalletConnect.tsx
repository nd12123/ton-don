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
    <div className="shadow-lg hover:shadow-xl sm:text-[9px] md:text-sm items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-400">
      <TonConnectButton />
    </div>
  );
}
