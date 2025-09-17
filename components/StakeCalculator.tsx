// components/StakeCalculator.tsx
"use client";

//import { useState } from "react";

export default function StakeCalculator({
  stakeAmount,
  setStakeAmount,
  duration,
  setDuration,
  apr,
}: {
  stakeAmount: number;
  setStakeAmount: (value: number) => void;
  duration: number;
  setDuration: (value: number) => void;
  apr: number; // теперь APR приходит в пропсах
}) {
  const earnings = (days: number) =>
    ((stakeAmount * (apr / 100)) / 365) * days;

  return (
    <div className="border p-6 rounded-xl shadow-sm bg-background-light dark:bg-gray-800 text-text-light dark:text-black dark:border-gray-700">
      <h3 className="text-lg font-semibold dark:text-blue-400">APR: {apr}%</h3>

      {/* Ввод суммы */}
      <div className="space-y-2">
        <label className="text-sm dark:text-gray-400">Сумма вклада</label>
        <input
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(Number(e.target.value))}
          min={10}
          className="w-full bg-gray-100 dark:bg-gray-700
      border border-gray-300 dark:border-gray-600
      text-gray-900 dark:text-gray-100
      placeholder-gray-500 dark:placeholder-gray-400
      px-4 py-3 rounded-lg mb-4
      focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="range"
          //min={100}
          //  step={1}      // если хочешь шаг в одну единицу
          min={1}
          max={5000}
          step={50}
          value={stakeAmount}
          onChange={(e) => setStakeAmount(Number(e.target.value))}
          className="   w-full bg-gray-100 dark:bg-gray-700
      border border-gray-300 dark:border-gray-600
      text-gray-900 dark:text-gray-100
      placeholder-gray-500 dark:placeholder-gray-400
      px-4 py-3 rounded-lg mb-4
      focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Срок */}
      <div>
        <label className="text-sm text-gray-600 dark:text-gray-400">
          Срок стейкинга: {duration} дней
        </label>
        <input
          type="range"
          min={7}
          max={365}
          step={1}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Доходность */}
      <div className="text-sm text-gray-700 space-y-1 pt-2 dark:text-blue-400">
        <p>За неделю: {earnings(7).toFixed(2)} TON</p>
        <p>За месяц: {earnings(30).toFixed(2)} TON</p>
        <p>За год: {earnings(365).toFixed(2)} TON</p>
        <p className="text-blue-600 font-medium">
          За {duration} дней: {earnings(duration).toFixed(2)} TON
        </p>
      </div>
    </div>
  );
}
