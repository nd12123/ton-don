"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useT } from "@/i18n/react";

type PlanCardProps = {
  title: string;
  dailyProfit: number;      // 4 | 7 | 10
  rangeText: string;        // уже локализовано выше, например "1–999 TON"
  iconSrc: string;
  isActive: boolean;
  bgSrc: string;            // оставлен для совместимости, здесь не используется
  onSelect?: () => void;
};

export default function PlanCard({
  title,
  dailyProfit,
  rangeText,
  iconSrc,
  isActive,
  onSelect,
}: PlanCardProps) {
  const router = useRouter();
  const tHome = useT("home");

  // компактный геттер с фоллбеком
  const L = <T extends string>(k: string, fb: T) => tHome<T>(k, undefined, fb);

  const labelYourProfit     = L("plans.card.yourProfit", "Your profit");
  const labelPerDay         = L("plans.card.perDay", "Per day");
  const labelInvestmentsAll = L("plans.card.investmentsAllTime", "Total investments");

  // 👇 надписи для моб. CTA по состоянию
  const ctaActive = L("plans.card.ctaMobActive", "Stake now");
  const ctaIdle   = L("plans.card.ctaMobIdle", "Stake");
  const btnText   = isActive ? ctaActive : ctaIdle;

  const ariaSelected   = L("plans.card.aria.selected", "Selected");
  const ariaSelectPlan = L("plans.card.aria.selectPlan", "Select plan");

  return (
    // Мобильная карточка
    <div
      onClick={!isActive ? onSelect : undefined}
      className={[
        "md:hidden relative flex flex-col gap-y-[3px]",
        "p-3 rounded-3xl transition",
        // ⚠️ если title локализован, и у тебя завязаны стили на bg-plan-*, лучше позже передавать стабильный key
        `bg-plan-${title.toLowerCase().replace(/\s+/g, "-")}`,
        isActive
          ? "border-1 border-sky-400 shadow-[0_8px_32px_rgba(61,212,255,.30)]"
          : "border border-white/20 hover:border-sky-400/60",
        "outline outline-1 outline-offset-[-1px] outline-sky-500/40",
        !isActive ? "hover:scale-[1.02] active:scale-[0.99]" : "",
      ].join(" ")}
    >
      {/* Иконка + заголовок */}
      <div className="pb-0 flex items-center gap-2">
        <div className="grid place-items-center rounded-3xl w-6 h-6 bg-white/5">
          <div className="relative w-6 h-6">
            <Image src={iconSrc} alt={`${title} icon`} fill className="object-contain" />
          </div>
        </div>
        <h3 className="pr-1 text-[12px] font-semibold">{title}</h3>
      </div>

      {/* Процент */}
      <div className="pt-0">
        <span className="text-[10px] font-semibold text-gray-300">{labelYourProfit}</span>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-accent-200">{dailyProfit}%</span>
          <span className="text-[11px] text-gray-300">{labelPerDay}</span>
        </div>
      </div>

      {/* Диапазон (за всё время) */}
      <div className="pt-1">
        <span className="text-[10px] text-gray-300 block">{labelInvestmentsAll}</span>
        <span className="text-[10px] font-bold text-accent-200">{rangeText}</span>
      </div>

      {/* CTA: фон как на десктопе + локализованный текст, разный для активного/неактивного */}
      <div className="mt-auto flex justify-center pb-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            isActive ? router.push("/staking") : onSelect?.();
          }}
          className={[
            "relative h-6 w-4/5 rounded-lg text-[12px] py-1 font-semibold",
            "focus:outline-none ", // focus:ring-2 focus:ring-sky-400/60
            isActive
              ? "bg-[url('/decorative/btn-empty-selected.svg')]"
              : "bg-[url('/decorative/btn-empty.svg')] hover:brightness-110 active:scale-[1.04]",
            "bg-center bg-no-repeat",
          ].join(" ")}
          style={{ backgroundSize: "100% 100%" }}
          aria-pressed={isActive}
          aria-label={isActive ? ariaSelected : ariaSelectPlan}
        >
          <span className={isActive ? "text-white" : "text-sky-100"}>{btnText}</span>
        </button>
      </div>
    </div>
  );
}
