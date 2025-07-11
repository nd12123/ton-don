import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Import 3D images
import ton3d1 from '@/assets/Main/Ton 3d 1.png';
import ton3d2 from '@/assets/Main/Ton 3d 2.png';
import ton3d3 from '@/assets/Main/Ton 3d 3.png';

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
        "px-4 py-32 sm:px-6 lg:px-8",          // паддинги
        className                       // ваши дополнительные классы
      ].join(" ")}
    >

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

      <div className="pointer-events-none absolute top-15 right-1/5 transform translate-x-1/5 w-96 h-96 opacity-60">
        <Image
          src="/decorative/ellipse10.png"
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div>


<div className="flex flex-wrap gap-12 items-center max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
              <Image src={ReliableIcon} alt="Reliable" width={24} height={24} />
              <span>Reliable</span>
            </div>
            <div className="flex items-center space-x-2">
              <Image src={ProfitableIcon} alt="Profitable" width={24} height={24} />
              <span>Profitable</span>
            </div>
            <div className="flex items-center space-x-2">
              <Image src={SimpleIcon} alt="Simple" width={24} height={24} />
              <span>Simple</span>
            </div>
          </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Left side: Text and CTA */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Earn with TON Staking
          </h1>
          <p className="text-lg text-gray-300">
            Stake your TON tokens securely and earn passive income with our audited smart contracts.
          </p>
          

          <div className="flex flex-wrap gap-12 items-center max-w-7xl mx-auto">

          <Button className="mt-6">Get Started</Button>
          <div className="mt-6 flex items-center space-x-2">
            <Image src={AuditedIcon} alt="Audited by Certik"  height={40} /> {/*width={110}*/}
          </div>

          </div>
        </div>
       
        <div className="absolute inset-0 pointer-events-none">
        <Image
          src={ton3d3}
          alt=""
          className="absolute top-[3%] right-[15%] w-[15%] opacity-80 animate-float delay-4000"
        />
        <Image
          src={ton3d1}
          alt=""
          className="absolute top-[23%] right-[24%] w-[10%] opacity-70 animate-float"
        />
        <Image
          src={ton3d2}
          alt=""
          className="absolute bottom-[0%] right-[10%] w-[25%] opacity-80 animate-float delay-2000"
        />
      </div>
      </div>
    </section>
  );
  
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
