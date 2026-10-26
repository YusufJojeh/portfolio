import { WORK_ORDER } from '@/content/portfolio/projects';
import { SITE_URL, LOCALES } from '@/lib/site';

// Home plus every case study, each listed once per locale with its hreflang pair.
export default function sitemap() {
  const paths = ['', ...WORK_ORDER.map((slug) => `/work/${slug}`)];

  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changeFrequency: 'monthly',
      priority: path === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      },
    })),
  );
}
