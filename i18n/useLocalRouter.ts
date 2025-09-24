// i18n/useLocaleRouter.ts
"use client";
import { useRouter } from "next/navigation";
import { useCurrentLocale } from "./useLocale";
import { withLocale } from "./locale";

export function useLocaleRouter() {
  const router = useRouter();
  const locale = useCurrentLocale();
  return {
    push: (href: string) => router.push(withLocale(href, locale)),
    replace: (href: string) => router.replace(withLocale(href, locale)),
    locale,
  };
}
