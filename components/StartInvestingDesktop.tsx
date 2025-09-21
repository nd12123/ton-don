// components/StartInvestingDesktop.tsx
"use client";

import Image from "next/image";
import { FloatingStakeNow } from "./FloatingStakeNow";
import { useT } from '@/i18n/react';

export default function StartInvestingDesktop({ className = "" }: { className?: string }) {
  const t = useT("home");

  return (
    <section className={`relative text-white ${className}`}>
      <div
        className="
          relative mx-auto
          w-[min(1100px,90vw)]
          aspect-[1359/420]
          rounded-[28px]
        "
      >
        {/* фон баннера */}
        <Image
          src="/decorative/StartNow.svg"
          alt=""
          fill
          priority
          className="object-contain rounded-[28px] select-none pointer-events-none"
        />

        {/* контент */}
        <div
          className="
            absolute left-[4%] top-[44%] -translate-y-1/2
            max-w-[560px]
          "
        >
          <h2
            className="
              font-extrabold leading-[0.95] tracking-[-0.02em]
              xl:text-[60px] 2xl:text-[62px]
              mb-4
              whitespace-nowrap
              md:max-w-[540px]
            "
          >
            {t("startInvesting.title")}
          </h2>

          <p className="text-white/90 text-[20px] xl:text-[22px]">
            {t("startInvesting.subtitle")}
          </p>

          <div className="mt-16">
            <FloatingStakeNow href="/staking" />
          </div>
        </div>
      </div>
    </section>
  );
}
