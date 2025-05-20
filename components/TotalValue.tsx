import React from 'react';
import Image from 'next/image';

// Background 3D assets
import ton3d4 from '@/assets/TotalValue/Ton 3d 4.png';
import ton3d5 from '@/assets/TotalValue/Ton 3d 5.png';
import ton3d6 from '@/assets/TotalValue/Ton 3d 6.png';
import ton3d7 from '@/assets/TotalValue/Ton 3d 7.png';

type TotalValueProps = {
  className?: string
}

export default function TotalValue({ className = '' }: TotalValueProps) {
  return (
    <section
      className={[
        "relative bg-[#0A1329] text-white overflow-hidden",
        "px-4 sm:px-6 lg:px-8",   // базовое выравнивание
        className
      ].join(" ")}
    >
      {/* Decorative 3D background images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Image
        src={ton3d4}
        alt="3D asset 4"
        className="absolute top-0 left-[10%] w-[40%] md:left-[5%] md:w-[30%] opacity-25 animate-float"
      />
      </div>
      <Image
        src={ton3d5}
        alt="3D asset 5"
        className="absolute top-1/4 right-0 w-1/3 opacity-25 animate-float delay-2000"
      />
      <Image
        src={ton3d6}
        alt="3D asset 6"
        className="absolute bottom-0 left-1/3 w-1/2 opacity-25 animate-float delay-4000"
      />
      <Image
        src={ton3d7}
        alt="3D asset 7"
        className="absolute -bottom-16 right-1/4 w-2/5 opacity-25 animate-float delay-6000"
      />

      <div className="relative max-w-7xl mx-auto text-center px-6 lg:px-8">
        <h2 className="text-6xl sm:text-7xl font-extrabold mb-8">
          Total Value Locked
        </h2>
        <p className="text-8xl sm:text-9xl font-extrabold tracking-tight">
          $12,320,000
        </p>
      </div>
    </section>
  );
}
