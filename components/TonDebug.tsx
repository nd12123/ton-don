// components/TonDebug.tsx
'use client';
import { useEffect } from 'react';
import { useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';

export default function TonDebug() {
  const wallet = useTonWallet();
  const [ui] = useTonConnectUI();

  useEffect(() => {
    const unsub = ui.onStatusChange((w) => {
      console.log('[TonDebug] status:', w);
    });
    return () => unsub();
  }, [ui]);

  useEffect(() => {
    console.log('[TonDebug] wallet:', wallet);
  }, [wallet]);

  return null;
}
