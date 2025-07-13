import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Import 3D images
import ton3d1 from '@/assets/Main/Ton 3d 1.png';
import ton3d2 from '@/assets/Main/Ton 3d 2.png';
import ton3d3 from '@/assets/Main/Ton 3d 3.png';
import centralSphere from '@/assets/Main/EllipseFull.png';

const ellipse6 = '/decorative/ellipse6.png';
const ellipse5 = '/decorative/ellipse5.png';

// Import SVG icons
//import GetStartedIcon from '@/assets/Main/Get started.svg';
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
        "px-4 py-32 sm:px-6 lg:px-8",          // pt-20 паддинги
        //"main",
        className                       // ваши дополнительные классы
      ].join(" ")}
    >

<div className="absolute bottom-0 left-0 w-1/2 h-full pointer-events-none">
        <Image
          src={ellipse6}
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'left bottom', opacity: 0.45 }}
        />
      </div>

      <div className="absolute bottom-0 right-0 w-1/2 h-full pointer-events-none">
        <Image
          src={ellipse5}
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'right bottom', opacity: 0.38 }}
        />
      </div>

     

{/* 1) Расположение «здесь иконки» в контейнере */}
<div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-16">
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
<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Левый столбец */}
        <div className="space-y-6">
          <h1
            className="font-bold"
            style={{ fontSize: "70px", lineHeight: "68px" }}
          >
            Stake TON<br />
            <span className="text-[#00C2FF]">Easily</span> &amp;{" "}
            <span className="text-[#00C2FF]">Securely</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-lg">
            Stake your TON tokens securely and earn passive income with our
            audited smart contracts.
          </p>
          <div className="flex items-center gap-10">
            <Button>Get Started</Button>
            <div className="flex items-center gap-2 bg-white bg-opacity-10 ">
              <Image src={AuditedIcon} alt="Audited by Certik" height={32} />
              {/*<span className="text-sm">Audited by Certik</span>
              px-4 py-2 rounded-full */}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute top-0 w-96 h-96 opacity-30" // left-1/3 right-1/5 transform translate-x-1/5
      >
        <Image
          src="/decorative/ellipse10.png"
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div>

        <div className="absolute inset-0 pointer-events-none">
        <Image
          src={centralSphere}
          alt=""
          className="absolute top-[23%] right-[10%] w-[35%] opacity-80 animate-float"
        />
        <Image
          src={ton3d3}
          alt=""
          className="absolute top-[4%] right-[15%] w-[15%] opacity-90 animate-float delay-4000"
        />
        <Image
          src={ton3d1}
          alt=""
          className="absolute top-[23%] right-[24%] w-[10%] opacity-80 animate-float"
        />
        <Image
          src={ton3d2}
          alt=""
          className="absolute bottom-[8%] right-[10%] w-[25%] opacity-90 animate-float delay-2000"
        />
      </div>
      </div>
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
