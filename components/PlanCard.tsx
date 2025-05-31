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
        relative
        flex flex-col items-start p-6
        rounded-2xl
        transition
        cursor-pointer
        ${
          isActive
            ? "border-2 border-[#00C2FF] bg-[rgba(0,194,255,0.1)]"
            : "border border-[#ffffff20] bg-gradient-to-b from-[#0A1329] to-[#081028]"
        }
        hover:border-[#00C2FF] hover:bg-[rgba(0,194,255,0.05)]
      `}
    >
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-[#00C2FF] rounded-full mr-3">
          <Image
            src={iconSrc}
            alt={`${title} icon`}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>

      <div className="flex flex-col space-y-1 mb-6">
        <p className="text-sm text-gray-300">Your profit</p>
        <span className="text-3xl font-bold text-[#00C2FF]">
          {dailyProfit}%
        </span>
        <p className="text-sm text-gray-300">Per day</p>
      </div>

      <div className="flex flex-col space-y-1 mb-6">
        <p className="text-sm text-gray-300">Investments for all time</p>
        <span className="text-lg font-medium text-white">{rangeText}</span>
      </div>

      <div className="mt-auto w-full">
        <button
          className={`
            w-full py-2 text-center text-white text-sm font-medium rounded-lg
            ${
              isActive
                ? "bg-[#00C2FF] hover:bg-[#00A8E0]"
                : "bg-gradient-to-r from-[#00BFFF] to-[#009EFE] hover:from-[#00A8E0] hover:to-[#008CD0]"
            }
            transition shadow-lg
          `}
        >
          Start Invest Now
        </button>
      </div>
    </div>
  );
}
