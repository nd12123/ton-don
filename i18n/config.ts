// i18n/config.ts
export const locales = ['ru', 'en'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'ru';

// какие словари реально существуют в messages/<locale>/
export const namespaces = ['common', 'home', 'faq', 'profile', 'staking', 'support'] as const;
export type Namespace = typeof namespaces[number];
