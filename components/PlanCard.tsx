// components/PlanCard.tsx
import React from "react";
import Image from "next/image";

type PlanCardProps = {
  title: string;
  dailyProfit: number;      // в процентах, например 4 или 10
  rangeText: string;        // текст «10–899 TON» или «1900+ TON»
  iconSrc: string;          // путь к иконке (например «/decorative/plan-heart.svg»)
  isActive: boolean;        // подсвечивать ли карту
  //bgSrc: string;
  onSelect?: () => void;    // колбэк при клике (если нужно)
};

export default function PlanCard({
  title,
  dailyProfit,
  rangeText,
  iconSrc,
  isActive,
  onSelect,
  //bgSrc,
}: PlanCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`
        relative flex flex-col p-6 rounded-2xl cursor-pointer transition
        border-2 border-accent-200
        outline outline-1 outline-offset-[-1px] outline-sky-500
        shadow-[0px_4px_32px_0px_rgba(52,177,212,0.30)]
        bg-plan-${title.toLowerCase()} 
        ${isActive
          ? "border-2 border-sky-400"
          : "transform hover:scale-105 hover:z-10 transition-transform duration-200 ease-out border border-white/20 hover:border-sky-400"}

        /* shadow-neon*/ 
      `}
    >

      {/** ${isActive
          ? "border-2 border-accent-200 bg-accent-200/10 shadow-neon"
          : "border border-white/20 bg-gradient-to-b from-gray-800 to-gray-700 hover:border-accent-200 hover:bg-accent-200/5 hover:shadow-neon/50"
        }*/}

      {/* Фон-картинка
      <div className="absolute inset-0 -z-10">
        <img
          //src={bgSrc}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>  */}

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
      <h3 className="text-3xl font-semibold">{title}</h3>

      {/* процент и подпись */}
      <div className="flex flex-col space-y-1 mb-6">
        <span className="text-sm text-gray-300">Your profit</span>
          <div className="mt-1 flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-accent-200">{dailyProfit}%</span>
            <span className="text-sm text-gray-300">Per day</span>
          </div>
      </div>

      {/* диапазон инвестиций */}
      <div className="flex flex-col space-y-1 mb-6">
        <span className="text-sm text-gray-300">Investments for all time</span>
        <span className="text-base font-medium text-xl text-accent-200">{rangeText}</span>
      </div>
      
      {/* —–––– Разделительная линия —–––– */}
<div
        className="w-full border-b my-4"
        style={{ borderColor: "rgba(16,95,150,1)" }}
      />
        {/* кнопка без текста, разный фон по isActive */}
        <div className="mt-auto">
        <button
          className={ //w-full
            `h-12 w-3/4 rounded-lg transition 
            bg-center bg-cover
            ${isActive
              ? "bg-[url('/decorative/btn-select.svg')]"   // фон для выбранного
              : "bg-[url('/decorative/btn.svg')]"    // фон для невыбранного
            }
          `}
          aria-label={isActive ? "Selected" : "Select plan"}
        />
      </div>
      {/**
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
       * 
       */}
    </div>
  );
}
