import { SITE_URL } from '@/lib/site';

export function generateWebsiteSchema({ description }) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Yusuf Jojeh',
    url: SITE_URL,
    description,
    author: { '@id': `${SITE_URL}/#person` },
    inLanguage: ['en', 'ar'],
  };
}
