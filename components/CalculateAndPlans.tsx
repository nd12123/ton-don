// components/CalculateAndPlans.tsx
"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import PlanCard from "./PlanCard";
import Calculator from "./Calculator";
import CalculatorTest from "./CalculatorMobile";


import tonTop from "@/assets/Calculator/ton.svg"
import sphere from "@/assets/Calculator/Ellipse9.png"

const PLANS = [
  { id: 0, label: "Basic",   apr:  4, min:    1, rangeText: "1–999 TON",      iconSrc: "/decorative/basic icon.svg", bgSrc: "/decorative/stepsRight.png"},
  { id: 1, label: "Pro",     apr:  7, min: 1000, rangeText: "1000–1 999 TON", iconSrc: "/decorative/pro icon.svg", bgSrc: "/decorative/stepsCardBg.svg"   },
  { id: 2, label: "Premium", apr: 10, min: 2000, rangeText: "2000+ TON",      iconSrc: "/decorative/super icon.svg", bgSrc: "/decorative/stepsLeft.png" },
];

export default function CalculateAndPlans() {
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);
  const [amount, setAmount] = useState(PLANS[0].min);
  const [days,   setDays]   = useState(30);

  const handlePlanSelect = (idx: number) => {
    setSelectedPlanIdx(idx);
    setAmount(PLANS[idx].min);
  };
  const handleAmountChange = (v: number) => {
    setAmount(v);
    const newIdx = PLANS
      .map((p, i) => ({ min: p.min, idx: i }))
      .filter(p => v >= p.min)
      .pop()!.idx;
    if (newIdx !== selectedPlanIdx) setSelectedPlanIdx(newIdx);
  };
  const apr = PLANS[selectedPlanIdx].apr;
  const dailyEarnings = useMemo(() => (amount * (apr/100)) / 365, [amount, apr]);

  return ( //py-20 pt-[200px] lg:pt-[375px]
    <section id="calculate-plans" className="relative overflow-hidden text-white pb-7 pt-0   scroll-mt-12" //lg:
    >
      {/* — плавный градиент сверху в центре для плавного стыка
      
  <div
    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[400px] h-[200px] pointer-events-none z-0"
    style={{
      background: 'radial-gradient(circle at center top, rgba(26,32,58,1) 0%, rgba(26,32,58,0) 100%)'
    }}
  />
  
<div
  className="absolute top-0 center w-full h-20 z-0"
  style={{
    background: "linear-gradient(to top, transparent,rgba(26,32,58,1))",
    WebkitMaskImage: "linear-gradient(to right,rgb(26, 34, 72) 90%, transparent 100%)",
    maskImage: "linear-gradient(to right, rgb(26, 34, 72) 90%, transparent 100%)"
  }}
  />
   <div
  className="absolute top-0 left-0 w-full h-20 pointer-events-none z-0 " //opacity-50
  style={{
    backgroundImage: "linear-gradient(to right, #0A1329 0%, rgba(10,19,41,0) 100%)"
  }}
/>
   */}

   {/**
<div
  className="absolute top-0 left-0 w-full h-20 pointer-events-none z-0 opacity-50"
  style={{
    backgroundImage: [
      // 1) сильное затемнение левого низа:
      "radial-gradient(circle at bottom left, rgba(6, 11, 25, 0.8) 0%, rgba(10,19,41,0) 70%)",
      "linear-gradient(to right, #0A1329 0%, rgba(10,19,41,0) 100%)",
      // 2) чуть более тёмный левый верх, стирающийся к центру по вертикали:
      //"linear-gradient(to bottom, rgba(10,19,41,0.6) 0%, rgba(10,19,41,0) 100%)",
      // 3) плавный убывающий вправо цвет сверху:
      //"linear-gradient(to right, rgba(10,19,41,1) 0%, rgba(10,19,41,0) 80%)"
    ].join(", ")
  }}
/>
    * 
    */}


{/* ==== Тон-интро перед основным блоком ==== */}
<div className="relative mb-8 flex items-center justify-center pointer-events-none">
  {/* Большая полупрозрачная сфера позади текста */}
  <div className="absolute w-[170px] h-[170px] top-[5px] right-[460px] opacity-99 z-[1]">
    <Image
      src={sphere}
      alt="Background Sphere"
      fill
      style={{
        objectFit: "contain",
        //objectPosition: "right center",
      }}
    />
  </div>
 {/* небольшая TON-иконка справа от текста */}
 <div className="absolute w-[160px] h-[160px] top-[5px] right-[450px] ml-4 z-[2]">
    <Image
      src={tonTop}        // или тот файл, который у тебя для маленькой монеты
      alt="TON Icon"
      fill
      style={{ objectFit: "contain",
        //objectPosition: "right center",
       }}
    />
  </div>
</div>
{/* --- Главный текст из макета Figma --- */}
<div className="max-w-6xl mx-auto px-4 relative z-10 pb-8 md:pb-16"> 
  <h1 className="font-inter font-bold text-[50px] leading-[48px] md:text-[70px] md:leading-[68px] text-white">
    Choose a <span className="text-[#00C2FF]">plan</span> and<br/>
    <span className="text-[#00C2FF]">Calculate</span> your <span className="text-[#00C2FF]">Profit</span>
  </h1>
</div>
      {/* 2) Горизонт (основной фон) */}
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden">
  <div
    style={{
      position: "absolute",
      top: "0px", // двигаем НИЖЕ
      bottom: "100px",
      left: 0,
      right: 0,
      height: "110%",
    }}
  >
    <Image
      src="/decorative/radius-bg.png"
      alt="horizon"
      fill
      style={{
        objectFit: "cover",
        //objectPosition: "center top",
        opacity: 0.40, 
        //opacity: 0.9,
      }}
    />
  </div>
</div>


      <div className="max-w-6xl mx-auto px-2 md:px-6 pb-6">
        {/* === 3) Карточки планов === */}
        <div className="grid grid-cols-3 gap-x-2 md:gap-x-4 md:gap-x-16 gap-y-4 md:gap-y-8 mb-4 md:mb-16" //grid-cols-1 md: 
        >
          {PLANS.map((plan, idx) => (
            <PlanCard
              key={plan.id}
              title={plan.label}
              dailyProfit={plan.apr}
              rangeText={plan.rangeText}
              iconSrc={plan.iconSrc}
              isActive={idx === selectedPlanIdx}
              //bgSrc={plan.bgSrc}
              onSelect={() => handlePlanSelect(idx)}
            />
          ))}
        </div>

{/* Mobile-only */}
<div className="md:hidden">
  <CalculatorTest
    amount={amount}
    onAmountChange={handleAmountChange}
    sliderMin={PLANS[0].min}
    sliderMax={5000}
    days={days}
    onDaysChange={setDays}
    apr={apr}
    dailyEarnings={dailyEarnings}
  />
</div>

{/* Desktop-only */}
<div className="hidden md:block">
  <Calculator
    amount={amount}
    onAmountChange={handleAmountChange}
    sliderMin={PLANS[0].min}
    sliderMax={5000}
    days={days}
    onDaysChange={setDays}
    apr={apr}
    dailyEarnings={dailyEarnings}
  />
</div>
</div>

      {/* 5) Левый «сфера-хвост» */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none -z-10">
        <Image
          src="/decorative/EllipseLeftPlans.png"
          alt=""
          fill
          style={{ objectFit: "contain", objectPosition: "left center", opacity: 0.6 }}
        />
      </div>

      {/* 6) Правый «сфера-хвост» */}
      <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none -z-10">
        <Image
          src="/decorative/EllipseRightPlans.png"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "right center", opacity: 0.3 }}
        />
      </div>

      
{/* 1) Декоративный звёздный шум (сверхвысокий слой, чуть прозрачный)  //w-full h-full inset-0*/}
<div className="absolute top-0 right-0 w-80 h-80 pointer-events-none -z-30 stars-mask">
<Image
  src="/decorative/stars-bg3.png"
  alt="stars"
  fill
  style={{
    objectFit: "contain",
    objectPosition: "right top",
    opacity: 0.1,
    maskImage: "radial-gradient(circle at center, black 70%, transparent 100%)",
    WebkitMaskImage: "radial-gradient(circle at center, black 70%, transparent 100%)",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskSize: "cover",
    WebkitMaskSize: "cover"
  }}
/>

      </div>
      {/**
       *  //<div className="absolute bottom-0 left-0 w-full h-30 bg-gradient-to-b from-transparent to-[#0A0D1C] z-0" //<div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-[#00C2FF22] to-[#0A0D1C] z-0" />
      />
       */}
{/* Плавный оверлей внизу секции «Планы + калькулятор» 
<div
  className="absolute inset-x-0 bottom-0 h-7 pointer-events-none z-10 opacity-15"
  style={{
    backgroundImage: [
      // слабый общий фон вверх-вниз для сглаживания верхней границы FAQ
      "linear-gradient(180deg, rgba(10,19,41,0) 0%, rgba(10,19,41,0.6) 50%, rgba(10,19,41,1) 100%)",
      // легкий радиальный блюр по центру низа
      "radial-gradient(circle at 50% 100%, rgba(10,19,41,0) 0%, rgba(10,19,41,1) 80%)"
    ].join(", ")
  }}
/>
    */}

    </section>
  );
}


/*
// components/CalculateAndPlans.tsx
"use client";
import React, { useState, useEffect, useMemo } from "react";
import PlanCard from "./PlanCard";
import Calculator from "./Calculator";

const PLANS = [
  { id: 0, label: "Basic",   apr:  4, min:    1, rangeText: "1–999 TON", iconSrc: "/decorative/basic icon.svg"  },
  { id: 1, label: "Pro",     apr:  7, min: 1000, rangeText: "1000–1 999 TON", iconSrc: "/decorative/pro icon.svg"    },
  { id: 2, label: "Premium", apr: 10, min: 2000, rangeText: "2000+ TON",     iconSrc: "/decorative/premium icon.svg" },
];

export default function CalculateAndPlans() {
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);
  const [amount, setAmount] = useState<number>(PLANS[0].min);
  const [days, setDays] = useState<number>(30);

  // Когда меняем план — сбрасываем сумму на min
  useEffect(() => {
    setAmount(PLANS[selectedPlanIdx].min);
  }, [selectedPlanIdx]);

  const apr = PLANS[selectedPlanIdx].apr;
  const dailyEarnings = useMemo(
    () => (amount * (apr / 100)) / 365,
    [amount, apr]
  );

  // Прокидываем в калькулятор и минимум/максимум суммы
  return (
    <section className="py-20 bg-[#081028] text-white">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {PLANS.map((plan, idx) => (
          <PlanCard
            key={plan.id}
            title={plan.label}
            dailyProfit={plan.apr}
            rangeText={plan.rangeText}
            iconSrc={plan.iconSrc}
            isActive={idx === selectedPlanIdx}
            onSelect={() => setSelectedPlanIdx(idx)}
          />
        ))}
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <Calculator
          amount={amount}
          onAmountChange={setAmount}
          minAmount={PLANS[selectedPlanIdx].min}
          maxAmount={5000}
          days={days}
          onDaysChange={setDays}
          apr={apr}
          dailyEarnings={dailyEarnings}
        />
      </div>
    </section>
  );
}
*/

// components/CalculateAndPlans.tsx
/**
 * Этот компонент выводит:
 *  1) Три карточки тарифов. 
 *     - При клике выделяется выбранная карточка.
 *  2) Блок калькулятора, в который передаётся массив тарифов (PLANS),
 *     чтобы он использовал те же APR и iconSrc при переключении табов.
 */


/*
import React, { useState } from "react";
import PlanCard from "./PlanCard";
import Calculator from "./Calculator"; //Stake

// Пути к иконкам в public/decorative:
const PLANS = [
  {
    id: 0,
    label: "Basic",
    apr: 4,
    rangeText: "10–899 TON",
    iconSrc: "/decorative/basic icon.svg",
  },
  {
    id: 1,
    label: "Pro",
    apr: 4,
    rangeText: "10–899 TON",
    iconSrc: "/decorative/pro icon.svg",
  },
  {
    id: 2,
    label: "Super",
    apr: 10,
    rangeText: "1900+ TON",
    iconSrc: "/decorative/super icon.svg",
  },
];


export default function CalculateAndPlans() {
  // 1. Локальный стейт: индекс активного плана (зелёным обведётся PlanCard)
  const [selectedPlanIdx, setSelectedPlanIdx] = useState<number>(0);

  return (
    <section className="py-20 bg-[#081028] text-white">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {PLANS.map((plan, idx) => (
          <PlanCard
            key={plan.id}
            title={plan.label}
            dailyProfit={plan.apr}
            rangeText={plan.rangeText}
            iconSrc={plan.iconSrc}
            isActive={idx === selectedPlanIdx}
            onSelect={() => setSelectedPlanIdx(idx)}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <Calculator plans={PLANS} />
      </div>
    </section>
  );
}
*/