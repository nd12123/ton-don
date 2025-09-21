// /i18n/index.ts
export type Locale = "ru" | "en" | 'es';
export type Namespace = "common" | "home" | "faq" | "staking"| "profile" | "support";

// грузим JSON из /messages/<locale>/<ns>.json
export async function loadNamespace<T = unknown>(
  locale: Locale,
  ns: Namespace
): Promise<T> {
  const mod = await import(/* webpackMode: "eager" */ `../messages/${locale}/${ns}.json`);
  return (mod as any).default as T;
}

export async function getMessages(locale: Locale, namespaces: Namespace[]) {
  const pairs = await Promise.all(
    namespaces.map(async (ns) => [ns, await loadNamespace(locale, ns)] as const)
  );
  return Object.fromEntries(pairs) as Record<Namespace, any>;
}
