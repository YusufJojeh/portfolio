export default function sitemap() {
  const baseUrl = 'https://yusufjojeh.com';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          en: baseUrl,
          ar: `${baseUrl}/ar`,
        },
      },
    },
    {
      url: `${baseUrl}/ar`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
