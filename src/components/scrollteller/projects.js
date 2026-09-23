import { caseStudies } from '@/lib/data/portfolio';

const byId = (id) => caseStudies.find((c) => c.id === id);

// Order here is also the "next project" order on /work routes.
const WORK = [
  { slug: 'rakez', title: 'Rakez ERP', source: 'rakez-erp' },
  { slug: 'hirelens', title: 'HireLens AI', source: 'hirelens' },
  { slug: 'linguacoach', title: 'LinguaCoach AI', source: 'linguacoach' },
  { slug: 'prospectiq', title: 'ProspectIQ', source: 'leadscope' },
  { slug: 'dhura', title: 'Dhura', source: 'dhura' },
  { slug: 'careerguide', title: 'CareerGuide AI', source: 'careerguide' },
  { slug: 'algoag', title: 'ALGOAG', source: null },
];

export const WORK_SLUGS = WORK.map((w) => w.slug);

export function getWork(slug) {
  const i = WORK.findIndex((w) => w.slug === slug);
  if (i === -1) return null;
  const w = WORK[i];
  const data = w.source ? byId(w.source) : null;
  return {
    ...w,
    stack: data?.stack ?? [],
    githubUrl: data?.githubUrl ?? null,
    next: WORK[(i + 1) % WORK.length],
  };
}

export function workTitle(slug) {
  return WORK.find((w) => w.slug === slug)?.title ?? slug;
}

/** Public source links for the supporting systems index. */
export const SOURCE_LINKS = {
  restocafe: byId('restocafe')?.githubUrl ?? null,
  ilogistics: byId('ilogistics')?.githubUrl ?? null,
  medical: byId('medical')?.githubUrl ?? null,
};
