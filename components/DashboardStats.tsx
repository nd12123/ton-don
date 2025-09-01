// components/DashboardStats.tsx
"use client";

import { Plan } from "./Plans";
import { InfoCard } from "@/components/InfoCard";
import ConnectWalletButton from '@/components/ConnectWalletButton';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';

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
  //deposit,
  //plans,
}: DashboardStatsProps) {
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  // Ищем первый план, у которого min > deposit
  //const nextPlan = plans.find((p) => deposit < p.min);
  //const gap = nextPlan ? Math.max(0, nextPlan.min - deposit) : 0;

    {/*<section className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">*/}

  return (
    <section className="relative overflow-hidden rounded-[24px] border border-sky-500/30 bg-[#091634]/70 p-5 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
      </div>
      {/* Если есть следующий план — показываем gap
      {nextPlan && (
        <InfoCard
          title={`До плана "${nextPlan.name}"`}
          value={`${gap} TON`}
          subtitle={`минимум ${nextPlan.min} TON`}
        />
      )} */}

      {/* Asset value + connect */}
            <div className="mt-5 md:mt-6 rounded-2xl border border-sky-400/25 bg-white/5 px-4 py-4 flex items-center gap-3 justify-between">
              <div>
                <p className="uppercase text-[10px] tracking-wide text-sky-300/90">
                  Asset value <span className="italic text-[10px] opacity-80">updated hourly</span>
                </p>
                <p className="text-xl font-semibold">{balanceTon}</p>
              </div>
      
              {address ? (
                <div className="text-sky-300/90 text-sm px-4 py-2 rounded-xl border border-sky-400/30">
                  Connected
                </div>
              ) : (
                // если твой ConnectWalletButton сам открывает модалку — оставь его.
                // если нет — можно заменить на обычную кнопку и вызвать tonConnectUI.openModal()
                <div className="shrink-0">
                  <ConnectWalletButton />
                </div>
              )}
            </div>
    </section>
  );
}
