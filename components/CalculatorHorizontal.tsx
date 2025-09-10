//Mobile Only!
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
const PLAN_BG_ACTIVE = "/decorative/plan-row-bg.svg";

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

export default function CalculatorHorizontal({
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
      className="relative  rounded-[20px] border border-white/10 
      pl-0 pt-3 gap-0 md:gap-2 flex flex-row  /*items-stretch justify-start*/ justify-between   backdrop-blur-sm
      bg-[radial-gradient(ellipse_90.67%_90.68%_at_51.85%_6.45%,_#3E5C89_0%,_#171E38_100%)]
      shadow-[1px_15px_48.9px_0px_rgba(61,212,255,0.18)]
      outline outline-[2px] outline-offset-[-2px] outline-sky-400
      "      //py-10 md:py-14 ?? bg-[url('/ticket-bg.png')] bg-cover bg-center bg-[#101426]/80 shadow-[0_0_60px_#00C2FF33] //flex-col lg:
    >
      {/* Левая секция — планы */}
{/* Левая секция — планы (мобилка, без фона у неактивных) */}
<div className="flex flex-col w-[46%] pl-2 pr-0 pt-0 gap-0 relative overflow-hidden">
  {PLANS.map((plan) => {
    const active = selectedPlan === plan.label;
    return (
      <button
        key={plan.label}
        onClick={() => { onAmountChange(plan.min); setSelectedPlan(plan.label); }}
        aria-pressed={active}
        className={[
          "relative isolate w-full flex items-center gap-2 px-0 pt-3 pb-1",
          " ",
          // никаких бордеров/маргинов — ряды вплотную
          /* rounded-none first:rounded-t-xl last:rounded-b-xl */
        ].join(" ")}
        style={
          active
            ? {
                backgroundImage: `url('${PLAN_BG_ACTIVE}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
              }
            : { background: "transparent" } // <— у неактивных фона нет
        }
      >
        <img src={plan.iconSrc} alt={plan.label} className="w-5 h-6 shrink-0 pb-2" />
        <span className="text-white text-[16px] font-semibold leading-none pb-2">{plan.label}</span>
      </button>
    );
  })}
        <div className="px-1 pb-2">
                            <GoToStakingButton className="btn-primary text-[10px] w-[90%] h-auto
            bg-[#00C2FF] hover:bg-[#00A5E0] text-white px-0 py-0 rounded-xl font-semibold transition-all shadow-lg
          ">Connect Wallet</GoToStakingButton>
        </div>
      </div>
{/* === Наша новая линия-сепаратор === 
<div
          className="h-[140px] w-[2px] my-2" //my-3
          style={{ background: "rgba(59, 71, 114, 1)" }}
        />*/}
{/* Вертикальный сепаратор — БЕЗ отступов сверху/снизу и слева/справа */}
{/* Вертикальный сепаратор — стык в стык */}
<div
  className="self-stretch w-[3px] pt-3 mx-0"
  style={{ background: "rgba(59,71,114,1)" }}
/>


      {/* Центральная секция — слайдеры */}
      <div className="flex flex-col gap-1 w-full relative pb-2 px-2">
  <label className="text-white/80 text-[15px] font-medium">
    Deposit amount
  </label>

  <div className="flex items-center gap-1 bg-[#1F1F2C] rounded-2xl px-2 py-1" // w-full
  >
    {/* Ammount Инпут */}
    <input
      type="number"
      value={amount}
      min={sliderMin}
      max={sliderMax}
      onChange={(e) => onAmountChange(Number(e.target.value))}
      className=" bg-transparent text-white text-lg font-semibold outline-none text-center" //w-[100px]
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
  <div className="flex flex-col gap-1 w-full relative">
  <label className="text-white/80 text-[15px] font-medium">
    Deposit duration
  </label>

  <div className="flex items-center gap-2 bg-[#1F1F2C] rounded-2xl px-2 py-1 w-full">
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
    <label className="text-white/80 text-[14px] font-medium">
    Days
  </label>
</div>
</div>
</div>

{/* === Декоративные TON-монетки под калькулятором ===  inset-x-0  flex justify-center  animate-float-slow delay-1000 gap-8 */}
<div className="absolute top-[-30px] right-[-15px] pointer-events-none z-0">
  {/* Правая монета */}
  <div className="relative w-[60px] h-[60px] ">
    <Image
      src="/decorative/ton6.png"
      alt="Ton Coin Right"
      fill
      style={{ objectFit: "contain" }}
    />
  </div>
</div>

<div className="absolute bottom-[-35px] md:bottom-[-50px] right-[205px]  pointer-events-none z-0" //gap-8 
> 
  {/* Центральная монета чуть большего размера animate-float-slow delay-500 */}
  <div className="relative w-[80px] h-[80px]  ">
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