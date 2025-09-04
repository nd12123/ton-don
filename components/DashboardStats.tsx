// components/DashboardStats.tsx
"use client";

import { Plan } from "./Plans";
import { InfoCard } from "@/components/InfoCard";
import ConnectWalletButton from '@/components/ConnectWalletButton';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import Image from "next/image";
interface DashboardStatsProps {
  balanceTon: number;
  dailyIncomeTon: number;
  totalIncomeTon: number;
  priceUsd: number;
  deposit: number;
  plans: Plan[];
}

  
type StatCardProps = {
  title: string;
  valueTon: string;
  valueUsd: string;
  iconSrc: string;
};
function ton(v = 0, digits = 2) {
  return `${Number(v || 0).toFixed(digits)} TON`;
}
function usd(v = 0, price = 0, digits = 2) {
  return `≈ ${(Number(v || 0) * Number(price || 0)).toFixed(digits)} $`;
}
  function StatCard({ title, valueTon, valueUsd, iconSrc }: StatCardProps) {
  return (
    <div
      className="
        relative overflow-hidden rounded-[22px]
        ring-1 ring-sky-300/40 bg-[#0b1a34]/60
        px-5 py-5
        shadow-[inset_0_0_0_9999px_rgba(255,255,255,0.00)]
      "
    >
      {/* дуговая подсветка: левая + правая «полуэллипсы» */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-2/3 h-[140%] rounded-full blur-2xl opacity-40
                        bg-[radial-gradient(60%_50%_at_0%_50%,rgba(0,194,255,0.35),transparent_70%)]" />
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-2/3 h-[140%] rounded-full blur-2xl opacity-40
                        bg-[radial-gradient(60%_50%_at_100%_50%,rgba(0,194,255,0.35),transparent_70%)]" />
        {/* мягкая центральная «перемычка», чтобы выглядело как единая дуга */}
        <div className="absolute inset-x-[-10%] top-1/2 -translate-y-1/2 h-[55%]
                        bg-[radial-gradient(80%_120%_at_50%_50%,rgba(0,168,225,0.18),transparent_70%)]" />
      </div>

      {/* заголовок + иконка */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-white/95 text-[18px] font-semibold">{title}</p>
        <span className="inline-grid place-items-center h-10 w-10 rounded-full ring-1 ring-sky-300/40 bg-white/5">
          <Image src={iconSrc} alt="" width={24} height={24} />
        </span>
      </div>

      {/* значения: TON — всегда голубой */}
      <div className="mt-1">
        <div className="text-sky-400 font-bold text-[26px] md:text-[28px] leading-tight">
          {valueTon}
        </div>
        <div className="text-slate-200/80 text-sm">{valueUsd}</div>
      </div>
    </div>
  );
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

const ICONS = {
    balance: "decorative/ProfileBalance.svg",
    daily: "decorative/ProfileIncomeD.svg",
    total: "decorative/ProfileIncomeT.svg",
  };

    {/*<section className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">*/}

  return (
    
    <section
      className="
        relative overflow-hidden rounded-[28px]
        border border-sky-400/25
        bg-gradient-to-b from-[#1C2B4A]/80 to-[#0A162E]/80
        p-5 md:p-6
        shadow-[0_0_120px_rgba(0,194,255,0.35)]
      "
    >
      {/* наружная мягкая подсветка как на макете */}
      <div className="pointer-events-none absolute -inset-24 -z-10">
        <div className="h-full w-full bg-[radial-gradient(110%_80%_at_50%_0%,rgba(0,194,255,0.20),transparent_60%)]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard
          title="Balance"
          valueTon={ton(balanceTon, 2)}
          valueUsd={usd(balanceTon, priceUsd, 2)}
          iconSrc={ICONS.balance}
        />
        <StatCard
          title="Daily income"
          valueTon={ton(dailyIncomeTon, 2)}
          valueUsd={usd(dailyIncomeTon, priceUsd, 2)}
          iconSrc={ICONS.daily}
        />
        <StatCard
          title="Total income"
          valueTon={ton(totalIncomeTon, 2)}
          valueUsd={usd(totalIncomeTon, priceUsd, 2)}
          iconSrc={ICONS.total}
        />
      </div>

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
