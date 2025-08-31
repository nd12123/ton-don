"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
//import ThemeToggle from "@/components/ThemeToggle";
import WalletConnect from "@/components/WalletConnect";
//import TonDebug from "@/components/TonDebug"
//import ResetTon from "@/components/ResetTon"
import ClientOnly from "@/components/ClientOnly"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MobileNav from "@/components/MobileNav";


const navLinks = [
  { name: "Home", href: "/" },
  { name: "Staking", href: "/staking" },
  { name: "History", href: "/history" },
  { name: "Support", href: "/support" },
  { name: "Profile", href: "/profile" },
  { name: "Admin", href: "/admin" },
];

export default function Header() {
  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    router.prefetch("/admin/stakes"); // разогреть админку без видимой ссылки
  }, [router]);


  return (
    <>
    <MobileNav />
    <header className="
      fixed top-0 left-0 w-full z-50
      bg-[#0B1128] backdrop-blur-sm 
    " //border-b  border-white/10
    >
      <div className=" mx-auto px-4 md:px-8 py-3 flex items-center justify-between"//max-w-6xl
      >
        {/* Лого */}
        <Link href="/" className="text-xl font-bold text-white">
          TON Stake
        </Link>

        {/* Навигация */}
        <nav className="hidden sm:flex gap-8 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition ${
                pathname === link.href
                  ? "text-[#00C2FF] font-semibold"
                  : "text-gray-400 hover:text-[#00C2FF]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Кнопка подключения кошелька */}
        <div>
          
      <ClientOnly>
        <WalletConnect />
      </ClientOnly>
          {/**
      <TonDebug />
          <ResetTon /> */}
        </div>
      </div>
    </header>
    </>
  );
}
