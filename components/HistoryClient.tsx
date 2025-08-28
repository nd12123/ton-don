// components/HistoryClient.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  RealtimePostgresChangesPayload,
  RealtimeChannel,
} from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useStakeStore, StakeRecord } from "@/lib/store";
import Skeleton from "@/components/ui/Skeleton";
import { plannedProfit } from "@/lib/earnings";
import { useTonAddress, useIsConnectionRestored } from "@tonconnect/ui-react";

type Filter = "all" | "active" | "completed";

export default function HistoryClient() {
  const restored = useIsConnectionRestored();        // ← ждём восстановление TC
  const address = useTonAddress();                   // EQ... | undefined | ''

  const history      = useStakeStore((s) => s.history);
  const loading      = useStakeStore((s) => s.loading);
  const fetchHistory = useStakeStore((s) => s.fetchHistory);

  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // ждём пока TonConnect восстановится и появится адрес
    if (!restored) return;
    if (!address) return;

    // очистим прошлые данные (чтобы не мигало «ничего не найдено» на чужих данных)
    useStakeStore.setState({ history: [], loading: true });

    // 1) первичная загрузка
    fetchHistory(address);

    // 2) realtime только по этому адресу
    // ВАЖНО: замените 'owner' на реальное поле в вашей таблице (например wallet, user, account и т.п.)
    const channel: RealtimeChannel = supabase
      .channel(`public:stakes:${address}`)
      .on<StakeRecord>(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "stakes", filter: `owner=eq.${address}` },
        (payload: RealtimePostgresChangesPayload<StakeRecord>) => {
          const rec = payload.new as StakeRecord;
          useStakeStore.setState((state) => ({ history: [rec, ...state.history] }));
        }
      )
      .on<StakeRecord>(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "stakes", filter: `owner=eq.${address}` },
        (payload: RealtimePostgresChangesPayload<StakeRecord>) => {
          const rec = payload.new as StakeRecord;
          useStakeStore.setState((state) => ({
            history: state.history.map((r) => (r.id === rec.id ? rec : r)),
          }));
        }
      )
      .subscribe();

    return () => {
      // корректно отписываемся при смене адреса/размонте
      supabase.removeChannel(channel);
      // альтернативно: channel.unsubscribe();
    };
  }, [restored, address, fetchHistory]);

  // ====== Рендер с правильными состояниями ======

  // пока TonConnect восстанавливается — просто скелетон (или ваш лоадер)
  if (!restored) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
      </div>
    );
  }

  // TonConnect восстановился, но кошелёк не подключён
  if (!address) {
    return <p className="text-gray-500 text-sm px-4 py-10">Подключите кошелёк в шапке.</p>;
  }

  // первая загрузка именно для ТЕКУЩЕГО адреса
  if (loading && history.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
      </div>
    );
  }

  const filtered = history
    .filter((r) => (filter === "active" ? r.status === "active" : filter === "completed" ? r.status === "completed" : true))
    .filter((r) => r.validator?.toLowerCase().includes(search.trim().toLowerCase()));

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
        className="w-full max-w-sm px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
      />

      <div className="flex gap-3 text-sm">
        {([["all","Все"],["active","Активные"],["completed","Завершённые"]] as [Filter,string][])
          .map(([key,label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1 rounded-md border transition-colors ${
                filter === key
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">Ничего не найдено.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((r: StakeRecord) => (
            <div key={r.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium dark:text-gray-100">{r.validator}</div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  r.status === "active"
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300"
                }`}>
                  {r.status === "active" ? "Активен" : "Завершён"}
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {r.amount} TON • {new Date(r.created_at).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200 mt-2">
                Плановый доход: <b>{plannedProfit(r).toFixed(2)} TON</b>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.main>
  );
}
