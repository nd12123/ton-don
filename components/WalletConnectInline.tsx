// components/WalletConnectInline.tsx
"use client";

import * as React from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";

type Props = { className?: string };

export default function WalletConnectInline({ className = "" }: Props) {
  const [tonConnectUI] = useTonConnectUI();

  const open = React.useCallback(() => {
    try {
      tonConnectUI?.openModal?.();
    } catch (e) {
      // на всякий случай — если провайдер не смонтирован
      console.error("TonConnectUI not ready:", e);
    }
  }, [tonConnectUI]);

  return (
    <button
      type="button"
      onClick={open}
      className={[
        "inline-flex items-center justify-center",
        "px-4 py-2 rounded-full",
        "bg-blue-500 hover:bg-blue-600 text-white",
        "shadow-lg hover:shadow-xl",
        "focus:outline-none focus:ring-2 focus:ring-blue-400",
        "transition",
        className,
      ].join(" ")}
    >
      Подключить кошелёк
    </button>
  );
}
