"use client";

import { useState } from "react";
import { useStakeStore } from "@/lib/store";
import { motion } from "framer-motion";

type Filter = "all" | "active" | "completed";

export default function Page() {
  const history = useStakeStore((s) => s.history);
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = history.filter((item) => {
    if (filter === "active") return item.status === "Active";
    if (filter === "completed") return item.status === "Completed";
    return true;
  });

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto px-4 py-10 space-y-6"
    >
      <h1 className="text-2xl font-bold">История стейков</h1>

      {/* Фильтры */}
      <div className="flex gap-3 text-sm">
        <FilterButton label="Все" active={filter === "all"} onClick={() => setFilter("all")} />
        <FilterButton label="Активные" active={filter === "active"} onClick={() => setFilter("active")} />
        <FilterButton label="Завершённые" active={filter === "completed"} onClick={() => setFilter("completed")} />
      </div>

      {/* Результаты */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">Пока ничего не найдено.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">{r.validator}</div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    r.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {r.status === "Active" ? "Активен" : "Завершён"}
                </span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
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
      className={`px-3 py-1 rounded-md border text-sm ${
        active
          ? "bg-blue-500 text-white border-blue-500"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}
