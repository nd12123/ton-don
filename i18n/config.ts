// i18n/config.ts
export const locales = ['ru', 'en', 'es', 'fr','zh','uk','hi'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

// какие словари реально существуют в messages/<locale>/
export const namespaces = ['common', 'home', 'faq', 'profile', 'staking', 'support', 'terms', 'privacy'] as const;
export type Namespace = typeof namespaces[number];
