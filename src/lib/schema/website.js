export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Yusuf Jojeh Portfolio',
    alternateName: 'Yusuf Mohammad Jojeh - Full-Stack & AI Engineer',
    url: 'https://yusufjojeh.com',
    description: 'Professional portfolio showcasing Full-Stack development, AI engineering, and enterprise software solutions. Featuring flagship projects in AI automation and business platforms.',
    author: {
      '@type': 'Person',
      name: 'Yusuf Mohammad Jojeh'
    },
    inLanguage: ['en', 'ar'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://yusufjojeh.com/?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };
}
