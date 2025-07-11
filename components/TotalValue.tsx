// components/TotalValue.tsx
import React from "react";
import Image from "next/image";
import ton3d4 from "@/assets/TotalValue/Ton 3d 4.png";
import ton3d5 from "@/assets/TotalValue/Ton 3d 5.png";
import ton3d6 from "@/assets/TotalValue/Ton 3d 6.png";
import ton3d7 from "@/assets/TotalValue/Ton 3d 7.png";
//import SectionFadeWrapper from "./decorative/SectionFadeWrapper";

import ellipse5 from '@/public/decorative/Ellipse50.png'
import ellipse6 from '@/public/decorative/Ellipse60.png'

export default function TotalValue() {
  return (
    //<SectionFadeWrapper >
    <section
      className="horizon section-mask relative overflow-hidden text-white py-52  bg-gradient-to-r from-[#00BFFF] to-[#009FEF]" //gradient-to-r??
      style={{
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
          className="absolute top-[55%] left-[0%] w-[10%] opacity-30 animate-float"
        />
        <Image
          src={ton3d6}
          alt=""
          className="absolute top-[10%] right-[0%] w-[10%] opacity-40 animate-float delay-4000"
        />
        <Image
          src={ton3d5}
          alt=""
          className="absolute bottom-[0%] right-[9%] w-[25%] opacity-30 animate-float delay-2000"
        />
        <Image
          src={ton3d7}
          alt=""
          className="absolute top-[0%] left-[10%] w-[16%] opacity-45 animate-float delay-6000"
        />
      </div>

      {/* 4) Контент */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-5xl sm:text-6xl font-extrabold mb-4">
          Total Value Locked
        </h2>
        <p className="text-7xl sm:text-8xl font-extrabold">$12,320,000</p>
      </div>
    </section>
    //</SectionFadeWrapper>
  );
}
