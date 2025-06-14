// components/CalculateAndPlans.tsx
"use client";
import React, { useState, useMemo } from "react";
import PlanCard from "./PlanCard";
import Calculator from "./Calculator";

const PLANS = [
  { id: 0, label: "Basic",   apr:  4, min:    1, rangeText: "1–999 TON",      iconSrc: "/decorative/basic icon.svg" },
  { id: 1, label: "Pro",     apr:  7, min: 1000, rangeText: "1000–1 999 TON", iconSrc: "/decorative/pro icon.svg"   },
  { id: 2, label: "Premium", apr: 10, min: 2000, rangeText: "2000+ TON",      iconSrc: "/decorative/super icon.svg" },
];

export default function CalculateAndPlans() {
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);
  const [amount, setAmount] = useState(PLANS[0].min);
  const [days,   setDays]   = useState(30);

  // 1) Клик по карточке — просто устанавливаем amount = min этого тарифа
  const handlePlanSelect = (idx: number) => {
    setSelectedPlanIdx(idx);
    setAmount(PLANS[idx].min);
  };

  // 2) При движении слайдера — ищем, в каком плане сейчас оказались
  const handleAmountChange = (v: number) => {
    setAmount(v);
    // находим самый «высокий» план, чей min <= v
    const newIdx = PLANS
      .map((p, i) => ({ min: p.min, idx: i }))
      .filter(p => v >= p.min)
      .pop()!.idx;
    if (newIdx !== selectedPlanIdx) {
      setSelectedPlanIdx(newIdx);
    }
  };

  const apr = PLANS[selectedPlanIdx].apr;
  const dailyEarnings = useMemo(
    () => (amount * (apr / 100)) / 365,
    [amount, apr]
  );

  return (
     <section className="bg-bg-primary text-white"> {/*<section className="py-20 bg-[#081028] text-white"></section>*/}

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {PLANS.map((plan, idx) => (
          <PlanCard
            key={plan.id}
            title={plan.label}
            dailyProfit={plan.apr}
            rangeText={plan.rangeText}
            iconSrc={plan.iconSrc}
            isActive={idx === selectedPlanIdx}
            onSelect={() => handlePlanSelect(idx)}
          />
        ))}
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <Calculator
          amount={amount}
          onAmountChange={handleAmountChange}
          sliderMin={PLANS[0].min}   // всегда 1
          sliderMax={5000}
          days={days}
          onDaysChange={setDays}
          apr={apr}
          dailyEarnings={dailyEarnings}
        />
      </div>
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