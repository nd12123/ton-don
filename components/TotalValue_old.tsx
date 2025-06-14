import React from 'react';
import Image from 'next/image';

// 3D background assets
import ton3d4 from '@/assets/TotalValue/Ton 3d 4.png';
import ton3d5 from '@/assets/TotalValue/Ton 3d 5.png';
import ton3d6 from '@/assets/TotalValue/Ton 3d 6.png';
import ton3d7 from '@/assets/TotalValue/Ton 3d 7.png';

import { StarsCluster } from "@/components/decorative/StarsCluster";


// если хочешь через next/image
//import stars1 from "/decorative/stars1.png";
//import stars2 from "/decorative/stars2.png";

//import StarsCluster from '@/app/InteractivePage'
//import GlowingArcs from '@/app/InteractivePage' 

//<StarsCluster />
//<GlowingArcs />
type TotalValueProps = {
  className?: string;
};

export default function TotalValue({ className = "" }: TotalValueProps) {
  return (
    <section className="relative overflow-hidden bg-bg-dark text-white py-32">
      {/* 1) Слой звёзд (слабая непрозрачность) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            url('/decorative/stars1.png'),
            url('/decorative/stars2.png'),
            url('/decorative/starsbg1.png'),
            url('/decorative/starsbg2.png')
          `,
          backgroundRepeat: "no-repeat, no-repeat, no-repeat, no-repeat, no-repeat",
          backgroundPosition: "left bottom, right bottom, left bottom, right bottom, center top",
          backgroundSize: "auto 300px, auto 300px, auto 600px, auto 600px, cover",
          opacity: 0.2,
        }}
      />

    
    
    {/** Картинка
      style={{
      // устанавливаем «космическое сечение» как фон секции
      backgroundImage: `url("/decorative/horizon-bg.svg")`,
      backgroundSize: "cover",
      backgroundPosition: "center top", 
      backgroundRepeat: "no-repeat",
    }} */}
      {/* Полупрозрачный слой глубокого космоса (чтобы было темнее наверху)<div className="absolute inset-0 " /> bg-gradient-to-t from-bg-dark via-black/30 to-bg-dark pointer-events-none */}
      

       {/*заебали звезды и выглядят пока хуево <StarsCluster /> */}

      {/* Дополнительные «тонкие» 3D-иллюстрации (опционально) */}
      <div className="absolute inset-0 pointer-events-none lg:py-20">
        <Image
          src={ton3d4}
          alt=""
          className="absolute top-[5%] left-[0%] w-[10%] opacity-15 animate-float"
        />
        <Image
          src={ton3d6}
          alt=""
          className="absolute top-[10%] right-[0%] w-[10%] opacity-15 animate-float delay-4000"
        />
        <Image
          src={ton3d5}
          alt=""
          className="absolute top-[20%] right-[15%] w-[25%] opacity-15 animate-float delay-2000"
        />
        <Image
          src={ton3d7}
          alt=""
          className="absolute bottom-[35%] left-[10%] w-[20%] opacity-15 animate-float delay-6000"
        />
      </div>

      {/* Контент: заголовок и значение */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 py-4 lg:py-40 text-center">
        <h2 className="text-5xl sm:text-6xl font-extrabold mb-4">
          Total Value Locked
        </h2>
        <p className="text-7xl sm:text-8xl font-extrabold mb-4">$14,320,000</p>
      </div>
      
    </section>
  );
}