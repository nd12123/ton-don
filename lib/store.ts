"use client";

import { create } from "zustand";
import { getSupabaseBrowser } from "@/lib/supabase/browser";

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

// ВСПОМОГАТЕЛЬНОЕ: лениво получаем клиент В МОМЕНТ вызова
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

  // ЧТЕНИЕ ИСТОРИИ (anon): теперь через ленивый клиент + try/catch/finally
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

  // ВСТАВКА: через серверный роут (service-role)
  addStake: async ({ wallet, validator, amount, apr, duration, txHash }) => {
    set({ loading: true, error: undefined });
    try {
      const payload = {
        wallet,
        validator,
        amount,
        apr,
        duration,
        txHash: txHash ?? null,
      };

      const data = await api<{ ok: boolean; record?: StakeRecord; id?: string }>(
        "/api/stake",
        { method: "POST", body: JSON.stringify(payload) }
      );

      const newRec: StakeRecord =
        data.record ??
        ({
          id: String(data.id ?? crypto.randomUUID()),
          wallet,
          validator,
          amount,
          apr,
          duration,
          status: "active",
          txHash: txHash ?? "pending",
          created_at: new Date().toISOString(),
        } as StakeRecord);

      set((s) => ({ history: [newRec, ...s.history] }));
      return newRec;
    } catch (e: any) {
      set({ error: e?.message || "addStake failed" });
      throw e;
    } finally {
      set({ loading: false });
    }
  },

  // ЗАВЕРШЕНИЕ: прямой апдейт (если RLS позволит; иначе вынесем в /api)
  completeStake: async (id, txHash) => {
    set({ loading: true, error: undefined });
    try {
      const patch: Partial<StakeRecord> = { status: "completed" };
      if (txHash) patch.txHash = txHash;

      const res = await sb().from("stakes").update(patch).eq("id", id).select("*");
      if (res.error) throw res.error;

      const upd = (res.data as StakeRecord[])[0];
      set((s) => ({
        history: s.history.map((r) => (r.id === id ? upd : r)),
      }));
    } catch (e: any) {
      set({ error: e?.message || "completeStake failed" });
    } finally {
      set({ loading: false });
    }
  },
  // lib/store.ts — фрагмент: обновлённый withdrawStake
withdrawStake: async (id, amountToWithdraw) => {
  set({ loading: true, error: undefined });
  try {
    const rec = get().history.find((r) => r.id === id);
    if (!rec) throw new Error("Запись не найдена");

    // кламп суммы [0; rec.amount]
    const w = Math.min(Math.max(amountToWithdraw, 0), rec.amount);
    if (w <= 0) return;

    const newAmount = rec.amount - w;

    if (newAmount === 0) {
      // ПОЛНЫЙ вывод — удаляем запись из БД и из локального history
      const { error } = await sb().from("stakes").delete().eq("id", id);
      if (error) throw error;

      set((s) => ({ history: s.history.filter((r) => r.id !== id) }));
    } else {
      // ЧАСТИЧНЫЙ вывод — обновляем amount
      const { data, error } = await sb()
        .from("stakes")
        .update({ amount: newAmount, status: "active" })
        .eq("id", id)
        .select("*");

      if (error) throw error;

      const updated = (data as StakeRecord[])[0] ?? { ...rec, amount: newAmount, status: "active" };
      set((s) => ({
        history: s.history.map((r) => (r.id === id ? updated : r)),
      }));
    }
  } catch (e: any) {
    set({ error: e?.message || "withdrawStake failed" });
    throw e;
  } finally {
    set({ loading: false });
  }
},

/*
  // ВЫВОД СУММЫ: простой пересчёт amount + апдейт
  withdrawStake: async (id, amountToWithdraw) => {
    set({ loading: true, error: undefined });
    try {
      const rec = get().history.find((r) => r.id === id);
      if (!rec) throw new Error("Запись не найдена");

      const newAmount = rec.amount - amountToWithdraw;
      if (newAmount < 0) throw new Error("Нельзя вывести больше, чем застейкано");

      const { data, error } = await sb()
        .from("stakes")
        .update({ amount: newAmount })
        .eq("id", id)
        .select();

      if (error) throw error;

      if (data && data[0]) {
        set((s) => ({
          history: s.history.map((r) => (r.id === id ? { ...r, amount: data[0].amount } : r)),
        }));
      }
    } catch (e: any) {
      set({ error: e?.message || "withdrawStake failed" });
    } finally {
      set({ loading: false });
    }
  },
  */
}));
