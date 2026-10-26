import { SITE_URL } from '@/lib/site';

export function generatePersonSchema({ locale, description }) {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Yusuf Mohammad Jojeh',
    alternateName: 'Yusuf Jojeh',
    jobTitle: 'Backend & Business Systems Engineer',
    description,
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}/og-image.jpg`,
    email: 'yassaf.jojeh@gmail.com',
    telephone: '+963980278664',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Aleppo',
      addressCountry: 'SY'
    },
    sameAs: [
      'https://github.com/YusufJojeh',
      'https://www.linkedin.com/in/yusuf-jojeh-95835b26b'
    ],
    knowsAbout: [
      'Backend Engineering',
      'SaaS Architecture',
      'CRM/ERP Systems',
      'REST API Design',
      'RBAC & Authentication',
      'Laravel',
      'NestJS',
      'FastAPI',
      'React',
      'TypeScript',
      'PostgreSQL',
      'MySQL',
      'Redis',
      'Docker',
      'AI Integration',
      'OpenAI API',
      'Multi-tenant Systems'
    ],
    knowsLanguage: [
      {
        '@type': 'Language',
        name: 'Arabic',
        alternateName: 'ar'
      },
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en'
      }
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'BSc in Information Engineering & Distributed Systems',
        educationalLevel: 'Bachelor Degree',
        about: 'Information Engineering',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Al-Shahbaa University'
        }
      }
    ]
  };
}
