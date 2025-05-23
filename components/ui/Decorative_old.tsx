// components/ui/Decorative.tsx
import Image from "next/image";
import starSvg from "@/assets/Main/Ton 3d 1.png";
import arcLeft from "@/assets/TotalValue/Ton 3d 4.png";
import arcRight from "@/assets/Main/Ton 3d 1.png";

export function StarsCluster() {
  return (
    <>
      <Image
        src={starSvg}
        alt=""
        width={24}
        height={24}
        className="absolute top-8 left-10 w-6 opacity-50 animate-pulse-slow"
      />
      <Image
        src={starSvg}
        alt=""
        width={16}
        height={16}
        className="absolute top-20 right-8 w-4 opacity-60 animate-pulse-slow"
      />
      <Image
        src={starSvg}
        alt=""
        width={20}
        height={20}
        className="absolute bottom-32 left-1/2 w-5 opacity-40 animate-pulse-slow"
      />
    </>
  );
}

export function GlowingArcs() {
  return (
    <>
      <Image
        src={arcLeft}
        alt=""
        width={200}
        height={200}
        className="absolute bottom-0 left-0 w-1/3 opacity-30 animate-float-slow pointer-events-none"
      />
      <Image
        src={arcRight}
        alt=""
        width={200}
        height={200}
        className="absolute top-0 right-0 w-1/3 opacity-30 animate-float-slow pointer-events-none"
      />
    </>
  );
}
