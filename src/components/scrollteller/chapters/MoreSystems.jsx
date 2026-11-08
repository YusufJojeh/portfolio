import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import StoryChapter from '../engine/StoryChapter';
import ChapterLabel from '../engine/ChapterLabel';
import Reveal from '../engine/Reveal';
import { SOURCE_LINKS } from '../projects';

import ProjectGallery from './ProjectGallery';

// Real screens, in card order. Case-study projects reuse their work captures;
// the rest come from local builds and each repo's own Playwright visual suite, on demo data.
const SHOTS = {
  mtjri: { dir: 'more/mtjri', files: ['store-dashboard', 'storefront', 'product-editor', 'pos', 'roles', 'platform-dashboard'] },
  ilogistics: { dir: 'more/ilogistics', files: ['dashboard', 'analytics', 'shipments', 'route', 'invoices', 'customer-shipments'] },
  hirelens: { dir: 'work/hirelens/app', files: ['dashboard', 'evaluation', 'human-review', 'interview-kit', 'rubric', 'audit'] },
  linguacoach: { dir: 'work/linguacoach/app', files: ['dashboard', 'coach', 'reading', 'listening', 'admin-audit'] },
};

function Meta({ item, t, locale }) {
  const source = SOURCE_LINKS[item.id];
  if (!item.href && !source) return null;
  return (
    <span className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.18em]">
      {item.href && (
        <Link
          href={`/${locale}/work/${item.href}`}
          className="hit text-cinema-cream/85 transition-colors duration-200 hover:text-cinema-soft"
        >
          {t('caseStudy')} <span aria-hidden="true" className="inline-block rtl:-scale-x-100">→</span>
        </Link>
      )}
      {source && (
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="hit text-cinema-muted transition-colors duration-200 hover:text-cinema-cream"
        >
          {t('source')} <span aria-hidden="true">↗</span>
        </a>
      )}
    </span>
  );
}

export default function MoreSystems() {
  const t = useTranslations('final.more');
  const c = useTranslations('final.chapters');
  const locale = useLocale();
  const items = t.raw('items');
  const cards = Object.keys(SHOTS)
    .map((id) => items.find((i) => i.id === id))
    .filter(Boolean);
  const rest = items.filter((i) => !SHOTS[i.id]);

  return (
    <StoryChapter id="more-systems" chapter="09" label={c('09')}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <ChapterLabel index="09">{c('09')}</ChapterLabel>
          <h2 className="mt-6 font-display text-[44px] leading-none text-cinema-soft md:text-[clamp(60px,6vw,96px)]">
            {t('heading')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[15px] text-cinema-text/60">{t('intro')}</p>
        </Reveal>
      </div>

      <ProjectGallery locale={locale} projects={cards.map((it) => ({
        ...it,
        note: t(`screens.${it.id}.note`),
        screens: SHOTS[it.id].files.map((file) => ({ src: `/portfolio/${SHOTS[it.id].dir}/${file}.webp`, caption: t(`screens.${it.id}.${file}`) })),
      }))} />

      <ul>
        {rest.map((it) => (
          <Reveal
            as="li"
            key={it.id}
            className="flex flex-col gap-1 border-b border-white/10 py-5 md:flex-row md:items-baseline md:gap-8"
          >
            <span dir="ltr" className="text-[17px] font-medium text-cinema-text md:w-56 md:text-[18px] rtl:text-right">{it.t}</span>
            <span className="flex-1 text-[14.5px] text-cinema-text/60">{it.d}</span>
            <Meta item={it} t={t} locale={locale} />
          </Reveal>
        ))}
      </ul>
    </StoryChapter>
  );
}
