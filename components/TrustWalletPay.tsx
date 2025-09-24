// components/TrustWalletPay.tsx
"use client";

import * as React from "react";

type Props = {
  to: string;              // адрес получателя (ваш пул)
  amountTon: number;       // сумма в TON
  comment?: string;        // необязательный комментарий
  className?: string;
};

function toNano(tons: number) {
  // 1 TON = 1e9 nanoTON
  return Math.round(tons * 1e9);
}

export default function TrustWalletPay({ to, amountTon, comment = "", className = "" }: Props) {
  const href = React.useMemo(() => {
    const q = new URLSearchParams({
      amount: String(toNano(amountTon)),
      text: comment,
    });
    return `ton://transfer/${to}?${q.toString()}`;
  }, [to, amountTon, comment]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(href);
    } catch {
      // на случай если clipboard не доступен
      alert(`Ссылка для Trust Wallet:\n${href}`);
    }
  };

  return (
    <div className={["flex items-center gap-2", className].join(" ")}>
      <a
        href={href}
        className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl
                   bg-[linear-gradient(180deg,#30C4FF_0%,#139CF0_100%)]
                   ring-1 ring-white/25 shadow-[0_12px_32px_rgba(0,174,255,.45)]
                   text-white font-semibold hover:brightness-110 active:translate-y-px transition"
      >
        Open in Trust Wallet
      </a>
      <button
        type="button"
        onClick={copy}
        className="h-11 px-3 rounded-xl border border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
        title="Скопировать ссылку"
      >
        Copy link
      </button>
    </div>
  );
}
