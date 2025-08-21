'use client';
import { CHAIN, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Address, Sender, SenderArguments } from '@ton/core';

export function useTonConnect(): {
  sender: Sender;
  connected: boolean;
  wallet: string | null;
  network: CHAIN | null;
} {
  const [tonConnectUI] = useTonConnectUI();
  const walletState    = useTonWallet();

  const rawAddress = walletState?.account?.address ?? null;
  const connected  = rawAddress !== null && rawAddress !== '?';

  const sender: Sender = {
    address: connected && rawAddress ? Address.parse(rawAddress) : undefined,
    send: async (args: SenderArguments) => {
      if (!connected || !walletState?.account?.address || walletState?.account?.address === "?") {
        await tonConnectUI.openModal(); // покажем выбор кошелька
        throw new Error('Wallet is not connected');
      }
      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 60 * 5,
        messages: [{
          address: args.to.toString(),
          amount:  args.value.toString(),
          payload: args.body?.toBoc().toString('base64'),
        }],
      });
    }
  };

  return {
    sender,
    connected,
    wallet: rawAddress,
    network: (walletState?.account?.chain ?? null) as CHAIN | null
  };
}


// lib/ton/useTonConnect.ts
/*
'use client';
import { CHAIN, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Address, Sender, SenderArguments } from '@ton/core';

export function useTonConnect(): {
  sender: Sender;
  connected: boolean;
  wallet: string | null;
  network: CHAIN | null;
} {
  const [tonConnectUI] = useTonConnectUI();
  const walletState = useTonWallet();

  const rawAddress = walletState?.account?.address ?? null;
  const connected = rawAddress !== null && rawAddress !== '?';

  const sender: Sender = {
    address: connected && rawAddress ? Address.parse(rawAddress) : undefined,
    send: async (args: SenderArguments) => {
      if (!connected) {
        // Если нажали "Stake", а кошелёк ещё не подключен — открываем модалку
        await tonConnectUI.openModal();
        throw new Error('Wallet is not connected');
      }

      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 60 * 5,
        messages: [
          {
            address: args.to.toString(),
            amount: args.value.toString(),
            payload: args.body?.toBoc().toString('base64'),
            // stateInit: ...
          }
        ]
      });
    }
  };

  return {
    sender,
    connected,
    wallet: rawAddress,
    network: (walletState?.account?.chain ?? null) as CHAIN | null
  };
}
  */
