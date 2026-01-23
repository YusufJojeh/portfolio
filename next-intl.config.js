import { getRequestConfig } from 'next-intl/server';
import enMessages from './messages/en.json';
import arMessages from './messages/ar.json';

export default getRequestConfig(async ({ locale }) => {
  // Validate locale and provide fallback
  if (!locale || (locale !== 'en' && locale !== 'ar')) {
    locale = 'en'; // Default fallback
  }

  // Use static imports instead of dynamic imports for better reliability
  const messages = locale === 'ar' ? arMessages : enMessages;

  return {
    locale,
    messages,
    timeZone: 'Asia/Damascus', // Syria timezone for consistent dates
    now: new Date()
  };
});
