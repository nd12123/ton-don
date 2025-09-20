// app/[locale]/(dashboard)/admin/AdminGate.tsx
"use client";

import * as React from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { Address } from "@ton/core";

function norm(input: string) {
  try { return Address.parse(input).toRawString(); }
  catch { return input.trim().toLowerCase(); }
}

const allow = new Set(
  (process.env.NEXT_PUBLIC_ADMIN_WALLETS || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean)
    .map(norm)
);

function short(a?: string) {
  if (!a) return "";
  return a.length > 12 ? `${a.slice(0,6)}…${a.slice(-6)}` : a;
}

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const wallet = useTonWallet();
  const raw = React.useMemo(() => (wallet?.account?.address ? norm(wallet.account.address) : null), [wallet]);

  // нет кошелька — ничего не трогаем, просто просим подключить через хедер
  if (!wallet) {
    return (
      <div className="max-w-xl mx-auto p-6 text-white/90">
        <h2 className="text-xl font-semibold mb-2">Требуется подключение</h2>
        <p>Подключите кошелёк через кнопку в шапке сайта.</p>
      </div>
    );
  }

  // кошелёк есть, но не из allowlist
  if (!raw || !allow.has(raw)) {
    return (
      <div className="max-w-xl mx-auto p-6 text-white/90">
        <h2 className="text-xl font-semibold mb-2">Доступ запрещён</h2>
        <p className="mb-3">Этот адрес не входит в список админов.</p>
        <div className="text-sm opacity-80 space-y-1">
          <div>Текущий (friendly): <code>{short(wallet.account.address)}</code></div>
          <div>Текущий (raw): <code>{raw || "—"}</code></div>
        </div>
      </div>
    );
  }

  // админ — пропускаем
  return <>{children}</>;
}
