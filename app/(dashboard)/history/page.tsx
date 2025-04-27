// app/(dashboard)/history/page.tsx
"use client";

import { useState,  } from "react";
import { useStakeStore } from "@/lib/store";
import { motion } from "framer-motion";

type Filter = "all" | "active" | "completed";

export default function HistoryPage() {
  const history = useStakeStore((s) => s.history);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const filtered = history
    .filter((item) =>
      filter === "active"
        ? item.status === "Active"
        : filter === "completed"
        ? item.status === "Completed"
        : true
    )
    .filter((item) =>
      item.validator.toLowerCase().includes(search.trim().toLowerCase())
    );

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto px-4 py-10 space-y-8"
    >
      <h1 className="text-2xl font-bold">История стейков</h1>

      {/* Поиск */}
      <input
        type="text"
        placeholder="Поиск валидатора..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
      />

      {/* Фильтры */}
      <div className="flex gap-3 text-sm">
        <FilterButton
          label="Все"
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <FilterButton
          label="Активные"
          active={filter === "active"}
          onClick={() => setFilter("active")}
        />
        <FilterButton
          label="Завершённые"
          active={filter === "completed"}
          onClick={() => setFilter("completed")}
        />
      </div>

      {/* Результаты */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">Ничего не найдено.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium dark:text-gray-100">
                  {r.validator}
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    r.status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {r.status === "Active" ? "Активен" : "Завершён"}
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {r.amount} TON • {r.date}
              </div>
            </div>
          ))}
        </div>
      )}

    </motion.main>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-md border text-sm transition-colors ${
        active
          ? "bg-blue-500 text-white border-blue-500"
          : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
      }`}
    >
      {label}
    </button>
  );
}
