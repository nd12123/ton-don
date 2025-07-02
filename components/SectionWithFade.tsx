import React from 'react';
import Image from 'next/image';

type SectionWithFadeProps = {
  children: React.ReactNode;
  topSrc?: string;
  bottomSrc?: string;
  /** Насколько «глубоко» заходит фейд вверх/вниз */
  fadeHeight?: number;
};

export default function SectionWithFade({
  children,
  topSrc,
  bottomSrc,
  fadeHeight = 200,
}: SectionWithFadeProps) {
  return (
    <div className="relative overflow-visible">
      {/* 1) Верхний фейд */}
      {topSrc && (
        <div
          className="absolute left-0 w-full overflow-hidden pointer-events-none"
          style={{
            height: fadeHeight,
            transform: `translateY(-${fadeHeight}px)`,
          }}
        >
          <Image
            src={topSrc}
            alt=""
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center bottom',
              opacity: 0.2,
              mixBlendMode: 'screen',
            }}
          />
        </div>
      )}

      {/* 2) Сама секция */}
      <div className="relative z-10">{children}</div>

      {/* 3) Нижний фейд */}
      {bottomSrc && (
        <div
          className="absolute left-0 w-full overflow-hidden pointer-events-none"
          style={{
            height: fadeHeight,
            transform: `translateY(${fadeHeight}px)`,
          }}
        >
          <Image
            src={bottomSrc}
            alt=""
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
              opacity: 0.2,
              mixBlendMode: 'screen',
            }}
          />
        </div>
      )}
    </div>
  );
}
