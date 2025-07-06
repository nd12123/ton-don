// components/StartInvesting.tsx
import React from "react";
import Link from "next/link";

type StartInvestingProps = { className?: string };

export default function StartInvesting({ className = "" }: StartInvestingProps) {
  return (
    <section
    className={
      `relative overflow-visible text-white ` +
      /*`px-6 ` + */

      `h-[800px] sm:h-[550px] opacity-90` +
      className
    }
      style={{
        //backgroundColor: "#0A1329",   // запасной цвет
        backgroundImage: `url("/decorative/stakeNow.png")`,
        backgroundRepeat: "no-repeat",
        //backgroundPosition: "right bottom",
        
      objectFit: "cover",
        backgroundSize: "100% 100%", // точные размеры: ширина 100%, высота 
      }}
    >
      <div
        className="
          relative z-10 flex items-center h-full pb-3
          pl-[10%]           /* сдвиг текста на треть ширины */
        "
      >
        <div className="">{/**space-y-2 */}
          <h2 className="text-5xl sm:text-4xl font-bold">Start investing now!</h2>
          <p className="text-base text-3xl">
            Start earning in 2 clicks — your first income tomorrow
          </p>
          <Link
          href="/staking"
          className="
            ml-auto                   /*pr-[15%]  кнопка прижата вправо */
            inline-flex items-center
            bg-white text-[#00BFFF]   /* белый фон, синий текст */
            font-medium rounded-full
            /* px-8 py-3 */
            shadow-[0_0_30px_rgba(0,191,255,0.5)] /* яркая синяя аура */
            transition-shadow
            duration-300
          "
        >
          Stake Now →
        </Link>
        </div>

        
      </div>
    </section>
  );
}
