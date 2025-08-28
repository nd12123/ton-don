"use client";

import { useDailyGrowingMetric } from "@/lib/hooks/useDailyGrowingMetric";
import Image from "next/image";


function formatTon(n: number, decimals = 0) {
  const s = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
  return s.replace(/\s/g, "\u00A0"); // неразрывные пробелы
}

export default function TotalValueWidget() {
  const tvl = useDailyGrowingMetric({
    base: 1200,
    startDate: "2025-08-20T00:00:00Z",
    minStep: 60,
    maxStep: 180,
    seed: "ton-stake",
    tickMs: 5000,
  });

  return (
    <h2
      className="
        ml-2 mt-4
        flex items-center justify-center
        text-[90px] leading-[90px]
        font-black tracking-tight tabular-nums
        text-transparent bg-clip-text
        bg-gradient-to-b from-sky-400 to-cyan-500
        drop-shadow-[0_0_20px_rgba(56,189,248,0.35)]
        select-none
      "
    >
              <Image
                src="/decorative/ton-icon.svg"
                alt="TON icon"
                width={60}
                height={60}
                // { maximumFractionDigits: 2 }
              /> 
      {formatTon(Math.round(tvl), 0)}&nbsp;
      <span className="text-sky-300/90">TON</span>
    </h2>
  );
}



