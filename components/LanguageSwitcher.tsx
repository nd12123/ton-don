"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import clsx from "clsx";

type Locale = "ru" | "en";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();           // напр. "/ru/profile/settings"
  const search = useSearchParams();         // query string как объект

  // безопасно достаём текущий локаль из 1-го сегмента
  const currentLocale: Locale = useMemo(() => {
    const seg = (pathname?.split("/")?.[1] || "ru").toLowerCase();
    return (seg === "en" ? "en" : "ru") as Locale;
  }, [pathname]);

  const otherLocale: Locale = currentLocale === "ru" ? "en" : "ru";

  function setPreferredLocaleCookie(locale: Locale) {
    // храним год, path=/, чтобы читалось в middleware
    document.cookie = `preferred-locale=${locale}; Max-Age=${60 * 60 * 24 * 365}; Path=/; SameSite=Lax`;
  }

  function switchTo(locale: Locale) {
    if (!pathname) return;

    // меняем только первый сегмент
    const parts = pathname.split("/");
    parts[1] = locale;                           // "/ru/..." -> "/en/..."
    let nextPath = parts.join("/");

    // прикручиваем query, если есть
    const qs = search?.toString();
    if (qs && qs.length) nextPath += `?${qs}`;

    setPreferredLocaleCookie(locale);
    router.push(nextPath);
  }

  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-full border border-white/20 bg-white/5 p-0.5 shadow-sm backdrop-blur-sm",
        className
      )}
      role="group"
      aria-label="Language switch"
    >
      <button
        type="button"
        onClick={() => switchTo("ru")}
        aria-pressed={currentLocale === "ru"}
        className={clsx(
          "px-2.5 py-1 text-xs font-semibold rounded-full transition",
          currentLocale === "ru"
            ? "bg-sky-500 text-white shadow-[0_0_20px_rgba(56,172,234,0.45)]"
            : "text-sky-200 hover:bg-white/10"
        )}
      >
        RU
      </button>
      <button
        type="button"
        onClick={() => switchTo("en")}
        aria-pressed={currentLocale === "en"}
        className={clsx(
          "ml-1 px-2.5 py-1 text-xs font-semibold rounded-full transition",
          currentLocale === "en"
            ? "bg-sky-500 text-white shadow-[0_0_20px_rgba(56,172,234,0.45)]"
            : "text-sky-200 hover:bg-white/10"
        )}
      >
        EN
      </button>
    </div>
  );
}
