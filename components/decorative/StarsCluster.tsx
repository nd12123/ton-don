// components/Decorative/StarsCluster.tsx
"use client";
import Image from "next/image";
import starSvg from "@/public/decorative/star.png"; // положи в public

export function StarsCluster() {
  const stars = [
    { top:  "2rem", left:  "1rem", size: 24, opacity: 0.5, anim: "animate-pulse-slow" },
    { top:  "5rem", right: "2rem", size: 16, opacity: 0.6, anim: "animate-pulse-slow delay-2000" },
    { bottom:"6rem", left: "50%", size: 20, opacity: 0.4, anim: "animate-pulse-slow delay-4000" },
  ];

  return (
    <>
      {stars.map((s, i) => (
        <div
          key={i}
          className={`absolute ${s.anim}`}
          style={{
            top: s.top,
            right: s.right,
            bottom: s.bottom,
            left: s.left,
            opacity: s.opacity,
            width: `${s.size}px`,
            height: `${s.size}px`,
          }}
        >
          <Image
            src={starSvg}
            alt="звезда"
            width={s.size}
            height={s.size}
          />
        </div>
      ))}
    </>
  );
}
