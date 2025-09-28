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

// ── helpers: completed-by-time + derived status ─────────────────────────────
function isCompletedByTime(r: StakeRecord, now = Date.now()): boolean {
  const started = new Date(r.created_at).getTime();
  const endAt = started + r.duration * 86400000;
  return now >= endAt;
}
function derivedStatus(r: StakeRecord): "active" | "completed" | "withdrawn" {
  if (r.status === "withdrawn") return "withdrawn";
  return isCompletedByTime(r) ? "completed" : "active";
}
// ───────────────────────────────────────────────────────────────────────────

export default function ProfileHistory({ history, onWithdrawClick }: ProfileHistoryProps) {
  const t = useT("profile");
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

  const STATUS_LABELS: Record<"active" | "completed" | "withdrawn", string> = {
    active:    tf("status.active", "Active"),
    completed: tf("status.completed", "Completed"),
    withdrawn: tf("status.withdrawn", "Withdrawn"),
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return history
      .map((r) => ({ ...r, _ds: derivedStatus(r) }))
      .filter((r) =>
        filter === "active" ? r._ds === "active"
        : filter === "completed" ? r._ds === "completed"
        : true
      )
      .filter((r) => (r.validator || "").toLowerCase().includes(q));
  }, [history, filter, search]);

  // → dark-only chips
  const chip = (s: "active" | "completed" | "withdrawn") =>
    s === "active"
      ? "bg-emerald-900/40 text-emerald-300"
      : s === "completed"
      ? "bg-amber-900/40 text-amber-300"
      : "bg-slate-800/70 text-slate-300";

  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString();

  return (
    // ✅ тёмный контейнер вне зависимости от темы
    <section className="space-y-4 text-sky-50">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          type="text"
          placeholder={tf("search.placeholder", "Search validator…")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-xs px-4 py-2 rounded-md
                     border border-[#1f2e4a] bg-[#0F1B2E] text-sky-50
                     placeholder:text-sky-200/40
                     focus:outline-none focus:ring-2 focus:ring-sky-500/50"
        />

        <div className="flex gap-2">
          {(Object.keys(FILTER_LABELS) as Filter[]).map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1 rounded-md border text-sm transition
                ${filter === key
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-[#0F1B2E] text-sky-200 border-[#1f2e4a] hover:bg-[#12203a]"}`}
            >
              {FILTER_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sky-200/70 text-sm">{tf("empty", "Nothing found.")}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((r) => {
            const planned = plannedProfit(r);
            const earned  = actualProfit(r);
            const s = derivedStatus(r);

            return (
              <div
                key={r.id}
                className="rounded-xl border border-[#1f2e4a] bg-[#0F1B2E] p-4 shadow-[0_14px_40px_rgba(0,174,255,0.08)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-sky-300">
                    {r.validator || "—"}
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${chip(s)}`}>
                    {STATUS_LABELS[s]}
                  </span>
                </div>

                <div className="mt-1 text-sm text-sky-200/90">
                  {r.amount} TON • {fmtDate(r.created_at)}
                  {r.apr != null && r.duration != null && (
                    <span className="ml-2 opacity-80">
                      • {tf("labels.apr", "APR")} {r.apr}% • {r.duration}{tf("labels.daysShort", "d")}
                    </span>
                  )}
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <div className="text-[11px] text-sky-300/70">{tf("labels.plannedIncome", "Planned income")}</div>
                    <div className="font-semibold text-sky-50">{planned.toFixed(2)} TON</div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <div className="text-[11px] text-sky-300/70">{tf("labels.earned", "Earned")}</div>
                    <div className="font-semibold text-sky-50">{earned.toFixed(2)} TON</div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <div className="text-[11px] text-sky-300/70">{tf("labels.status", "Status")}</div>
                    <div className="font-semibold text-sky-50">{STATUS_LABELS[s]}</div>
                  </div>
                </div>

                {s === "completed" && onWithdrawClick && (
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
