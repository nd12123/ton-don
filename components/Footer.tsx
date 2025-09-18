// components/Footer.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useT } from "@/i18n/react";

import logoSvg from "@/assets/Footer/Ton image.png";
import certikBadge from "@/public/decorative/certik.svg";
import supportIcon from "@/assets/Footer/Support.svg";
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
  // берем общий неймспейс
  const t = useT("common");
  // безопасный фоллбек (если ключа нет — показываем разумный дефолт)
  const tf = <T extends string>(key: string, fb: T) => t<T>(key, undefined, fb);

  const brand = tf("brand", "TON Stake");
  const navHome = tf("nav.home", "Home");
  const navStaking = tf("nav.staking", "Staking");
  const navProfile = tf("nav.profile", "Profile");
  const navSupport = tf("nav.support", "Support");

  const copy = tf("footer.copyright", "© 2025 Orbi Ton | All Rights Reserved");
  const terms = tf("footer.terms", "Terms and Conditions");
  const privacy = tf("footer.privacy", "Privacy Policy");

  const supportAlt = tf("nav.support", "Support");

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
      {/* верхний fade */}
      <div
        className="pointer-events-none absolute top-[-5px] left-0 w-full h-48 z-10 opacity-10"
        style={{
          background: `linear-gradient(to top, rgba(3,12,28,0) 0%, rgba(1,6,15,1) 100%)`,
          mixBlendMode: "multiply",
        }}
      />

      {/* фон: звёзды/сферы/тон */}
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

      {/* CTA */}
      <div className="lg:hidden relative z-10 mt-6 sm:mt-8 lg:mt-10 pb-3">
        <StartInvesting />
      </div>
      <StartInvestingDesktop className="hidden lg:block" />

      {/* верхняя зона футера */}
      <div className="relative z-10 pt-0 md:pt-3 pb-0 md:pb-3">
        <div className="container mx-auto px-2 md:px-4">
          {/* mobile */}
          <div className="md:hidden">
            <div className="flex flex-col items-center justify-between gap-0">
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-2">
                  <Image src={logoSvg} alt={brand} width={32} height={32} />
                  <span className="text-xl whitespace-nowrap font-semibold">{brand}</span>
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
                    <Image src={supportIcon} alt={supportAlt} width={120} height={50} />
                  </Link>
                </div>
              </div>

             
 <nav className="grid grid-cols-2 gap-x-6 gap-y-3 text-[18px] text-white pb-2 mt-3 w-full max-w-xs mx-auto">
   <Link href="/" className="block text-center whitespace-nowrap hover:text-white transition-colors">
                  {navHome}
                </Link>
   <Link href="/staking" className="block text-center whitespace-nowrap hover:text-white transition-colors">
                  {navStaking}
                </Link>
   <Link href="/profile" className="block text-center whitespace-nowrap hover:text-white transition-colors">
                  {navProfile}
                </Link>
   <Link href="/support" className="block text-center whitespace-nowrap hover:text-white transition-colors">
                  {navSupport}
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
                  <Image src={logoSvg} alt={brand} width={32} height={32} />
                  <span className="text-xl whitespace-nowrap font-semibold">{brand}</span>
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
                  {navHome}
                </Link>
                <Link href="/staking" className="hover:text-white/90 transition-colors">
                  {navStaking}
                </Link>
                <Link href="/profile" className="hover:text-white/90 transition-colors">
                  {navProfile}
                </Link>
                <Link href="/support" className="hover:text-white/90 transition-colors">
                  {navSupport}
                </Link>
              </nav>

              {/* right support */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <Link href="/support" className="inline-flex items-center">
                  <Image src={supportIcon} alt={supportAlt} width={120} height={50} />
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

      {/* копирайт */}
      <div className="z-10 container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-1 md:gap-4 text-[12px] text-gray-600">
        <p>{copy}</p>
        <div className="flex gap-2 md:gap-4">
          <Link href="/terms" className="hover:text-white transition-colors text-[#A0B0D8]">
            {terms}
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors text-[#A0B0D8]">
            {privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
