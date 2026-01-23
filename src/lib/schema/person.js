export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Yusuf Mohammad Jojeh',
    alternateName: 'Yusuf Jojeh',
    jobTitle: 'Full-Stack & AI Systems Engineer',
    description: 'Full-Stack Developer and AI Engineer specializing in React, Next.js, Laravel, NestJS, and AI-powered business solutions. Expert in prompt engineering and AI automation.',
    url: 'https://yusufjojeh.com',
    email: 'yassaf.jojah@gmail.com',
    telephone: '+963980278664',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Aleppo',
      addressCountry: 'SY'
    },
    sameAs: [
      'https://github.com/YusufJojeh',
      'https://linkedin.com/in/yusufjojeh'
    ],
    knowsAbout: [
      'Full-Stack Development',
      'AI Engineering',
      'React',
      'Next.js',
      'Laravel',
      'NestJS',
      'Python',
      'AI Automation',
      'Prompt Engineering',
      'ChatGPT Integration',
      'Claude AI Integration',
      'DevOps',
      'Docker',
      'CI/CD',
      'Database Design',
      'RESTful APIs',
      'GraphQL'
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
        name: 'Bachelor of Informatics Engineering',
        educationalLevel: 'Bachelor Degree',
        about: 'Software Engineering',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Aleppo University'
        }
      }
    ]
  };
}
