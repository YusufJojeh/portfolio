import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],

  // Used when no locale matches
  defaultLocale: 'en'
  // localePrefix defaults to 'always' which is more reliable with Next.js 15+
});

export const config = {
  // Match all pathnames except for static files (public assets, _next, etc.)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
