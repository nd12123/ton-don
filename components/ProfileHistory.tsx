// components/ProfileHistory.tsx
"use client";

import { useMemo, useState } from "react";
import { plannedProfit, actualProfit } from "@/lib/earnings";
import type { StakeRecord } from "@/lib/store";
import { useT } from "@/i18n/react";

type Filter = "all" | "active" | "completed";

interface ProfileHistoryProps {
  history: StakeRecord[];
  onWithdrawClick?: (stake: StakeRecord) => void;
}

export default function ProfileHistory({ history, onWithdrawClick }: ProfileHistoryProps) {
  const t = useT("profile");

  // безопасный фолбэк: если ключ не найден — показать запасной текст
  const tf = (key: string, fallback: string) => {
    const v = t(key);
    return v === key ? fallback : v;
  };

  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const FILTER_LABELS: Record<Filter, string> = {
    all:       tf("filters.all", "All"),
    active:    tf("filters.active", "Active"),
    completed: tf("filters.completed", "Completed"),
  };

  const STATUS_LABELS: Record<"active" | "completed", string> = {
    active:    tf("status.active", "Active"),
    completed: tf("status.completed", "Completed"),
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return history
      .filter((r) =>
        filter === "active" ? r.status === "active"
        : filter === "completed" ? r.status === "completed"
        : true
      )
      .filter((r) => (r.validator || "").toLowerCase().includes(q));
  }, [history, filter, search]);

  const chip = (status: StakeRecord["status"]) =>
    status === "active"
      ? "bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300"
      : "bg-gray-200 text-gray-600 dark:bg-gray-700/60 dark:text-gray-300";

  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString();

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          type="text"
          placeholder={tf("search.placeholder", "Search validator…")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-xs px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
        />
        <div className="flex gap-2">
          {(Object.keys(FILTER_LABELS) as Filter[]).map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1 rounded-md border text-sm transition ${
                filter === key
                  ? "bg-sky-500 text-white border-sky-500"
                  : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {FILTER_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">{tf("empty", "Nothing found.")}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((r) => {
            const planned = plannedProfit(r);
            const earned  = actualProfit(r);
            return (
              <div
                key={r.id}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/70 p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium dark:text-gray-100">
                    {r.validator || "—"}
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${chip(r.status)}`}>
                    {STATUS_LABELS[r.status as "active" | "completed"] ?? r.status}
                  </span>
                </div>

                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {r.amount} TON • {fmtDate(r.created_at)}
                  {r.apr != null && r.duration != null && (
                    <span className="ml-2 opacity-80">
                      • {tf("labels.apr", "APR")} {r.apr}% • {r.duration}{tf("labels.daysShort", "d")}
                    </span>
                  )}
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  <div className="rounded-lg border border-white/10 bg-white/30 dark:bg-white/5 px-3 py-2">
                    <div className="text-[11px] text-gray-600 dark:text-gray-400">{tf("labels.plannedIncome", "Planned income")}</div>
                    <div className="font-semibold">{planned.toFixed(2)} TON</div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/30 dark:bg-white/5 px-3 py-2">
                    <div className="text-[11px] text-gray-600 dark:text-gray-400">{tf("labels.earned", "Earned")}</div>
                    <div className="font-semibold">{earned.toFixed(2)} TON</div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/30 dark:bg-white/5 px-3 py-2">
                    <div className="text-[11px] text-gray-600 dark:text-gray-400">{tf("labels.status", "Status")}</div>
                    <div className="font-semibold">
                      {STATUS_LABELS[r.status as "active" | "completed"] ?? r.status}
                    </div>
                  </div>
                </div>

                {r.status === "active" && onWithdrawClick && (
                  <div className="mt-3">
                    <button
                      onClick={() => onWithdrawClick(r)}
                      className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm
                                 bg-transparent border border-sky-400 text-sky-300
                                 hover:bg-sky-400/10 transition"
                    >
                      {tf("buttons.withdraw", "Withdraw")}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
