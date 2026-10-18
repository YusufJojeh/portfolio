import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Inter, Inter_Tight, Instrument_Serif, IBM_Plex_Sans_Arabic, Aref_Ruqaa } from 'next/font/google';
import { ClientProviders } from '@/providers/ClientProviders';
import StructuredData from '@/components/server/StructuredData';
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

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const seoTitle = 'Yusuf Jojeh — Backend Engineer for SaaS, CRM/ERP & AI Systems';
  const seoDescription = 'Backend-focused Full-Stack Engineer building production SaaS, CRM/ERP platforms, secure APIs, RBAC workflows, and AI-integrated systems with Laravel, FastAPI/NestJS, React, SQL, Redis, and Docker.';

  return {
    title: {
      template: '%s | Yusuf Jojeh',
      default: seoTitle
    },
    description: seoDescription,
    keywords: [
      'Backend Engineer',
      'SaaS Developer',
      'CRM Developer',
      'ERP Developer',
      'Laravel Developer',
      'NestJS Developer',
      'FastAPI Developer',
      'React Developer',
      'REST API',
      'RBAC',
      'AI Integration',
      'Multi-tenant',
      'Remote Backend Developer',
      'GCC Developer',
      'MENA Developer',
      'Arabic English Developer'
    ],
    authors: [{ name: 'Yusuf Mohammad Jojeh' }],
    creator: 'Yusuf Mohammad Jojeh',
    publisher: 'Yusuf Mohammad Jojeh',
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SY' : 'en_US',
      url: 'https://yusufjojeh.com',
      siteName: 'Yusuf Jojeh — Backend Engineer',
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Yusuf Jojeh — Backend Engineer for SaaS, CRM/ERP & AI Systems'
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: locale === 'en' ? '/' : `/${locale}`,
      languages: {
        'en': '/',
        'ar': '/ar',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
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
      </body>
    </html>
  );
}
