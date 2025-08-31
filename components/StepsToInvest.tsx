// components/StepsToInvest.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Пути к вашим файлам. Поместите картинки в папку /public/decorative/
import coinLarge from "@/assets/StepsToInvest/ton2.png";//"/decorative/ton2.png"; // большая монета
//import coinSmall from "@/assets/StepsToInvest/ton1.png";//"/decorative/ton3.png"; // мелкие монеты
import leftCorner from "@/assets/StepsToInvest/leftCorner.svg";
import rightCorner from "@/assets/StepsToInvest/rightCorner.svg";

import rightCornerBottom from "@/public/decorative/ellipse5.png";
import centerSphere from "@/public/decorative/Ellipse51.png";

//import WalletConnect from "@/components/WalletConnect";
import ConnectWalletButton from "@/components/ConnectWalletButton";


export default function StepsToInvest() {
  // Структура трёх шагов (номер, заголовок, описание).
  const steps = [
    {
      id: 1,
      title: "Choose Plan",
      description: "Select the plan that suits you best",
    },
    {
      id: 2,
      title: "Make a Deposit",
      description: "Deposit at least 10 TON",
    },
    {
      id: 3,
      title: "Receive Dividends",
      description: "Earn rewards and withdraw anytime",
    },
  ];

  return (
    <section
          className="relative  text-white py-10 overflow-x-clip" // pb-10 overflow-hidden

          //style={{
            /* 
             1) основной фон из одного SVG 
             2) по центру, без повторов, растягиваем именно на width=100%, а height подгоняется автоматически 
            */
            //backgroundImage: `url("/decorative/step-mask.svg")`,
            //backgroundRepeat: "no-repeat",
            //backgroundPosition: "center center",
            //backgroundSize: "auto 350px",
            //backgroundColor: "#0A1329", // на случай, если SVG не загрузится
          //}}
          >
      {/* 1) Фоновый «баграунд» со скруглёнными боковинами (если нужен) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 
          – Если в Figma фон «переходит» с одного оттенка синего в другой, 
            можно залить градиентом (как выше в `bg-gradient-to-br`).
          – Если у вас есть статический фон (например, SVG-обвод, «волнистая» граница),
            можно добавить его сюда через <Image> или вставить SVG.
        */}
      </div>

      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
      <Image
          src={rightCornerBottom}
          alt="corner"
          className="absolute right-0 bottom-0 w-full h-full opacity-10" //bottom-right 
        />
</div>

<div className="absolute top-[20%] right-[30%] opacity-90 z-[5] animate-float-slow  delay-1000">
      <Image
        src="/decorative/ton4.svg"
        alt="TON Coin Right"
        width={125}
        height={125}
        //className="absolute top-[20px] right-[20%] opacity-65 animate-float-slow animate-float-slow  delay-1000"
      />
</div>

      {/* 2) Заголовок + кнопка „See Plans“ */}
      {/* 2.1) Заголовок px-4 */}
<div className="max-w-6xl mx-auto px-0 relative z-10 text-left"> 
  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight font-inter">
    3 Easy steps to invest<br/>
     in <span className="text-[#00C2FF]">TonStake.Ai</span>
  </h2>
  
      {/* 5) Кнопка „See Plans“ */}
      <div className="relative z-10 mt-6 flex justify-left">
        <Link href="#calculate-plans" //scroll={false}
        >
          <a
            className="
              w-52 h-11
              relative
              bg-[radial-gradient(ellipse_179.05%_152.88%_at_74.38%_155.56%,_#3DD4FF_0%,_#0098EA_100%)]
              rounded-xl
              shadow-[0px_4px_27.6px_0px_rgba(61,212,255,0.42)]
              outline outline-1 outline-offset-[-1px] outline-sky-400
              overflow-hidden
              flex items-center justify-center
            "
          >
            <span className="text-white text-lg font-semibold font-['Inter'] leading-loose">
              See Plans
            </span>
          </a>
        </Link>
      </div>
</div>



 {/* ========== ОБКАТЫВАЕМ КОНТЕНТ В RELATIVE-wrapper ========== */}
 <div className="relative mt-12">
        
        
{/* 1) фон-изображение – под гридом, уже на мобилках */}
<div
  className="
    absolute top-0
    left-1/2 -translate-x-1/2
    w-[92vw] h-[280px]           /* мобилка: уже, ниже */
    pointer-events-none z-[-1] overflow-hidden
    md:inset-x-0 md:translate-x-0
    md:w-auto md:h-[350px]
  "
>
  <Image
    src="/decorative/step-mask.svg"
    alt="steps background"
    fill
    style={{ objectFit: 'contain', objectPosition: 'center center' }}
  />

  {/* Левый корнер: делаем узким на мобиле */}
  <div className="absolute left-0 top-0 h-full">
    <div className="relative h-full w-[18vw] min-w-[56px] md:w-[180px] lg:w-[220px]">
      <Image
        src={leftCorner}
        alt="corner"
        fill
        style={{ objectFit: 'contain', objectPosition: 'left center' }}
        // priority
      />
    </div>
  </div>

  {/* Правый корнер: симметрично */}
  <div className="absolute right-0 top-0 h-full">
    <div className="relative h-full w-[18vw] min-w-[56px] md:w-[180px] lg:w-[220px]">
      <Image
        src={rightCorner}
        alt="corner"
        fill
        style={{ objectFit: 'contain', objectPosition: 'right center' }}
      />
    </div>
  </div>
</div>


      {/* 3) Контейнер с тремя «шагами» py-20 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 mt-12 "> 
        <div className="grid grid-cols-3 gap-5"  //grid-cols-1 md: ...3
        >
          {steps.map((step, idx) => (
            <div key={step.id} className="relative group" >
              {/* 
                3.1) Сам «блок» шага: фон ярко-синего цвета с лёгкой тенью.
                     Скругляем углы: слева и справа слегка волнистые (имитация «зубцов»),
                     но для простоты здесь скругление сделано обычным border-radius.
                     Если вам нужна именно форма «как в макете» (с зубчиками), 
                     можно сделать SVG-маску, но для начала часто хватает 
                     простого округления углов.
              */}
              <div
                  className="
                    bg-transparent    /* фон убрали, теперь виден только SVG */
                    rounded-2xl 
                    p-10 
                    h-full
                    flex flex-col /*justify-start */
                    hover:shadow-xl transition
                  "
              >
                {/* Номер шага */}
                <div className="text-l md:text-4xl font-bold mb-4 py-4 md:py-6">{step.id.toString().padStart(2, "0")}</div>

                {/* Текст шага */}
                <h3 className="text-m md:text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-base">{step.description}</p>
              </div>

              {/* 
                3.2) Вертикальная пунктирная линия между карточками (кроме последнего)
                    – делаем позиционированный div с высотой равной блоку шагов 
                    – с border-left: 2px dashed white/серый (или tailwind-классом)
              */}
              {idx < steps.length - 1 && (
                <div
                  /*className="
                    hidden md:block 
                    absolute 
                    top-1/4 
                    right-0 
                    h-1/2 
                    border-r-2 border-dashed border-white/50
                  " */
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4) Абсолютно позиционированные «плавающие» 3D-монетки */}
      <div className="absolute inset-0 pointer-events-none">
        {/* === Плавающие монеты === */}
      {/* Левая монета (ton4) — верхний левый угол */}
      <div className="absolute top-[0px] right-[160px] w-[200px] h-[200px] opacity-100  z-[5]"> 
        <Image
          src="/decorative/ton22.svg" //png
          alt="TON Coin Left"
          fill
          style={{ objectFit: "contain", mixBlendMode: "screen" }} // animate-float-slow
        />
      </div>
        
              {/* Главная центральная монета — выше всех фонов, под текстом justify-center inset-x-0*/}
      <div className="absolute  top-[-120px] right-[36%] z-0 flex  pointer-events-none">
        <Image
          src={coinLarge}
          alt="Ton Coin"
          width={300}
          height={300}
          className="opacity-100" //animate-float-slow
          style={{
            objectFit: "contain",
            mixBlendMode: "screen"
          }}
        />
      </div>

      <div className="absolute top-[-150px] right-[-150px] w-full h-full opacity-100 z-[5]" // -150 растягивает экран на мобилке
      >
        <Image
          src={centerSphere}
          alt="Sphere"
          fill
          style={{ objectFit: "contain",
            mixBlendMode: "screen"
           }} 
        />
      </div>
       
    </div>
      
<div className="relative z-10 flex justify-center py-7"//mt-16
>
  <ConnectWalletButton />
</div>
{/**
<div className="w-44 h-10 relative bg-[radial-gradient(ellipse_72.70%_100.11%_at_50.00%_50.00%,_#009BEF_0%,_#3CBAFF_100%)] rounded-xl shadow-[0px_11px_21px_0px_rgba(56,172,234,0.18)] overflow-hidden">
  <div className="w-32 h-4 left-[35px] top-[12px] absolute justify-center text-white text-base font-semibold font-['Inter'] leading-loose">Connect Wallet</div>
  <div className="w-4 h-4 left-[11.35px] top-[11.43px] absolute bg-white" />
</div>

 * 
//{  === Плавный переход снизу в следующую секцию ===  }
  <div
    className="absolute bottom-0 left-0 w-full h-8 pointer-events-none z-0 opacity-20"
    style={{
      // 1) плавный переход от цвета секции Steps (снизу) вверх в прозрачность
      background: "linear-gradient(to bottom, transparent, black 40%)", //rgba(10,19,41,1)
      // 2) по горизонтали «стираем» его к правому краю, чтобы справа он полностью исчезал
      WebkitMaskImage: "linear-gradient(to right, black 30%, transparent 100%)",
      maskImage:       "linear-gradient(to right, black 30%, transparent 100%)",
    }}
  />
 */}

</div>

    </section>
    
  );
}
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