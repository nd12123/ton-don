"use client";

import { TonConnectButton } from "@tonconnect/ui-react";

export default function WalletConnect() {
  return (
    <div className="shadow-lg hover:shadow-xl sm:text-[9px] md:text-sm items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-400">
      <TonConnectButton />
    </div>
  );
}
