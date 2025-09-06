// components/Footer.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import logoSvg from "@/assets/Footer/Ton image.png";
import certikBadge from "@/assets/Main/bottom audited by certik.svg";
import supportIcon from "@/assets/Footer/Support.svg";
import telegramIcon from "@/assets/Footer/telegram.svg";

// дополнительные декоративные картинки
// положите их в public/decorative/
const stars1 = "/decorative/starsbg1.png";
const stars2 = "/decorative/stars1.png";
//const sphereTop = "/decorative/ellipse10.png";    // яркая сфера сверху
const sphereUpperRight = "/decorative/Ellipse50.png";    // сбоку слева
const sphereUpperLeft = "/decorative/EllipseNowLeft.png";    // сбоку слева

const sphereRight = "/decorative/ellipse5.png";   // сбоку справа
const tonCoin1 = "/decorative/ton3.png";
const tonCoin2 = "/decorative/ton2.png";

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`relative overflow-hidden text-white ${className}`}>
    {/**
     * 
     <div
  className="absolute inset-x-0 top-0 h-32 pointer-events-none -z-10"
  style={{
    background: `
      linear-gradient(
        to bottom,
        rgba(11,23,44,0) 100%,
        rgba(3,12,28,1) 0%
      )
    `,
  }}
/>
     * 
     */}
{/* Fade-in сверху футера */}
<div
  className="pointer-events-none absolute bottom-0 left-0 w-full h-48 z-10"
  style={{
    background: `linear-gradient(to bottom, rgba(3,12,28,0) 0%, rgba(1,6,15,1) 100%)`,
    mixBlendMode: "multiply",

  }}
/>

<div
  className="pointer-events-none absolute top-0 left-0 w-full h-48 z-10 opacity-10"
  style={{
    background: `linear-gradient(to top, rgba(3,12,28,0) 0%, rgba(1,6,15,1) 100%)`,
    mixBlendMode: "multiply",

  }}
/>
      {/* =========================
          0) Фоновый слой: звёзды, сферы, тоны
         ========================= */}
      <div className="absolute inset-0 pointer-events-none"// overflow-hidden
      >
        {/* звёздные текстуры */}
        <div
          className="absolute inset-0 opacity-99"
          style={{
            backgroundImage: `url(${stars1}), url(${stars2})`,
            backgroundRepeat: "repeat, repeat",
            backgroundSize: "auto, auto",
            mixBlendMode: "screen",
          }}
        />

        {/* большие полупрозрачные сферы 
        <Image
          src={sphereTop}
          alt=""
          fill
          className="w-[150] h-[150]"
          style={{
            objectFit: "contain",
            objectPosition: "center top",
            opacity: 0.1

          }}
        />
        
        <Image
          src={sphereLeft}
          alt=""
          className="absolute left-0 top-0 w-full h-auto opacity-30"
        />
        */}
{/**
 * 
 */}
        <Image
          src={sphereUpperLeft}
          alt=""
          className="absolute left-0 top-0 w-full h-auto opacity-85"
        />
        <Image
          src={sphereUpperRight}
          alt=""
          className="absolute right-0 top-0 w-full h-auto opacity-[05%]"
        />


        <Image
          src={sphereRight}
          alt=""
          className="absolute right-0 bottom-0 w-1/2 h-auto opacity-25"
        />

        {/* плавающие монеты TON */}
        <Image
          src={tonCoin1}
          alt=""
          className="absolute w-32 h-32 top-[5%] right-[3%] opacity-60 animate-float-slow"
        />
        <Image
          src={tonCoin2}
          alt=""
          className="absolute w-32 h-32 bottom-[30%] left-[4%] opacity-50 animate-float-slow delay-3000"
        />
      </div>

      {/* =========================
          1) CTA-блок «Start investing now!»
          mb-16
         ========================= */}
      <div className="relative z-10 pb-6 mt-[100px]">
        {/* здесь ваш компонент StartInvesting */}
      <StartInvesting />
      </div>

      {/* =========================
          2) Основной футер: логотип, навигация, соцсети 
         ========================= */}
      <div className="relative z-10 border-t border-[#1F2A44] pt-3 pb-3">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* левый блок */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Image src={logoSvg} alt="TONStake.ai" width={32} height={32} />
              <span className="text-xl font-semibold">TON Stake</span>
            </div>

            <div
            className="h-6 border-l-4 border-transparent mx-4"
            style={{
              borderImageSlice: 1,
              borderImageSource:
                "linear-gradient(90deg, #021B37 0%, #0099FF 20.19%, #0099FF 81.25%, #021B37 100%)",
            }}
            />
            <div className="flex items-center gap-2 bg-[#0A1329] px-2 py-1 rounded-lg">
              <Image
                src={certikBadge}
                alt="Audited by Certik"
                width={120}
                height={50}
              />
              {/**/}
              <span className="text-[12px] md:text-sm text-[#A0B0D8]">Audited by Certik</span>
            </div>
          </div>

          {/* навигация */}
          <nav className="flex flex-wrap gap-8 text-[#A0B0D8]">
            <Link href="/staking" className="hover:text-white transition-colors">
              Staking
            </Link>
            <Link href="/history" className="hover:text-white transition-colors">
              History
            </Link>
            <Link href="/profile" className="hover:text-white transition-colors">
              Profile
            </Link>
            <Link href="/support" className="hover:text-white transition-colors">
              Support
            </Link>
          </nav>

          {/* соцкнопки */}
          <div className="flex items-center gap-4 py-2">
            <Link
              href="/support"
            >
              <Image src={supportIcon} alt="Support" width={120} height={60} />
            </Link>
            <Link
              href="https://t.me/YourTelegramChannel"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={telegramIcon}
                alt="Telegram"
                width={60}
                height={60}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* =========================
          3) Копирайт
         ========================= */}
      <div className="relative z-10 border-t border-[#1F2A44] mt-4 pt-4 pb-1">
        <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-4 text-sm text-[#A0B0D8]">
          <p>© 2025 Orbi Ton | All Rights Reserved</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms and Conditions
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// не забудьте импортировать StartInvesting
import StartInvesting from "./StartInvesting";
