"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import ClientOnly from "@/components/ClientOnly";
import WalletConnect from "@/components/WalletConnect";
import MobileNav from "@/components/MobileNav";
import { useTonWallet, useTonAddress } from "@tonconnect/ui-react";
import { Address } from "@ton/core";

// 👉 ЗАМЕНИ ЭТУ СТРОКУ на то, что у тебя в .env.local
// Формат: можно смешивать EQ… и raw 0:… адреса, через запятую const ADMIN_ADDRESSES_CSV = "0QB8akzBYXBpATjJiWG1vRwo2FG2JoA9czy3yNno-qhMnrVn, 0:aaaaaaaaaaaaaaaaaaaa, EQyyyyyyyyyyyyyyyyyy";


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
  const userRaw = toRaw(friendly) ?? wallet?.account?.address?.toLowerCase() ?? null;

  // ⬇️ используем константу вместо process.env
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

  useEffect(() => {
    router.prefetch("/admin");
  }, [router]);

  const links = useMemo(() => {
    const base = [
      { name: "Home", href: "/" },
      { name: "Staking", href: "/staking" },
      { name: "Profile", href: "/profile" },
      { name: "Support", href: "/support" },
    ];
    return isAdmin ? [...base, { name: "Admin", href: "/admin" }] : base;
  }, [isAdmin]);

  return (
    <>
      <MobileNav />
      <div className="md:hidden h-[calc(56px+env(safe-area-inset-top))]" aria-hidden />
      <header className="hidden md:block fixed top-0 left-0 w-full z-50 bg-[#0B1128] backdrop-blur-sm">
        <div className="mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <Image src="/favicon.svg" alt="TON Stake" width={22} height={22} className="rounded-md" />
            <span>TON Stake</span>
          </Link>

          <nav className="hidden sm:flex gap-8 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${
                  pathname === link.href ? "text-[#00C2FF] font-semibold" : "text-gray-400 hover:text-[#00C2FF]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div>
            <ClientOnly>
              <WalletConnect />
            </ClientOnly>
          </div>
        </div>
      </header>
    </>
  );
}
