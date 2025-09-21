// components/ResponsiveArt.tsx
"use client";
import Image, { ImageProps } from "next/image";

type Props = {
  png: string;        // статический импорт PNG
  svg: string;        // статический импорт SVG
  alt?: string;
  className?: string;
  sizes?: string;     // sizes для next/image
  priority?: boolean;
  quality?: number;
};

/**
 * На мобилке (<1024px) рендерим PNG (через next/image для DPR),
 * на десктопе (>=1024px) — SVG (идеально резкий).
 */
export default function ResponsiveArt({
  png, svg, alt = "", className, sizes, priority, quality = 90,
}: Props) {
  return (
    <picture className={className}>
      {/* Десктоп: SVG */}
      <source media="(min-width: 1024px)" srcSet={svg as unknown as string} />
      {/* Мобилка: PNG (next/image → правильный srcset под DPR) */}
      <Image
        src={png}
        alt={alt}
        priority={priority}
        sizes={sizes ?? "(max-width: 1024px) 40vw, 20vw"}
        quality={quality}
        className="w-full h-auto"
      />
    </picture>
  );
}
