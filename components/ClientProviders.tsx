// components/ClientProviders.tsx
"use client";

import React from "react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";


type TonUiLang = "en" | "ru";

export default function Providers({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string; // у тебя может приходить "en" | "ru" | "es"
}) {
  // 🔑 Маппим локаль приложения в поддерживаемые Ton UI языки
  const tonUILang: TonUiLang = locale === "ru" ? "ru" : "en";


  return (
    <TonConnectUIProvider
      manifestUrl="https://tonstaker.io/tonconnect-manifest.json?v=3"
      language={tonUILang}           // <- корректный проп; не в uiPreferences
      // uiPreferences={{ theme: 'SYSTEM' }} // опционально
      //restoreConnection={false} //true on production
    >
      {children}
    </TonConnectUIProvider>
  );
}
