"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, Suspense   } from "react";
import ClientOnly from "@/components/ClientOnly";
import WalletConnect from "@/components/WalletConnect";
import MobileNav from "@/components/MobileNav";
import { useTonWallet, useTonAddress } from "@tonconnect/ui-react";
import { Address } from "@ton/core";
import { useT } from '@/i18n/react';

// 👉 ЗАМЕНИ ЭТУ СТРОКУ на то, что у тебя в .env.local
// Формат: можно смешивать EQ… и raw 0:… адреса, через запятую const ADMIN_ADDRESSES_CSV = "0QB8akzBYXBpATjJiWG1vRwo2FG2JoA9czy3yNno-qhMnrVn, 0:aaaaaaaaaaaaaaaaaaaa, EQyyyyyyyyyyyyyyyyyy";

// components/header/HeaderClient.tsx
import LanguageSwitcher from "@/components/LanguageSwitcher";
// ——— helpers ———
function stripQuotes(s: string) {
  return s.replace(/^['"]+|['"]+$/g, "");
}

function toRaw(addr: string): string | null {
  try {
    if (addr.includes(":")) return addr.toLowerCase();
    return Address.parseFriendly(addr).address.toString().toLowerCase();
  } catch {
    return null;
  }
}
function buildAdminSet(csv: string | undefined) {
  const raws = (csv ?? "")
    .split(",")
    .map((s) => stripQuotes(s.trim()))
    .filter(Boolean)
    .map((a) => toRaw(a))
    .filter((x): x is string => Boolean(x));
  return new Set(raws);
}

function useIsAdmin() {
  const wallet = useTonWallet();
  const friendly = useTonAddress();
  const userRaw =
    toRaw(friendly) ?? wallet?.account?.address?.toLowerCase() ?? null;

  const adminSet = useMemo(
    () => buildAdminSet(process.env.NEXT_PUBLIC_ADMIN_WALLETS),
    []
  );
  if (!userRaw) return false;
  return adminSet.has(userRaw);
}
export default function HeaderClient() {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = useIsAdmin();
  const t = useT("common");

  useEffect(() => {
    router.prefetch("/admin");
  }, [router]);

 
  // формируем пункты меню; пересчитываем при смене языка и прав администратора
  const links = useMemo(() => {
    const base = [
      { name: t("nav.home"), href: "/" },
      { name: t("nav.staking"), href: "/staking" },
      //{ name: t("common.nav.history"), href: "/history" },
      { name: t("nav.profile"), href: "/profile" },
      { name: t("nav.support"), href: "/support" }
    ];
    return isAdmin ? [...base, { name: "Admin", href: "/admin" }] : base;
  }, [isAdmin, t]);

  return (
    <>
        <Suspense fallback={null /* можно поставить лоадер */}>

      {/* mobile-only header: sticky, сам занимает место */}
      {/* mobile-only header: sticky, занимает место и даёт safe-area */}
<div className="md:hidden sticky top-0 z-50">
  <div className="pt-[env(safe-area-inset-top)]">
    <MobileNav />
  </div>
</div>
       </Suspense>
<header className="hidden md:block fixed top-0 left-0 w-full z-50 bg-[#0B1128] backdrop-blur-sm">
  <div className="mx-auto max-w-7xl px-4 md:px-8 py-3 
                  grid grid-cols-[auto_1fr_auto] items-center">
    {/* ЛОГО СЛЕВА */}
    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
      <Image src="/favicon.svg" alt={t("brand")} width={22} height={22} className="rounded-md" />
      <span>{t("brand")}</span>
    </Link>

    {/* МЕНЮ ПО ЦЕНТРУ */}
    <nav className="justify-self-center">
      <ul className="hidden md:flex items-center 
                     gap-8 lg:gap-10 xl:gap-14 2xl:gap-20">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`transition ${
                pathname === link.href
                  ? "text-[#00C2FF] font-semibold"
                  : "text-gray-300 hover:text-[#00C2FF]"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>

    {/* КНОПКИ СПРАВА */}
    <div className="justify-self-end flex items-center gap-2 md:gap-3">
      <ClientOnly>
        <WalletConnect />
      </ClientOnly>
      <Suspense fallback={null}>
        <LanguageSwitcher />
      </Suspense>
    </div>
  </div>
</header>

      </>
  );
}
