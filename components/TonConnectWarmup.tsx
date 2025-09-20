// components/TonConnectWarmup.tsx
"use client";
import { useEffect } from "react";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

export default function TonConnectWarmup() {
  // сам факт вызова хуков «будит» контекст
  useTonConnectUI();
  useTonWallet();

  // флажок для кнопки (грубый, но удобный)
  useEffect(() => {
    (window as any).__tcReady = true;
  }, []);

  return null;
}
