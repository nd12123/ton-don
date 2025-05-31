// components/CalculateAndPlans.tsx
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

/**
 * Этот компонент выводит:
 *  1) Три карточки тарифов. 
 *     - При клике выделяется выбранная карточка.
 *  2) Блок калькулятора, в который передаётся массив тарифов (PLANS),
 *     чтобы он использовал те же APR и iconSrc при переключении табов.
 */
export default function CalculateAndPlans() {
  // 1. Локальный стейт: индекс активного плана (зелёным обведётся PlanCard)
  const [selectedPlanIdx, setSelectedPlanIdx] = useState<number>(0);

  return (
    <section className="py-20 bg-[#081028] text-white">
      {/* === 5.1 Блок с тремя карточками === */}
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

      {/* === 5.2 Блок калькулятора === */}
      <div className="max-w-6xl mx-auto px-4">
        <Calculator plans={PLANS} />
      </div>
    </section>
  );
}
