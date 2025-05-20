import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Import 3D images
import ton3d1 from '@/assets/Main/Ton 3d 1.png';
import ton3d2 from '@/assets/Main/Ton 3d 2.png';
import ton3d3 from '@/assets/Main/Ton 3d 3.png';

// Import SVG icons
import GetStartedIcon from '@/assets/Main/Get started.svg';
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
        "bg-[#0A1329] text-white",       // базовые стили
        "px-4 sm:px-6 lg:px-8",          // паддинги
        className                       // ваши дополнительные классы
      ].join(" ")}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Left side: Text and CTA */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Earn with TON Staking
          </h1>
          <p className="text-lg text-gray-300">
            Stake your TON tokens securely and earn passive income with our audited smart contracts.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Image src={GetStartedIcon} alt="Get Started" width={24} height={24} />
              <span>Get started</span>
            </div>
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
          <Button className="mt-6">Get Started</Button>
          <div className="mt-4 flex items-center space-x-2">
            <Image src={AuditedIcon} alt="Audited by Certik" width={100} height={24} />
            <span className="text-gray-400 text-sm">Audited by Certik</span>
          </div>
        </div>

        {/* Right side: 3D images */}
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
        </div>
      </div>
    </section>
  );
}
