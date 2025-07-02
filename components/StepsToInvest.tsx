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
          className="relative overflow-hidden text-white py-20"

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

      {/* 2) Заголовок + кнопка „See Plans“ */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
          3 Easy steps to invest in 
          <span className="text-[#00C2FF]">TonStake.Ai</span>
        </h2>
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
      </div>

 {/* ========== ОБКАТЫВАЕМ КОНТЕНТ В RELATIVE-wrapper ========== */}
 <div className="relative mt-12">
        {/* 1) фон-изображение – ровно под гридом */}
        <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none"
                  style={{ height: 350 }}
>
          <Image
            src="/decorative/step-mask.svg"
            alt="steps background"
            fill
            style={{
              objectFit: "contain",
              objectPosition: "center center",  // по центру по X, сверху по Y
            }}
          />
        </div>
      {/* 3) Контейнер с тремя «шагами» py-20 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 mt-12 "> 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" >
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
                <div className="text-4xl font-bold mb-4 py-6">{step.id.toString().padStart(2, "0")}</div>

                {/* Текст шага */}
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
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
        {/* Большая монета в центре 
        
       
        */}
        
        <div className="absolute inset-x-0 -top-1/2 -right-1/3 opacity-60 flex justify-center">
          <Image
            src={coinLarge}
            alt="Ton Coin"
            className="w-48 h-48 opacity-70 animate-float-slow"
          />
        </div>
        {/* Мелкие монетки слева и справа */}
        <Image
          src={leftCorner}
          alt="Ton Coin"
          className="absolute left-0 h-80 top-center opacity-60 animate-float-slow delay-2000" //w-16 h-16  left-8 top-1/2 
        />
        <Image
          src={rightCorner}
          alt="Ton Coin"
          className="absolute right-0 h-80 top-center  opacity-60 animate-float-slow delay-2000" //right-8 top-1/3 w-20 h-20
        />
      </div>
</div>
      {/* 5) Кнопка «Connect Wallet» снизу */}
      <div className="relative z-10 mt-16 flex justify-center">
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
            {/* Здесь можно вставить иконку кошелька (через <Image>) */}
            <span className="mr-2">💼</span>
            Connect Wallet
        </Link>
      </div>
    </section>
  );
}



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