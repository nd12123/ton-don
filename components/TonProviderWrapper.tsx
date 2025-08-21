
"use client"

import { TonConnectUIProvider } from "@tonconnect/ui-react" //CHAIN
import { useEffect, useState } from "react"

export function TonProviderWrapper({ children }: { children: React.ReactNode }) {
  const [returnUrl, setReturnUrl] = useState<`${string}://${string}` | undefined>(undefined)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window.location.href
      if (url.startsWith("http://") || url.startsWith("https://")) {
        setReturnUrl(url as `${string}://${string}`)
      }
    }
  }, [])

  return (
    <TonConnectUIProvider
      manifestUrl="https://staking-mocha-iota.vercel.app/tonconnect-manifest.json"
      //networks={[CHAIN.TESTNET]}                // ← only allow Testnet
      actionsConfiguration={{
        twaReturnUrl: returnUrl,
      }}
    >
      {children}
    </TonConnectUIProvider>
  )
}
/*
'use client';

import { TonConnectUIProvider, useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect } from 'react';

function TonSanitizer() {
  const [ui, setOptions] = useTonConnectUI();

  useEffect(() => {
    // 1) На время старта — авто-восстановление ОТКЛЮЧЕНО (чтобы SDK не поднимал мусорную сессию)
    setOptions({ restoreConnection: false });

    // 2) Если в localStorage лежит "битая" http-сессия с левым бриджем (walletbot/uxuy) — чистим её
    const keys = ['ton-connect-ui', 'ton-connect', 'ton-connect-storage'];
    const hasBadBridge = keys.some((k) => {
      try {
        const v = localStorage.getItem(k);
        return !!v && /walletbot\.me|uxuy\.me/i.test(v);
      } catch { return false; }
    });

    (async () => {
      if (hasBadBridge) {
        try { await ui.disconnect(); } catch {}
        for (const k of keys) {
          try { localStorage.removeItem(k); } catch {}
        }
        // Небольшая пауза, чтобы гарантированно отцепить слушателей
        await new Promise((r) => setTimeout(r, 50));
      }
      // 3) Включаем нормальное поведение после санитации
      setOptions({ restoreConnection: true });
    })();
  }, [ui, setOptions]);

  return null;
}

export function TonProviderWrapper({ children }: { children: React.ReactNode }) {
  const twaReturnUrl =
    typeof window !== 'undefined'
      ? (window.location.href as `${string}://${string}`)
      : undefined;

  return (
    <TonConnectUIProvider
      manifestUrl="https://staking-mocha-iota.vercel.app/tonconnect-manifest.json"
      actionsConfiguration={{ twaReturnUrl }}
      // Сужаем список кошельков, чтобы не выстрелить себе в ногу "левыми" мостами
      walletsListConfiguration={{
        includeWallets: ['tonkeeper'],
        // при желании: excludeWallets: ['walletbot', 'uxuy']
      }}
    >
      <TonSanitizer />
      {children}
    </TonConnectUIProvider>
  );
}
/*

/*
*/
