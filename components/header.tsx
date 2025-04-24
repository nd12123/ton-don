"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import WalletConnect from "@/components/WalletConnect";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Staking", href: "/staking" },
  { name: "History", href: "/history" },
  { name: "Support", href: "/support" },
];

export function Header({
  onConnect,
  connected,
}: {
  onConnect?: () => void;
  connected?: boolean;
}) {
  const pathname = usePathname();

  return (
    <header className="w-full max-w-6xl mx-auto px-4 md:px-8 py-6 flex items-center justify-between">
      <div className="text-xl font-bold tracking-wide">TON Stake</div>

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


      <WalletConnect />


      {onConnect && (
        <Button
          onClick={onConnect}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {connected ? "Connected" : "Connect Wallet"}
        </Button>
      )}
    </header>
  );
}
