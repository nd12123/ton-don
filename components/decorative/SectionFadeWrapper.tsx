// components/SectionFadeWrapper.tsx
import React from 'react';

type SectionFadeWrapperProps = {
  children: React.ReactNode;
  className?: string;
  /** Высота фейда сверху/снизу (Tailwind h-*) */
  fadeHeightClass?: string;
};

export default function SectionFadeWrapper({
  children,
  className = '',
  fadeHeightClass = 'h-25',  // вместо h-20/h-24
}: SectionFadeWrapperProps) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Контент */}
      <div className="relative z-10">{children}</div>

      {/* Фейд сверху */}
      <div
        className={`pointer-events-none absolute top-0 left-0 right-0 ${fadeHeightClass} z-3`}
        style={{
          background: 'linear-gradient(to bottom,rgb(15, 19, 38), transparent)',
        }}
      />

      {/* Фейд снизу */}
      <div
        className={`pointer-events-none absolute bottom-0 left-0 right-0 ${fadeHeightClass} z-3`}
        style={{
          background: 'linear-gradient(to top, #0A1329, transparent)',
        }}
      />
    </section>
  );
}
