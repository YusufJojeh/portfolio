import { PROJECTS, WORK_ORDER, getProject } from '@/content/portfolio/projects';

// Case-study routes and their "next project" loop come from the evidence
// layer (src/content/portfolio/projects.ts), so a project without a route
// there cannot appear here.
export const WORK_SLUGS = WORK_ORDER;

export function getWork(slug) {
  const i = WORK_ORDER.indexOf(slug);
  if (i === -1) return null;
  const p = getProject(slug);
  const next = getProject(WORK_ORDER[(i + 1) % WORK_ORDER.length]);
  return {
    slug,
    title: p.name,
    stack: p.stack,
    githubUrl: p.sourceUrl,
    next: { slug: next.slug, title: next.name },
  };
}

export function workTitle(slug) {
  return getProject(slug)?.name ?? slug;
}

/** Public source links (only repositories that resolve publicly). */
export const SOURCE_LINKS = Object.fromEntries(
  PROJECTS.filter((p) => p.sourceUrl).map((p) => [p.slug, p.sourceUrl]),
);
