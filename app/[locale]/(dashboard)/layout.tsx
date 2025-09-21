"use client";

import Image from "next/image";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
//import Header from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviderWrapper>
      {/* создаём собственный стек слоёв для безопасного z-index */}
      <div className="relative isolate min-h-dvh bg-[#0B1028] text-white">
        {/* ===== Global dashboard background (под всем контентом) ===== */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          {/* Горизонт */}
          <Image
            src="/decorative/radius-bg.png" //save svg? /horizon-bg.svg
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition:"center top", opacity: 0.95 }} //opacity:0.45
            priority
          />
          {/* Лёгкие звёзды */}
          <Image
            src="/decorative/starsbg1.png"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", opacity: 0.12 }}
          />
          {/* Левое свечение */}
          <div className="absolute inset-y-0 left-0 w-full">
            <Image
              src="/decorative/Ellipse60.png"
              alt=""
              fill
              sizes="50vw"
              style={{ objectFit: "cover", objectPosition: "left top", opacity: 0.35 }}
            />
          </div>
          {/* Правое свечение */}
          <div className="absolute inset-y-0 right-0 w-full">
            <Image
              src="/decorative/Ellipse50.png"
              alt=""
              fill
              sizes="50vw"
              style={{ objectFit: "cover", objectPosition: "right top", opacity: 0.35 }}
            />
          </div>
        </div>

        {/* Шапка сверху — поверх фона  <Header />*/}
       

        {/* Контент дэшборда */}
        <div className="relative z-10">
          {/* отступ от фиксированного хедера */}
          <main className="p-6 pt-[4px] md:pt-[8px]">{children}</main>
        </div>
      </div>
    </ThemeProviderWrapper>
  );
}



          {/* Верхний бар 
          <div className="container mx-auto px-4  md:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-6 py-4">
              <nav className="flex gap-6 text-sm">
                {menu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`font-medium ${
                      pathname === item.href
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              //Переключатель темы
              <ThemeToggle />
            </div>
          </div>*/}