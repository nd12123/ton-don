// components/StartInvesting.tsx
import React from "react";
import Link from "next/link";
//import Image from "next/image";

type StartInvestingProps = { className?: string };

export default function StartInvesting({ className = "" }: StartInvestingProps) {
  return (
    /*
<section
className={
  `relative overflow-visible text-white ` +
  //`h-[800px] sm:h-[550px]` + //opacity-90
  className
}
>
      <div className="absolute inset-0 pointer-events-none -z-20 overflow-hidden">
  <div
    style={{
      position: "absolute", // relative
      //top: "0px", // двигаем НИЖЕ
      left: 0,
      right: 0,
      //height: "calc(100% + 30px)",
      //width: "100%",
    }}
  >
    <Image
      src="/decorative/stakeNow.png"
      alt="stakeNow"
      fill
      style={{
        objectFit: "cover",
        objectPosition: "center center",
        opacity: 0.90,
      }}
    />
  </div>
</div>
*/
<section
className={
  `relative overflow-visible text-white ` +

  `h-[800px] sm:h-[550px] opacity-90` +
  className
}
  style={{
    //backgroundColor: "#0A1329",   // запасной цвет
    backgroundImage: `url("/decorative/stakeNow.png")`,
    backgroundRepeat: "no-repeat",
    //backgroundPosition: "right bottom",
    
  objectFit: "cover",
    backgroundSize: "calc(100% + 100px) 100%", // точные размеры: ширина 100%, высота 
  }}
>
      {/* 2) Горизонт (основной фон) */}

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
