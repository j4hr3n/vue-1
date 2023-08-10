import { i18n } from '@lingui/core';

function detectLocale() {
  const supportedLocales = ['en', 'nb', 'fi'];
  const defaultLocale = 'en';
  try {
    const htmlLocale = document.documentElement.lang;

    return (
      supportedLocales.find(
        (locale) =>
          htmlLocale === locale || htmlLocale.toLowerCase().includes(locale)
      ) || defaultLocale
    );
  } catch (e) {
    console.warn('could not detect locale, falling back to source locale', e);
    return defaultLocale;
  }
}

export async function activateI18n(pkg: string, locale?: string) {
  const resolvedLocale = locale ?? detectLocale();
  const { messages } = await import(
    `../${pkg}/locales/${resolvedLocale}/messages.mjs`
  );

  i18n.load(resolvedLocale, messages);
  i18n.activate(resolvedLocale);
}
