// components/PlanCard.tsx
import React from "react";
import Image from "next/image";

type PlanCardProps = {
  title: string;
  iconSrc: string;          // путь к иконке (например «/decorative/plan-heart.svg»)
  isActive: boolean;        // подсвечивать ли карту
  onSelect?: () => void;    // колбэк при клике (если нужно)
};

export default function PlanCard({
  title,
  iconSrc,
  isActive,
  onSelect,
}: PlanCardProps) {
  return (
    <div
      onClick={onSelect} //p-6
      className={`
        relative flex flex-col  rounded-2xl cursor-pointer transition
        ${isActive
          ? "border-2 border-accent-200 bg-accent-200/10 shadow-neon"
          : "border border-white/20 bg-gradient-to-b from-gray-800 to-gray-700 hover:border-accent-200 hover:bg-accent-200/5 hover:shadow-neon/50"
        }
      `}
    >
      {/* иконка + заголовок  mb-4*/}
      <div className="flex items-center">
        <div className="flex-shrink-0 w-10 h-10 bg-accent-200 rounded-full flex items-center justify-center "> {/**mr-3 */}
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

      {/* кнопка
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
      */}
      
    </div>
  );
}
