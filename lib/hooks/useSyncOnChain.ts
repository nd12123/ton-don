// lib/hooks/useSyncOnChain.ts
"use client";
import { useEffect } from "react";
import { useStakeStore } from "@/lib/store";

export function useSyncOnChain(pollInterval = 30000) {
  useEffect(() => {
    const iv = setInterval(async () => {
      // Берём всегда актуальное состояние из стора
      const { history, completeStake } = useStakeStore.getState();

      // Фильтруем только активные с txHash
      const toCheck = history.filter(
        (r) => r.status === "active" && r.txHash
      );

      for (const r of toCheck) {
        try {
          // Запрос к TonCenter Testnet RPC
          const resp = await fetch(
            ''//`https://testnet.toncenter.com/api/v2/getTransaction?hash=${r.txHash}`
          );
          const json = await resp.json();
          // Если статус 3 = включено в блок
          if (json.result?.status === 3) {
            // Обновляем запись в локальном стора и Supabase
            await completeStake(r.id, r.txHash!);
          }
        } catch (e) {
          console.warn("Sync failed for", r.id, e);
        }
      }
    }, pollInterval);

    return () => {
      clearInterval(iv);
    };
  }, [pollInterval]);
}
