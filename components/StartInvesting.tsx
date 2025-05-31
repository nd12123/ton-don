// components/StartInvesting.tsx
"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Пути к изображениям (фоновые монеты подбирайте / переименуйте под ваши)
import coinLarge from "@/assets/StepsToInvest/ton1.png";
import coinSmallTop from "@/assets/StepsToInvest/ton2.png";
import coinSmallBottom from "@/assets/StepsToInvest/ton3.png";

type StartInvestingProps = {
  className?: string;
};

export default function StartInvesting({ className = "" }: StartInvestingProps) {
  return (
    <section className={`relative overflow-hidden ${className} py-20`}>
      {/* 1) Абсолютный фон: переходящий голубой градиент */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r from-[#00BFFF] to-[#009FEF]
          rounded-3xl
        "
      ></div>

      {/* 2) Плавающие изображение монет */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Крупная монета справа-снизу */}
        <div className="absolute bottom-0 right-0 w-[30%] max-w-[300px] opacity-30 animate-float-slow">
          <Image src={coinLarge} alt="Coin" priority />
        </div>
        {/* Средняя монета слева-сверху */}
        <div className="absolute top-[-10%] left-[10%] w-[15%] max-w-[150px] opacity-40 animate-float-slow delay-2000">
          <Image src={coinSmallTop} alt="Coin" priority />
        </div>
        {/* Мелкая монета справа-сверху */}
        <div className="absolute top-[10%] right-[20%] w-[10%] max-w-[100px] opacity-40 animate-float-slow delay-4000">
          <Image src={coinSmallBottom} alt="Coin" priority />
        </div>
      </div>

      {/* 3) Основной контент (текст + кнопка) */}
      <div className="relative z-10 container mx-auto px-4 text-white flex flex-col items-start md:flex-row md:items-center">
        {/* Текстовая часть */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Start investing now!
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-white/90">
            Start earning in&nbsp;2&nbsp;clicks&nbsp;– your first income tomorrow
          </p>

          <button
            className="
              mt-8 inline-flex items-center justify-center
              bg-white text-[#009FEF] font-semibold
              rounded-lg px-6 py-3
              hover:shadow-xl transition-shadow duration-200
            "
          >
            Stake Now&nbsp;
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        {/* Пустой блок справа (на макете здесь просто фон и монета крупная) */}
        <div className="hidden md:block md:w-1/2"></div>
      </div>
    </section>
  );
}
