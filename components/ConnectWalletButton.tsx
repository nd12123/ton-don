// components/ConnectWalletButton.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Wallet } from "lucide-react";
import GoToStakingButton from "@/components/GoToStakingButton";
import { useT } from "@/i18n/react";
import { useTonWallet } from "@tonconnect/ui-react";

export default function ConnectWalletButton() {
  const t = useT("common");
  const wallet = useTonWallet();

  // Критично: гидрируем стабильно, считаем подключение только ПОСЛЕ маунта
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isConnected = mounted && Boolean(wallet?.account?.address);

  const label = useMemo(() => {
    const k = isConnected ? t("buttons.connected") : t("buttons.connect");
    // фоллбеки, если ключей нет
    if (k === "buttons.connected") return "Подключено";
    if (k === "buttons.connect") return "Подключить кошелёк";
    return k;
  }, [isConnected, t]);

  return (
    <GoToStakingButton
      className="btn-primary relative flex items-center justify-center
                 w-52 h-11 rounded-xl
                 bg-[radial-gradient(ellipse_179.05%_152.88%_at_74.38%_155.56%,_#3DD4FF_0%,_#0098EA_100%)]
                 outline outline-1 outline-offset-[-1px] outline-sky-400
                 overflow-hidden transition-transform hover:scale-105
                 focus:ring-2 focus:ring-sky-400 focus:outline-none"
    >
      <Wallet className="w-4 h-4 text-white mr-2" />
      {/* текст может отличаться до/после маунта — подавляем предупреждение */}
      <span className="text-white text-lg font-semibold font-['Inter'] leading-tight" suppressHydrationWarning>
        {label}
      </span>
    </GoToStakingButton>
  );
}
