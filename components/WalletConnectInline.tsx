// components/WalletConnectInline.tsx
"use client";

import * as React from "react";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useT } from "@/i18n/react";

type Props = { className?: string };

export default function WalletConnectInline({ className = "" }: Props) {
  const t = useT("common");
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  const open = React.useCallback(() => {
    try {
      tonConnectUI?.openModal?.();
    } catch (e) {
      console.error("TonConnectUI not ready:", e);
    }
  }, [tonConnectUI]);

  const short = (a: string) => (a.length > 12 ? `${a.slice(0, 4)}…${a.slice(-4)}` : a);

  // Локаль с фоллбеком
  const label = t("wallet.connect", undefined, "Подключить кошелёк"); // ru
  // en фоллбек будет из ваших json или это значение замените на "Connect Wallet"

  // Если уже подключены — показываем чип с адресом (без действия)
  if (address) {
    return (
      <span
        className={[
          "inline-flex items-center gap-2 px-4 py-2",
          "rounded-full border border-sky-400/30 bg-white/10 text-sky-100",
          "backdrop-blur-sm",
          className,
        ].join(" ")}
        title={address}
      >
        <TonIcon className="w-4 h-4 opacity-90" />
        <span className="font-semibold">{short(address)}</span>
      </span>
    );
  }

  // Не подключено — рендерим «большую» кнопку как в макете
  return (
    <button
      type="button"
      onClick={open}
      className={[
        "inline-flex items-center justify-center gap-2",
        "h-[48px] min-w-[220px] px-5",
        "rounded-2xl text-white font-semibold",
        "bg-[linear-gradient(180deg,#30C4FF_0%,#139CF0_100%)]",
        "ring-1 ring-white/25 shadow-[0_12px_32px_rgba(0,174,255,.45)]",
        "hover:brightness-110 active:translate-y-[1px] transition",
        "text-[14px] md:text-sm leading-none",
        "[&_*]:whitespace-nowrap",
        className,
      ].join(" ")}
      aria-label={label}
    >
      <TonIcon className="w-5 h-5 -mt-px" />
      <span>{label}</span>
    </button>
  );
}
/** Мини-иконка TON в векторе — без внешних ассетов */
function TonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 5.5C4 4.12 5.12 3 6.5 3h11c1.38 0 2.5 1.12 2.5 2.5 0 .45-.12.89-.36 1.27L13.5 18.9a2 2 0 0 1-3 0L4.36 6.77A2.5 2.5 0 0 1 4 5.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {/* медиана из нижней вершины к центру основания */}
      <path
        d="M12 18.6V7.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
