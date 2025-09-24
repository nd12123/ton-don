// i18n/locale.ts
export const SUPPORTED_LOCALES = ['en','ru','es','fr','zh','uk','hi'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];
export const isLocale = (v: string | undefined): v is Locale =>
  !!v && SUPPORTED_LOCALES.includes(v as Locale);

export function withLocale(href: string, locale: Locale) {
  if (!href.startsWith('/')) return href;                       // внешние/mailto/tel/#
  const first = href.split('/')[1];
  if (isLocale(first)) return href;                             // уже есть /ru/... или /en/...
  return `/${locale}${href === '/' ? '' : href}`;               // -> /ru + /staking
}
