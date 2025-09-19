// app/[locale]/(dashboard)/admin/AdminGate.tsx
"use client";

import * as React from "react";
import { useTonWallet, useTonConnectUI } from "@tonconnect/ui-react";
import { Address } from "@ton/core";

function norm(input: string) {
  try { return Address.parse(input).toRawString(); }
  catch { return input.trim().toLowerCase(); }
}

function loadAllowlist(): Set<string> {
  const raw = process.env.NEXT_PUBLIC_ADMIN_WALLETS || "";
  const arr = raw.split(",").map(s => s.trim()).filter(Boolean);
  return new Set(arr.map(norm));
}

function shortAddr(a: string) {
  return a.length > 12 ? `${a.slice(0, 6)}…${a.slice(-6)}` : a;
}

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const wallet = useTonWallet();
  const [ui] = useTonConnectUI();
  const allow = React.useMemo(loadAllowlist, []);
  const [currentRaw, setCurrentRaw] = React.useState<string | null>(null);

  React.useEffect(() => {
    const addr = wallet?.account?.address;
    if (!addr) { setCurrentRaw(null); return; }
    try {
      const raw = Address.parse(addr).toRawString();
      setCurrentRaw(raw);

      // лог сравнения, чтобы было видно, что именно проверяем
      console.log("[admin-gate] current:", raw, "allowlist:", Array.from(allow));
      console.log("[admin-gate] isAdmin =", allow.has(raw));
    } catch {
      setCurrentRaw(null);
    }
  }, [wallet, allow]);

  // 1) Нет кошелька — предложить подключить (и не трогать, если уже подключён)
  if (!wallet) {
    return (
      <div className="max-w-xl mx-auto p-6 text-white/90">
        <h2 className="text-xl font-semibold mb-2">Требуется подключение</h2>
        <p className="mb-4">Подключите кошелёк, чтобы войти в админ-панель.</p>
        <button
          type="button"
          onClick={() => ui.openModal()}
          className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 transition"
        >
          Подключить кошелёк
        </button>
      </div>
    );
  }

  // 2) Подключён, но не из allowlist — показать адрес и отказ
  if (!currentRaw || !allow.has(currentRaw)) {
    const friendly = wallet.account.address; // как даёт кошелёк (для наглядности)
    return (
      <div className="max-w-xl mx-auto p-6 text-white/90">
        <h2 className="text-xl font-semibold mb-2">Доступ запрещён</h2>
        <p className="mb-3">
          Этот адрес не входит в список админов.
        </p>
        <div className="text-sm opacity-80 space-y-1">
          <div>Текущий (friendly): <code>{shortAddr(friendly)}</code></div>
          <div>Текущий (raw): <code>{currentRaw}</code></div>
        </div>
        <button
          type="button"
          onClick={() => ui.openModal()} // просто откроем модалку — вдруг сменят кошелёк
          className="mt-4 px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
        >
          Сменить кошелёк
        </button>
      </div>
    );
  }

  // 3) Админ — пропускаем
  return <>{children}</>;
}
