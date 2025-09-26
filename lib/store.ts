"use client";

import { create } from "zustand";
import { getSupabase } from "@/lib/supabase/browser"; // ← вернуть
const supabase = getSupabase();                      // ← вернуть

export interface StakeRecord {
  id: string;
  wallet: string;
  validator: string;
  amount: number;
  apr: number;
  duration: number;
  status: "active" | "completed";
  txHash: string;
  created_at: string;
}

interface AddStakeParams {
  wallet: string;
  validator: string;
  amount: number;
  apr: number;
  duration: number;
  txHash?: string;
}

interface StakeStore {
  history: StakeRecord[];
  loading: boolean;
  error?: string;
  fetchHistory: (wallet: string) => Promise<void>;
  addStake: (params: AddStakeParams) => Promise<StakeRecord>;
  completeStake: (id: string, txHash?: string) => Promise<void>;
  withdrawStake: (id: string, amount: number) => Promise<void>;
}

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

  // ← ВОЗВРАТИЛИ старое чтение (anon) — история снова поедет
  fetchHistory: async (wallet) => {
    set({ loading: true, error: undefined });
    const { data, error } = await supabase
      .from("stakes")
      .select("*")
      .eq("wallet", wallet)
      .order("created_at", { ascending: false });

    if (error) set({ error: error.message, loading: false });
    else set({ history: (data as StakeRecord[]) ?? [], loading: false });
  },

  // Вставка — через серверный роут (service-role)
  addStake: async ({ wallet, validator, amount, apr, duration, txHash }) => {
    set({ loading: true, error: undefined });
    try {
      const payload = {
        wallet, validator, amount, apr, duration,
        txHash: txHash ?? null,
        //network: process.env.NEXT_PUBLIC_TON_NETWORK ?? "mainnet",
      };
      const data = await api<{ ok: boolean; record?: StakeRecord; id?: string }>(
        "/api/stake",
        { method: "POST", body: JSON.stringify(payload) }
      );

      const newRec: StakeRecord =
        data.record ??
        ({
          id: String(data.id ?? crypto.randomUUID()),
          wallet, validator, amount, apr, duration,
          status: "active",
          txHash: txHash ?? "pending",
          created_at: new Date().toISOString(),
        } as StakeRecord);

      set((s) => ({ history: [newRec, ...s.history], loading: false }));
      return newRec;
    } catch (e: any) {
      set({ error: e.message || "addStake failed", loading: false });
      throw e;
    }
  },

  // Остальное — как было (если начнёт упираться в RLS — позже вынесем в /api)
  completeStake: async (id, txHash) => {
    set({ loading: true, error: undefined });
    const patch: Partial<StakeRecord> = { status: "completed" };
    if (txHash) patch.txHash = txHash;
    const res = await supabase.from("stakes").update(patch).eq("id", id).select("*");
    if (res.error) set({ error: res.error.message, loading: false });
    else {
      const upd = (res.data as StakeRecord[])[0];
      set((s) => ({
        history: s.history.map((r) => (r.id === id ? upd : r)),
        loading: false,
      }));
    }
  },

  withdrawStake: async (id, amountToWithdraw) => {
    set({ loading: true, error: undefined });
    const rec = get().history.find((r) => r.id === id);
    if (!rec) return set({ error: "Запись не найдена", loading: false });

    const newAmount = rec.amount - amountToWithdraw;
    if (newAmount < 0) return set({ error: "Нельзя вывести больше, чем застейкано", loading: false });

    const { data, error } = await supabase.from("stakes").update({ amount: newAmount }).eq("id", id).select();
    if (error) set({ error: error.message, loading: false });
    else if (data && data[0]) {
      set((s) => ({
        history: s.history.map((r) => (r.id === id ? { ...r, amount: data[0].amount } : r)),
        loading: false,
      }));
    }
  },
}));
