// lib/store.ts
import {create} from "zustand";
import { supabase } from "@/lib/supabase";

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
  completeStake: (id: string, txHash?: string) => Promise<void>; //id: string???
}

export const useStakeStore = create<StakeStore>((set) => ({
  history: [],
  loading: false,
  error: undefined,

  // Загрузить всё из Supabase
  fetchHistory: async (wallet) => {
    set({ loading: true, error: undefined });
    const res = await supabase
      .from("stakes")
      .select("*")
      .eq("wallet", wallet)              // фильтруем по кошельку
      .order("created_at", { ascending: false });
    if (res.error) {
      set({ error: res.error.message, loading: false });
    } else {
      set({ history: res.data as StakeRecord[], loading: false });
    }
  },

  // Вставить новую запись
  addStake: async ({ wallet, validator, amount, apr, duration, txHash }) => {
    const insertObj: AddStakeParams = { wallet, validator, amount, apr, duration }
    if (txHash) insertObj.txHash = txHash

    set({ loading: true, error: undefined });

    const res = await supabase
      .from("stakes")
      .insert([insertObj])
      .select("*");
    if (res.error) {
      set({ error: res.error.message, loading: false });
      throw new Error(res.error.message);
    } else {
      const newRec = (res.data as StakeRecord[])[0];
      set((state) => ({
        history: [newRec, ...state.history],
        loading: false,
      }));
      return newRec;
    }
  },

  // Обновить статус и txHash
  completeStake: async (id, txHash) => {
    set({ loading: true, error: undefined });


    const updateObj: Partial<StakeRecord> = { status: "completed" };
        if (txHash) updateObj.txHash = txHash;
    
        const res = await supabase
          .from("stakes")
          .update(updateObj)


      .eq("id", id)
      .select("*");
    if (res.error) {
      set({ error: res.error.message, loading: false });
    } else {
      const upd = (res.data as StakeRecord[])[0];
      set((state) => ({
        history: state.history.map((r) => (r.id === id ? upd : r)),
        loading: false,
      }));
    }
  },
}));
