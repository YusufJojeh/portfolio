/*
 * Professional (employer) work, kept apart from owned projects.
 *
 * Displayed copy lives in messages/final/*.json under `experience.items`.
 * This file records what each entry may and may not disclose, so employer
 * systems never turn into personal project cards.
 */

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  /** Repositories behind the entry. Never linked or named on the site. */
  systems: string[];
  disclose: string[];
  withhold: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'ArchitWeb',
    role: 'Backend Developer',
    period: 'Sep 2026 — Present',
    systems: ['OT2 (ot2-api)', 'Alaya Nizwa Waqf backend'],
    disclose: ['PHP/MySQL and GraphQL backend work', 'payments, refunds and reporting APIs', 'idempotency and safer retries'],
    withhold: ['client and product names', 'internal architecture', 'source code', 'integrations', 'metrics'],
  },
  {
    company: 'Rakez Real Estate Company',
    role: 'AI & CRM Specialist / Full-Stack Developer',
    period: 'Jan 2025 — Aug 2026',
    systems: ['Rakez ERP'],
    disclose: ['real-estate ERP domain', 'responsibilities', 'demo-seed screens'],
    withhold: ['company records', 'internal URLs', 'source code'],
  },
  {
    company: 'Business Flow',
    role: 'Full-Stack Developer',
    period: '2025 — 2026',
    systems: [],
    disclose: ['NestJS tenant-aware SaaS APIs'],
    withhold: ['client names'],
  },
  {
    company: 'Mermez',
    role: 'Backend Developer, iLogistics',
    period: 'Jan 2025 — Nov 2025',
    systems: ['iLogistics (early history)'],
    disclose: ['logistics APIs, tracking, reporting, caching'],
    withhold: ['unbenchmarked performance figures'],
  },
];
