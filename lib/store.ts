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
  txHash?: string;
  created_at: string;
}

interface AddStakeParams {
  wallet: string;
  validator: string;
  amount: number;
  apr: number;
  duration: number;
}

interface StakeStore {
  history: StakeRecord[];
  loading: boolean;
  error?: string;
  fetchHistory: () => Promise<void>;
  addStake: (params: AddStakeParams) => Promise<void>;
  completeStake: (id: string, txHash?: string) => Promise<void>; //id: string???
}

export const useStakeStore = create<StakeStore>((set) => ({
  history: [],
  loading: false,
  error: undefined,

  // Загрузить всё из Supabase
  fetchHistory: async () => {
    set({ loading: true, error: undefined });
    const res = await supabase
      .from("stakes")
      .select("*")
      .order("created_at", { ascending: false });
    if (res.error) {
      set({ error: res.error.message, loading: false });
    } else {
      set({ history: res.data as StakeRecord[], loading: false });
    }
  },

  // Вставить новую запись
  addStake: async ({ wallet, validator, amount, apr, duration }) => {
    set({ loading: true, error: undefined });
    const res = await supabase
      .from("stakes")
      .insert([{ wallet, validator, amount, apr, duration }])
      .select();
    if (res.error) {
      set({ error: res.error.message, loading: false });
    } else {
      const newRec = (res.data as StakeRecord[])[0];
      set((state) => ({
        history: [newRec, ...state.history],
        loading: false,
      }));
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
      .select();
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
