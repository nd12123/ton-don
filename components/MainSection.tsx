import React from 'react';
import Image from 'next/image';
//import { Button } from '@/components/ui/button';
//import { ChevronRight } from 'lucide-react';

// Import 3D images
import ton3d1 from '@/assets/Main/Ton 3d 1.png';
import ton3d2 from '@/assets/Main/Ton 3d 2.png';
import ton3d3 from '@/assets/Main/Ton 3d 3.png';
import centralSphere from '@/assets/Main/stepsTon.svg';
import centralRightSphere from '@/assets/Main/EllipseMainRight.png';
import centralLeftSphere from '@/assets/Main/EllipseMainLeft.png';

const ellipse6 = '/decorative/ellipse6.png';
const ellipse5 = '/decorative/ellipse5.png';


// Import SVG icons
//import GetStartedIcon from '@/assets/Main/Get started.svg';
import GoToStakingButton from '@/components/GoToStakingButton';

import ReliableIcon from '@/assets/Main/Reliable.svg';
import ProfitableIcon from '@/assets/Main/Profitable.svg';
import SimpleIcon from '@/assets/Main/Simple.svg';
import AuditedIcon from '@/assets/Main/bottom audited by certik.svg';

type MainSectionProps = {
  className?: string
}

export default function MainSection({className = ''}: MainSectionProps) {
  return (
    <section
      className={[
        "relative", //чтобы рисунки на границах отрисовывались только один раз
        " text-white",       // базовые стили 
        "px-4 md:pt-20 sm:px-6 lg:px-8 pb-32",          // pt-20 паддинги
        //"bg-bg-dark",
        //"main",
        className                       // ваши дополнительные классы
      ].join(" ")}
    >

<div className="absolute bottom-0 left-0 w-full md:w-1/2 h-full pointer-events-none">
        <Image
          src={ellipse6}
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'left bottom', opacity: 0.55 }}
        />
      </div>

      <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-full pointer-events-none">
        <Image
          src={ellipse5}
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'right bottom', opacity: 0.45 }}
        />
      </div>

      <div className=" md:hidden absolute top-[30%] right-0 w-full md:w-1/2 h-full pointer-events-none">
        <Image
          src={centralRightSphere}
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'right center', opacity: 0.9 }}        />
        </div>
        <div className="md:hidden absolute top-[30%] left-0 w-full md:w-1/2 h-full pointer-events-none">
        <Image
          src={centralLeftSphere}
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'left center', opacity: 0.9 }}
          //className="absolute top-[30%] left-0 w-[65%] md:w-[45%] opacity-90 animate-float z-10"
        />
        </div>
     
      {/* Контейнер 
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-20"></div>
*/}
{/* === HERO wrapper: управляем порядком на mobile/desktop === */}
{/* 1) Расположение «здесь иконки» в контейнере */}
<div className=" /*relative z-10 flex flex-col  */
max-w-7xl mx-auto mb-8  md:pl-[90px] sm:pl-[5px] px-2">
        <div className="/*order-1 md:order-2*/ flex md:items-center md:gap-16 sm:gap-8 gap-10">
          <div className="flex items-center gap-2">
            <Image src={ReliableIcon} alt="Reliable" width={24} height={24} />
            <span className="text-lg font-medium">Reliable</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src={ProfitableIcon} alt="Profitable" width={24} height={24} />
            <span className="text-lg font-medium">Profitable</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src={SimpleIcon} alt="Simple" width={24} height={24} />
            <span className="text-lg font-medium">Simple</span>
          </div>
        </div>
      </div>

{/* 2) Основной грид: слева текст + кнопки, справа 3D-монеты */}
<div className="/*order-2 md:order-1*/ max-w-7xl mx-auto md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-12 items-center  md:pl-[90px]">
  {/* === Абсолютный эллипс за текстом === */}
  <div
    className="pointer-events-none absolute top-[50%] right-[30%] md:top-[30px] md:left-[50px] md:w-[600px] sm:w-[180px] md:h-[600px] sm:h-[100px] opacity-90 -z-10" //sm:left-[15px]
  >
    <Image
      src="/decorative/ellipse10.png"
      alt=""
      fill
      style={{ objectFit: "contain" }}
    />
  </div>
        {/* Левый столбец */}
        <div className="space-y-6 md:max-w-[811px] text-center md:text-left mx-auto md:mx-0">
              
      {/*<h1
                className="text-8xl font-bold leading-[90px]"
                style={{ fontSize: "70px", lineHeight: "68px" }}
              >
                Stake TON<br />
                <span className="whitespace-nowrap">
        <span className="text-[#00C2FF]">Easily</span>&nbsp;&amp;&nbsp;<span className="text-[#00C2FF]">Securely</span>
      </span>
      </h1> ГЛАВНЫЙ ФИКС: резиновый размер и переносы */}
      <h1 className="font-bold leading-[0.95] tracking-[-0.02em]">
            {/* центрируем ТОЛЬКО первую строку на мобиле */}
            <h1 className="font-bold" // leading-[0.95] tracking-[-0.02em]
            >
  {/* Mobile: каждое слово — с новой строки */}
  <span className="block md:hidden " //leading-[1.02] tracking-[0]
  >
    <span className="block text-[clamp(75px,12vw,56px)] text-left">Stake</span>
    <span className="block text-[clamp(75px,12vw,56px)] text-left">TON</span>
    <span className="block text-[clamp(75px,11vw,50px)] text-left text-[#00C2FF]">Easily</span>
    <span className="block text-[clamp(75px,11vw,50px)] text-left text-[#00C2FF]">Securely</span>
  </span>

  {/* desktop */}
  <span className="hidden md:block leading-[75px] tracking-[0]">
    <span className="block text-[74px]">Stake TON</span>
    <span className="block text-[74px]">
      <span className="text-[#00C2FF]">Easily</span>
      &nbsp;&amp;&nbsp;
      <span className="text-[#00C2FF]">Securely</span>
    </span>
  </span>
</h1>


          </h1>
              <p className="text-[15px] md:text-lg  text-gray-300 max-w-lg">
                Stake your TON tokens securely and earn passive income with our
                audited smart contracts.
              </p>
              
          <div className="flex flex-col sm:flex-row md:items-center md:justify-center sm:items-start  md:justify-start gap-4 sm:gap-6">
                    {/* Primary button
                    <button
  type="button"
  className="
    w-64 h-16
    bg-gradient-to-r from-sky-600 to-sky-400
    rounded-2xl
    shadow-[0px_21px_40px_rgba(6,173,252,0.19)]
    shadow-[inset_5px_11px_30px_rgba(56,172,234,1)]
    inline-flex items-center justify-center gap-6
    text-white text-lg font-semibold font-inter leading-loose
    transition-transform hover:scale-105
  "
>
  <span>Get Started</span>
  <ChevronRight className="w-5 h-5 text-white" />
</button> */}
                    <GoToStakingButton className="btn-primary
    w-[132px] sm:w-[132px] sm:left-0 h-12 
    bg-gradient-to-r from-sky-600 to-sky-400
    rounded-2xl
    shadow-[0px_21px_40px_rgba(6,173,252,0.19)]
    shadow-[inset_5px_11px_30px_rgba(56,172,234,1)]
    inline-flex items-center justify-center gap-6
    text-white text-lg font-semibold font-inter leading-loose
    transition-transform hover:scale-105
  ">Get Started</GoToStakingButton>

<button
  type="button"
  className="
    md:w-64 sm:left-[0px] sm:w-[70px] sm:h-[30px] h-8 md:h-16
    bg-transparent
     border-0 border-sky-400 
    rounded-2xl
    md:inline-flex md:items-center md:justify-center
    text-white text-lg font-semibold font-inter leading-loose
    transition
    /*hover:bg-white hover:text-sky-600 */
  "
  aria-label="Audited by Certik"
>
  {/* mobile icon */}
  <Image
    src="/decorative/mobile/audited-by-certik.svg"
    alt="Audited by Certik"
    width={140}
    height={40}
    className="md:hidden md:h-6 w-auto sm:left-0"
    priority
  />

  {/* desktop icon */}
  <Image
    src={AuditedIcon}
    alt="Audited by Certik"
    className="hidden md:block md:h-8 w-auto"
  />
</button>

</div>
 </div>

        <div className="absolute inset-0 pointer-events-none overflow-x-clip">
        <Image
          src={centralSphere}
          alt=""
          className="absolute top-[20%] md:right-[20px] w-[65%] md:w-[45%] opacity-30 md:opacity-50 animate-float"
        />
        <Image
          src={ton3d3}
          alt=""
          className="absolute top-[15%] right-[-45px] w-[30%] md:top-[3%] md:right-[16%] md:w-[17%] opacity-90 animate-float delay-4000"
        />
        <Image
          src={ton3d1}
          alt=""
          className="absolute right-[15%] bottom-[20%] w-[30%] md:top-[23%] md:right-[26%] md:w-[10%] opacity-80 animate-float"
        />
        <Image
          src={ton3d2}
          alt=""
          className="absolute bottom-[-5%] right-[-60px] w-[60%] md:bottom-[5%] md:right-[10%] md:w-[28%] opacity-90 animate-float delay-2000"
        />
      </div>
  </div>
      {/* в конце MainSection, перед закрывающим </section>: 
<div
  className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-20"
  style={{
    background: "linear-gradient(to top, #0B1028, rgba(11,17,40,0))",
  }}
/>*/}
    </section>
  );
  
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
}
