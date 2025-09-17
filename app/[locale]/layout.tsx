// app/[locale]/layout.tsx
import type { ReactNode } from "react";
import Header from "@/components/header/HeaderClient";
import ClientProviders from "@/components/ClientProviders";

import { I18nProvider, type Locale } from "@/i18n/react";
import { getMessages } from "@/i18n";
import { Suspense } from "react";

// локали держим тут, чтобы не тянуть конфиги
const SUPPORTED = ["ru", "en"] as const;
type Supported = typeof SUPPORTED[number];
const DEFAULT_LOCALE: Supported = "ru";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale | string }>;
}) {
  const { locale } = await params;

  // если путь типа /site.webmanifest попал в [locale] — не трогаем i18n
  if (!SUPPORTED.includes(locale as Supported)) {
    return (
      <>
      <Suspense fallback={null}>
        <Header />
        {children}
        </Suspense>
      </>
    );
  }

const messages = await getMessages(locale as Locale, [
    "common",
    "home",
    "faq",
    "staking",
    "support",
    "profile", 
  ]);

  return (
    <I18nProvider locale={locale as Supported} messages={messages}>
      <ClientProviders locale={locale as Supported}>
        <Header />
        {children}
      </ClientProviders>
    </I18nProvider>
  );
}

export function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale | string }>;
}) {
  const { locale } = await params;
  const safe = SUPPORTED.includes(locale as Supported)
    ? (locale as Supported)
    : DEFAULT_LOCALE;

  return {
    title: safe === "ru" ? "TON Stake — Главная" : "TON Stake — Home",
  };
}
