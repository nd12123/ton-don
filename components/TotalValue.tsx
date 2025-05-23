import React from 'react';
import Image from 'next/image';

// 3D background assets
import ton3d4 from '@/assets/TotalValue/Ton 3d 4.png';
import ton3d5 from '@/assets/TotalValue/Ton 3d 5.png';
import ton3d6 from '@/assets/TotalValue/Ton 3d 6.png';
import ton3d7 from '@/assets/TotalValue/Ton 3d 7.png';

//import StarsCluster from '@/app/InteractivePage'
//import GlowingArcs from '@/app/InteractivePage' 

//<StarsCluster />
//<GlowingArcs />
type TotalValueProps = {
  className?: string;
};

export default function TotalValue({ className = '' }: TotalValueProps) {
  return (
    <section
      className={`relative overflow-hidden bg-bg-dark text-white ${className} py-32`}
    >
      {/* Background floating images */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={ton3d4}
          alt=""
          className="absolute top-[0%] left-[0%] w-[10%] opacity-20 animate-float"
        />
        <Image
          src={ton3d6}
          alt=""
          className="absolute top-[15%] right-[0%] w-[10%] opacity-20 animate-float delay-4000"
        />
        <Image
          src={ton3d5}
          alt=""
          className="absolute top-[20%] right-[10%] w-[25%] opacity-20 animate-float delay-2000"
        />
        <Image
          src={ton3d7}
          alt=""
          className="absolute bottom-[40%] left-[10%] w-[20%] opacity-20 animate-float delay-6000"
        />
      </div>

      {/* Content - headline and value */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-5xl sm:text-6xl font-extrabold mb-4">Total Value Locked</h2>
        <p className="text-7xl sm:text-8xl font-extrabold">$12,320,000</p>
      </div>
      
    </section>
    
  );
}
