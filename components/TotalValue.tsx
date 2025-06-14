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

export default function TotalValue({ className = "" }: TotalValueProps) {
  return (
    <section
      className={`relative overflow-hidden text-white ${className}`}
      
    >{/** Картинка
      style={{
      // устанавливаем «космическое сечение» как фон секции
      backgroundImage: `url("/decorative/horizon-bg.svg")`,
      backgroundSize: "cover",
      backgroundPosition: "center top", //bottom
      backgroundRepeat: "no-repeat",
    }} */}
      {/* Полупрозрачный слой глубокого космоса (чтобы было темнее наверху)<div className="absolute inset-0 " /> bg-gradient-to-t from-bg-dark via-black/30 to-bg-dark pointer-events-none */}
      

      {/* Дополнительные «тонкие» 3D-иллюстрации (опционально) */}
      <div className="absolute inset-0 pointer-events-none">
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
      <div className="relative z-10 container mx-auto px-6 lg:px-8 py-32 text-center">
        <h2 className="text-5xl sm:text-6xl font-extrabold mb-4">
          Total Value Locked
        </h2>
        <p className="text-7xl sm:text-8xl font-extrabold mb-4">$14,320,000</p>
      </div>
    </section>
  );
}