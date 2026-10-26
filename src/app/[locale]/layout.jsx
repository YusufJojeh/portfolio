import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter, Inter_Tight, Instrument_Serif, IBM_Plex_Sans_Arabic, Aref_Ruqaa } from 'next/font/google';
import { ClientProviders } from '@/providers/ClientProviders';
import { Analytics } from '@vercel/analytics/next';
import StructuredData from '@/components/server/StructuredData';
import ClickTracking from '@/components/scrollteller/site/ClickTracking';
import { SITE_URL, LOCALES, localeAlternates } from '@/lib/site';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
});

const grotesk = Inter_Tight({
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
  variable: '--font-grotesk',
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-arabic',
});

// Arabic display face: Ruq'ah calligraphy, the decorative counterpart to
// Instrument Serif. Applied to RTL pages only (globals.css).
const arabicDisplay = Aref_Ruqaa({
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-arabic-display',
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'final.meta' });
  const title = t('title');
  const description = t('description');

  return {
    metadataBase: new URL(SITE_URL),
    title: { template: '%s | Yusuf Jojeh', default: title },
    description,
    authors: [{ name: 'Yusuf Jojeh', url: SITE_URL }],
    creator: 'Yusuf Jojeh',
    openGraph: {
      type: 'profile',
      locale: locale === 'ar' ? 'ar_SY' : 'en_US',
      url: `/${locale}`,
      siteName: 'Yusuf Jojeh',
      title,
      description,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
    alternates: localeAlternates(locale),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <StructuredData locale={locale} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#090B0F" />
      </head>
      <body className={`${inter.variable} ${display.variable} ${grotesk.variable} ${arabic.variable} ${arabicDisplay.variable} font-sans bg-cinema-bg`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ClientProviders>{children}</ClientProviders>
        </NextIntlClientProvider>
        {/* Cookieless page views; custom events are recorded on Pro plans only. */}
        <Analytics />
        <ClickTracking locale={locale} />
      </body>
    </html>
  );
}
