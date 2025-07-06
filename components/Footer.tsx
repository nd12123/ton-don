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
const sphereTop = "/decorative/ellipse10.png";    // яркая сфера сверху
const sphereLeft = "/decorative/Ellipse60.png";    // сбоку слева
const sphereUpperLeft = "/decorative/EllipseNowLeft.png";    // сбоку слева
const sphereRight = "/decorative/ellipse5.png";   // сбоку справа
const tonCoin1 = "/decorative/ton3.png";
const tonCoin2 = "/decorative/ton2.png";

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`relative overflow-hidden text-white ${className}`}>
      {/* =========================
          0) Фоновый слой: звёзды, сферы, тоны
         ========================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* звёздные текстуры */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${stars1}), url(${stars2})`,
            backgroundRepeat: "repeat, repeat",
            backgroundSize: "auto, auto",
            mixBlendMode: "screen",
          }}
        />

        {/* большие полупрозрачные сферы */}
        <Image
          src={sphereTop}
          alt=""
          fill
          style={{
            objectFit: "contain",
            objectPosition: "center top",
            opacity: 0.1
          }}
        />

        <Image
          src={sphereUpperLeft}
          alt=""
          className="absolute left-0 top-0 w-full h-auto opacity-80"
        />

        <Image
          src={sphereLeft}
          alt=""
          className="absolute left-0 top-0 w-full h-auto opacity-30"
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
          className="absolute w-24 h-24 top-[5%] right-[10%] opacity-60 animate-float-slow"
        />
        <Image
          src={tonCoin2}
          alt=""
          className="absolute w-20 h-20 bottom-[15%] right-[20%] opacity-50 animate-float-slow delay-3000"
        />
      </div>

      {/* =========================
          1) CTA-блок «Start investing now!»
          mb-16
         ========================= */}
      <div className="relative z-10 ">
        {/* здесь ваш компонент StartInvesting */}
      </div>
      <StartInvesting />

      {/* =========================
          2) Основной футер: логотип, навигация, соцсети 
         ========================= */}
      <div className="relative z-10 border-t border-[#1F2A44] pt-5 pb-3">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* левый блок */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Image src={logoSvg} alt="TONStake.ai" width={32} height={32} />
              <span className="text-xl font-semibold">TON Stake Ai</span>
            </div>
            <div className="h-6 border-l border-[#1F2A44]" />
            <div className="flex items-center gap-2 bg-[#0A1329] px-3 py-1 rounded-lg">
              <Image
                src={certikBadge}
                alt="Audited by Certik"
                width={100}
                height={40}
              />
              <span className="text-sm text-[#A0B0D8]">Audited by Certik</span>
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
            <Link href="/faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
          </nav>

          {/* соцкнопки */}
          <div className="flex items-center gap-4">
            <Link
              href="/support"
              className="
                inline-flex items-center justify-center
                bg-[#0A1329] hover:bg-[#1F2A44]
                rounded-lg p-3
                transition-colors
              "
            >
              <Image src={supportIcon} alt="Support" width={24} height={24} />
            </Link>
            <Link
              href="https://t.me/YourTelegramChannel"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center justify-center
                bg-[#0A1329] hover:bg-[#1F2A44]
                rounded-lg p-3
                transition-colors
              "
            >
              <Image
                src={telegramIcon}
                alt="Telegram"
                width={50}
                height={50}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* =========================
          3) Копирайт
         ========================= */}
      <div className="relative z-10 border-t border-[#1F2A44] mt-6 pt-6 pb-2">
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
