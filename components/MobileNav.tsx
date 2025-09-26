"use client";

import { useEffect, useMemo, useState } from "react";
//import Link from "next/link";
import LocaleLink from "@/components/LocaleLink";

import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useTonWallet } from "@tonconnect/ui-react";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { useT } from '@/i18n/react';
type NavItem = { name: string; href: string };

function useIsAdmin() {
  const wallet = useTonWallet();
  const addr = wallet?.account?.address ?? null;
  // список админов через env: NEXT_PUBLIC_ADMIN_ADDRESSES="EQxxx,EQyyy" wallets!
  const admins = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_ADMIN_WALLETS || "";
    return raw
      .split(",")
      .map(s => s.trim())
      .filter(Boolean)
      .map(s => s.toLowerCase());
  }, []);

  if (!addr) return false;
  return admins.includes(addr.toLowerCase());
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = useIsAdmin();
  const t = useT();

  // Блокируем скролл фона при открытом меню
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Закрываем меню при смене маршрута
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

 // формируем пункты меню; пересчитываем при смене языка и прав администратора
  const links = useMemo(() => {
    const base = [
      { name: t("common.nav.home"), href: "/" },
      { name: t("common.nav.staking"), href: "/staking" },
      //{ name: t("common.nav.history"), href: "/history" },
      { name: t("common.nav.profile"), href: "/profile" },
      { name: t("common.nav.support"), href: "/support" }
    ];
    return isAdmin ? [...base, { name: "Admin", href: "/admin" }] : base;
  }, [isAdmin, t]);

  return (
    <>
      {/* верхняя мобильная панель sticky */}
      {/*"md:hidden fixed top-0 z-40 bg-black/40 backdrop-blur border-b border-white/10" */}
    <div className="md:hidden
    fixed top-0 left-0 right-0 z-50
    bg-[#0B1128]/90 backdrop-blur border-b border-white/10" //    pt-[env(safe-area-inset-top)]">
>
            <div className="flex items-center justify-between px-2 py-3">
          <button
            aria-label="Open menu"
            className="inline-flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
<LocaleLink href="/" className="flex items-center gap-2 text-white font-bold text-lg">
  <Image src="/favicon.svg" alt="TON Stake" width={20} height={20} className="rounded-md" />
  <span>{t("common.brand")}</span>
</LocaleLink>
          {/* Кнопка кошелька справа, как в десктопе */}
          {/* Кнопка кошелька справа (мобайл компактная) */}
<div
  className="
    shrink-0
    [&_button]:!h-8 [&_a]:!h-8                      /* ниже ~в 2 раза */
    [&_button]:!px-3 [&_a]:!px-3                    /* уже */
    [&_button]:!text-sm [&_a]:!text-sm
    [&_button]:!rounded-lg [&_a]:!rounded-lg
    [&_button]:!min-w-0 [&_a]:!min-w-0
    [&_button]:!w-auto [&_a]:!w-auto
    [&_svg]:!w-4 [&_svg]:!h-4
    md:[&_button]:h-10 md:[&_a]:h-10                /* десктоп как было */
    md:[&_button]:px-5 md:[&_a]:px-5
    md:[&_button]:text-base md:[&_a]:text-base
    md:[&_button]:rounded-xl md:[&_a]:rounded-xl
    md:[&_svg]:w-5 md:[&_svg]:h-5
  "
>
  <ConnectWalletButton />
</div>

        </div>
      </div>

      {/* Оверлей */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-200 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Сайд-меню */}
      <nav
        className={`fixed top-0 left-0 h-full w-72 z-50 md:hidden
        bg-gray-900 text-white border-r border-white/10
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-white/10">
          <span className="font-semibold">Menu</span>
          <button
            aria-label="Close menu"
            className="p-2 -m-2"
            onClick={() => setOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <ul className="px-3 py-3 space-y-1">
          {links.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <LocaleLink
                  href={item.href}
                  className={`block rounded-lg px-3 py-2 text-base transition-colors
                    ${active
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"}`}
                >
                  {item.name}
                </LocaleLink>
              </li>
            );
          })}
          <LanguageSwitcher />
        </ul>

        <div className="mt-auto p-3 border-t border-white/10">
          <ConnectWalletButton />
        </div>
      </nav>
    </>
  );
}
