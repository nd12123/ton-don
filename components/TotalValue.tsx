// components/TotalValue.tsx
import React from "react";
import Image from "next/image";
import ton3d4 from "@/assets/TotalValue/Ton 3d 4.png";
import ton3d5 from "@/assets/TotalValue/Ton 3d 5.png";
import ton3d6 from "@/assets/TotalValue/Ton 3d 6.png";
import ton3d7 from "@/assets/TotalValue/Ton 3d 7.svg";

//import SectionFadeWrapper from "./decorative/SectionFadeWrapper";
import leftSphere from '@/assets/TotalValue/Ellipse9.png';
import rightSphere from '@/assets/TotalValue/Ellipse10.png';

import ellipse5 from '@/public/decorative/Ellipse50.png'
import ellipse6 from '@/public/decorative/Ellipse60.png'

export default function TotalValue() {
  return (
    //<SectionFadeWrapper >
    <section
      className="horizon section-mask relative overflow-hidden text-white py-32 " // bg-[#0B1028]  bg-gradient-to-r from-[#00BFFF] to-[#009FEF]??
      style={{
      //top: "30px", // двигаем НИЖЕ
      //height: "calc(100% + 30px)",
        // 1) Твой основной фон (градиент/цвет из фрейма)
        backgroundImage: `url("/decorative/horizon-bg.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        opacity: 0.4,
        backgroundRepeat: "no-repeat",
        
      }}
    >
      {/* 2) Звёздная текстура — тайлируемая и полупрозрачная */}
      {/**,
            url('/decorative/starsbg2.png') */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `url("/decorative/starsbg1.png")`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          opacity: 0.99,
          mixBlendMode: "screen",  // можно убрать или заменить на "overlay"
        }}
      />
<div
        className="absolute top-0 left-0 w-1/2 h-full pointer-events-none"
      >
        <Image
          src={ellipse6}
          alt=""
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'left top',
            opacity: 0.99,
          }}
        />
      </div>
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
      >
        <Image
          src={ellipse5}
          alt=""
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'right top',
            opacity: 0.9,
          }}
        />
      </div>

      
      {/* 3) Горизонтальное «сечение» */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={ton3d4}
          alt=""
          className="absolute top-[55%] left-[0%] w-[10%] opacity-99 animate-float"
        />
        <Image
          src={ton3d6}
          alt=""
          className="absolute top-[10%] right-[0%] w-[10%] opacity-99 animate-float delay-4000"
        />
        <Image
          src={ton3d5}
          alt=""
          className="absolute bottom-[0%] right-[9%] w-[25%] opacity-99 animate-float delay-2000" // animate-float delay-2000
        />
        <Image
          src={leftSphere}
          alt=""
          className="absolute bottom-[0%] right-[7%] w-[30%] opacity-80"
        />
        <Image
          src={ton3d7}
          alt=""
          className="absolute top-[0%] left-[10%] w-[16%] opacity-99 animate-float delay-2000" // animate-float delay-6000
        />
        <Image
          src={rightSphere}
          alt=""
          className="absolute top-[0%] left-[8%] w-[20%] opacity-70"
        />
      </div>

      {/* 4) Контент */}
      
      {/* контейнер ровно по макету */}
      <div className="container mx-auto px-4 text-center py-10">
        {/* 1) надпись Total Value */}
        <p className="text-lg text-[#4DC0F5]">Total Value</p>

        {/* 2) цифры с иконкой */}
        <div className="mt-4 flex items-center justify-center">
          <Image
            src="/decorative/ton-icon.svg"
            alt="TON"
            width={48}
            height={48}
          />
          <h2 className="ml-2 text-[90px] leading-[90px] font-bold text-[#4DC0F5]">
            124&nbsp;000&nbsp;TON
          </h2>
        </div>

        {/* 3) текст под цифрами */}
        <p className="mt-6 max-w-2xl mx-auto text-base text-gray-300">
          TonStake.ai automates your income&nbsp;– over $2 million TON is already
          making a profit on our algorithms. Start with 10 TON and watch your
          capital grow!
        </p>

        {/* 4) кнопка */}
        <button
          className="mt-10 inline-block px-8 py-4 bg-gradient-to-br from-[#00BFFF] to-[#009FEF]
                     text-white text-lg font-medium rounded-[15px] shadow-lg hover:opacity-90 transition"
        >
          Start Investing Now
        </button>
      </div>
    </section>
    //</SectionFadeWrapper>
  );
}
