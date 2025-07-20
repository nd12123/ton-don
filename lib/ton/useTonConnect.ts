// lib/ton/useTonConnect.ts
"use client";

import { CHAIN, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Address, Sender, SenderArguments }      from "@ton/core";

export function useTonConnect(): {
  sender: Sender;
  connected: boolean;
  wallet: string | null;
  network: CHAIN | null;
  connect: () => Promise<void>;
} {
  const [tonConnectUI] = useTonConnectUI();
  const walletState    = useTonWallet();

  // TonConnect даёт placeholder "?" пока не подключено
  const rawAddress = walletState?.account?.address ?? null;
  const connected  = rawAddress !== null && rawAddress !== "?";

  const rawChain = walletState?.account?.chain ?? null;
  const network  = connected ? (rawChain as CHAIN) : null;

  // кнопку подключения
  const connect = async () => {
    await tonConnectUI.openModal();
  };

  // наш sender — адрес только если connected
  const sender: Sender = {
    address: connected ? Address.parse(rawAddress!) : undefined,
    send: async (args: SenderArguments) => {
      await tonConnectUI.sendTransaction({
        validUntil: Date.now() + 5 * 60_000,
        messages: [
          {
            address: args.to.toString(),
            amount:  args.value.toString(),
            payload: args.body?.toBoc().toString("base64"),
          },
        ],
      });
    },
  };

  return {
    sender,
    connected,
    wallet:   connected ? rawAddress : null,
    network,
    connect,
  };
}
