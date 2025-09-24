// i18n/useLocale.ts
"use client";
import { useParams } from "next/navigation";
import { isLocale, Locale } from "./locale";

export function useCurrentLocale(): Locale {
  const p = useParams() as Record<string, string | string[] | undefined>;
  const loc = Array.isArray(p?.locale) ? p.locale[0] : (p?.locale as string | undefined);
  return isLocale(loc) ? (loc as Locale) : 'en';
}
