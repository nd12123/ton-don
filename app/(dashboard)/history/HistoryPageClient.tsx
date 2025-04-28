// components/HistoryClient.tsx
"use client";

import { useEffect, useState } from "react";
import { useSyncOnChain } from "@/lib/hooks/useSyncOnChain";
import { useStakeStore } from "@/lib/store";
import { motion } from "framer-motion";
import Skeleton from "@/components/ui/Skeleton";

type Filter = "all" | "active" | "completed";


export default function HistoryPageClient() {
    // 1) Синхронизируем on-chain статусы
    useSyncOnChain(30000);
  const { history, loading, fetchHistory } = useStakeStore((s) => ({
    history: s.history,
    loading: s.loading,
    fetchHistory: s.fetchHistory,
  }));

  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  if (loading && history.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  const filtered = history
    .filter((r) => {
      if (filter === "active") return r.status === "active";
      if (filter === "completed") return r.status === "completed";
      return true;
    })
    .filter((r) =>
      r.validator.toLowerCase().includes(search.trim().toLowerCase())
    );

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto px-4 py-10 space-y-8"
    >
      <h1 className="text-2xl font-bold">История стейков</h1>

      <input
        type="text"
        placeholder="Поиск валидатора..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm px-4 py-2 border rounded-md"
      />

      <div className="flex gap-3 text-sm">
        {(
          [
            ["all", "Все"],
            ["active", "Активные"],
            ["completed", "Завершённые"],
          ] as [Filter, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1 rounded-md border ${
              filter === key
                ? "bg-blue-500 text-white"
                : "bg-gray-50 text-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">Ничего не найдено.</p>
      ) : (
        <div className="grid gap-4">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="p-4 border rounded bg-gray-50"
            >
              <div className="flex justify-between">
                <div>{r.validator}</div>
                <div className={r.status === "active" ? "text-green-600" : "text-gray-500"}>
                  {r.status === "active" ? "Активен" : "Завершён"}
                </div>
              </div>
              <div className="mt-1 text-sm">
                {r.amount} TON • {new Date(r.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.main>
  );
}
