import React from 'react';
import Image from 'next/image';

// Background 3D assets
import ton3d4 from '@/assets/TotalValue/Ton 3d 4.png';
import ton3d5 from '@/assets/TotalValue/Ton 3d 5.png';
import ton3d6 from '@/assets/TotalValue/Ton 3d 6.png';
import ton3d7 from '@/assets/TotalValue/Ton 3d 7.png';

export default function TotalValue() {
  return (
    <section className="relative bg-[#0A1329] text-white py-32 sm:py-40 overflow-hidden">
      {/* Decorative 3D background images */}
      <Image
        src={ton3d4}
        alt="3D asset 4"
        className="absolute -top-20 -left-16 w-2/5 opacity-25 animate-float"
      />
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
          Total Value Locked
        </h2>
        <p className="text-6xl sm:text-7xl font-extrabold tracking-tight">
          $12,320,000
        </p>
      </div>
    </section>
  );
}
