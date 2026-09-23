import {
  generatePersonSchema,
  generateWebsiteSchema,
  generatePortfolioSchema
} from '@/lib/schema';

export default function StructuredData({ locale }) {
  const schemas = [
    generatePersonSchema(),
    generateWebsiteSchema(),
    generatePortfolioSchema(),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
