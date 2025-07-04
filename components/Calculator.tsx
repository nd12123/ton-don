"use client";

import React from "react";
import PlanCard from "./PlanCardMini";

type CalculatorProps = {
  amount: number;
  onAmountChange: (v: number) => void;
  sliderMin: number;
  sliderMax: number;
  days: number;
  onDaysChange: (v: number) => void;
  apr: number;
  dailyEarnings: number;
};

const PLANS = [
  { id: 0, label: "Basic",  iconSrc: "/decorative/basic icon.svg" },
  { id: 1, label: "Pro", iconSrc: "/decorative/pro icon.svg"   },
  { id: 2, label: "Premium", iconSrc: "/decorative/super icon.svg" },
];

export default function Calculator({
  amount,
  onAmountChange,
  sliderMin,
  sliderMax,
  days,
  onDaysChange,
  //apr,
  dailyEarnings,
}: CalculatorProps) {
  return (
    <div
      className="relative  rounded-[32px] border border-white/10 shadow-[0_0_60px_#00C2FF33] 
      px-6  md:px-12  flex flex-col lg:flex-row gap-10 justify-between" //py-10 md:py-14 ?? bg-[url('/ticket-bg.png')] bg-cover bg-center
    >
      {/* Левая секция — планы */}
      <div className="flex flex-col gap-2 w-full lg:w-[25%] py-6">
        {PLANS.map((plan, idx) => (
          <PlanCard key={plan.id} title={plan.label} 
          iconSrc={plan.iconSrc}
          isActive={idx === 0}
           />
        ))}
        <button className="bg-[#00C2FF] hover:bg-[#00A5E0] text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg">
          Connect Wallet
        </button>
      </div>

      {/* Центральная секция — слайдеры */}
      <div className="flex flex-col gap-2 w-full lg:w-[50%] py-6"//
      >
        <div>
          <label className="block text-sm text-white/70 mb-2 font-medium">
            Deposit amount:
            <span className="text-white font-bold ml-2">{amount} TON</span>
          </label>
          <input
            type="range"
            min={sliderMin}
            max={sliderMax}
            step={10}
            value={amount}
            onChange={(e) => onAmountChange(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg cursor-pointer accent-[#00C2FF]"
          />
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-2 font-medium">
            Duration:
            <span className="text-white font-bold ml-2">{days} days</span>
          </label>
          <input
            type="range"
            min={1}
            max={365}
            step={1}
            value={days}
            onChange={(e) => onDaysChange(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg cursor-pointer accent-[#00C2FF]"
          />
        </div>
      </div>

      {/* Правая секция — доходы */}
      <div
  className="relative bg-[url('/decorative/Rectangle.png')] h-450px w-300 bg-contain bg-center justify-between" // w-fullshadow-[0_0_60px_#00C2FF55] rounded-[28px] lg:w-[25%] px-6 py-8
  style={{
    backgroundPosition: "center top",
    opacity: 1,
    backgroundRepeat: "no-repeat",}}
  >
  {/* Пунктирная линия — вертикальная 
    <div className="absolute left-0 top-4 bottom-4 w-px border-l border-dashed border-white/30"></div>
      <div className="absolute right-0 top-4 bottom-4 w-px border-l border-dashed border-white/30"></div>
*/}
  {/* Earnings блок
    <div className="bg-white/10 backdrop-blur-sm rounded-xl space-y-3 text-white text-base">
  </div>
  */}
      <div className="bg-white/10  rounded-xl space-y-6 text-white text-base py-1" //backdrop-blur-sm
      >

    <div className="flex justify-between">
      <span>In 1 day</span>
      <span>+{dailyEarnings.toFixed(2)} TON</span>
    </div>
    <div className="flex justify-between py-1">
      <span>In 7 days</span>
      <span>+{(dailyEarnings * 7).toFixed(2)} TON</span>
    </div>
    <div className="flex justify-between font-semibold py-1">
      <span>In 30 days</span>
      <span>+{(dailyEarnings * 30).toFixed(2)} TON</span>
    </div>

    </div>

</div>

{/*<div className="flex flex-col gap-4 justify-between w-full lg:w-[25%]">
        <div className="bg-[#00C2FF]/10 backdrop-blur-md rounded-xl p-6 space-y-4">
          <div className="flex justify-between text-white/90 text-base">
            <span>In 1 day</span>
            <span>+{dailyEarnings.toFixed(2)} TON</span>
          </div>
          <div className="flex justify-between text-white/90 text-base">
            <span>In 7 days</span>
            <span>+{(dailyEarnings * 7).toFixed(2)} TON</span>
          </div>
          <div className="flex justify-between text-white text-base font-semibold">
            <span>In 30 days</span>
            <span>+{(dailyEarnings * 30).toFixed(2)} TON</span>
          </div>
        </div>
      </div>

*/}
      
    </div>
  );
}

/*
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
  //const inThirtyDays = dailyEarnings * 30; // за 30 дней

  return (
    <div className="relative overflow-hidden bg-[#0F1B3F] rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <div className="flex flex-col justify-between">
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
*/