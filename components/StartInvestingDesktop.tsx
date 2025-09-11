// components/StartInvestingDesktop.tsx
import Image from "next/image";
import { FloatingStakeNow } from "./FloatingStakeNow";

export default function StartInvestingDesktop({ className = "" }: { className?: string }) {
  return (
    <section className={`relative text-white ${className}`}>
      <div
        className="
          relative mx-auto
          w-[min(1100px,90vw)]
          aspect-[1359/420]          /* по пропорциям как на макете */
          rounded-[28px]
        "
      >
        {/* фон баннера (монеты внутри svg) */}
        <Image
          src="/decorative/StartNow.svg"
          alt=""
          fill
          priority
          className="object-contain rounded-[28px] select-none pointer-events-none"
        />

        {/* контент поверх — строго слева и по центру по вертикали */}
        <div
          className="
            absolute left-[4%] top-[44%] -translate-y-1/2
            max-w-[560px]
          "
        >
          <h2
            className="
              font-extrabold leading-[0.95] tracking-[-0.02em]
              text-[64px] xl:text-[72px] 2xl:text-[80px]
              mb-4
              whitespace-nowrap
            "
          >
            Start investing now!
          </h2>

          <p className="text-white/90 text-[20px] xl:text-[22px]">
            Start earning in 2 clicks – your first income tomorrow
          </p>

          <div className="mt-16">
            <FloatingStakeNow href="/staking" />
          </div>
        </div>
      </div>
    </section>
  );
}
