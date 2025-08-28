// components/ClientProviders.tsx

"use client";

import { useEffect, useState } from "react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

    if (!mounted) return null;


  // без useMemo — вычисляем сразу; это безопасно
  const twaReturnUrl =
    typeof window !== "undefined" &&
    (window.location.protocol === "http:" || window.location.protocol === "https:")
      ? (window.location.href as `${string}://${string}`)
      : undefined;

  if (!mounted) return null; // хуки уже вызваны, правило не нарушаем

  return (
    <TonConnectUIProvider
      manifestUrl="https://staking-mocha-iota.vercel.app/tonconnect-manifest.json"
      actionsConfiguration={{ twaReturnUrl }}
      // при необходимости можно временно отключить авто-восстановление //false
       restoreConnection={true}
      //walletsListConfiguration={{ }} //includeWallets: ["tonkeeper"] 
    >
      {children}
    </TonConnectUIProvider>
  );
}
