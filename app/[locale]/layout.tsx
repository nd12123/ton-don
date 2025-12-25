// app/[locale]/layout.tsx
import type { ReactNode } from "react";
import Header from "@/components/header/HeaderClient";
import ClientProviders from "@/components/ClientProviders";

import { I18nProvider, type Locale, type Messages } from "@/i18n/react";
import { loadAllMessages } from "@/i18n";
import { Suspense } from "react";

import TonConnectWarmup from "@/components/TonConnectWarmup";

// локали держим тут, чтобы не тянуть конфиги
const SUPPORTED = ["ru", "en", 'es', 'fr','zh','uk','hi'] as const;
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
        <div><TonConnectWarmup /></div> {/* just a prefetch*/}
        <Header />
        {children}
        </Suspense>
      </>
    );
  }

const messages = await loadAllMessages([
    "common",
    "home",
    "faq",
    "staking",
    "support",
    "profile", 
     'terms', 
     'privacy',
     'modals'
  ], locale as Locale);

  return (
    <I18nProvider locale={locale as Supported} messages={messages as Messages}>
      <ClientProviders locale={locale as Supported}>
        <TonConnectWarmup />
        <Header />
        {children}
      </ClientProviders>
    </I18nProvider>
  );
}

export function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }, { locale: "es" },{ locale: "zh" },{ locale: "uk" },{ locale: "fr" },{ locale: "hi" },]; //locale change
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
    title: safe === "ru" ? "TON Staker — Главная" : "TON Staker — Home",
  };
}
