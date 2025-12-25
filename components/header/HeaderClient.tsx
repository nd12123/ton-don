"use client";

import LocaleLink from "@/components/LocaleLink";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, Suspense, useState } from "react"; // ⬅️ useState
import { useTonWallet, useTonAddress } from "@tonconnect/ui-react";
import { Address } from "@ton/core";
import { useT } from "@/i18n/react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

import dynamic from "next/dynamic";
const WalletConnect = dynamic(() => import("@/components/WalletConnect"), { ssr: false });
const MobileNav = dynamic(() => import("@/components/MobileNav"), { ssr: false });

// helpers
function stripQuotes(s: string) { return s.replace(/^['"]+|['"]+$/g, ""); }
function toRaw(addr: string): string | null {
  try {
    if (addr.includes(":")) return addr.toLowerCase();
    return Address.parseFriendly(addr).address.toString().toLowerCase();
  } catch { return null; }
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
  const userRaw = toRaw(friendly) ?? wallet?.account?.address?.toLowerCase() ?? null;
  const adminSet = useMemo(() => buildAdminSet(process.env.NEXT_PUBLIC_ADMIN_WALLETS), []);
  if (!userRaw) return false;
  return adminSet.has(userRaw);
}

export default function HeaderClient() {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = useIsAdmin();
  const t = useT("common");
  const tf = (key: string, fallback: string) => {
    const v = t(key);
    return v === key ? fallback : (v as string);
  };

  // ⬇️ важное: рендерим одинаковое дерево до монтирования
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => { router.prefetch("/admin"); }, [router]);

  const links = useMemo(() => {
    const base = [
      { name: t("nav.home"),    href: "/" },
      { name: t("nav.staking"), href: "/staking" },
      { name: t("nav.profile"), href: "/profile" },
      { name: t("nav.support"), href: "/support" },
    ];
    return (mounted && isAdmin) ? [...base, { name: "Admin", href: "/admin" }] : base;
  }, [mounted, isAdmin, t]);

  return (
    <>
      {/* Mobile */}
      <Suspense fallback={null}>
        <div className="md:hidden sticky top-0 z-50 pt-[env(safe-area-inset-top)]">
          <MobileNav
            links={links}
            brand={tf("brand", "TON Staker")}
            menuLabel={tf("menu", "Menu")}
          />
        </div>
      </Suspense>

      {/* Desktop */}
      <header className="hidden md:block fixed top-0 left-0 w-full z-50 bg-[#0B1128] backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-3 grid grid-cols-[auto_1fr_auto] items-center">
          <LocaleLink href="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <Image src="/favicon.svg" alt={t("brand")} width={22} height={22} className="rounded-md" />
            {/* если паранойя на тему i18n — можно добавить suppressHydrationWarning */}
            <span /* suppressHydrationWarning */>{t("brand")}</span>
          </LocaleLink>

          <nav className="justify-self-center">
            <ul className="hidden md:flex items-center gap-8 lg:gap-10 xl:gap-14 2xl:gap-20">
              {links.map((link) => (
                <li key={link.href}>
                  <LocaleLink
                    href={link.href}
                    className={`transition ${pathname === link.href ? "text-[#00C2FF] font-semibold" : "text-gray-300 hover:text-[#00C2FF]"}`}
                  >
                    {link.name}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="justify-self-end flex items-center gap-2 md:gap-3">
            <WalletConnect />
            <Suspense fallback={null}>
              <LanguageSwitcher />
            </Suspense>
          </div>
        </div>
      </header>
    </>
  );
}
