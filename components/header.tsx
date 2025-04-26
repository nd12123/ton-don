"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import  WalletConnect from "@/components/WalletConnect";

//import GetStartedButton from "@/components/GetStartedButton"; <GetStartedButton />

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Staking", href: "/staking" },
  { name: "History", href: "/history" },
  { name: "Support", href: "/support" },
];


  

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full max-w-6xl mx-auto px-4 md:px-8 py-6 flex items-center justify-between">
      {/* Лого */}
      <Link 
      href="/"
        className="text-xl font-bold tracking-wide">TON Stake
      </Link>

      {/* Навигация */}
      <nav className="hidden sm:flex gap-6 text-sm">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition ${
              pathname === link.href
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Центральная CTA-кнопка */}
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        
        <WalletConnect />
      </div>
    </header>
  );
}
