"use client";
import Link from "next/link";
import { useT } from "@/i18n/react";

type Props = {
  href?: string;
  className?: string;
};

export function FloatingStakeNow({ href = "/staking", className = "" }: Props) {
  const tCommon = useT("common");

  return (
    <Link
      href={href}
      className={`absolute pointer-events-auto select-none left-6 bottom-8 md:left-0 md:bottom-[-35px] ${className}`}
    >
      {/* сама кнопка */}
      <span
        className="
          relative inline-flex items-center gap-1 md:gap-2
          text-[14px] md:text-[20px] py-0 md:mt-3 md:px-2
          h-5 md:h-12 px-4 rounded md:rounded-xl
          bg-gray-100 md:bg-white text-sky-500 md:font-semibold
          shadow-[0_0_35px_rgba(0,191,255,0.55)]
        "
      >
        {tCommon("buttons.floatingStakeNow")}
        <span className="inline-block">›</span>
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
