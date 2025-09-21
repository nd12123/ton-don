"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useCallback } from "react";
import clsx from "clsx";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "es", label: "ES" },
] as const;

type Locale = typeof LOCALES[number]["code"];

// Если хочешь чтобы дефолт без префикса — см. комментарий ниже
const DEFAULT_LOCALE: Locale = "en";
const ALL = new Set(LOCALES.map(l => l.code));

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const search = useSearchParams();

  // текущая локаль берём из 1-го сегмента, иначе — дефолт
  const currentLocale = useMemo<Locale>(() => {
    const seg1 = pathname.split("/")[1]?.toLowerCase();
    return (ALL.has(seg1 as Locale) ? (seg1 as Locale) : DEFAULT_LOCALE);
  }, [pathname]);

  // часть пути БЕЗ локали в начале
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

  const switchTo = useCallback((locale: Locale) => {
    // вариант А (сейчас включён): всегда префиксируем, даже для дефолтной
    let nextPath = `/${locale}${barePath === "/" ? "" : barePath}`;

    // если нужен вариант Б (без префикса для дефолта) — раскомментируй:
    /*
    const USE_PREFIX_FOR_DEFAULT = false; // ← переключатель
    if (USE_PREFIX_FOR_DEFAULT) {
      nextPath = `/${locale}${barePath === "/" ? "" : barePath}`;
    } else {
      nextPath =
        locale === DEFAULT_LOCALE
          ? (barePath || "/")
          : `/${locale}${barePath === "/" ? "" : barePath}`;
    }
    */

    const qs = search?.toString();
    if (qs) nextPath += `?${qs}`;

    setPreferredLocaleCookie(locale);
    router.push(nextPath);
  }, [barePath, router, search, setPreferredLocaleCookie]);

  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-full border border-white/20 bg-white/5 p-0.5 shadow-sm backdrop-blur-sm",
        className
      )}
      role="group"
      aria-label="Language switch"
    >
      {/* Вариант с кнопками-чипсами */}
      <div className="flex items-center gap-1">
        {LOCALES.map(({ code, label }) => {
          const active = code === currentLocale;
          return (
            <button
              key={code}
              type="button"
              onClick={() => switchTo(code)}
              aria-pressed={active}
              className={clsx(
                "px-2.5 py-1 text-xs font-semibold rounded-full transition",
                active
                  ? "bg-sky-500 text-white shadow-[0_0_20px_rgba(56,172,234,0.45)]"
                  : "text-sky-200 hover:bg-white/10"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Если больше нравится выпадающий список — раскомментируй:
      <select
        value={currentLocale}
        onChange={(e) => switchTo(e.target.value as Locale)}
        className="ml-2 bg-transparent text-sky-200 text-xs outline-none px-2 py-1 rounded-full hover:bg-white/10"
        aria-label="Select language"
      >
        {LOCALES.map(({ code, label }) => (
          <option key={code} value={code} className="bg-[#0B1128]">
            {label}
          </option>
        ))}
      </select>
      */}
    </div>
  );
}
