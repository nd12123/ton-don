import type { Locale } from '@/i18n/config';

export async function getDictionary(locale: Locale) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch {
    // fallback, если нет файла
    return (await import('@/messages/en.json')).default;
  }
}
