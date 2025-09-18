// Mobile Only!
"use client";

import GoToStakingButton from "./GoToStakingButton";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useT } from "@/i18n/react";

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

const PLAN_BG_ACTIVE = "/decorative/plan-row-bg.svg";

// ⚠️ ключи стабильные, лейблы тянем из локалей по ключам
const PLANS = [
  { key: "basic" as const,   min: 10,   iconSrc: "/decorative/basic icon.svg" },
  { key: "pro" as const,     min: 1000, iconSrc: "/decorative/pro icon.svg"   },
  { key: "premium" as const, min: 2000, iconSrc: "/decorative/super icon.svg" },
];

type PlanKey = typeof PLANS[number]["key"];

function getPlanKeyByAmount(amount: number): PlanKey {
  if (amount < 1000) return "basic";
  if (amount < 2000) return "pro";
  return "premium";
}

export default function CalculatorHorizontal({
  amount,
  onAmountChange,
  sliderMin,
  sliderMax,
  days,
  onDaysChange,
  // apr,           // не используется в этом компоненте
  dailyEarnings,   // используется в твоиx карточках ниже
}: CalculatorProps) {
  const tHome = useT("home");
  const tStaking = useT("staking");
  const tCommon = useT("common");

  const [selectedPlanKey, setSelectedPlanKey] = useState<PlanKey>(getPlanKeyByAmount(amount));

  // автообновление выбранного плана при изменении суммы
  useEffect(() => {
    const nextKey = getPlanKeyByAmount(amount);
    if (nextKey !== selectedPlanKey) setSelectedPlanKey(nextKey);
  }, [amount, selectedPlanKey]);

  const amountLabel = tStaking("inputs.amount");
  const daysLabel   = tStaking("inputs.days");
  const connectTxt  = tCommon("buttons.connect");

  return (
    <div
      className="relative rounded-[20px]
                 pl-0 pt-3 gap-0 md:gap-2 flex flex-row justify-between backdrop-blur-sm
                 bg-[radial-gradient(ellipse_90.67%_90.68%_at_51.85%_6.45%,_#3E5C89_0%,_#171E38_100%)]
                 border border-white/10
                 shadow-[1px_15px_48.9px_0px_rgba(61,212,255,0.18)]
                 outline outline-[1px] outline-offset-[-2px] outline-sky-400"
    >
      {/* Левая колонка: планы */}
      <div className="flex flex-col w-[46%] pl-2 pr-0 pt-0 pb-1 gap-0 relative overflow-visible z-10">
        {PLANS.map((plan) => {
          const active = selectedPlanKey === plan.key;
          const title  = tHome(`plans.${plan.key}.label`);
          return (
            <button
              key={plan.key}
              onClick={() => { onAmountChange(plan.min); setSelectedPlanKey(plan.key); }}
              aria-pressed={active}
              className="relative w-full flex items-center gap-2 px-0 pt-3 pb-1"
              style={
                active
                  ? {
                      backgroundImage: `url('${PLAN_BG_ACTIVE}')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center",
                    }
                  : { background: "transparent" }
              }
            >
              <Image src={plan.iconSrc} alt={title} width={24} height={24} className="shrink-0 pb-2" />
              <span className="text-white text-[14px] font-semibold leading-none pb-2">
                {title}
              </span>

              {/* правая синяя кромка, перекрывает сепаратор на 2px */}
              {active && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-0 h-[41px] w-[3px] z-20 pt-2"
                  style={{
                    right: "calc(var(--overlap, 1px) * -1)",
                    background: "linear-gradient(180deg,#3DD4FF 0%,#0098EA 100%)",
                    boxShadow: "0 0 8px rgba(0,194,255,0.40)",
                  }}
                />
              )}
            </button>
          );
        })}

        <div className="px-1 pb-1">
          <GoToStakingButton
            className="btn-primary text-[11px] w-[95%] h-auto
                       bg-[#00C2FF] hover:bg-[#00A5E0] text-white px-1 py-[2px]
                       rounded-xl font-semibold transition-all shadow-lg"
          >
            {connectTxt}
          </GoToStakingButton>
        </div>
      </div>

      {/* Вертикальный сепаратор */}
      <div
        className="self-stretch w-[3px] h-[120px] pt-3 mx-0"
        style={{ background: "rgba(59,71,114,1)" }}
      />

      {/* Правая колонка: инпуты и слайдеры */}
      <div className="flex flex-col gap-1 w-full relative pb-2 px-2">
        <label className="text-white/80 text-[15px] font-medium">
          {amountLabel}
        </label>

        <div className="flex items-center gap-1 bg-[#1F1F2C] rounded-2xl px-2 py-1">
          {/* Amount input */}
          <input
            type="number"
            value={amount}
            min={sliderMin}
            max={sliderMax}
            onChange={(e) => onAmountChange(Number(e.target.value))}
            className="bg-transparent text-white text-lg font-semibold outline-none text-center"
          />
          {/* Slider */}
          <input
            type="range"
            min={sliderMin}
            max={sliderMax}
            step={1}
            value={amount}
            onChange={(e) => onAmountChange(Number(e.target.value))}
            className="w-full h-2 appearance-none bg-[#00C2FF]/30 rounded-full relative"
          />
          {/* Icon */}
          <Image src="/decorative/ton2.png" alt="TON" width={32} height={32} />
        </div>

        <div className="flex flex-col gap-1 w-full relative">
          <label className="text-white/80 text-[15px] font-medium">
            {daysLabel}
          </label>

          <div className="flex items-center gap-2 bg-[#1F1F2C] rounded-2xl px-2 py-1 w-full">
            {/* Days input */}
            <input
              type="number"
              value={days}
              min={sliderMin}
              max={365}
              onChange={(e) => onDaysChange(Number(e.target.value))}
              className="w-[100px] bg-transparent text-white text-lg font-semibold outline-none text-center"
            />
            {/* Slider */}
            <input
              type="range"
              min={sliderMin}
              max={365}
              step={1}
              value={days}
              onChange={(e) => onDaysChange(Number(e.target.value))}
              className="w-full h-2 appearance-none bg-[#00C2FF]/30 rounded-full relative"
            />
            {/* "Days" справа дублировать не нужно — лейбл выше уже локализован */}
          </div>
        </div>
      </div>

      {/* Декор-монеты */}
      <div className="absolute top-[-30px] right-[-15px] pointer-events-none z-0">
        <div className="relative w-[60px] h-[60px] ">
          <Image src="/decorative/ton6.png" alt="Ton Coin Right" fill style={{ objectFit: "contain" }} />
        </div>
      </div>

      <div className="absolute bottom-[-35px] md:bottom-[-50px] right-[190px] pointer-events-none z-0">
        <div className="relative w-[80px] h-[80px]">
          <Image src="/decorative/ton2.png" alt="Ton Coin Center" fill style={{ objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );
}


{/**
  </div>
  </div>
</div>
      <div
  className="relative w-[350px] h-[220px] rounded-b-[28px] shadow-[0_0_60px_#00C2FF55] overflow-hidden"
>
  <img
    src="/decorative/Rectangle.png"
    alt="background"
    className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
  />

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
 */}
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