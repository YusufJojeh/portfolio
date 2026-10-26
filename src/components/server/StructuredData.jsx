import { getTranslations } from 'next-intl/server';
import { generatePersonSchema, generateWebsiteSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

// One JSON-LD graph: a ProfilePage about the Person, inside the WebSite.
// The description is the same localized copy the page's meta tags use.
export default async function StructuredData({ locale }) {
  const t = await getTranslations({ locale, namespace: 'final.meta' });
  const description = t('description');

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        url: `${SITE_URL}/${locale}`,
        name: t('title'),
        inLanguage: locale,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
      generatePersonSchema({ locale, description }),
      generateWebsiteSchema({ description }),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
    />
  );
}
