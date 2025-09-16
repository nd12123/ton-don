// components/Footer.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useT } from '@/i18n/react';

import logoSvg from "@/assets/Footer/Ton image.png";
//import certikBadge from "@/assets/Main/bottom audited by certik.svg";
import certikBadge from "@/public/decorative/certik.svg";

import supportIcon from "@/assets/Footer/Support.svg";
//import telegramIcon from "@/assets/Footer/telegram.svg"; // (не используется, оставил как было)
import StartInvestingDesktop from "./StartInvestingDesktop";
import StartInvesting from "./StartInvesting";

// декоративные картинки из /public/decorative
const stars1 = "/decorative/starsbg1.png";
const stars2 = "/decorative/stars1.png";
const sphereUpperRight = "/decorative/Ellipse50.png";
const sphereUpperLeft = "/decorative/EllipseNowLeft.png";
const sphereRight = "/decorative/ellipse5.png";
const tonCoin1 = "/decorative/ton3.png";
const tonCoin2 = "/decorative/ton2.png";

export default function Footer({ className = "" }: { className?: string }) {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className={`relative overflow-hidden text-white ${className}`}>
      {/* нижний fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-48 -z-10"
        style={{
          background: `linear-gradient(to bottom, rgba(3,12,28,0) 0%, rgba(1,6,15,1) 100%)`,
          mixBlendMode: "multiply",
        }}
      />
      {/* верхний лёгкий fade */}
      <div
        className="pointer-events-none absolute top-0 left-0 w-full h-48 z-10 opacity-10"
        style={{
          background: `linear-gradient(to top, rgba(3,12,28,0) 0%, rgba(1,6,15,1) 100%)`,
          mixBlendMode: "multiply",
        }}
      />

      {/* ===== 0) Фон: звёзды/сферы/тон ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-99"
          style={{
            backgroundImage: `url(${stars1}), url(${stars2})`,
            backgroundRepeat: "repeat, repeat",
            backgroundSize: "auto, auto",
            mixBlendMode: "screen",
          }}
        />
        <Image
          src={sphereUpperLeft}
          alt=""
          className="absolute left-0 sm:top-[-15px] top-0 w-full h-auto opactity-[85%] md:opacity-85"
        />
        <Image
          src={sphereUpperRight}
          alt=""
          className="hidden md:block absolute right-0 top-0 w-full h-auto opacity-[05%]"
        />
        <Image
          src={sphereRight}
          alt=""
          className="absolute right-0 bottom-0 w-1/2 h-auto opacity-25"
        />
        <Image
          src={tonCoin1}
          alt=""
          className="absolute w-16 h-16 md:w-32 md:h-32 top-[3%] md:top-[5%] right-[3%] opacity-60 animate-float-slow delay-1000"
        />
        <Image
          src={tonCoin2}
          alt=""
          className="absolute w-[100px] h-[100px] bottom-[160px] md:bottom-[26%] left-[6%] md:left-[3%] opacity-50 animate-float-slow delay-3000"
        />
      </div>

      {/* ===== 1) CTA Start Investing ===== */}
      <div className="lg:hidden relative z-10 mt-6 sm:mt-8 lg:mt-10 pb-3">
        <StartInvesting />
      </div>
      <StartInvestingDesktop className="hidden lg:block" />

      {/* ===== 2) Верхняя зона футера ===== */}
      <div className="relative z-10 pt-0 md:pt-3 pb-0 md:pb-3">
        <div className="container mx-auto px-2 md:px-4">
          {/* mobile */}
          <div className="md:hidden">
            <div className="flex flex-col items-center justify-between gap-0">
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-2">
                  <Image src={logoSvg} alt="TONStake.ai" width={32} height={32} />
                  <span className="text-xl whitespace-nowrap font-semibold">TON Stake</span>
                </div>

                <div
                  className="-z-10 h-6 border-l-2 border-transparent mx-1 md:mx-2"
                  style={{
                    borderImageSlice: 1,
                    borderImageSource:
                      "linear-gradient(90deg, #021B37 0%, #0099FF 20.19%, #0099FF 81.25%, #021B37 100%)",
                  }}
                />

                <div className="bg-white rounded px-1 py-0.5 flex items-center">
                  <Image
                    src="/decorative/mobile/Certik.png"
                    alt="Audited by Certik"
                    width={100}
                    height={40}
                  />
                </div>

                <div className="flex items-center pt-3">
                  <Link href="/support" className="ml-1 inline-flex items-center">
                    <Image src={supportIcon} alt="Support" width={120} height={50} />
                  </Link>
                </div>
              </div>

              <nav className="flex flex-wrap gap-6 text-[20px] text-white pb-2 mt-2">
                <Link href="/" className="hover:text-white transition-colors">
                  {t("nav.home")}
                </Link>
                <Link href="/staking" className="hover:text-white transition-colors">
                  {t("nav.staking")}
                </Link>
                <Link href="/profile" className="hover:text-white transition-colors">
                  {t("nav.profile")}
                </Link>
                <Link href="/support" className="hover:text-white transition-colors">
                  {t("nav.support")}
                </Link>
              </nav>

              <div
                className="w-full my-4"
                style={{
                  borderStyle: "solid",
                  borderWidth: "1px 0 0 0",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(90deg, #021B37 0%, #0099FF 20.19%, #0099FF 81.25%, #021B37 100%)",
                }}
              />
            </div>
          </div>

          {/* desktop */}
          <div className="hidden md:block">
            <div className="relative min-h-[64px]">
              {/* left */}
              <div className="flex items-center gap-4 min-w-0">
                <div className="flex items-center gap-2">
                  <Image src={logoSvg} alt="TONStake.ai" width={32} height={32} />
                  <span className="text-xl whitespace-nowrap font-semibold">TON Stake</span>
                </div>

                <div
                  className="h-6 border-l mx-4"
                  style={{
                    borderWidth: "0 0 0 4px",
                    borderImageSlice: 1,
                    borderImageSource:
                      "linear-gradient(90deg, #021B37 0%, #0099FF 20.19%, #0099FF 81.25%, #021B37 100%)",
                  }}
                />

                <div className="flex items-center">
                  <Image src={certikBadge} alt="Audited by Certik" width={120} height={50} />
                </div>
              </div>

              {/* center nav */}
              <nav
                className="
                  absolute left-1/2 -translate-x-1/2
                  flex items-center gap-8 text-[20px] text-white
                "
              >
                <Link href="/" className="hover:text-white/90 transition-colors">
                  {t("nav.home")}
                </Link>
                <Link href="/staking" className="hover:text-white/90 transition-colors">
                  {t("nav.staking")}
                </Link>
                <Link href="/profile" className="hover:text-white/90 transition-colors">
                  {t("nav.profile")}
                </Link>
                <Link href="/support" className="hover:text-white/90 transition-colors">
                  {t("nav.support")}
                </Link>
              </nav>

              {/* right support */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <Link href="/support" className="inline-flex items-center">
                  <Image src={supportIcon} alt="Support" width={120} height={50} />
                </Link>
              </div>
            </div>

            <div
              className="w-full my-4"
              style={{
                borderStyle: "solid",
                borderWidth: "1px 0 0 0",
                borderImageSlice: 1,
                borderImageSource:
                  "linear-gradient(90deg, #021B37 0%, #0099FF 20.19%, #0099FF 81.25%, #021B37 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ===== 3) Копирайт ===== */}
      <div className="z-10 container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-1 md:gap-4 text-[12px] text-gray-600">
        <p>{t("footer.copyright")}</p>
        <div className="flex gap-2 md:gap-4">
          <Link href="/terms" className="hover:text-white transition-colors text-[#A0B0D8]">
            {t("footer.terms")}
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors text-[#A0B0D8]">
            {t("footer.privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
