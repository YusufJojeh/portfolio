export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Yusuf Jojeh — Backend Engineer',
    alternateName: 'Yusuf Mohammad Jojeh — Backend Engineer for SaaS, CRM/ERP & AI Systems',
    url: 'https://yusufjojeh.com',
    description: 'Portfolio of Yusuf Jojeh — Backend-focused Full-Stack Engineer building production SaaS, CRM/ERP platforms, secure APIs, RBAC workflows, and AI-integrated systems.',
    author: {
      '@type': 'Person',
      name: 'Yusuf Mohammad Jojeh'
    },
    inLanguage: ['en', 'ar']
  };
}
