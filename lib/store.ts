import { create } from "zustand";

export type StakeRecord = {
  id: number;
  validator: string;
  amount: number;
  date: string;
  status: "Active" | "Completed";
};

type StakeStore = {
  history: StakeRecord[];
  addStake: (record: Omit<StakeRecord, "id" | "date" | "status">) => void;
  completeStake: (id: number) => void;
};

export const useStakeStore = create<StakeStore>((set) => ({
  history: [],
  addStake: (record) =>
    set((state) => {
      const id = state.history.length + 1;
      const newRecord: StakeRecord = {
        ...record,
        id,
        date: new Date().toISOString().split("T")[0],
        status: "Active",
      };
      return { history: [...state.history, newRecord] };
    }),
  completeStake: (id) =>
    set((state) => ({
      history: state.history.map((r) =>
        r.id === id ? { ...r, status: "Completed" } : r
      ),
    })),
}));
