// components/LanguageSwitcher.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useCallback } from "react";
import clsx from "clsx";

// Добавили новые локали
const LOCALES = [
  { code: "en", label: "English",  short: "EN" },
  { code: "ru", label: "Русский",  short: "RU" },
  { code: "es", label: "Español",  short: "ES" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "zh", label: "中文",      short: "ZH" },
  { code: "uk", label: "Українська", short: "UA" },
  { code: "hi", label: "हिंदी",     short: "HI" },
] as const;

type Locale = typeof LOCALES[number]["code"];
const DEFAULT_LOCALE: Locale = "en";
const ALL = new Set(LOCALES.map((l) => l.code));

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const search = useSearchParams();

  // Текущая локаль — из первого сегмента, иначе дефолт
  const currentLocale = useMemo<Locale>(() => {
    const seg1 = pathname.split("/")[1]?.toLowerCase();
    return (ALL.has(seg1 as Locale) ? (seg1 as Locale) : DEFAULT_LOCALE);
  }, [pathname]);

  // Путь без локали (то, что после /en/... -> /...)
  const barePath = useMemo(() => {
    const parts = pathname.split("/");
    const seg1 = parts[1];
    const isPrefixed = ALL.has(seg1 as Locale);
    const rest = isPrefixed ? parts.slice(2) : parts.slice(1);
    return "/" + rest.join("/");
  }, [pathname]);

  const setPreferredLocaleCookie = useCallback((locale: Locale) => {
    document.cookie = `preferred-locale=${locale}; Max-Age=${60 * 60 * 24 * 365}; Path=/; SameSite=Lax`;
  }, []);

  const switchTo = useCallback(
    (locale: Locale) => {
      // Всегда префиксуем (совместимо с текущим middleware с редиректом)
      let nextPath = `/${locale}${barePath === "/" ? "" : barePath}`;

      // Переносим query-параметры
      const qs = search?.toString();
      if (qs) nextPath += `?${qs}`;

      setPreferredLocaleCookie(locale);
      router.push(nextPath);
    },
    [barePath, router, search, setPreferredLocaleCookie]
  );

  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-full border border-white/20 bg-white/5 px-2 py-1 shadow-sm backdrop-blur-sm",
        className
      )}
    >
      <label className="sr-only" htmlFor="lang-select">Select language</label>
      <select
        id="lang-select"
        value={currentLocale}
        onChange={(e) => switchTo(e.target.value as Locale)}
        className={clsx(
          "bg-transparent text-sky-200 text-xs font-semibold outline-none",
          "px-1 py-0.5 rounded-full hover:bg-white/10"
        )}
        aria-label="Select language"
      >
        {LOCALES.map(({ code, label, short }) => (
          <option key={code} value={code} className="bg-[#0B1128]">
            {short} · {label}
          </option>
        ))}
      </select>
    </div>
  );
}
