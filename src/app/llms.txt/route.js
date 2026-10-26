import en from '../../../messages/final/en.json';
import { WORK_ORDER, getProject } from '@/content/portfolio/projects';
import { CONTACT } from '@/components/scrollteller/contact';
import { SITE_URL } from '@/lib/site';

// llms.txt (https://llmstxt.org) built from the same copy and project list the
// site renders, so it cannot drift from the pages it describes.
export const dynamic = 'force-static';

function body() {
  const { meta, opening, about, experience, work } = en;

  const projects = WORK_ORDER.map((slug) => {
    const p = getProject(slug);
    const source = p.sourceUrl ? ` Source: ${p.sourceUrl}` : ' Source: private.';
    return `- [${p.name}](${SITE_URL}/en/work/${slug}): ${work[slug].lede}${source}`;
  });

  const roles = experience.items.map((r) => `- ${r.period} · ${r.role}, ${r.company}`);

  return [
    `# ${meta.title}`,
    '',
    `> ${opening.headline} ${opening.support}`,
    '',
    `Location: ${opening.location}. Arabic version: ${SITE_URL}/ar`,
    '',
    '## About',
    '',
    ...about.body,
    '',
    `Focus: ${about.focus.join(', ')}.`,
    '',
    '## Case studies',
    '',
    'Each case study ends with what was verified and what is not claimed.',
    '',
    ...projects,
    '',
    '## Experience',
    '',
    ...roles,
    '',
    experience.education,
    '',
    '## Contact',
    '',
    `- Email: ${CONTACT.email}`,
    `- GitHub: ${CONTACT.github}`,
    `- LinkedIn: ${CONTACT.linkedin}`,
    '',
  ].join('\n');
}

export function GET() {
  return new Response(body(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
