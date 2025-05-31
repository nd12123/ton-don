// components/Calculator.tsx
"use client";

import React, { useState, useMemo } from "react";
import TabButton from "./ui/TabButton";

// Для слайдера можно использовать обычный <input type="range"> без сторонних либ
type CalculatorProps = {
  plans: {
    id: number;
    label: string;
    iconSrc: string;
    apr: number;             // процент APR, например 4 или 10
  }[];
};

export default function Calculator({ plans }: CalculatorProps) {
  // 1. Состояния для табов (выбранный тариф), суммы и дней
  const [activePlanIdx, setActivePlanIdx] = useState<number>(0); // индекс в массиве plans
  const [amount, setAmount] = useState<number>(1000);            // по умолчанию 1000 TON
  const [days, setDays] = useState<number>(30);

  // 2. Получаем APR текущего тарифа
  const activePlan = plans[activePlanIdx];
  const apr = activePlan.apr;

  // 3. Рассчитаем доход на 1 день, 24 часа, 30 дней
  const dailyEarnings = useMemo(() => {
    // Простая формула: profit = amount * (apr/100) / 365 * duration
    // Но для “24 hours” – это как за 1 день, duration = 1
    return (amount * (apr / 100)) / 365;
  }, [amount, apr]);

  const inOneDay = dailyEarnings * 1;     // за 1 день
  const inThirtyDays = dailyEarnings * 30; // за 30 дней

  return (
    <div className="relative overflow-hidden bg-[#0F1B3F] rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 4.1 Табы + кнопка «Connect Wallet» (левая колонка) */}
      <div className="flex flex-col">
        <div className="flex mb-4">
          {plans.map((plan, idx) => (
            <TabButton
              key={plan.id}
              label={plan.label}
              iconSrc={plan.iconSrc}
              isActive={idx === activePlanIdx}
              onClick={() => setActivePlanIdx(idx)}
            />
          ))}
        </div>
        <button className="mt-auto bg-[#00BFFF] hover:bg-[#00A5E0] text-white px-4 py-2 rounded-lg text-center font-medium transition-shadow shadow-md">
          Connect Wallet
        </button>
      </div>

      {/* 4.2 Слайдеры (средняя колонка) */}
      <div className="flex flex-col justify-between">
        {/* Слайдер «Deposit amount» */}
        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-2">
            Deposit amount: <span className="text-white font-medium">{amount} TON</span>
          </label>
          <input
            type="range"
            min={10}
            max={5000}
            step={10}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full accent-[#00BFFF] h-2 bg-gray-700 rounded-lg cursor-pointer"
          />
        </div>

        {/* Слайдер «Number of days» */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Number of days you want to invest:{" "}
            <span className="text-white font-medium">{days} Days</span>
          </label>
          <input
            type="range"
            min={1}
            max={365}
            step={1}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full accent-[#00BFFF] h-2 bg-gray-700 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* 4.3 Результаты (правая колонка) */}
      <div className="flex flex-col justify-center">
        <div className="bg-[#00C2FF]/10 rounded-lg p-4 space-y-4">
          <div>
            <p className="text-xs text-gray-300">You will receive in 24 hours:</p>
            <p className="text-xl font-bold text-white">
              +{inOneDay.toFixed(2)} TON
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-300">You will receive in 1 day:</p>
            <p className="text-xl font-bold text-white">
              +{inOneDay.toFixed(2)} TON
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-300">You will receive in {days} days:</p>
            <p className="text-xl font-bold text-white">
              +{(dailyEarnings * days).toFixed(2)} TON
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
