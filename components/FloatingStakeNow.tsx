// components/FloatingStakeNow.tsx
import Link from "next/link";
//import { cn } from "@/lib/utils"; // если нет, замените просто на шаблонную строку

type Props = {
  href?: string;
  className?: string; // <-- новое
};

export function FloatingStakeNow({ href = "/staking", className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`absolute pointer-events-auto select-none left-6 bottom-8 md:left-0 md:bottom-[-35px] ${className}`}
    >
      {/* сама кнопка */}
      <span
        className="
          relative inline-flex items-center gap-1 md:gap-2 text-5 md:text-[20px] py-1 md:mt-3 md:px-2
          h-5 md:h-12 w-15 md:w-50 px-2 md:px-1 rounded md:rounded-xl
          bg-gray-100 md:bg-white text-sky-500 md:font-semibold
          shadow-[0_0_35px_rgba(0,191,255,0.55)]
        "
      >
        Stake Now
        <span className="inline-block" //k md:translate-x-[1px]
        >›</span>
      </span>

      {/* синее «свечение» под кнопкой */}
      <span
        aria-hidden
        className="
          absolute -inset-2 z-[-1] rounded-[16px]
          blur-[14px]
          bg-[radial-gradient(80%_80%_at_50%_50%,rgba(0,191,255,0.75),rgba(0,191,255,0.15)_70%,transparent_100%)]
        "
      />
    </Link>
  );
}
