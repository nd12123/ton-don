// components/ui/Decorative.tsx
import React from 'react';

/**
 * Пути к изображениям в папке public/decorative
 * (public/decorative/star.png, glow-arc-left.png, glow-arc-right.png)
 */
const STAR_SRC       = '/decorative/star.png';
const ARC_LEFT_SRC   = '/decorative/glow-arc.png';
const ARC_RIGHT_SRC  = '/decorative/glow-arc.png';

export function StarsCluster() {
  return (
    <>
      <img
        src={STAR_SRC}
        alt=""
        className="absolute top-8 left-10 w-6 opacity-50 animate-pulse-slow pointer-events-none"
      />
      <img
        src={STAR_SRC}
        alt=""
        className="absolute top-20 right-8 w-4 opacity-60 animate-pulse-slow pointer-events-none"
      />
      <img
        src={STAR_SRC}
        alt=""
        className="absolute bottom-32 left-1/2 w-5 opacity-40 animate-pulse-slow pointer-events-none"
      />
    </>
  );
}

export function GlowingArcs() {
  return (
    <>
      <img
        src={ARC_LEFT_SRC}
        alt=""
        className="absolute bottom-0 left-0 w-1/3 opacity-30 animate-float-slow pointer-events-none"
      />
      <img
        src={ARC_RIGHT_SRC}
        alt=""
        className="absolute top-0 right-0 w-1/3 opacity-30 animate-float-slow pointer-events-none"
      />
    </>
  );
}
