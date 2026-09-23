export function generateSoftwareApplicationSchema(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    applicationCategory: 'WebApplication',
    description: project.description,
    url: project.liveUrl || 'https://yusufjojeh.com',
    author: {
      '@type': 'Person',
      name: 'Yusuf Mohammad Jojeh'
    },
    programmingLanguage: project.technologies,
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };
}

export function generatePortfolioSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Yusuf Jojeh - Software Development Portfolio',
    description: 'A collection of Full-Stack and AI engineering projects including enterprise business platforms, healthcare AI solutions, and automation systems.',
    author: {
      '@type': 'Person',
      name: 'Yusuf Mohammad Jojeh'
    },
    dateCreated: '2024-01-01',
    keywords: 'Full-Stack Development, AI Engineering, React, Next.js, Laravel, NestJS, AI Automation',
    inLanguage: ['en', 'ar']
  };
}
