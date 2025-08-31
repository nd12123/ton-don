// components/StepsToInvest.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

import coinLarge from "@/assets/StepsToInvest/ton2.png";
import leftCorner from "@/assets/StepsToInvest/leftCorner.svg";
import rightCorner from "@/assets/StepsToInvest/rightCorner.svg";
import rightCornerBottom from "@/public/decorative/ellipse5.png";
import centerSphere from "@/public/decorative/Ellipse51.png";
import ConnectWalletButton from "@/components/ConnectWalletButton";

export default function StepsToInvest() {
  const steps = [
    { id: 1, title: "Choose Plan",       description: "Select the plan that suits you best" },
    { id: 2, title: "Make a Deposit",    description: "Deposit at least 10 TON" },
    { id: 3, title: "Receive Dividends", description: "Earn rewards and withdraw anytime" },
  ];

  return (
    <section className="relative text-white py-10 overflow-x-clip">
      {/* лёгкий общий фон-сферу можно оставить */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src={rightCornerBottom} alt="" className="absolute inset-0 w-full h-full opacity-10" />
      </div>

      {/* мини-coin справа сверху — только на десктопе */}
      <div className="hidden md:block absolute top-[20%] right-[30%] opacity-90 z-[5] animate-float-slow delay-1000 pointer-events-none">
        <Image src="/decorative/ton4.svg" alt="" width={125} height={125} />
      </div>

      {/* Заголовок + CTA */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-left">
        <h2
          className="
            font-extrabold tracking-tight font-inter text-balance
            text-[clamp(28px,8vw,48px)] leading-[clamp(34px,9vw,56px)]
            max-w-[22ch]
          "
          style={{ hyphens: "auto" }}
        >
          3 Easy steps to invest<br />
          in <span className="text-[#00C2FF]">TonStake.Ai</span>
        </h2>

        <div className="relative z-10 mt-4 sm:mt-6 flex justify-start">
          <Link href="#calculate-plans">
            <a
              className="
                w-48 sm:w-52 h-11
                relative
                bg-[radial-gradient(ellipse_179.05%_152.88%_at_74.38%_155.56%,_#3DD4FF_0%,_#0098EA_100%)]
                rounded-xl
                shadow-[0px_4px_27.6px_0px_rgba(61,212,255,0.42)]
                outline outline-1 outline-offset-[-1px] outline-sky-400
                overflow-hidden inline-flex items-center justify-center
              "
            >
              <span className="text-white text-base sm:text-lg font-semibold leading-loose">See Plans</span>
            </a>
          </Link>
        </div>
      </div>

      {/* === фон «лента шагов» + корнеры === */}
      <div className="relative mt-8 sm:mt-12 px-0">
        <div className="absolute top-0 inset-x-0 h-[240px] sm:h-[300px] pointer-events-none z-0 overflow-hidden">
          {/* сама лента растянута на всю ширину */}
          <Image
            src="/decorative/step-mask.svg"
            alt="steps background"
            fill
            className="object-cover object-center"
            priority
          />

          {/* корнеры прибиты к краям и сужаются на мобиле */}
          <div className="absolute inset-y-0 left-0 w-[18vw] min-w-[22px] sm:w-[160px] md:w-[180px]">
            <Image src={leftCorner} alt="" fill className="object-contain object-left" />
          </div>
          <div className="absolute inset-y-0 right-0 w-[18vw] min-w-[22px] sm:w-[160px] md:w-[180px]">
            <Image src={rightCorner} alt="" fill className="object-contain object-right" />
          </div>
        </div>

        {/* карточки шагов */}
        <div className="relative z-10 mx-auto px-4 sm:px-6 md:max-w-6xl mt-28 sm:mt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {steps.map((step) => (
              <div key={step.id} className="relative">
                <div className="bg-transparent rounded-2xl p-4 sm:p-6 lg:p-8 h-full">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
                    {step.id.toString().padStart(2, "0")}
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* большие монеты — только ≥ md */}
        <div className="pointer-events-none">
          <div className="hidden md:block absolute top-[0px] right-[160px] w-[200px] h-[200px] opacity-100 z-[5]">
            <Image src="/decorative/ton22.svg" alt="" fill className="object-contain mix-blend-screen" />
          </div>
          <div className="hidden md:flex absolute top-[-120px] right-[36%] z-0">
            <Image src={coinLarge} alt="" width={300} height={300} className="opacity-100" />
          </div>
          <div className="hidden md:block absolute top-[-150px] right-[-150px] w-full h-full opacity-100 z-[5]">
            <Image src={centerSphere} alt="" fill className="object-contain mix-blend-screen" />
          </div>
        </div>
      </div>

      {/* CTA снизу */}
      <div className="relative z-10 flex justify-center py-7">
        <ConnectWalletButton />
      </div>
    </section>
  );
}
