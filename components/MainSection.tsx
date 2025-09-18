"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useT } from "@/i18n/react";

import ton3d1 from "@/assets/Main/Ton 3d 1.png";
import ton3d2 from "@/assets/Main/Ton 3d 2.png";
import ton3d3 from "@/assets/Main/Ton 3d 3.png";
import centralSphere from "@/assets/Main/Ellipse10.png";
import centralRightSphere from "@/assets/Main/EllipseMainRight.png";
import centralLeftSphere from "@/assets/Main/EllipseMainLeft.png";
import certikSvg from "@/public/decorative/certik.svg";

import GoToStakingButton from "@/components/GoToStakingButton";
import ReliableIcon from "@/assets/Main/Reliable.svg";
import ProfitableIcon from "@/assets/Main/Profitable.svg";
import SimpleIcon from "@/assets/Main/Simple.svg";

const ellipse6 = "/decorative/ellipse6.png";
const ellipse5 = "/decorative/ellipse5.png";

type MainSectionProps = {
  className?: string;
};

export default function MainSection({ className = "" }: MainSectionProps) {
  const tHome = useT("home");
  const tCommon = useT("common");

  // подсветка второй строки: если есть "&", красим обе части, иначе красим всю строку
  const renderTitle2 = (s: string) => {
    const parts = s.split("&").map((p) => p.trim());
    if (parts.length === 2) {
      return (
        <>
          <span className="text-[#00C2FF]">{parts[0]}</span>
          &nbsp;&amp;&nbsp;
          <span className="text-[#00C2FF]">{parts[1]}</span>
        </>
      );
    }
    return <span className="text-[#00C2FF]">{s}</span>;
  };

  // просто ключи
  const title1 = tHome("hero.title_1");
  const title2 = tHome("hero.title_2");
  const lead = tHome("hero.lead");

  const pillReliable = tHome("pills.reliable");
  const pillProfitable = tHome("pills.profitable");
  const pillSimple = tHome("pills.simple");

  const ariaTotalValue = tHome("nav.goToTotalValue");
  const ariaCalculator = tHome("nav.goToCalculator");
  const ariaSteps = tHome("nav.goToSteps");

  const btnGetStarted = tCommon("buttons.getStarted");
  const auditedByCertik = tHome("badges.auditedByCertik");

  const splitWords = (s: string) => s.split(" ").filter(Boolean);

  return (
    <section
      className={[
        "relative",
        "text-white",
        "pl-1 md:pt-20 sm:px-0 lg:px-8 pb-32",
        className,
      ].join(" ")}
    >
      {/* большие задние эллипсы */}
      <div className="absolute bottom-0 left-0 w-full md:w-[100%] h-full opacity-75 md:opacity-55 lg:w-3/5 lg:opacity-55 pointer-events-none">
        <Image src={ellipse6} alt="" fill style={{ objectFit: "cover", objectPosition: "left bottom" }} />
      </div>
      <div className="absolute bottom-0 right-0 w-full md:w-[100%] h-full opacity-35 md:opacity-45 lg:w-1/2 lg:opacity-[42%] pointer-events-none">
        <Image src={ellipse5} alt="" fill style={{ objectFit: "cover", objectPosition: "right bottom" }} />
      </div>

      {/* центральные сферы только на мобилке */}
      <div className="md:hidden absolute top-[30%] right-0 w-full md:w-full md:opacity-90 h-full pointer-events-none">
        <Image src={centralRightSphere} alt="" fill style={{ objectFit: "cover", objectPosition: "right center" }} />
      </div>
      <div className="md:hidden absolute top-[30%] left-0 w-full md:w-1/2 h-full pointer-events-none">
        <Image src={centralLeftSphere} alt="" fill style={{ objectFit: "cover", objectPosition: "left center", opacity: 0.9 }} />
      </div>

      {/* верхние «пилюли» */}
    <div className="max-w-7xl mx-auto mb-8 md:pl-[90px] px-2">
   <div className="flex flex-nowrap items-center gap-3 sm:gap-5 md:gap-16">
          <Link
            href="#total-value"
            aria-label={ariaTotalValue}
            className="flex items-center gap-2 group rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            <Image src={ReliableIcon} alt={pillReliable} width={24} height={24} />
            <span className="text-lg font-medium group-hover:text-sky-300">{pillReliable}</span>
          </Link>

          <Link
            href="#calculate-plans"
            aria-label={ariaCalculator}
            className="flex items-center gap-2 group rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            <Image src={ProfitableIcon} alt={pillProfitable} width={24} height={24} />
            <span className="text-lg font-medium group-hover:text-sky-300">{pillProfitable}</span>
          </Link>

          <Link
            href="#steps"
            aria-label={ariaSteps}
            className="pr-2 flex items-center gap-2 group rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            <Image src={SimpleIcon} alt={pillSimple} width={25} height={25} />
            <span className="text-lg font-medium group-hover:text-sky-300">{pillSimple}</span>
          </Link>
        </div>
      </div>

      {/* основной грид */}
      <div className="max-w-7xl mx-auto md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-12 items-center md:pl-[90px]">
        {/* эллипс позади заголовка */}
        <div className="pointer-events-none absolute top-[50%] right-[30%] md:top-[30px] md:left-[50px] md:w-[600px] sm:w-[180px] md:h-[600px] sm:h-[100px] opacity-90 -z-10">
          <Image src="/decorative/ellipse10.png" alt="" fill style={{ objectFit: "contain" }} />
        </div>

        {/* левый столбец: заголовок, лид, кнопки */}
        <div className="space-y-6 md:max-w-[811px] text-center md:text-left mx-auto md:mx-0 px-2">
          {/* Заголовок: mobile / desktop */}
          <div className="font-bold">
            {/* Mobile: каждое слово title_1 с новой строки */}
            <div className="md:hidden leading-[1.02]">
              {splitWords(title1).map((w, i) => (
                <span key={i} className="block text-[clamp(44px,12vw,56px)] text-left">
                  {w}
                </span>
              ))}
              <span className="block text-[clamp(44px,11vw,50px)] text-left">
                {renderTitle2(title2)}
              </span>
            </div>

            {/* Desktop */}
            <div className="hidden md:block leading-[75px] tracking-[0]">
              <span className="block text-[74px]">{title1}</span>
              <span className="block text-[74px]">{renderTitle2(title2)}</span>
            </div>
          </div>

          {/* Лид */}
          <p className="text-[15px] md:text-lg text-gray-300 max-w-lg">{lead}</p>
{/* Кнопки */}
<div className="
  flex flex-col sm:flex-row sm:items-center md:justify-start
  gap-4 md:gap-[36px]
">
  <GoToStakingButton
    className="
      btn-primary
      w-[160px] h-[48px]     /* мобайл */
      sm:w-[180px] sm:h-[50px]
      md:w-[260px] md:h-[62px]
      lg:w-[250px] lg:h-[62px]   /* десктоп */
      rounded-3xl
      bg-gradient-to-r from-sky-600 to-sky-400
      shadow-[0_21px_40px_rgba(6,173,252,0.19)]
      inline-flex items-center justify-center
      text-white text-base sm:text-lg md:text-[18px] font-semibold font-inter
      tracking-[0.2px]
      transition-transform hover:scale-[1.03] active:scale-[0.99]
    "
  >
    {btnGetStarted}
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
  </GoToStakingButton>

  {/* Кнопка "Audited by Certik" — SVG на всех брейкпоинтах для идеальной резкости */}
  <button
    type="button"
    aria-label={auditedByCertik}
    className="
      inline-flex items-center justify-left
      w-[200px] h-[56px]
      sm:w-[220px] sm:h-[60px]
      md:w-[260px] md:h-[62px]
      lg:w-[250px] lg:h-[65px]
        tracking-[0.2px]
      transition-transform hover:scale-[1.03] active:scale-[0.99]
    "
      /*  rounded-3xl
      bg-transparent
      hover:ring-white/25 transition     ring-1 ring-white/15*/
  >
    <Image
      src={certikSvg}              /* один SVG для всех экранов */
      alt={auditedByCertik}
      priority
      width={250} height={65}      /* базовый бокс для SSR; реальный размер задают w/h кнопки */
      className="
        w-[160px] h-auto           /* мобайл */
        sm:w-[170px]
        md:w-[190px]
        lg:w-[250px]               /* десктоп */
        select-none
        [image-rendering:auto]
      "
      unoptimized
    />
  </button>
</div>

        </div>

        {/* правый столбец: 3D-монеты/сферы */}
        <div className="absolute inset-0 pointer-events-none overflow-x-clip">
          <Image
            src={centralSphere}
            alt=""
            className="absolute top-[20%] md:top-[20%] md:right-[20px] w-[65%] md:w-[45%] lg:w[30%] lg:top-[5%] opacity-30 md:opacity-50 lg:opacity-35 animate-float"
          />
          <Image
            src={ton3d3}
            alt=""
            className="absolute top-[15%] right-[-45px] w-[30%] md:top-[3%] md:right-[16%] md:w-[17%] xl:top-[5%] 3xl:top-[0%] xl:right-[16%] 3xl:right-[13%] 3xl:w-[18%] opacity-90 animate-float delay-4000"
          />
          <Image
            src={ton3d1}
            alt=""
            className="absolute right-[15%] bottom-[20%] w-[30%] md:top-[22%] md:right-[26%] md:w-[10%] 2xl:bottom-[20%] 2xl:right-[28%] 2xl:w-[13%] opacity-80 animate-float-slow delay-1000"
          />
          <Image
            src={ton3d2}
            alt=""
            className="absolute bottom-[-5%] right-[-60px] w-[60%] md:bottom-[7%] md:right-[10%] 3xl:bottom-[-2%] 3xl:right-[8%] md:w-[28%] 3xl:w-[26%] opacity-90 animate-float delay-2000"
          />
        </div>
      </div>

      {/* мобильный градиент внизу */}
      <div
        className="block md:hidden absolute inset-x-0 bottom-0 h-full opacity-[9%] pointer-events-none z-30"
        style={{ background: "linear-gradient(to top, #17DCFF, #0B1028)" }}
      />
    </section>
  );
}

{/*

<div
        className="absolute left-[323px] top-[116px] flex items-center opacity-100"
        style={{
          width: "495px",
          height: "32px",
          gap: "67px",
        }}
      >
        <div className="flex items-center gap-2">
          <Image src={ProfitableIcon} width={24} height={24} alt="" />
          <span className="text-white text-base">Profitable</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src={SimpleIcon} width={24} height={24} alt="" />
          <span className="text-white text-base">Simple</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src={ReliableIcon} width={24} height={24} alt="" />
          <span className="text-white text-base">Reliable</span>
        </div>
      </div>
      <h1
        className="absolute text-white font-bold"
        style={{
          left: "323px",
          top: "206px",
          width: "811px",
          height: "277px",
          fontSize: "70px",
          lineHeight: "68px",
        }}
      >
        Stake TON<br/>
        <span className="text-[#00C2FF]">Easily</span> &amp; <span className="text-[#00C2FF]">Securely</span>
      </h1>
      <div
        className="absolute left-[323px] top-[542px] flex items-center"
        style={{
          width: "576px",
          height: "65px",
          gap: "36px",
        }}
      >
        <button className="flex-1 bg-gradient-to-br from-[#00BFFF] to-[#009FEF] rounded-full text-white text-lg font-medium">
          Get Started
        </button>
        <button className="flex-1 bg-transparent border border-white rounded-full text-white text-lg font-medium">
          Audited by Certik
        </button>
      </div>
*/}

        {/* в конце MainSection, перед закрывающим section: 
<div
  className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-20"
  style={{
    background: "linear-gradient(to top, #0B1028, rgba(11,17,40,0))",
  }}
/>
<div
  className="hidden lg:block absolute inset-x-0 bottom-0 h-24 pointer-events-none z-20 opacity-10"
  style={{
    background: "linear-gradient(to top, #0B1028, rgba(11,17,40,0))",
  }}
  />*/}
  {/* desktop-only мягкий переход вниз 
  <div
  className="hidden md:block pointer-events-none absolute inset-x-0 bottom-[-1px] h-[clamp(64px,9vw,160px)] z-[2]"
  style={{
    background:
      "linear-gradient(to bottom, rgba(11,17,40,0) 0%, #0B1128 60%, #0B1128 100%)",
  }}
/>
*/}
{/* Мягкое продолжение градиента в TotalValue
<div
  className="
  opzcity-10
    hidden md:block
    absolute inset-x-0 bottom-[-1px]   
    h-[72px]                          
    pointer-events-none
    z-[1]
  "
  style={{
    background:
      // сверху прозрачный → к низу тот самый #0B1028
      "linear-gradient(to bottom, rgba(11,17,40,0) 0%, rgba(11,17,40,.35) 55%, #0B1028 100%)",
  }}
/> 
<div
  className="
    opacity-[2%]
    hidden md:block
    absolute inset-x-0 bottom-[-1px]
    h-[72px]
    pointer-events-none
    z-[1]
  "
  style={{
    // как было: лёгкая подкраска снизу вверх
    background:
      "linear-gradient(to bottom, rgba(11,17,40,0) 0%, rgba(11,17,40,.35) 55%, #0B1028 100%)",

    // ⬇️ маска: виден только правый «хвост» (~правая треть), далее — плавное растворение
    WebkitMaskImage:
      "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 33%, rgba(0,0,0,0.65) 41%, rgba(0,0,0,0) 55%)",
    maskImage:
      "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 33%, rgba(0,0,0,0.65) 41%, rgba(0,0,0,0) 55%)",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  }}
/>
*/}
{/* === Свечения (без импортов, просто пути) ===

<div className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 opacity-100">
        <Image
          src="/decorative/ellipse6.png"
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 w-72 h-72 opacity-100">
        <Image
          src="/decorative/ellipse5.png"
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div>
       */}
        {/* Right side: 3D images
         <div className="relative w-full h-96">
          <Image
            src={ton3d1}
            alt="3D Illustration 1"
            className="absolute top-0 left-0 w-1/2 h-auto animate-float"
          />
          <Image
            src={ton3d2}
            alt="3D Illustration 2"
            className="absolute top-10 left-1/3 w-1/3 h-auto animate-float delay-2000"
          />
          <Image
            src={ton3d3}
            alt="3D Illustration 3"
            className="absolute top-20 right-0 w-1/2 h-auto animate-float delay-4000"
          />
        </div> */}

