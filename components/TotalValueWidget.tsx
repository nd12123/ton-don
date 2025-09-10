"use client";

import { useDailyGrowingMetric } from "@/lib/hooks/useDailyGrowingMetric";
import Image from "next/image";

function formatTon(n: number, decimals = 0) {
  const s = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
  return s.replace(/\s/g, "\u00A0");
}

export default function TotalValueWidget() {
  const tvl = useDailyGrowingMetric({
    base: 37000,
    startDate: "2025-08-20T00:00:00Z",
    minStep: 60,
    maxStep: 300,
    seed: "ton-stake",
    tickMs: 5000,
  });

  return (
    <h2
      className="
        mt-4
        flex items-center justify-center gap-2 md:gap-4
        whitespace-nowrap
        font-black tracking-tight tabular-nums
        text-[clamp(48px,11vw,60px)] leading-[0.95]
        md:text-[200px] md:leading-[0.95]
        select-none
      "
    >
      <Image
        src="/decorative/favicon.svg"
        alt="TON icon"
        width={60}
        height={60}
        className="w-[clamp(28px,8vw,60px)] h-[clamp(28px,8vw,60px)]"
        priority
      />
      {/**
      <span
        className="
          text-transparent bg-clip-text
          bg-gradient-to-b from-sky-400 to-cyan-500
          drop-shadow-[0_0_20px_rgba(56,189,248,0.35)]
        "
      > */}
        {/* САМА ЦИФРА — яркий бело-голубой градиент + светящееся свечение */}
      <span
    className="
      text-transparent bg-clip-text
      bg-gradient-to-b from-sky-300 via-sky-400 to-cyan-500
      drop-shadow-[0_0_10px_rgba(0,194,255,.22)]
      [text-shadow:0_1px_0_rgba(255,255,255,.25),0_6px_16px_rgba(0,194,255,.25)]
    "
  >
        {formatTon(Math.round(tvl), 0)}
      </span>
      <span className="text-sky-300/90 text-[0.45em] md:text-[0.5em] lg:text-[clamp(60px,11vw,70px)] ml-1">TON</span>
    </h2>
  );
}
