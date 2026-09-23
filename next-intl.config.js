import { getRequestConfig } from 'next-intl/server';
import enMessages from './messages/en.json';
import arMessages from './messages/ar.json';
import finalEn from './messages/final/en.json';
import finalAr from './messages/final/ar.json';

export default getRequestConfig(async ({ locale: explicit, requestLocale }) => {
  // next-intl v4 only passes `locale` when a call supplies it explicitly;
  // every other server-side call resolves it from the [locale] segment.
  let locale = explicit ?? (await requestLocale);
  if (!locale || (locale !== 'en' && locale !== 'ar')) {
    locale = 'en'; // Default fallback
  }

  // Use static imports instead of dynamic imports for better reliability
  const messages = locale === 'ar'
    ? { ...arMessages, final: finalAr }
    : { ...enMessages, final: finalEn };

  return {
    locale,
    messages,
    timeZone: 'Asia/Damascus', // Syria timezone for consistent dates
    now: new Date()
  };
});
