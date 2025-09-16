// lib/i18n/getDictionary.ts
/*
import { namespaces, locales, defaultLocale } from "@/i18n/config";
export type { Locale } from "@/i18n/config";

// тот самый Dict, который ждёт твой провайдер
export type Dict = Record<string, any>;

// глубокое слияние, чтобы ключи типа "calc.h1.choose" были в корне dict
function deepMerge(target: Dict, src: Dict): Dict {
  for (const k of Object.keys(src)) {
    const v = (src as any)[k];
    if (
      v &&
      typeof v === "object" &&
      !Array.isArray(v) &&
      typeof (target as any)[k] === "object" &&
      (target as any)[k] !== null &&
      !Array.isArray((target as any)[k])
    ) {
      (target as any)[k] = deepMerge((target as any)[k], v);
    } else {
      (target as any)[k] = v;
    }
  }
  return target;
}

// основной загрузчик: грузим все namespaces и объединяем в один словарь
export async function getDictionary(locale: typeof locales[number]): Promise<Dict> {
  const parts = await Promise.all(
    namespaces.map(async (ns) => {
      const mod = (await import(`@/messages/${locale}/${ns}.json`)) as { default: Dict };
      return mod.default;
    })
  );

  return parts.reduce<Dict>((acc, piece) => deepMerge(acc, piece), {});
}

// на случай, если где-то используешь дефолт
export { locales, defaultLocale };
*/
