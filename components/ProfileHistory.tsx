'use client';

import { useMemo, useState } from 'react';
import { plannedProfit, actualProfit } from '@/lib/earnings';
import type { StakeRecord } from '@/lib/store';

type Filter = 'all' | 'active' | 'completed';

interface ProfileHistoryProps {
  history: StakeRecord[];
  onWithdrawClick?: (stake: StakeRecord) => void;
}

export default function ProfileHistory({ history, onWithdrawClick }: ProfileHistoryProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return history
      .filter(r =>
        filter === 'active' ? r.status === 'active'
        : filter === 'completed' ? r.status === 'completed'
        : true
      )
      .filter(r => (r.validator || '').toLowerCase().includes(q));
  }, [history, filter, search]);

  const chip = (status: StakeRecord['status']) =>
    status === 'active'
      ? 'bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300'
      : 'bg-gray-200 text-gray-600 dark:bg-gray-700/60 dark:text-gray-300';

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          type="text"
          placeholder="Поиск валидатора…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-xs px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
        />
        <div className="flex gap-2">
          {([['all','Все'],['active','Активные'],['completed','Завершённые']] as [Filter,string][])
            .map(([key,label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1 rounded-md border text-sm transition ${
                  filter === key
                    ? 'bg-sky-500 text-white border-sky-500'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">Ничего не найдено.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((r) => {
            const date = new Date(r.created_at).toLocaleDateString('ru-RU');
            const planned = plannedProfit(r);
            const earned  = actualProfit(r);
            return (
              <div
                key={r.id}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/70 p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium dark:text-gray-100">
                    {r.validator || '—'}
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${chip(r.status)}`}>
                    {r.status === 'active' ? 'Активен' : 'Завершён'}
                  </span>
                </div>

                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {r.amount} TON • {date}
                  {r.apr != null && r.duration != null && (
                    <span className="ml-2 opacity-80">• APR {r.apr}% • {r.duration}д</span>
                  )}
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  <div className="rounded-lg border border-white/10 bg-white/30 dark:bg-white/5 px-3 py-2">
                    <div className="text-[11px] text-gray-600 dark:text-gray-400">Плановый доход</div>
                    <div className="font-semibold">{planned.toFixed(2)} TON</div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/30 dark:bg-white/5 px-3 py-2">
                    <div className="text-[11px] text-gray-600 dark:text-gray-400">Заработано</div>
                    <div className="font-semibold">{earned.toFixed(2)} TON</div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/30 dark:bg-white/5 px-3 py-2">
                    <div className="text-[11px] text-gray-600 dark:text-gray-400">Статус</div>
                    <div className="font-semibold capitalize">{r.status}</div>
                  </div>
                </div>

                {r.status === 'active' && onWithdrawClick && (
                  <div className="mt-3">
                    <button
                      onClick={() => onWithdrawClick(r)}
                      className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm
                                 bg-transparent border border-sky-400 text-sky-300
                                 hover:bg-sky-400/10 transition"
                    >
                      Withdraw
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
