import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { ClientProviders } from '@/providers/ClientProviders';
import StructuredData from '@/components/server/StructuredData';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: {
      template: '%s | Yusuf Jojeh',
      default: 'Yusuf Jojeh - Full-Stack & AI Engineer'
    },
    description: t('hero.summary'),
    keywords: [
      'Full-Stack Developer',
      'AI Engineer',
      'React Developer',
      'Next.js Developer',
      'Laravel Developer',
      'NestJS Developer',
      'Prompt Engineering',
      'ChatGPT Integration',
      'AI Automation',
      'DevOps Engineer',
      'Aleppo Developer',
      'Syria Developer',
      'Remote Developer'
    ],
    authors: [{ name: 'Yusuf Mohammad Jojeh' }],
    creator: 'Yusuf Mohammad Jojeh',
    publisher: 'Yusuf Mohammad Jojeh',
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SY' : 'en_US',
      url: 'https://yusufjojeh.com',
      siteName: 'Yusuf Jojeh Portfolio',
      title: 'Yusuf Jojeh - Full-Stack & AI Engineer',
      description: t('hero.summary'),
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Yusuf Jojeh Portfolio'
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Yusuf Jojeh - Full-Stack & AI Engineer',
      description: t('hero.summary'),
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
      google: 'your-google-verification-code', // TODO: Add after deployment
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <StructuredData locale={locale} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ClientProviders>{children}</ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
