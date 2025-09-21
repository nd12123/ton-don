"use client";

import React from "react";
import Image from "next/image";
import ton3d4 from "@/assets/TotalValue/Ton 3d 4.png";
import ton3d5 from "@/assets/TotalValue/Ton 3d 5.svg";
import ton3d6 from "@/assets/TotalValue/Ton 3d 6.png";
import ton3d7 from "@/assets/TotalValue/Ton 3d 7.svg";
import ton3d8 from "@/assets/TotalValue/Ton 3d 7.png";
import leftSphere from "@/assets/TotalValue/Ellipse9.png";
import rightSphere from "@/assets/TotalValue/Ellipse10.png";
import GoToStakingButton from "@/components/GoToStakingButton";
import TotalValueWidget from "@/components/TotalValueWidget";
import { useT } from "@/i18n/react";

export default function TotalValue() {
  const tHome = useT("home");
  const tCommon = useT("common");

  return (
    <section id="total-value" className="relative overflow-hidden text-white py-32 scroll-smooth">
      {/* 1) Фон горизонта (полупрозрачный) */}
      <div className="md:hidden absolute inset-0 -z-20 opacity-45 md:opacity-40">
        <Image
          src="/decorative/horizon-bg.svg"
          alt="horizon"
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      </div>

      {/* desktop horizon с маской */}
      <div className="hidden md:block md:-mt-[50px] absolute inset-0 -z-20">
        <Image
          src="/decorative/horizon-bg.svg"
          alt="horizon"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            opacity: 0.4,
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,1) clamp(24px,6vw,110px))",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,1) clamp(24px,6vw,110px))",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        />
        <div className="hidden md:block absolute inset-0 -z-10 pointer-events-none">
          <Image
            src="/decorative/starsbg1.png"
            alt="stars"
            fill
            style={{ objectFit: "cover", opacity: 0.1 }}
          />
        </div>
      </div>

      <div
        className="hidden md:block absolute top-0 left-0 w-full h-12 md:h-24 pointer-events-none -z-10"
        style={{ background: "linear-gradient(to bottom, #0B1028, rgba(11, 17, 40, 0))" }}
      />

      {/* 2) Звёзды (mobile) */}
      <div className="md:hidden absolute inset-0 -z-10 pointer-events-none">
        <Image
          src="/decorative/starsbg1.png"
          alt="stars"
          fill
          style={{ objectFit: "cover", opacity: 0.1 }}
        />
      </div>

      {/* 3) Боковые эллипсы */}
      <div className="absolute top-0 left-0 w-full md:w-1/2 h-full opacity-[100%] md:top-[-20px] md:left-[-20px] md:opacity-[55%] pointer-events-none z-10">
        <Image src="/decorative/Ellipse60.png" alt="left glow" fill style={{ objectFit: "cover", objectPosition: "left top" }} />
      </div>
      <div className="absolute md:hidden top-0 right-0 w-full h-full opacity-60 md:w-[50%] md:top-[-50px] md:right-[-30px] md:opacity-[39%] pointer-events-none z-[12]">
        <Image src="/decorative/Ellipse50.png" alt="right glow" fill style={{ objectFit: "cover", objectPosition: "right top" }} />
      </div>

<div className="absolute hidden md:block top-0 right-0 w-full h-full opacity-[42%] pointer-events-none z-[12] overflow-visible">
  <div className="relative w-full h-full md:origin-top-right md:scale-x-[0.52]">
    <Image
      src="/decorative/Ellipse50.png"
      alt="right glow"
      fill
      style={{ objectFit: "cover", objectPosition: "right top" }}
      priority
    />
  </div>
</div>


      {/* 4) 3D-монеты */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src={ton3d4} alt="" className="absolute top-[55%] left-[0%] w-[10%] opacity-100 animate-float z-10" />
        <Image src={ton3d6} alt="" className="absolute top-[10%] right-[0%] w-[10%] opacity-100 animate-float delay-4000 z-10" />
        <Image src={ton3d5} alt="" className="absolute hidden md:block bottom-[0%] right-[9%] w-[25%] opacity-100 animate-float delay-2000 z-10" />
        <Image src={ton3d8} alt="" className="absolute md:hidden bottom-[2%] right-[9%] w-[25%] opacity-100 animate-float delay-2000 z-10" />
        <Image src={ton3d7} alt="" className="absolute top-[0%] left-[10%] w-[12%] opacity-100 animate-float delay-2000 z-10" />
        <Image src={rightSphere} alt="" className="absolute top-[0%] left-[8%] w-[15%] opacity-60 z-5" />
        <Image src={leftSphere} alt="" className="absolute bottom-[0%] right-[7%] w-[30%] opacity-80 z-5" />
      </div>

      {/* 5) Контент */}
      <div className="container mx-auto px-4 text-center py-10">
        <p className="text-lg text-[#4DC0F5]">{tHome("stats.title")}</p>

        <TotalValueWidget />

        <p className="mt-6 max-w-2xl mx-auto text-base text-gray-300">
          {tHome("stats.blurb")}
        </p>

        <GoToStakingButton
          className="btn-primary mt-10 inline-block md:px-8 px-5 py-3 md:py-4 bg-gradient-to-br from-[#00BFFF] to-[#009FEF] text-white text-lg font-medium rounded-[15px] shadow-lg hover:opacity-90 transition"
        >
          {tCommon("buttons.startInvesting")}
        </GoToStakingButton>
      </div>

      {/* нижний градиент-подложка */}
      <div
        className="absolute bottom-0 left-0 w-full h-full pointer-events-none -z-10 opacity-50"
        style={{
          background:
            "linear-gradient(to top, #010512 0%, #050C1E 20%, #060E21 42%, #0A1324 80%, #0A1324 100%)",
        }}
      />
    </section>
  );
}
