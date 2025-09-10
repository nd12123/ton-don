// app/[locale]/layout.tsx
import { I18nProvider } from "@/providers/I18nProvider";
import { getDictionary, type Locale } from "@/lib/i18n/getDictionary";
import Header from "@/components/header/HeaderClient"; // <-- клиентский

// НИКАКИХ <html>/<body> здесь! Это не root layout.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // В Next 15 тип LayoutProps для сегментов ожидает Promise
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <I18nProvider dict={dict}>
    <Header />
    {children}
    </I18nProvider>;
}

// Можно оставить генерацию статичных параметров
export function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }];
}

// Если есть generateMetadata — он тоже принимает Promise-параметры:
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "ru" ? "TON Stake — Главная" : "TON Stake — Home",
  };
}
