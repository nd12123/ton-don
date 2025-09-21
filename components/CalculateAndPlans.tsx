// components/CalculateAndPlans.tsx
"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import PlanCard from "./PlanCard";
import PlanCardDesktop from "./PlanCardDesktop";
import Calculator from "./Calculator";
//import CalculatorTest from "./CalculatorMobile";
import CalculatorHorizontal from "./CalculatorHorizontal";
import { useRouter, usePathname } from "next/navigation";

import { useT } from '@/i18n/react';


import tonTop from "@/assets/Calculator/ton.svg"
import tonTopMobile from "@/assets/Calculator/ton.png"
import sphere from "@/assets/Calculator/Ellipse9.png"

const PLANS = [
  { id: 0, label: "Basic",   apr:  4, min:    10, rangeText: "1–999 TON",      iconSrc: "/decorative/basic icon.svg", bgSrc: "/decorative/stepsRight.png"},
  { id: 1, label: "Pro",     apr:  7, min: 1000, rangeText: "1000–1999 TON", iconSrc: "/decorative/pro icon.svg", bgSrc: "/decorative/stepsCardBg.svg"   },
  { id: 2, label: "Premium", apr: 10, min: 2000, rangeText: "2000+ TON",      iconSrc: "/decorative/super icon.svg", bgSrc: "/decorative/stepsLeft.png" },
];

export default function CalculateAndPlans() {
  const router = useRouter();
  const pathname = usePathname();

  // берём текущий префикс локали из URL ("/ru", "/en")
  const locale = (pathname?.split("/")[1] || "ru") as "ru" | "en";
  const stakingHref = `/${locale}/staking`;

  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);
  const [amount, setAmount] = useState(PLANS[0].min);
  const [days,   setDays]   = useState(30);

  const handlePlanSelect = (idx: number) => {
    if (idx === selectedPlanIdx) {
      // повторный клик по уже выбранной карточке → идём на стейкинг
      router.push(stakingHref);
      return;
    }
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
  const dailyEarnings = useMemo(() => (amount * (apr/100)) , [amount, apr]); // /365

  const t = useT("home");
  // ключи для словаря: plans.basic / plans.pro / plans.premium
  const PLAN_KEYS = ["basic", "pro", "premium"] as const;
  const in1day  = t("calc.cards.in1day");      // "In 1 day" / "За 1 день" и т.п.
  const in7days = t("calc.cards.in7days");     // "In 7 days"
  const inNDays = t("calc.cards.inNDays").replace("{days}", String(days)); // "In {days} days"

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
  <div className="absolute w-[170px] h-[170px] top-[5px] right-[32px] md:right-[210px] opacity-99 z-[1]">
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
 <div className="absolute hidden md:block h-[48px] md:h-[160px] md:w-[160px] w-[48px] top-[15px] right-[35px] md:right-[150px] lg:right-[200px] ml-4 z-[2]">
    <Image
      src={tonTop}        // или тот файл, который у тебя для маленькой монеты
      alt="TON Icon"
      fill
      style={{ objectFit: "contain",
        //objectPosition: "right center",
       }}
    />
  </div>

 <div className="absolute md:hidden h-[48px] md:h-[160px] md:w-[160px] w-[48px] top-[15px] right-[35px] md:right-[200px] ml-4 z-[2]">
    <Image
      src={tonTopMobile}        // или тот файл, который у тебя для маленькой монеты
      alt="TON Icon"
      fill
      style={{ objectFit: "contain",
        //objectPosition: "right center",
       }}
    />
  </div>
</div>
{/* --- Главный текст из макета Figma --- */}
  {/* ---- Локализованный заголовок ----
         Разбиваем на части, чтобы подсветить отдельные слова.
         Строки сами живут в messages/{locale}.json */}
      <div className="max-w-6xl mx-auto px-4 mt-2 md:mt-8 2xl:mt-12 relative z-10 pb-7 md:pb-16">
        <h1 className="font-inter font-bold text-[32px] leading-[35px] md:text-[70px] md:leading-[68px] text-white">
          {t("calc.h1.choose")}{" "}
          <span className="text-[#00C2FF]">{t("calc.h1.plan")}</span> {t("calc.h1.and")}<br />
          <span className="text-[#00C2FF]">{t("calc.h1.calculate")}</span> {t("calc.h1.your")}{" "}
          <span className="text-[#00C2FF]">{t("calc.h1.profit")}</span>
        </h1>
      </div>
      {/* 2) Горизонт (основной фон) md:hidden */}
      <div className=" hidden absolute inset-0 pointer-events-none -z-20 overflow-hidden">
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

{/* 2) Фон секции: все слои в одном контейнере + маска по Y   hidden md: */}
<div
  className="block
    absolute inset-0 -z-30 pointer-events-none
    [--fade:clamp(36px,8vw,120px)]  /* высота растворения сверху/снизу */
  "
  style={{
        backgroundColor: '#0A1324',

    WebkitMaskImage:
      "linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,1) var(--fade), rgba(0,0,0,1) calc(100% - var(--fade)), rgba(0,0,0,0) 100%)",
    maskImage:
      "linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,1) var(--fade), rgba(0,0,0,1) calc(100% - var(--fade)), rgba(0,0,0,0) 100%)",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  }}
>
  {/* Горизонт */}
  <Image
    src="/decorative/radius-bg.png"
    alt="horizon"
    fill
    priority
    style={{
      objectFit: "cover",
      opacity: 0.40,
    }}
  />

  {/* Левый «хвост» */}
  <Image
    src="/decorative/EllipseLeftPlans.png"
    alt=""
    fill
    style={{
      objectFit: "contain",
      objectPosition: "left center",
      opacity: 0.6,
    }}
  />


  {/* Звёздная «пылинка» */}
  <div className="hidden absolute top-0 right-0 w-80 h-80">
    <Image
      src="/decorative/stars-bg3.png"
      alt="stars"
      fill
      style={{
        objectFit: "contain",
        objectPosition: "right top",
        opacity: 0.1,
      }}
    />
  </div>
</div>


      <div className="max-w-6xl mx-auto px-2 md:px-6 pb-6">
        {/* === 3) Карточки планов === */}
        <div className=" md:hidden grid grid-cols-3 gap-x-3 md:gap-x-16 gap-y-2 md:gap-y-8 mb-6 md:mb-16" //grid-cols-1 md: 
        >
          {PLANS.map((plan, idx) => (
            <PlanCard
              key={plan.id}
              title={t(`plans.${PLAN_KEYS[idx]}.label`)}
              dailyProfit={plan.apr}
              rangeText={t(`plans.${PLAN_KEYS[idx]}.range`)}
              iconSrc={plan.iconSrc}
              isActive={idx === selectedPlanIdx}
              bgSrc={plan.bgSrc}
              onSelect={() => handlePlanSelect(idx)}
            />
          ))}
        </div>
        <div className="hidden md:grid grid-cols-3 gap-x-3 md:gap-x-16 gap-y-2 md:gap-y-8 mb-6 md:mb-16" //grid-cols-1 md: 
        >
          {PLANS.map((plan, idx) => (
            <PlanCardDesktop
              key={plan.id}
              title={t(`plans.${PLAN_KEYS[idx]}.label`)}
              dailyProfit={plan.apr}
              rangeText={t(`plans.${PLAN_KEYS[idx]}.range`)}
              iconSrc={plan.iconSrc}
              isActive={idx === selectedPlanIdx}
              //bgSrc={plan.bgSrc}
              bgClass={
    // любой стабильный вариант, лишь бы совпадал с твоими css-утилитами:
    // например, если у тебя есть .bg-plan-basic/.bg-plan-pro/.bg-plan-premium
    `bg-plan-${["basic","pro","premium"][plan.id]}`
    // или, если у тебя в данных есть key:
    // `bg-plan-${plan.key}`
  }
              onSelect={() => handlePlanSelect(idx)}
            />
          ))}
        </div>
        

{/* Mobile-only CalculatorTest */}
<div className="md:hidden mt-1">
  <CalculatorHorizontal
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
<div className="hidden md:block mb-6">
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
      <div className="md:hidden absolute bottom-0 left-0 w-full h-full pointer-events-none -z-10">
        <Image
          src="/decorative/EllipseLeftPlans.png"
          alt=""
          fill
          style={{ objectFit: "contain", objectPosition: "left center", opacity: 0.6 }}
        />
      </div>

      {/* 6) Правый «сфера-хвост» */}
      <div className="block md:hidden absolute bottom-0 right-0 w-full h-full pointer-events-none -z-10">
        <Image
          src="/decorative/EllipseRightPlans.png"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "right center", opacity: 0.3 }}
        />
      </div>
{/* 6) Правый «хвост» — топ-фейд, без фейда снизу  */}
<div className="hidden md:block absolute bottom-0 right-0 w-full h-full pointer-events-none -z-10">
  <div
    className="
      absolute inset-0
      [--fade-top:clamp(24px,7vw,120px)]   
      md:[--fade-top:clamp(36px,8vw,160px)]
    "
    style={{
      WebkitMaskImage:
        "linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,1) var(--fade-top), rgba(0,0,0,1) 100%)",
      maskImage:
        "linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,1) var(--fade-top), rgba(0,0,0,1) 100%)",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
    }}
  >
    <Image
      src="/decorative/EllipseRightPlans.png"
      alt=""
      fill
      style={{
        objectFit: "cover",
        objectPosition: "right center",
        opacity: 0.42,
      }}
    />
  </div>
</div> 
      
{/* 1) Декоративный звёздный шум (сверхвысокий слой, чуть прозрачный)  //w-full h-full inset-0*/}
<div className="md:hidden absolute top-0 right-0 w-80 h-80 pointer-events-none -z-30 stars-mask">
<Image
  src="/decorative/stars-bg3.png"
  alt="stars"
  fill
  style={{
    objectFit: "contain",
    objectPosition: "right top",
    opacity: 0.03,
    maskImage: "radial-gradient(circle at center, black 70%, transparent 100%)",
    WebkitMaskImage: "radial-gradient(circle at center, black 70%, transparent 100%)",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskSize: "cover",
    WebkitMaskSize: "cover"
  }}
/>

      </div>

<div className="block md:hidden relative z-10 w-full px-4 pb-2 py-2 text-white">
  <div className="grid grid-cols-3 gap-4">
    {/* Карточка 1 */}
    <div className="relative group rounded-2xl px-1 py-1 flex flex-col items-center justify-center overflow-hidden min-h-[48px]">
      {/* Фон-картинка одинаковая у всех трёх */}
      <Image
        src="/decorative/Input.svg"
        alt=""
        fill
        priority
        className="object-cover -z-20 pointer-events-none"
      />
      {/* Мягкое свечение поверх фона (но под текстом) */}
      <div className="py-3 absolute inset-0 -z-10 pointer-events-none bg-gradient-to-br from-white/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
      
      <span className="text-[14px] font-semibold text-white/80">{in1day}</span>
      <span className="text-m font-bold text-center">+{dailyEarnings.toFixed(2)} <br/> TON</span>
    </div>

    {/* Карточка 2 */}
    <div className="relative group rounded-2xl px-1 py-1 flex flex-col items-center justify-center overflow-hidden min-h-[48px]">
      <Image
        src="/decorative/Input.svg"
        alt=""
        fill
        className="object-cover -z-20 pointer-events-none"
      />
      <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-br from-white/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
      
      <span className="text-[14px] font-semibold text-white/80">{in7days}</span>
      <span className="text-m font-bold text-center">+{(dailyEarnings * 7).toFixed(2)} <br/> TON</span>
    </div>

    {/* Карточка 3 */}
    <div className="relative group rounded-2xl px-1 py-1 flex flex-col items-center justify-center overflow-hidden min-h-[48px]">
      <Image
        src="/decorative/Input.svg"
        alt=""
        fill
        className="object-cover -z-20 pointer-events-none"
      />
      <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-br from-white/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
      
      <span className="text-[14px] font-semibold text-white/80 text-center"> {inNDays} </span>
      <span className="text-m font-bold text-center">+{(dailyEarnings * days).toFixed(0)} <br/> TON</span>
    </div>
  </div>
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