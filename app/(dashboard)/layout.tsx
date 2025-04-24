"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
//import { Header } from "@/components/header";




const menu = [
  { name: "Главная", href: "/" },
  { name: "Стейкинг", href: "/staking" },
  { name: "История", href: "/history" },
  { name: "Поддержка", href: "/support" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (

    
    <div className="min-h-screen flex bg-white text-black">
      {/* Сайдбар */}
      <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-bold mb-4">TON Stake</h2>
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium ${
              pathname === item.href
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </aside>

      {/* Контент */}
      <div className="flex-1 flex flex-col">
        {/* Верхний бар */}
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <nav className="flex gap-6 text-sm">
              {menu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium ${
                    pathname === item.href
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg">
              Connect Wallet
            </button>
          </div>
        </div>

        {/* Основной контент */}
        <main className="p-6">{children}</main>
      </div>
    </div>
    
  );
}
