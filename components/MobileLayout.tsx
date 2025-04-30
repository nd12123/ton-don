// components/Layout.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import TonProviderWrapper from "@/components/TonProviderWrapper";
//import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const menu = [
  { name: "Главная", href: "/" },
  { name: "Стейкинг", href: "/staking" },
  { name: "История", href: "/history" },
  { name: "Поддержка", href: "/support" },
  { name: "Кабинет", href: "/profile" },
];

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <TonProviderWrapper>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-black dark:bg-gray-900 dark:text-gray-100">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 overflow-hidden">
          <Menu className="w-6 h-6 cursor-pointer" onClick={() => setMobileOpen(true)} />
          <Link href="/" className="text-xl font-bold">
            TON Stake
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-1">
          {/* Sidebar Desktop 
          
          <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 dark:border-gray-700 p-6 space-y-4">
            <h2 className="text-lg font-bold">TON Stake</h2>
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium ${
                  pathname === item.href
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </aside>
          
          */}
          

          {/* Mobile Menu Overlay */}
          {mobileOpen && (
            <motion.nav>
            <div className="fixed inset-0 z-50 flex overflow-hidden">
              <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
              <nav className="relative w-64 h-full bg-gray-50 dark:bg-gray-900 p-6">
                <div className="flex justify-end">
                  <X className="w-6 h-6 cursor-pointer" onClick={() => setMobileOpen(false)} />
                </div>
                <ul className="mt-6 space-y-4">
                  {menu.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block text-lg font-medium ${
                          pathname === item.href
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <ThemeToggle />
                </div>
              </nav>
            </div>
            </motion.nav>
          )}
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <main className="flex-grow p-6">{children}</main>
          </div>
        </div>
      </div>
    </TonProviderWrapper>
  );
}
