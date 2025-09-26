// @/i18n/index.ts
export type Locale = 'en' | 'ru' | 'es' | 'fr' | 'zh' | 'uk' | 'hi';

// i18n/index.ts
export const NAMESPACES = [
  "common",
  "home",
  "staking",
  "profile",
  "support",
  "faq",
  "privacy",
  "terms",
  "modals"
] as const;
export type Namespace = (typeof NAMESPACES)[number];

// …остальной код i18n (getMessages, loadMessages и т.д.)


export const SUPPORTED_LOCALES: Locale[] = ['en','ru','es','fr','zh','uk','hi'];
export const DEFAULT_LOCALE: Locale = 'en';

async function safeImport(ns: string, loc: string) {
  try {
    const mod = await import(`../messages/${loc}/${ns}.json`);
    return (mod as any).default ?? mod;
  } catch {
    return null;
  }
}

/** Новый безопасный загрузчик: пробуем locale → fallback на en → {} */
export async function loadMessages(namespace: string, locale: Locale) {
  const res = await safeImport(namespace, locale);
  if (res) return res;
  const fallback = await safeImport(namespace, 'en');
  return fallback ?? {};
}

/** загрузка нескольких namespaces сразу */
export async function loadAllMessages(namespaces: string[], locale: Locale) {
  const all: Record<string, any> = {};
  for (const ns of namespaces) {
    all[ns] = await loadMessages(ns, locale);
  }
  return all;
}

/**
 * Совместимость со старым API.
 * Поддерживает оба порядка аргументов:
 *   getMessages('home', 'ru')  ИЛИ  getMessages('ru', 'home')
 */
export async function getMessages(a: string, b?: string) {
  let ns: string;
  let loc: Locale;

  if (b) {
    // пробуем распознать, что из них locale
    const aIsLocale = (SUPPORTED_LOCALES as readonly string[]).includes(a);
    const bIsLocale = (SUPPORTED_LOCALES as readonly string[]).includes(b);

    if (aIsLocale && !bIsLocale) {
      loc = a as Locale;
      ns  = b;
    } else if (!aIsLocale && bIsLocale) {
      ns  = a;
      loc = b as Locale;
    } else {
      // если непонятно — считаем a = namespace, b = locale
      ns  = a;
      loc = (b as Locale) ?? DEFAULT_LOCALE;
    }
  } else {
    // один аргумент — это namespace, локаль по умолчанию
    ns  = a;
    loc = DEFAULT_LOCALE;
  }

  return loadMessages(ns, loc);
}
