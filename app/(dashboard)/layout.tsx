"use client";
import { useSyncOnChain } from "@/lib/hooks/useSyncOnChain";

import { ThemeProvider } from "next-themes";
//import ThemeToggle from "@/components/ThemeToggle";
//import Link from "next/link";
//import { usePathname } from "next/navigation";
import Header from "@/components/header";
//import MobileLayout from "@/components/MobileLayout";
//import Footer from "@/components/Footer";
            //<Footer />

/*
const menu = [
  { name: "Главная", href: "/" },
  { name: "Стейкинг", href: "/staking" },
  { name: "История", href: "/history" },
  { name: "Поддержка", href: "/support" },
  { name: "Кабинет", href: "/profile" },
];
*/

export default function Layout({ children }: { children: React.ReactNode }) {
  //const pathname = usePathname();

  useSyncOnChain(30_000)

  return (
    <ThemeProvider attribute="class">
      <Header />
      <div className="min-h-screen flex bg-gray-50 text-black dark:bg-gray-900 dark:text-gray-100">
        {/* Сайдбар не нужен, он в МобилЛейаут */}
        
{/* Нужно кнопку с кошельком добавить наверх */}
        {/* Контент */}
        <div className="flex-1 flex flex-col">
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

          {/* Основной контент <MobileLayout>          </MobileLayout>*/}
          <main className="p-6">{children}</main>
          
        </div>
      </div>
    </ThemeProvider>
    
  );
}
