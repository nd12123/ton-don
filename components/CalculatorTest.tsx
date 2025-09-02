"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import GoToStakingButton from "./GoToStakingButton";

type CalculatorProps = {
  amount: number;
  onAmountChange: (v: number) => void;
  sliderMin: number;
  sliderMax: number;
  days: number;
  onDaysChange: (v: number) => void;
  apr: number;              // можно не использовать, просто оставил для совместимости
  dailyEarnings: number;
};

const PLANS = [
  { label: "Basic",   min: 1,    iconSrc: "/decorative/basic icon.svg" },
  { label: "Pro",     min: 1000, iconSrc: "/decorative/pro icon.svg"   },
  { label: "Premium", min: 2000, iconSrc: "/decorative/super icon.svg" },
];

const getPlanByAmount = (v: number) =>
  v < 1000 ? "Basic" : v < 2000 ? "Pro" : "Premium";

export default function Calculator({
  amount,
  onAmountChange,
  sliderMin,
  sliderMax,
  days,
  onDaysChange,
  dailyEarnings,
}: CalculatorProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>(getPlanByAmount(amount));

  useEffect(() => {
    const auto = getPlanByAmount(amount);
    if (auto !== selectedPlan) setSelectedPlan(auto);
  }, [amount, selectedPlan]);

  return (
    <section
      className="
        relative rounded-[28px] border border-white/10
        bg-[radial-gradient(120%_120%_at_50%_0%,#3E5C89_0%,#171E38_100%)]
        shadow-[0_16px_60px_rgba(61,212,255,0.18)]
        outline outline-2 outline-offset-[-2px] outline-sky-400/60
        p-4 md:p-6
      "
    >
      {/* layout: на мобиле — столбцы, на десктопе — три колонки */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px,minmax(0,1fr),320px] gap-4 md:gap-6 items-stretch">
        {/* =========== ПЛАНЫ =========== */}
        <div className="flex flex-col">
          <div className="flex gap-2 md:gap-3 lg:flex-col">
            {PLANS.map((p) => {
              const active = p.label === selectedPlan;
              return (
                <button
                  key={p.label}
                  onClick={() => {
                    setSelectedPlan(p.label);
                    onAmountChange(p.min);
                  }}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 md:px-4 md:py-3 border transition
                    ${active ? "border-sky-400 bg-sky-400/15" : "border-white/15 hover:border-sky-400/60"}
                  `}
                >
                  {/* иконка */}
                  <img src={p.iconSrc} alt="" className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="text-sm md:text-base">{p.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 md:mt-4 lg:mt-auto">
            <GoToStakingButton className="
              w-full h-11 rounded-xl font-semibold
              bg-[#00C2FF] hover:bg-[#00A5E0] text-white
              shadow-[0_10px_30px_rgba(0,194,255,0.35)]
            ">
              Connect Wallet
            </GoToStakingButton>
          </div>
        </div>

        {/* вертикальный разделитель — только на lg+ */}
        <div className="hidden lg:block w-px my-1 bg-[rgba(59,71,114,1)]" />

        {/* =========== СЛАЙДЕРЫ =========== */}
        <div className="flex flex-col gap-5 md:gap-6">
          {/* Amount */}
          <div>
            <label className="block text-sm text-white/70 mb-2">
              Deposit amount
            </label>

            <div className="flex items-center gap-4 bg-[#1A2037] rounded-2xl px-3 md:px-4 py-2 md:py-3">
              <input
                type="number"
                value={amount}
                min={sliderMin}
                max={sliderMax}
                onChange={(e) => onAmountChange(Number(e.target.value))}
                className="w-24 md:w-28 text-lg font-semibold bg-transparent text-white text-center outline-none"
              />

              <input
                type="range"
                min={sliderMin}
                max={sliderMax}
                step={1}
                value={amount}
                onChange={(e) => onAmountChange(Number(e.target.value))}
                className="flex-1 accent-sky-400 h-2 rounded-full bg-white/10"
              />

              <img src="/decorative/ton2.png" alt="TON" className="w-7 h-7 md:w-8 md:h-8" />
            </div>
          </div>

          {/* Days */}
          <div>
            <label className="block text-sm text-white/70 mb-2">
              Deposit duration
            </label>

            <div className="flex items-center gap-4 bg-[#1A2037] rounded-2xl px-3 md:px-4 py-2 md:py-3">
              <input
                type="number"
                value={days}
                min={1}
                max={365}
                onChange={(e) => onDaysChange(Number(e.target.value))}
                className="w-24 md:w-28 text-lg font-semibold bg-transparent text-white text-center outline-none"
              />

              <input
                type="range"
                min={1}
                max={365}
                step={1}
                value={days}
                onChange={(e) => onDaysChange(Number(e.target.value))}
                className="flex-1 accent-sky-400 h-2 rounded-full bg-white/10"
              />

              <span className="text-sm text-white/80">Days</span>
            </div>
          </div>
        </div>

        {/* =========== РЕЗУЛЬТАТЫ =========== */}
        <div className="relative rounded-2xl border border-sky-500/30 overflow-hidden">
          {/* мягкий фон */}
          <Image
            src="/decorative/Rectangle.png"
            alt=""
            fill
            style={{ objectFit: "cover" }}
            className="opacity-100 pointer-events-none"
          />
          {/* контент */}
          <div className="relative z-10 p-4 md:p-5">
            <div className="grid grid-rows-3 divide-y divide-white/15 text-center">
              <div className="py-3">
                <p className="text-xs md:text-sm text-white/75">In 1 day</p>
                <p className="text-lg md:text-xl font-semibold">
                  +{dailyEarnings.toFixed(2)} TON
                </p>
              </div>
              <div className="py-3">
                <p className="text-xs md:text-sm text-white/75">In 7 days</p>
                <p className="text-lg md:text-xl font-semibold">
                  +{(dailyEarnings * 7).toFixed(2)} TON
                </p>
              </div>
              <div className="py-3">
                <p className="text-xs md:text-sm text-white/75">Investment period</p>
                <p className="text-lg md:text-xl font-semibold">
                  +{(dailyEarnings * days).toFixed(2)} TON
                </p>
              </div>
            </div>
          </div>

          {/* монетки — поменьше на мобиле */}
          <div className="pointer-events-none absolute -right-2 -top-4 w-16 h-16 md:w-20 md:h-20">
            <Image src="/decorative/ton6.png" alt="" fill style={{ objectFit: "contain" }} />
          </div>
          <div className="pointer-events-none absolute -left-6 -bottom-6 w-24 h-24 md:w-32 md:h-32">
            <Image src="/decorative/ton2.png" alt="" fill style={{ objectFit: "contain" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
