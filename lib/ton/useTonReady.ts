// lib/ton/useTonReady.ts
/*
"use client";
import { useEffect, useState } from "react";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

//true, когда контекст TonConnect восстановился (подключен или точно нет) 
export function useTonReady() {
  const [ui] = useTonConnectUI();
  const wallet = useTonWallet();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // если кошелёк уже известен — мы готовы
    if (wallet !== undefined) setReady(true);
  }, [wallet]);

  useEffect(() => {
    // на всякий случай: первая смена статуса = контекст восстановился
    const off = ui.onStatusChange(() => setReady(true));
    return off;
  }, [ui]);

  return ready;
}
*/