"use client";

import { create } from "zustand";
import { getSupabaseBrowser } from "@/lib/supabase/browser";
// ↓ понадобится только на клиенте, чтобы посчитать хэш из BOC
import { Cell } from "@ton/core";

/* ──────────────────────────────────────────────────────────────────────────
   ВСПОМОГАТЕЛЬНОЕ: извлекаем txHash из ответа TonConnect
   Использование (в StakingClient.tsx):
     const sendRes = await tonConnectUI.sendTransaction(tx);
     const txHash  = txHashFromSendResult(sendRes); // ← получим 64-hex
     await useStakeStore.getState().addStake({ ..., txHash });
   Если кошелёк вернул чистый BOC (base64) — тоже прокатит:
     const txHash = txHashFromSendResult(bocBase64String);
────────────────────────────────────────────────────────────────────────── */
export function txHashFromSendResult(resOrBoc: unknown): string {
  // Уже готовый 0x-hex/hex?
  if (typeof resOrBoc === "string") {
    const s = resOrBoc.trim();
    if (/^0x?[0-9a-fA-F]{64}$/.test(s)) return s.replace(/^0x/, "");
    // Иначе считаем, что это base64 BOC
    const cell = Cell.fromBase64(s);
    return cell.hash().toString("hex");
  }

  // Объект с возможными местами для BOC
  if (resOrBoc && typeof resOrBoc === "object") {
    // @ts-expect-error — берём популярные места, где кошельки кладут BOC
    const boc: unknown = resOrBoc.boc ?? resOrBoc.result?.boc ?? resOrBoc.payload?.boc;
    if (typeof boc === "string" && boc.length > 0) {
      const cell = Cell.fromBase64(boc);
      return cell.hash().toString("hex");
    }
  }

  throw new Error("Wallet did not return BOC / tx hash");
}

/* ────────────────────────────────────────────────────────────────────────── */

export interface StakeRecord {
  id: string;
  wallet: string;
  validator: string | null;
  amount: number;
  apr: number;
  duration: number;
  // Добавил 'withdrawn' — у тебя логика баланса и UI как раз на нём
  status: "active" | "completed" | "withdrawn";
  txHash: string | null;
  created_at: string;
}

interface AddStakeParams {
  wallet: string;
  validator?: string | null;
  amount: number;
  apr: number;
  duration: number;
  // ТЕПЕРЬ ОБЯЗАТЕЛЕН: сначала добываем через txHashFromSendResult(...)
  txHash: string;
}

interface StakeStore {
  history: StakeRecord[];
  loading: boolean;
  error?: string;

  fetchHistory: (wallet: string) => Promise<void>;
  addStake: (params: AddStakeParams) => Promise<StakeRecord>;
  completeStake: (id: string, txHash?: string) => Promise<void>;
  // сигнатуру не ломаю: второй аргумент игнорируем
  withdrawStake: (id: string, _amount?: number) => Promise<void>;
}

// Ленивый браузерный клиент
const sb = () => getSupabaseBrowser();

async function api<T = any>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || res.statusText);
  return data as T;
}

export const useStakeStore = create<StakeStore>((set, get) => ({
  history: [],
  loading: false,
  error: undefined,

  // ИСТОРИЯ: читаем только свои записи
  fetchHistory: async (wallet) => {
    set({ loading: true, error: undefined });
    try {
      const { data, error } = await sb()
        .from("stakes")
        .select("*")
        .eq("wallet", wallet)
        .order("created_at", { ascending: false });

      if (error) throw error;
      set({ history: (data as StakeRecord[]) ?? [] });
    } catch (e: any) {
      set({ error: e?.message || "Failed to load history", history: [] });
    } finally {
      set({ loading: false });
    }
  },

  // ВСТАВКА: только через серверный роут и ТОЛЬКО с txHash
  addStake: async ({ wallet, validator = null, amount, apr, duration, txHash }) => {
    set({ loading: true, error: undefined });
    try {
      if (!txHash || typeof txHash !== "string" || txHash.trim().length < 8) {
        throw new Error("txHash required: call txHashFromSendResult() first");
      }

      const payload = { wallet, validator, amount, apr, duration, txHash };

      const data = await api<{ ok: boolean; record: StakeRecord }>(
        "/api/stake",
        { method: "POST", body: JSON.stringify(payload) }
      );

      const rec = data.record;
      // Подстрахуем локальную историю
      set((s) => ({ history: [rec, ...s.history] }));
      return rec;
    } catch (e: any) {
      set({ error: e?.message || "addStake failed" });
      throw e;
    } finally {
      set({ loading: false });
    }
  },

  // ЗАВЕРШЕНИЕ: если тебе это ещё нужно делать с клиента (иначе — через воркер/сервер)
  completeStake: async (id, txHash) => {
    set({ loading: true, error: undefined });
    try {
      const patch: Partial<StakeRecord> = { status: "completed" };
      if (txHash) patch.txHash = txHash;

      const res = await sb()
        .from("stakes")
        .update(patch)
        .eq("id", id)
        .select("*");

      if (res.error) throw res.error;

      const upd = (res.data as StakeRecord[])[0];
      if (upd) {
        set((s) => ({
          history: s.history.map((r) => (r.id === id ? upd : r)),
        }));
      }
    } catch (e: any) {
      set({ error: e?.message || "completeStake failed" });
      throw e;
    } finally {
      set({ loading: false });
    }
  },

  // WITHDRAW: больше не режем amount — просто меняем статус на "withdrawn" через сервер
  withdrawStake: async (id, _amountIgnored) => {
    set({ loading: true, error: undefined });
    const prev = get().history;
    try {
      const rec = prev.find((r) => r.id === id);
      if (!rec) throw new Error("Запись не найдена");
      if (rec.status !== "completed") throw new Error("Stake is not ready to withdraw");

      // Оптимистично пометим как withdrawn (UI мгновенно обновится)
      set({
        history: prev.map((r) => (r.id === id ? { ...r, status: "withdrawn" } : r)),
      });

      const res = await api<{ ok: boolean; record: StakeRecord }>(
        `/api/stakes/${id}/withdraw`,
        {
          method: "POST",
          body: JSON.stringify({ wallet: rec.wallet }), // amount не требуется
        }
      );

      // Сверим с сервером (идеально — записать серверный снапшот)
      if (res?.record) {
        set((s) => ({
          history: s.history.map((r) => (r.id === id ? res.record : r)),
        }));
      }
    } catch (e: any) {
      // Откат оптимистичного апдейта
      set({ history: prev, error: e?.message || "withdrawStake failed" });
      throw e;
    } finally {
      set({ loading: false });
    }
  },
}));
