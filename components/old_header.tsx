"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
//import ThemeToggle from "@/components/ThemeToggle";
import WalletConnect from "@/components/WalletConnect";
//import TonDebug from "@/components/TonDebug"
//import ResetTon from "@/components/ResetTon"
import ClientOnly from "@/components/ClientOnly"
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import MobileNav from "@/components/MobileNav";
import Image from "next/image";
import { useTonWallet } from "@tonconnect/ui-react";

function useIsAdmin() {
  const wallet = useTonWallet();
  const addr = wallet?.account?.address ?? null;

  // список админов через env: NEXT_PUBLIC_ADMIN_ADDRESSES="EQxxx,EQyyy"
  const admins = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_ADMIN_ADDRESSES || "";
    return raw
      .split(",")
      .map(s => s.trim())
      .filter(Boolean)
      .map(s => s.toLowerCase());
  }, []);

  if (!addr) return false;
  return admins.includes(addr.toLowerCase());
}

const navLinks = [
  
  { name: "Home", href: "/" },
  { name: "Staking", href: "/staking" },
  //{ name: "History", href: "/history" },
  { name: "Profile", href: "/profile" },
  //{ name: "Admin", href: "/admin" },
  { name: "Support", href: "/support" },
];

export default function Header() {
  const pathname = usePathname();
  const isAdmin = useIsAdmin();

  if (isAdmin) {
    navLinks.push({ name: "Admin", href: "/admin/stakes" });
  }
  
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/admin/stakes"); // разогреть админку без видимой ссылки
  }, [router]);


  return (
    <>
    <MobileNav />
      <div className="md:hidden h-[calc(56px+env(safe-area-inset-top))]" aria-hidden />
    <header className="
    hidden md:block
      fixed top-0 left-0 w-full z-50
      bg-[#0B1128] backdrop-blur-sm 
    " //border-b  border-white/10
    >
      <div className=" mx-auto px-4 md:px-8 py-3 flex items-center justify-between"//max-w-6xl
      >
        {/* Лого */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
  <Image src="/favicon.svg" alt="TON Stake" width={22} height={22} className="rounded-md" />
  <span>TON Stake</span>
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
