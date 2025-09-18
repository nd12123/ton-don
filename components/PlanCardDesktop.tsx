// components/PlanCard.tsx
import React from "react";
import Image from "next/image";
import { useT } from "@/i18n/react";

type PlanCardProps = {
  title: string;
  dailyProfit: number;   // %
  rangeText: string;     // "1–999 TON" и т.п. (уже локализовано выше)
  iconSrc: string;
  isActive: boolean;
  bgClass?: string;
  onSelect?: () => void;
};

export default function PlanCardDesktop({
  title,
  dailyProfit,
  rangeText,
  iconSrc,
  isActive,
  bgClass,
  onSelect,
}: PlanCardProps) {
  const tHome = useT("home");

  return (
    <div
      onClick={onSelect}
      className={`
        relative flex flex-col p-6 rounded-2xl cursor-pointer transition
        border-2 border-accent-200 hover:scale-105 hover:border-sky-400
        outline outline-1 outline-offset-[-1px] outline-sky-500
        shadow-[0px_4px_32px_0px_rgba(52,177,212,0.30)]
        ${bgClass ?? `bg-plan-${title.toLowerCase().replace(/\s+/g,'-')}`}  /* 👈 тут */
        ${isActive
          ? "border-2 border-sky-400"
          : "transform transition-transform duration-200 ease-out border border-white/20"}
      `}
    >
      {/* иконка + заголовок */}
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 w-10 h-10 bg-accent-200 rounded-full flex items-center justify-center mr-3">
          <Image
            src={iconSrc}
            alt={`${title} icon`}
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
      </div>
      <h3 className="text-3xl font-semibold mb-2">{title}</h3>

      {/* процент и подпись */}
      <div className="flex flex-col space-y-1 mb-3">
        <span className="text-sm text-gray-300">
          {tHome("plans.card.yourProfit")}
        </span>
        <div className="mt-1 flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-accent-200">{dailyProfit}%</span>
          <span className="text-sm text-gray-300">
            {tHome("plans.card.perDay")}
          </span>
        </div>
      </div>

      {/* диапазон инвестиций */}
      <div className="flex flex-col space-y-1 mb-4">
        <span className="text-m text-gray-300">
          {tHome("plans.card.investmentsAllTime")}
        </span>
        <span className="font-extrabold text-3xl text-accent-200">{rangeText}</span>
      </div>

      {/* разделитель */}
      <div className="w-full border-b mb-5" style={{ borderColor: "rgba(16,95,150,1)" }} />

      {/* кнопка без текста (фон меняется), aria — локализуем */}
      {/* CTA */}
<div className="mt-auto">
  <button
    onClick={onSelect}
    className={[
      "group relative mx-auto block w-[min(270px,85%)] h-[56px] md:h-[60px] rounded-[16px]",
      "ring-1 ring-white/20 shadow-[0_12px_32px_rgba(0,174,255,.25)]",
      isActive
        ? "bg-[url('/decorative/btn-empty.svg')]"
        : "bg-[url('/decorative/btn-empty-selected.svg')]",
      "bg-cover bg-center transition-transform hover:scale-[1.02] active:scale-[0.99]"
    ].join(" ")}
    aria-label={
      isActive
        ? tHome("plans.card.aria.selected")
        : tHome("plans.card.aria.selectPlan")
    }
  >
    <span className={[
      "absolute inset-0 grid place-items-center px-4 text-sm md:text-base font-bold",
      isActive ? "text-white" : "text-white"
    ].join(" ")}>
      {isActive
        ? tHome("plans.card.ctaActive")   // «Начать инвестирование >»
        : tHome("plans.card.ctaIdle")     // «Выбрать план»
      }
    </span>
  </button>
</div>


      {/*
        NOTE: bg-plan-${title.toLowerCase()} зависит от текста заголовка.
        Если title локализуется, класс может не совпасть с существующими стилями.
        Лучше в будущем принимать от родителя отдельный ключ (e.g. "basic"|"pro"|"premium")
        и строить класс по нему.
      */}
    </div>
  );
}
