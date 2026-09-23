import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import StoryChapter from '../engine/StoryChapter';
import ChapterLabel from '../engine/ChapterLabel';
import Reveal from '../engine/Reveal';
import { SOURCE_LINKS } from '../projects';

import ProjectCard from './ProjectCard';

// Real screens, in card order. Case-study projects reuse their work captures;
// the rest come from local builds and each repo's own Playwright visual suite, on demo data.
const SHOTS = {
  careerguide: { dir: 'work/careerguide', files: ['home', 'login'] },
  algoag: { dir: 'work/algoag', files: ['home', 'login'] },
  restocafe: { dir: 'more/restocafe', files: ['dashboard', 'kitchen', 'order-create', 'tables', 'invoice', 'reports'] },
  ilogistics: { dir: 'more/ilogistics', files: ['dashboard', 'analytics', 'shipments', 'route', 'invoices', 'customer-shipments'] },
  agentos: { dir: 'more/agentos', files: ['content-studio', 'social-studio', 'register'] },
  mtjri: { dir: 'more/mtjri', files: ['storefront', 'store-dashboard', 'pos', 'product-editor', 'platform-dashboard', 'roles'] },
};

function Meta({ item, t, locale }) {
  if (item.status) {
    return (
      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-cinema-muted">{t(item.status)}</span>
    );
  }
  const source = SOURCE_LINKS[item.id];
  if (!item.href && !source) return null;
  return (
    <span className="flex gap-5 font-mono text-[10.5px] uppercase tracking-[0.18em]">
      {item.href && (
        <Link
          href={`/${locale}/work/${item.href}`}
          className="text-cinema-cream/85 transition-colors duration-200 hover:text-cinema-soft"
        >
          {t('caseStudy')} <span aria-hidden="true" className="inline-block rtl:-scale-x-100">→</span>
        </Link>
      )}
      {source && (
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cinema-muted transition-colors duration-200 hover:text-cinema-cream"
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
    <StoryChapter id="more-systems" chapter="10" label={c('10')}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <ChapterLabel index="10">{c('10')}</ChapterLabel>
          <h2 className="mt-6 font-display text-[44px] leading-none text-cinema-soft md:text-[clamp(60px,6vw,96px)]">
            {t('heading')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[15px] text-cinema-text/60">{t('intro')}</p>
        </Reveal>
      </div>

      <div className="mt-14 border-t border-white/15 md:mt-20">
        {cards.map((it, i) => {
          const { dir, files } = SHOTS[it.id];
          return (
            <Reveal key={it.id}>
              <ProjectCard
                index={String(i + 1).padStart(2, '0')}
                title={it.t}
                description={it.d}
                note={t(`screens.${it.id}.note`)}
                meta={<Meta item={it} t={t} locale={locale} />}
                flip={i % 2 === 1}
                screens={files.map((f) => ({
                  src: `/portfolio/${dir}/${f}.webp`,
                  caption: t(`screens.${it.id}.${f}`),
                }))}
              />
            </Reveal>
          );
        })}
      </div>

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
