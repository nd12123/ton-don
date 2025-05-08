// components/DashboardStats.tsx
"use client";

import { Plan } from "./Plans";
import { InfoCard } from "@/components/InfoCard";

interface DashboardStatsProps {
  balanceTon: number;
  dailyIncomeTon: number;
  totalIncomeTon: number;
  priceUsd: number;
  deposit: number;
  plans: Plan[];
}

export default function DashboardStats({
  balanceTon,
  dailyIncomeTon,
  totalIncomeTon,
  priceUsd,
  deposit,
  plans,
}: DashboardStatsProps) {
  // Ищем первый план, у которого min > deposit
  const nextPlan = plans.find((p) => deposit < p.min);
  const gap = nextPlan ? Math.max(0, nextPlan.min - deposit) : 0;

  return (
    <section className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      <InfoCard
        title="Баланс"
        value={`${balanceTon.toFixed(2)} TON`}
        subtitle={`≈ $${(balanceTon * priceUsd).toFixed(2)}`}
      />
      <InfoCard
        title="Ежедневный доход"
        value={`${dailyIncomeTon.toFixed(4)} TON`}
        subtitle={`≈ $${(dailyIncomeTon * priceUsd).toFixed(4)}`}
      />
      <InfoCard
        title="Общий доход"
        value={`${totalIncomeTon.toFixed(2)} TON`}
        subtitle={`≈ $${(totalIncomeTon * priceUsd).toFixed(2)}`}
      />

      {/* Если есть следующий план — показываем gap */}
      {nextPlan && (
        <InfoCard
          title={`До плана "${nextPlan.name}"`}
          value={`${gap} TON`}
          subtitle={`минимум ${nextPlan.min} TON`}
        />
      )}
    </section>
  );
}
