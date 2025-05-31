// components/TabButton.tsx
import React from "react";

type TabButtonProps = {
  label: string;
  iconSrc: string;     // строковый путь: "/decorative/plan-heart.svg" и т. п.
  isActive: boolean;
  onClick: () => void;
};

export default function TabButton({
  label,
  iconSrc,
  isActive,
  onClick,
}: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center px-4 py-2 mx-1
        rounded-l-lg rounded-t-lg
        transition
        ${
          isActive
            ? "bg-[#00C2FF] text-black"
            : "bg-[#0F1B3F] text-gray-400 hover:bg-[#132050]"
        }
      `}
    >
      {/* Если всё же нужен icon, можно подключить Image, но тут для простоты — Text */}
      <img src={iconSrc} alt={`${label} icon`} className="w-5 h-5 mr-2" />
      <span className="font-medium">{label}</span>
    </button>
  );
}
