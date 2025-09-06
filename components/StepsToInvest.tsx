// components/StepsToInvest.tsx
// "use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Пути к вашим файлам. Поместите картинки в папку /public/decorative/
//import coinLarge from "@/assets/StepsToInvest/ton2.png";
import rightCorner from "@/assets/StepsToInvest/rightCorner.svg"
import leftCorner from "@/assets/StepsToInvest/leftCorner.svg";

import rightCornerBottom from "@/public/decorative/ellipse5.png";
import centerSphere from "@/public/decorative/Ellipse51.png";
import coinLarge from '@/assets/StepsToInvest/stepsTon.svg';

// import WalletConnect from "@/components/WalletConnect";
import ConnectWalletButton from "@/components/ConnectWalletButton";

export default function StepsToInvest() {
  // Структура трёх шагов (номер, заголовок, описание).
  const steps = [
    { id: 1, title: "Choose Plan", description: "Select a plan that suits you best" },
    { id: 2, title: "Make a Deposit", description: "Deposit at least 10 TON" },
    { id: 3, title: "Receive Dividends", description: "Earn rewards and withdraw anytime" },
  ];

  return (
    <section id="steps" className="relative text-white py-10 overflow-x-clip  scroll-mt-12">
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
        <Image
          src={rightCornerBottom}
          alt="corner"
          className="absolute right-0 bottom-0 w-full h-full opacity-10"
        />
      </div>

      <div className="absolute top-[15%] md:top-[10%] right-[10%] md:right-[30%] opacity-90 z-[5] animate-float-slow delay-1000">
        <Image
          src="/decorative/ton4.svg"
          alt="TON Coin Right"
          width={125}
          height={125}
        />
      </div>

      {/* Заголовок + кнопка „See Plans“ */}
      <div className="max-w-6xl mx-auto px-2 relative z-10 text-left">
        <h2 className="text-4xl sm:text-[28px] md:text-5xl lg:text-6xl md:font-extrabold leading-tight font-inter">
          3 Easy steps to invest<br />
          in <span className="text-[#00C2FF]">TonStake.Ai</span>
        </h2>

        <div className="relative z-10 mt-4 mb-3 md:mt-6 flex justify-left">
          <Link href="#calculate-plans">
            <a
              className="
                w-28 h-8 md:w-52 md:h-11 relative
                bg-[radial-gradient(ellipse_179.05%_152.88%_at_74.38%_155.56%,_#3DD4FF_0%,_#0098EA_100%)]
                rounded-xl
                shadow-[0px_4px_27.6px_0px_rgba(61,212,255,0.42)]
                outline outline-1 outline-offset-[-1px] outline-sky-400
                overflow-hidden
                flex items-center justify-center
              "
            >
              <span className="text-white text-lg md:font-semibold font-['Inter'] leading-loose">
                See Plans
              </span>
            </a>
          </Link>
        </div>
      </div>

{/* ОБКАТЫВАЕМ КОНТЕНТ В RELATIVE-wrapper */}
<div className="relative mt-8 md:mt-4 px-0 h-[120px] md:h-[350px]">
  {/* фон-изображение – под гридом */}
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">

  {/* ✅ Сужаем ТОЛЬКО маску по бокам на мобиле (6–8vw — подбери по вкусу) */}
  <div className="absolute inset-y-0 left-[1vw] right-[1vw] md:left-[-35px] md:right-0">
    <div className="relative h-full w-full">
      <Image
        src="/decorative/step-mask.svg"
        alt="steps background"
        fill
        priority
        sizes="100vw"
        className="object-contain"  // object-contain, чтобы маска не прилипала к краям
      />
    </div>
  </div>

  {/* Левый корнер */}
  <div className="absolute inset-y-0 left-0 w-[8vw] md:left-[-50px] md:w-[180px] lg:w-[220px] md:min-w-[60px]">
    <div className="relative h-full w-full">
      {/* mobile */}
      <Image
        src="/decorative/mobile/StepsLeftMobile.png"
        alt="corner mobile"
        fill
        className="object-cover object-left md:hidden"
      />
      {/* desktop */}
      <Image
        src={leftCorner}
        alt="corner left"
        fill
        sizes="(min-width:1024px) 220px, (min-width:768px) 180px, 10vw"
        className="object-contain object-left hidden md:block"
      />
    </div>
  </div>

  {/* Правый корнер */}
  <div className="absolute inset-y-0 right-0 w-[10vw] md:right-[-50px] md:w-[180px] lg:w-[220px] md:min-w-[60px]">
    <div className="relative h-full w-full">
      {/* mobile */}
      <Image
        src="/decorative/mobile/StepsRightMobile.png"
        alt="corner mobile"
        fill
        className="object-cover object-right md:hidden"
      />
      {/* desktop */}
      <Image
        src={rightCorner}
        alt="corner right"
        fill
        sizes="(min-width:1024px) 220px, (min-width:768px) 180px, 10vw"
        className="object-contain object-right hidden md:block"
      />
    </div>
  </div>

  </div>


        {/* Контейнер с тремя «шагами» 
        <div className="relative z-10 mx-auto px-6 md:px-8 md:max-w-6xl mt-8 md:mt-12">
          <div className="grid grid-cols-3 gap-1 md:gap-5">*/}
        {/* Контейнер с тремя «шагами» */}


    
<div className="absolute inset-0 z-10 flex items-center">
  <div className="w-full mx-auto py-8 md:py-0 md:pl-18 px-4  md:max-w-6xl">
    <div className="grid grid-cols-3 gap-0 md:gap-5 " //left-[24px] right-[1vw] md:left-20 md:right-20
    >
      {/* ...твои шаги без дополнительных mt-8/md:mt-12 ... */}
            {steps.map((step, idx) => (
              <div key={step.id} className="relative group h-full sm:mt-9 md:mt-0">
                <div
                  className="
                  md:pb-16 pl-5 pb-3 md:pl-1 
                    bg-transparent rounded-2xl
                    sm:h-[110px] sm:w-[80px] md:w-[320px] md:h-[200px] md:h-full
                    flex flex-col justify-top
                    /*md:hover:shadow-xl*/ transition
                  "
                >
                  <div className="flex items-baseline gap-2 md:block sm:justify-center md:justify-start">
                    <div className=" flex-none text-m md:text-4xl font-bold tabular-nums leading-none md:mb-2 md:py-4" //w-7
                    >
                      {step.id.toString().padStart(2, "0")}
                    </div>

                    <h3 className="hidden md:block text-xl md:text-2xl font-semibold leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  <p className="mt-1 md:mt-2 text-[10px] md:text-base text-left" //text-center md:
                  >
                    {step.description}
                  </p>
                </div>

                {idx < steps.length - 1 && <div />}
              </div>
            ))}
          </div>
        </div>

        {/* Абсолютно позиционированные «плавающие» 3D-монетки */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-5px] right-[15px] md:right-[160px] w-[56px] h-[56px] md:w-[200px] md:h-[200px] opacity-100 z-[5]">
            <Image
              src="/decorative/ton22.svg"
              alt="TON Coin Left"
              fill
              style={{ objectFit: "contain", mixBlendMode: "screen" }}
            />
          </div>

          <div className="absolute w-[78px] h-[78px] md:w-[300px] md:h-[300px] top-[-20px] md:top-[-120px] right-[30%] md:right-[36%] z-0 flex opacity-100 md:opacity-100 pointer-events-none">
            <Image
              src={coinLarge}
              alt="Ton Coin"
              style={{ objectFit: "contain", mixBlendMode: "screen" }}
            />
          </div>

          <div className="absolute md:top-[-150px] right-[-10px] top-[-30px] md:right-[-150px] w-full h-full md:opacity-100 z-[5]">
            <Image
              src={centerSphere}
              alt="Sphere"
              fill
              style={{ objectFit: "contain", mixBlendMode: "screen" }}
            />
          </div>
        </div>
  </div>
</div>
        <div className="relative z-10 flex justify-center py-7">
          <ConnectWalletButton />
        </div>
    </section>
  );
}

{/**
  // Контейнер с тремя «шагами» — поверх маски, выровнен по центру 
  <div className="absolute inset-0 z-10 flex items-center">
    <div className="w-full mx-auto px-6 md:px-8 md:max-w-6xl">
      <div className="grid grid-cols-3 gap-1 md:gap-5">
        {steps.map((step) => (
          <div key={step.id} className="relative group h-full">
            <div
              className="
                bg-transparent rounded-2xl
                p-2 md:p-10
                h-[110px] md:h-full
                flex flex-col justify-top
                hover:shadow-xl transition
              "
            >
              <div className="flex items-baseline gap-2 md:block justify-center md:justify-start">
                <div className="w-7 flex-none text-xs md:text-4xl font-bold tabular-nums leading-none md:mb-4 md:py-6">
                  {step.id.toString().padStart(2, '0')}
                </div>
                <h3 className="hidden md:block text-2xl font-semibold leading-snug">
                  {step.title}
                </h3>
              </div>
              <p className="mt-1 md:mt-2 text-[11px] md:text-base text-center md:text-left">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


   <div className="relative z-[30] mx-auto px-4 md:px-6  mt-1 md:mt-12">

<div className="absolute inset-x-0 top-0 h-[clamp(240px,45vw,720px)] z-[20] pointer-events-none overflow-visible">
  <Image
    src="/decorative/step-mask.svg"
    alt="steps background"
    fill
    priority
    sizes="100vw"
    className="object-cover md:object-contain object-center"
  />
</div>
<div className="absolute inset-x-0 top-0 h-[clamp(240px,45vw,720px)] z-[10] pointer-events-none">
<div className="absolute inset-y-0 left-0 pointer-events-none [transform:translateX(-2px)_scaleX(.62)] origin-left">
  <div className="relative h-full w-[180px]">
    <Image
      src={leftCorner}
      alt=""
      fill
      className="object-contain object-left select-none"
      priority
    />
  </div>
</div>

<div className="absolute inset-y-0 right-0 pointer-events-none [transform:translateX(2px)_scaleX(.62)] origin-right">
  <div className="relative h-full w-[180px]">
    <Image
      src={rightCorner}
      alt=""
      fill
      className="object-contain object-right select-none"
      priority
    />
  </div>
</div>

</div> */}
{/*
        <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none z-[-1]"
                  style={{ height: 350 }}>
          <Image
            src="/decorative/step-mask.svg"
            alt="steps background"
            fill
            style={{
              objectFit: "contain",
              objectPosition: "center center",  // по центру по X, сверху по Y
            }}
          />
        <Image
          src={leftCorner}
          alt="corner"
          fill
          height= {350}
          width={100}
          className="absolute left-0  top-[30px] opacity-60 animate-float-slow delay-2000" //w-16 h-16  left-8 top-1/2 
          style={{
            objectFit: "contain",
            objectPosition: "left center",  
          }}
        />
        
        <Image
          src={rightCorner}
          alt="corner"
          fill
          height= {350}
          width={60}
          className="absolute right-0  top-[30px]  opacity-60 animate-float-slow delay-2000" //right-8 top-1/3 w-20 h-20
          style={{
            objectFit: "contain",
            objectPosition: "right center",  
          }}
        />
      </div> */}
      {/* 5) Кнопка «Connect Wallet» снизу 
      <div className="relative z-10 mt-16 flex justify-center py-7">
        <Link href="/connect" 
            className="
              inline-flex items-center 
              bg-[#00BFFF] hover:bg-[#00A5E0] 
              text-white 
              font-medium 
              rounded-full 
              px-6 py-3 
              text-lg 
              transition 
              shadow-lg
            "
          >
            <span className="mr-2">💼</span>
            Connect Wallet
        </Link>
      </div> 
*/}
{/**
         * 

        <div
  className="absolute right-0 top-[30px] opacity-60 animate-float-slow delay-2000 pointer-events-none"
  style={{
    width: "150px",
    height: "350px"
  }}
>
  <Image
    src={rightCorner}
    alt="corner"
    width={120}
    height={350}
    style={{ objectFit: "contain", objectPosition: "right center" }}
  />
</div>
         */}
      {/*
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#0A0D1C] z-0" />
<div
  className="absolute bottom-0 left-0 w-full h-20 pointer-events-none z-0 opacity-50"
  style={{
    backgroundImage: [
      // 1) сильное затемнение левого низа:
      //"radial-gradient(circle at bottom left, rgba(6, 11, 25, 0.8) 0%, rgba(10,19,41,0) 70%)",
      //"linear-gradient(to left, #0A1329 0%, rgba(10,19,41,0) 100%)",

      // 2) чуть более тёмный левый верх, стирающийся к центру по вертикали:
      "linear-gradient(to top, black 0%, rgba(10,19,41,0) 100%)",
      // 3) плавный убывающий вправо цвет сверху:
      //"linear-gradient(to right, rgba(10,19,41,1) 0%, rgba(10,19,41,0) 80%)"
    ].join(", ")
  }}
/>
<div
  className="absolute bottom-0 left-0 w-1/4 h-20 z-0"
  style={{
    background: "linear-gradient(to bottom, transparent, #0A0D1C)",
    WebkitMaskImage: "linear-gradient(to right, black 80%, transparent 100%)",
    maskImage: "linear-gradient(to right, black 80%, transparent 100%)"
  }}
/>
      */}
{/*
        <Link href="/plans" 
            className="
              inline-block 
              bg-[#00BFFF] hover:bg-[#00A5E0] 
              text-white 
              font-medium 
              rounded-full 
              px-6 py-3 
              text-lg 
              transition 
              shadow-lg
            "
          >
            See Plans
        </Link>
        */}

// components/StepsToInvest.tsx
/*
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import stepsBg from '@/assets/StepsToInvest/steps.svg';  
import ton1Img from '@/assets/StepsToInvest/ton1.png';
import ton2Img from '@/assets/StepsToInvest/ton2.png';
import ton3Img from '@/assets/StepsToInvest/ton3.png';
import leftC from '@/assets/StepsToInvest/leftCorner.svg';
import rightC from '@/assets/StepsToInvest/rightCorner.svg';


type Step = {
  id: number;
  title: string;
  description: string;
  img: StaticImageData;
};

const steps: Step[] = [
  { id: 1, title: 'Choose Plan',   description: 'givemeyourmoney', img: ton1Img },
  { id: 2, title: 'Stake Tokens',  description: 'givemeyourmoney', img: ton2Img },
  { id: 3, title: 'Earn Rewards',  description: 'givemeyourmoney', img: ton3Img },
];

export default function StepsToInvest() {
  return (
    
    <div className="relative z-10 container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-12 text-center text-gray-300">How to Start Investing</h2>
<section
      className="relative py-20 text-white overflow-hidden"
      style={{
        backgroundColor: '#0A1329',
        backgroundImage: `
          url(${leftC.src}),
          url(${stepsBg.src}),
          url(${rightC.src})
        `,
        backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
        backgroundSize:    'auto 300px, auto 300px, auto 300px',
        backgroundPosition: '5% 50%, center 50%, 95% 50%',
      }}
    >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-40">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <Image
                src={step.img}
                alt={step.title}
                width={96}
                height={96}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-300 text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
    </section>
    </div>
  );
}

*/


/* 

// Import step illustrations and icons
import stepsbg from '@/assets/StepsToInvest/steps.svg';
import step2Img from '@/assets/StepsToInvest/ton2.png';
import step3Img from '@/assets/StepsToInvest/ton3.png';
import ton1Img from '@/assets/StepsToInvest/ton1.png';
import ton2Img from '@/assets/StepsToInvest/ton2.png';
import ton3Img from '@/assets/StepsToInvest/ton 3d 3.png';
import step4Img from '@/assets/StepsToInvest/╤Б╨▓╨╡╤З╨╡╨╜╨╕╨╡ 2.png'; //assets\StepsToInvest\╤Б╨▓╨╡╤З╨╡╨╜╨╕╨╡ 2.png

components/StepsToInvest.tsx
"use client"

const steps = [
  { id: 1, title: "Connect Wallet", desc: "Use Tonkeeper, OpenMask, or Tonhub to connect" },
  { id: 2, title: "Enter Amount", desc: "Choose the amount of TON to stake" },
  { id: 3, title: "Confirm Stake", desc: "Confirm the transaction and start earning" },
]

export default function StepsToInvest() {
  return (
    <section className="bg-[#0E1A38] py-24 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-300">
          How to Start Staking
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-[#3C7EFF] text-white flex items-center justify-center text-xl font-bold">
                {step.id}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-gray-300 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

*/