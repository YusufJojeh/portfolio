// The one place the public origin is defined. Canonical links, hreflang,
// the sitemap, robots, llms.txt and structured data all build on it.
// Set NEXT_PUBLIC_SITE_URL once a custom domain is attached.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-zeta-ashy-83azovwdjo.vercel.app'
).replace(/\/+$/, '');

export const LOCALES = ['en', 'ar'];
export const DEFAULT_LOCALE = 'en';

/** Canonical and hreflang alternates for a path below the locale, e.g. '' or '/work/rakez'. */
export function localeAlternates(locale, path = '') {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      en: `/en${path}`,
      ar: `/ar${path}`,
      'x-default': `/${DEFAULT_LOCALE}${path}`,
    },
  };
}
