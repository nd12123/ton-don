// components/StartInvesting.tsx
import { FloatingStakeNow } from "./FloatingStakeNow";
import Image from "next/image";
export default function StartInvesting({ className = "" }: { className?: string }) {
  return (
   <section className={["relative z-[5] text-white", className].join(" ")}>
  <div
    className="
      relative mx-auto
      w-[min(92vw,1100px)]
      aspect-[1359/768]
    "
  >
    {/* ФОН как <Image>, а не background */}
    <Image
      src="/decorative/StartNow.svg"
      alt=""
      fill
      priority
      className=" font-['Inter']
        pointer-events-none select-none
        object-contain object-center
        md:scale-[1.12]  /* tablet: чуть крупнее */
        lg:scale-[1.16]  /* desktop: ~1.3× */
        [transform-origin:center]
      "
    />

    {/* Контент поверх
    <div className="absolute inset-0 flex items-start">
      <div
        className="
          pl-[2%] pt-[15%]
          md:pl-[7%] md:pt-[10%]
          lg:pl-[8%] lg:pt-[9%]
          max-w-[min(88%,640px)]
        "
      >
        <h1 className="pt-1 font-bold md:font-extrabold leading-[0.95] tracking-[-0.02em]
                       text-[clamp(18px,6vw,70px)] md:text-[clamp(28px,8.2vw,92px)]">
          Start investing<br/>now!
        </h1>

        <p className="pt-0 md:mt-4 text-white/90 text-[clamp(10px,2vw,22px)]">
          Start earning in 2 clicks – your first income tomorrow
        </p>

        <FloatingStakeNow href="/staking" className="pt-2 left-[5px] mb-7 md:mt-6 inline-block" />
      </div>
    </div>
  </div>
 */}
        {/* Контент поверх фона */}
        <div
          className="
            absolute inset-0
            flex items-start
          "
        >
          {/* Левая колонка с текстом */}
          <div
            className="
              // якорим блок примерно как на макете
              pl-[2%] pt-[15%]
              md:pl-[7%] md:pt-[10%]
              lg:l-[-20px] lg:pt-[15%]
              max-w-[min(88%,640px)]
            "
          >
            {/* Заголовок */}
            <h1
              className=" md:hidden
              pt-1
                font-bold md:font-extrabold leading-[0.95] tracking-[-0.02em]
                md:text-[clamp(28px,8.2vw,92px)]
                text-[clamp(18px,6vw,70px)]
              "
            >
              Start investing<br />now!
            </h1>

            {/* Подзаголовок */}
            <p
              className="
                pb-1 md:mt-4
                text-white/90
                text-[clamp(10px,2vw,22px)]
              "
            >
              Start earning in 2 clicks – your first income tomorrow
            </p>

            {/* Кнопка под текстом (чуть ниже, по центру не нужно — как в рефе слева) */}
            <FloatingStakeNow
              href="/staking"
              className="
               pt-2 left-[5px]
                mb-7 md:mt-3 md:mb-11
                inline-block
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}


      {/* 2) Горизонт (основной фон) 
      <div
        className="
          relative z-10 flex items-center h-full pb-3
          pl-[10%]          
        "
      >
        <div className="">
          <h2 className="text-5xl sm:text-4xl font-bold">Start investing now!</h2>
          <p className="text-base text-3xl">
            Start earning in 2 clicks — your first income tomorrow
          </p>
          <Link
          href="/staking"
          className="
            ml-auto                   //pr-[15%]  кнопка прижата вправо 
            inline-flex items-center
            bg-white text-[#00BFFF]   // белый фон, синий текст 
            font-medium rounded-full
            shadow-[0_0_30px_rgba(0,191,255,0.5)] // яркая синяя аура 
            transition-shadow
            duration-300
          "
        >
          Stake Now →
        </Link>
        </div>
      </div>
        */}
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