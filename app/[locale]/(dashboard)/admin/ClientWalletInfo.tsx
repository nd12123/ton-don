"use client";

import { CHAIN, useTonWallet } from "@tonconnect/ui-react";
import { Address } from "@ton/core";

const short = (a?: string) => (a ? `${a.slice(0, 6)}…${a.slice(-6)}` : "N/A");

// простой стиль «вторичной» кнопки
const btnSecondary =
  "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg " +
  "bg-white/10 hover:bg-white/15 text-white/90 text-sm " +
  "border border-white/15 transition";

export default function ClientWalletInfo() {
  const wallet = useTonWallet();

  const chain =
    wallet?.account?.chain === CHAIN.MAINNET ? "mainnet" :
    wallet?.account?.chain === CHAIN.TESTNET ? "testnet" : "N/A";

  const pretty = wallet?.account?.address
    ? Address.parse(wallet.account.address).toString()
    : "N/A";

  return (
    <div className="flex items-center gap-2">
      <button type="button" className={btnSecondary}>{chain}</button>
      <button type="button" className={btnSecondary} title={pretty}>
        {wallet?.account?.address ? short(pretty) : "N/A"}
      </button>
    </div>
  );
}
