export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'es', 'ar'],
  localeDetection: true,
} as const;

export type Locale = (typeof i18n.locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  ar: 'العربية',
};

export const rtlLocales: Locale[] = ['ar'];

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

