"use client";

import { useMemo, useState } from "react";
import LocaleLink from "@/components/LocaleLink";
import { Menu, X } from "lucide-react";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import Image from "next/image";

type LinkItem = { name: string; href: string };
type Props = {
  links?: LinkItem[];
  brand?: string;
  menuLabel?: string;
};

export default function MobileNav({
  links,
  brand = "TON Staker",
  menuLabel = "Menu",
}: Props) {
  const [open, setOpen] = useState(false);

  // Фолбэк ссылки — без i18n/навигационных хуков
  const items = useMemo<LinkItem[]>(
    () =>
      links?.length
        ? links
        : [
            { name: "Home", href: "/" },
            { name: "Staking", href: "/staking" },
            { name: "Profile", href: "/profile" },
            { name: "Support", href: "/support" },
          ],
    [links]
  );

  return (
    <>
      {/* Верхняя панель */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0B1128]/90 backdrop-blur border-b border-white/10">
        <div className="flex items-center justify-between px-2 py-3">
          <button
            aria-label="Open menu"
            className="inline-flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          <LocaleLink href="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <Image src="/favicon.svg" alt={brand} width={20} height={20} className="rounded-md" />
            <span suppressHydrationWarning>{brand}</span>
          </LocaleLink>

          {/* Кнопка кошелька (компакт) */}
          <div
            className="
              shrink-0
              [&_button]:!h-8 [&_a]:!h-8
              [&_button]:!px-3 [&_a]:!px-3
              [&_button]:!text-sm [&_a]:!text-sm
              [&_button]:!rounded-lg [&_a]:!rounded-lg
              [&_button]:!min-w-0 [&_a]:!min-w-0
              [&_button]:!w-auto [&_a]:!w-auto
              [&_svg]:!w-4 [&_svg]:!h-4
            "
          >
            <ConnectWalletButton />
          </div>
        </div>
      </div>

      {/* Оверлей */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

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
          <span className="font-semibold" suppressHydrationWarning>
            {menuLabel}
          </span>
          <button aria-label="Close menu" className="p-2 -m-2" onClick={() => setOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <ul className="px-3 py-3 space-y-1">
          {items.map((item) => (
            <li key={item.href}>
              <LocaleLink
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-base transition-colors text-gray-300 hover:bg-white/5 hover:text-white"
              >
                <span suppressHydrationWarning>{item.name}</span>
              </LocaleLink>
            </li>
          ))}

          {/* Языковый переключатель можно вставить здесь через пропсы/портал при необходимости */}
        </ul>

        <div className="mt-auto p-3 border-t border-white/10">
          <ConnectWalletButton />
        </div>
      </nav>
    </>
  );
}
