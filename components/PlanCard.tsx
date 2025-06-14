// components/PlanCard.tsx
import React from "react";
import Image from "next/image";

type PlanCardProps = {
  title: string;
  dailyProfit: number;      // в процентах, например 4 или 10
  rangeText: string;        // текст «10–899 TON» или «1900+ TON»
  iconSrc: string;          // путь к иконке (например «/decorative/plan-heart.svg»)
  isActive: boolean;        // подсвечивать ли карту
  onSelect?: () => void;    // колбэк при клике (если нужно)
};

export default function PlanCard({
  title,
  dailyProfit,
  rangeText,
  iconSrc,
  isActive,
  onSelect,
}: PlanCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`
        relative flex flex-col p-6 rounded-2xl cursor-pointer transition
        ${isActive
          ? "border-2 border-accent-200 bg-accent-200/10 shadow-neon"
          : "border border-white/20 bg-gradient-to-b from-gray-800 to-gray-700 hover:border-accent-200 hover:bg-accent-200/5 hover:shadow-neon/50"
        }
      `}
    >
      {/* иконка + заголовок */}
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 w-10 h-10 bg-accent-200 rounded-full flex items-center justify-center mr-3">
          <Image
            src={iconSrc}
            alt={`${title} icon`}
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      {/* процент и подпись */}
      <div className="flex flex-col space-y-1 mb-6">
        <span className="text-sm text-gray-300">Your profit</span>
        <span className="text-3xl font-bold text-accent-200">{dailyProfit}%</span>
        <span className="text-sm text-gray-300">Per day</span>
      </div>

      {/* диапазон инвестиций */}
      <div className="flex flex-col space-y-1 mb-6">
        <span className="text-sm text-gray-300">Investments for all time</span>
        <span className="text-base font-medium text-white">{rangeText}</span>
      </div>

      {/* кнопка */}
      <div className="mt-auto">
        <button
          className={`
            w-full py-2 text-sm font-medium rounded-lg transition
            ${isActive
              ? "border-2 border-accent-100 bg-accent-200 bg-light hover:bg-accent-200/80 text-white shadow-neon"
              : "bg-gradient-to-r from-accent-100 to-accent-200 hover:from-accent-200/80 hover:to-accent-100 text-white shadow-lg"
            }
          `}
        >
          {isActive ? "Selected" : "Start Invest Now"}
        </button>
      </div>
    </div>
  );
}
