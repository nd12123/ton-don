// components/PayWithTrust.tsx
"use client";

function toNano(tons: number) {
  // 1 TON = 1e9 nanoTON, округляем до целого
  return Math.round(tons * 1e9);
}

export default function PayWithTrust({
  to,
  amountTon,
  comment = "",
  className = "",
}: { to: string; amountTon: number; comment?: string; className?: string }) {
  const href = `ton://transfer/${to}?amount=${toNano(amountTon)}&text=${encodeURIComponent(comment)}`;

  return (
    <a
      href={href}
      className={className || "inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-sky-600 text-white"}
      // на всякий случай – fallback, если схема ton:// не перехватывается браузером
      onClick={(e) => {
        // ничего, просто переходим по ссылке; если ОС/кошелёк умеет – откроется
      }}
    >
      Open in Trust Wallet
    </a>
  );
}
