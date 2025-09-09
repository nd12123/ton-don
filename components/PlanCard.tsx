"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type PlanCardProps = {
  title: string;
  dailyProfit: number;      // 4 | 7 | 10
  rangeText: string;        // "1–999 TON" / "2000+ TON"
  iconSrc: string;          // путь к иконке
  isActive: boolean;
  bgSrc: string;            // фон для десктопной карточки
  onSelect?: () => void;
};

export default function PlanCard({
  title,
  dailyProfit,
  rangeText,
  iconSrc,
  isActive,
  bgSrc,
  onSelect,
}: PlanCardProps) {
  const router = useRouter();

  /* ———————————— MOBILE VARIANT ———————————— */
  return (
    <>
      {/* Мобильная карточка (без фона, другая кнопка) */}
      <div
        onClick={!isActive ? onSelect : undefined}
        className={[
          "md:hidden relative flex flex-col gap-y-[3px]",
          "p-2 md:p-3 rounded-3xl transition",
          `bg-plan-${title.toLowerCase()}`,
          isActive
            ? "border-2 border-sky-400 shadow-[0_8px_32px_rgba(61,212,255,.30)]"
            : "border border-white/20 hover:border-sky-400/60",
          "outline outline-1 outline-offset-[-1px] outline-sky-500/40",
          // лёгкая анимация
          !isActive ? "hover:scale-[1.02] active:scale-[0.99]" : "",
        ].join(" ")}
      >
        {/* Иконка + заголовок */}
        <div className="pb-0 md:mb-1 flex items-center gap-1 md:gap-3">
          {/* Квадрат без свечения */}
          <div className="grid place-items-center rounded-xl w-6 h-6 md:w-12 md:h-12 bg-white/5 pl-1" //border border-white/10
          >
            <div className="relative w-6 h-6 md:w-10 md:h-10 text-l">
              <Image src={iconSrc} alt={`${title} icon`} fill className="object-contain" />
            </div>
          </div>

          <h3 className="px-2 md:p-4 text-[15px] font-semibold">{title}</h3>
        </div>

        {/* Процент */}
        <div className="pt-0">
          <span className="text-[12px] text-bold text-gray-300">Your profit</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-accent-200">{dailyProfit}%</span>
            <span className="text-[11px] text-gray-300">Per day</span>
          </div>
        </div>

        {/* Диапазон for all time*/}
        <div className="pt-1">
          <span className="text-[11px] text-gray-300 block">Total Investments</span>
          <span className="text-[11px] md:text-m font-bold text-accent-200">{rangeText}</span>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-full border-b my-2" style={{ borderColor: "rgba(16,95,150,1)" }} />

        {/* CTA (текстовая кнопка) */}
       
  <div className="mt-auto flex justify-center pb-0">
    <button
      type="button"
      onClick={onSelect}
      className={`h-6 w-3/4 rounded-lg text-[11px] font-semibold transition
        focus:outline-none focus:ring-2 focus:ring-sky-400/60
        ${isActive
          ? "bg-sky-500 text-white shadow-[0_0_20px_rgba(56,172,234,0.45)]"
          : "bg-white/10 text-sky-200 border border-white/10 hover:bg-white/15 active:scale-[0.99]"}`}
      aria-pressed={isActive}
    >
      Invest
    </button>
  </div>
</div>
      {/* ———————————— DESKTOP VARIANT ———————————— */}
      <div
        onClick={onSelect}
        className={[
          "hidden md:flex group relative flex-col p-6 rounded-2xl cursor-pointer",
          "transition border-2 border-accent-200 shadow-neon",
          // общее поведение при ховере
          "transform-gpu hover:scale-[1.03] active:scale-[0.995] hover:shadow-[0_16px_50px_rgba(56,172,234,0.35)]",
          "overflow-hidden", // чтобы фон красиво обрезался
        ].join(" ")}
      >
        {/* Фон (Next/Image) + лёгкая анимация масштаба на ховер */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={bgSrc}
            alt=""
            fill
            priority
            className="object-cover transform-gpu transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
          {/* Доп. мягкое свечение поверх (если нужно) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/2 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
        </div>

        {/* Иконка + заголовок как в твоём примере (с круглым акцентом) */}
        <div className="flex items-center w-16 h-16 md:w-36 md:h-36 pb-2 md:mb-4">
            <Image
              src={iconSrc}
              alt={`${title} icon`}
              //width={36}
              //height={36}
              className="object-contain"
            />
          <h3 className="text-xl md:text-3xl font-semibold">{title}</h3>
        </div>

        {/* Процент и подпись */}
        <div className="flex flex-col space-y-1 mb-1 md:mb-6">
          <span className="text-sm text-gray-300">Your profit</span>
          <div className="mt-1 flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-accent-200">{dailyProfit}%</span>
            <span className="text-sm text-gray-300">Per day</span>
          </div>
        </div>

        {/* Диапазон инвестиций */}
        <div className="flex flex-col space-y-1 md-1 md:mb-6">
          <span className="text-sm text-gray-300">Investments for all time</span>
          <span className="text-xl font-medium text-accent-200">{rangeText}</span>
        </div>

        {/* Divider */}
        <div className="sm:hidden md:block w-full border-b my-4" style={{ borderColor: "rgba(16,95,150,1)" }} />

        {/* Кнопка без текста (фон меняется по isActive) */}
        <div className="mt-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              isActive ? router.push("/staking") : onSelect?.();
            }}
            className={[
              "h-12 w-3/4 rounded-lg transition bg-center bg-cover md:min-w-[150px]",
              isActive
                ? "bg-[url('/decorative/btn-select.svg')]"
                : "bg-[url('/decorative/btn.svg')] hover:brightness-110 active:scale-[0.99]",
            ].join(" ")}
            aria-label={isActive ? "Selected" : "Select plan"}
            aria-pressed={isActive}
          />
        </div>
      </div>
    </>
  );
}
