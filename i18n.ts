import { getRequestConfig } from 'next-intl/server';

// Lingue supportate
export const locales = ['it', 'en', 'fr', 'es'] as const;
export const defaultLocale = 'it' as const;

export type Locale = (typeof locales)[number];

// Nomi delle lingue per il language switcher
export const localeNames: Record<Locale, string> = {
  it: 'Italiano',
  en: 'English',
  fr: 'Français',
  es: 'Español',
};

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
