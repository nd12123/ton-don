"use client";
import GoToStakingButton from "./GoToStakingButton";
import React, { useEffect, useState } from "react";
//import PlanCard from "./PlanCardMini";
import Image from 'next/image'
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
  { id: 0, label: "Basic", min: 1,  iconSrc: "/decorative/basic icon.svg" },
  { id: 1, label: "Pro", min: 1000, iconSrc: "/decorative/pro icon.svg"   },
  { id: 2, label: "Premium", min: 2000, iconSrc: "/decorative/super icon.svg" },
];

function getPlanByAmount(amount: number): string {
  if (amount < 1000) return "Basic";
  if (amount < 2000) return "Pro";
  return "Premium";
}

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
  const [selectedPlan, setSelectedPlan] = useState<string>(getPlanByAmount(amount));
// Автообновление плана при изменении amount
useEffect(() => {
  const autoPlan = getPlanByAmount(amount);
  if (autoPlan !== selectedPlan) {
    setSelectedPlan(autoPlan);
  }
}, [amount, selectedPlan]);

  return (
    <div
      className="relative  rounded-[32px] border border-white/10 
      px-5  md:px-8  flex flex-col lg:flex-row gap-3 justify-between  backdrop-blur-sm
      bg-[radial-gradient(ellipse_90.67%_90.68%_at_51.85%_6.45%,_#3E5C89_0%,_#171E38_100%)]
      shadow-[1px_15px_48.9px_0px_rgba(61,212,255,0.18)]
      outline outline-[3px] outline-offset-[-3px] outline-sky-400
      "      //py-10 md:py-14 ?? bg-[url('/ticket-bg.png')] bg-cover bg-center bg-[#101426]/80 shadow-[0_0_60px_#00C2FF33] 
    >
      {/* Левая секция — планы */}
      <div className="flex flex-col gap-2 w-full lg:w-[25%] py-6">
        {PLANS.map((plan) => (
          <button
            key={plan.label}
            onClick={() => {
              onAmountChange(plan.min);
              setSelectedPlan(plan.label);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:border-[#00C2FF] ${
              selectedPlan === plan.label
                ? "bg-[#00C2FF]/20 border-[#00C2FF]"
                : "border-white/20"
            }`}
          >
            <img src={plan.iconSrc} alt={plan.label} className="w-5 h-5" />
            <span className="text-white text-sm font-medium">{plan.label}</span>
          </button>
        ))}
        
                            <GoToStakingButton className="btn-primary
            bg-[#00C2FF] hover:bg-[#00A5E0] text-white px-2 py-2 rounded-xl font-semibold transition-all shadow-lg
          ">Connect Wallet</GoToStakingButton>
        
      </div>
{/* === Наша новая линия-сепаратор === */}
<div
          className="h-[180px] w-[2px] my-6"
          style={{ background: "rgba(59, 71, 114, 1)" }}
        />

      {/* Центральная секция — слайдеры */}
      <div className="flex flex-col gap-2 w-full relative py-6">
  <label className="text-white/80 text-sm font-medium">
    Deposit amount
  </label>

  <div className="flex items-center gap-4 bg-[#1F1F2C] rounded-2xl px-4 py-2 w-full">
    {/* Ammount Инпут */}
    <input
      type="number"
      value={amount}
      min={sliderMin}
      max={sliderMax}
      onChange={(e) => onAmountChange(Number(e.target.value))}
      className="w-[100px] bg-transparent text-white text-lg font-semibold outline-none text-center"
    />

    {/* Слайдер */}
    <input
      type="range"
      min={sliderMin}
      max={sliderMax}
      step={1}
      value={amount}
      onChange={(e) => onAmountChange(Number(e.target.value))}
      className="w-full h-2 appearance-none bg-[#00C2FF]/30 rounded-full relative"
    />

    {/* Иконка справа */}
    <img
      src="/decorative/ton2.png"
      alt="TON"
      className="w-8 h-8"
    />
  </div>
  <div className="flex flex-col gap-2 w-full relative">
  <label className="text-white/80 text-sm font-medium">
    Deposit duration
  </label>

  <div className="flex items-center gap-4 bg-[#1F1F2C] rounded-2xl px-4 py-2 w-full">
    {/* Days Инпут */}
    <input
      type="number"
      value={days}
      min={sliderMin}
      max={365}
      onChange={(e) => onDaysChange(Number(e.target.value))}
      className="w-[100px] bg-transparent text-white text-lg font-semibold outline-none text-center"
    />

    {/* Слайдер */}
    <input
      type="range"
      min={sliderMin}
      max={365}
      step={1}
      value={days}
      onChange={(e) => onDaysChange(Number(e.target.value))}
      className="w-full h-2 appearance-none bg-[#00C2FF]/30 rounded-full relative"
    />

    {/*  справа */}
    <label className="text-white/80 text-sm font-medium">
    Days
  </label>

  </div>
  </div>
  
</div>



      <div
  className="relative w-[350px] h-[220px] rounded-b-[28px] shadow-[0_0_60px_#00C2FF55] overflow-hidden"
>
  {/* Фон — уменьшен по высоте, без скруглений сверху */}
  <img
    src="/decorative/Rectangle.png"
    alt="background"
    className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
  />

  {/* Вертикальные пунктирные границы 
  <div className="absolute left-0 top-6 bottom-6 w-px border-l border-dashed border-white/30 z-10"></div>
  <div className="absolute right-0 top-6 bottom-6 w-px border-l border-dashed border-white/30 z-10"></div>
*/}
  {/* Контент — уменьшен паддинг и отступы */}
  <div className="relative z-10 flex flex-col justify-center h-full px-5 pb-4 pt-1 text-white  gap-4">
    <div className="flex flex-col justify-center items-center h-[32px]">
      <span className="text-sm text-white/80">In 1 day</span>
      <span className="text-xl font-medium">+{dailyEarnings.toFixed(2)} TON</span>
    </div>

    <div
      className="w-full h-[10px] bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/decorative/Separator.png')" }}
    />

    <div className="flex flex-col justify-center items-center h-[32px]">
      <span className="text-sm text-white/80">In 7 days</span>
      <span className="text-xl font-medium">+{(dailyEarnings * 7).toFixed(2)} TON</span>
    </div>

    <div
      className="w-full h-[10px] bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/decorative/Separator.png')" }}
    />

    <div className="flex flex-col justify-center items-center h-[32px]">
      <span className="text-sm text-white/80">Investment period</span>
      <span className="text-xl font-medium">+{(dailyEarnings * days).toFixed(2)} TON</span>
    </div>
  </div>

</div>


{/* === Декоративные TON-монетки под калькулятором ===  inset-x-0  flex justify-center  animate-float-slow delay-1000 gap-8 */}
<div className="absolute top-[-30px] right-[-15px] pointer-events-none z-0">
  {/* Правая монета */}
  <div className="relative w-[96px] h-[96px] ">
    <Image
      src="/decorative/ton6.png"
      alt="Ton Coin Right"
      fill
      style={{ objectFit: "contain" }}
    />
  </div>
</div>

<div className="absolute bottom-[-50px] right-[210px]  pointer-events-none z-0" //gap-8 
> 
  {/* Центральная монета чуть большего размера animate-float-slow delay-500 */}
  <div className="relative w-[128px] h-[128px]  ">
    <Image
      src="/decorative/ton2.png"
      alt="Ton Coin Center"
      fill
      style={{ objectFit: "contain",
        //objectPosition: "center top",
       }}
    />
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
     
      {/**<div className="bg-white/10  rounded-xl space-y-6 text-white text-base py-1" //backdrop-blur-sm
      >
          </div>
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