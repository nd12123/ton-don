// components/SectionWrapper.tsx
// components/SectionWrapper.tsx
"use client";

import React, { ReactNode } from "react";
import Image from "next/image";

type SectionWrapperProps = {
  children: ReactNode;
};

export default function SectionWrapper({ children }: SectionWrapperProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Верхний левый эллипс */}
      <div className="pointer-events-none absolute top-0 left-0">
        <Image
          src="/decorative/ellipse6.png"
          alt=""
          width={300}
          height={300}
          priority
        />
      </div>

      {/* Верхний правый эллипс */}
      <div className="pointer-events-none absolute top-0 right-0">
        <Image
          src="/decorative/ellipse5.png"
          alt=""
          width={300}
          height={300}
          priority
        />
      </div>

      {/* Содержимое секции */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Нижний левый эллипс */}
      <div className="pointer-events-none absolute bottom-0 left-0">
        <Image
          src="/decorative/ellipse6.png"
          alt=""
          width={300}
          height={300}
          priority
        />
      </div>

      {/* Нижний правый эллипс */}
      <div className="pointer-events-none absolute bottom-0 right-0">
        <Image
          src="/decorative/ellipse5.png"
          alt=""
          width={300}
          height={300}
          priority
        />
      </div>
    </div>
  );
}
