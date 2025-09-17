// components/ClientProviders.tsx
"use client";

import React from "react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

type Props = {
  children: React.ReactNode;
  locale: "ru" | "en";          // <- делаем обязательным
};

export default function ClientProviders({ children, locale }: Props) {
  const lang = locale === "ru" ? "ru" : "en";

  return (
    <TonConnectUIProvider
      manifestUrl="https://staking-mocha-iota.vercel.app/tonconnect-manifest.json"
      language={lang}           // <- корректный проп; не в uiPreferences
      // uiPreferences={{ theme: 'SYSTEM' }} // опционально
    >
      {children}
    </TonConnectUIProvider>
  );
}
