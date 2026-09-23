import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import StoryChapter from '../engine/StoryChapter';
import ChapterLabel from '../engine/ChapterLabel';
import Reveal from '../engine/Reveal';
import { SOURCE_LINKS } from '../projects';

/* An editorial index. Weight follows how much there is to say, not a grid of cards. */
const TITLE = {
  lead: 'font-display text-[44px] leading-[0.98] md:text-[clamp(56px,5.6vw,88px)]',
  mid: 'font-display text-[30px] leading-[1.02] md:text-[40px]',
  small: 'text-[17px] font-medium md:text-[18px]',
};

// Screens from local builds and each repo's own Playwright visual suite, on demo data, in index order.
const SHOTS = {
  restocafe: ['dashboard', 'kitchen', 'order-create', 'tables', 'invoice', 'reports'],
  medical: ['home', 'services', 'availability', 'ai-guest', 'health-tips', 'login'],
  ilogistics: ['dashboard', 'analytics', 'shipments', 'route', 'invoices', 'customer-shipments'],
  mtjri: ['storefront', 'store-dashboard', 'pos', 'product-editor', 'platform-dashboard', 'roles'],
};

function Screens({ id, title, t }) {
  return (
    <Reveal className="border-b border-white/10 py-10 md:py-14">
      <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
        <h3 dir="ltr" className={`${TITLE.mid} text-cinema-soft rtl:text-right`}>{title}</h3>
        <p className="max-w-xl text-[13.5px] leading-relaxed text-cinema-text/55">{t(`screens.${id}.note`)}</p>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {SHOTS[id].map((file) => (
          <figure key={file} className="m-0">
            <div className="overflow-hidden rounded-[3px] border border-white/10 bg-cinema-bg2" style={{ aspectRatio: 1.6 }}>
              <Image
                src={`/portfolio/more/${id}/${file}.webp`}
                alt={t(`screens.${id}.${file}`)}
                sizes="(min-width: 768px) 30vw, 46vw"
                width={1600}
                height={1000}
                className="block h-full w-full object-cover object-top"
              />
            </div>
            <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-cinema-muted">
              {t(`screens.${id}.${file}`)}
            </figcaption>
          </figure>
        ))}
      </div>
    </Reveal>
  );
}

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
  const lead = items.filter((i) => i.weight === 'lead');
  const mid = items.filter((i) => i.weight === 'mid');
  const small = items.filter((i) => i.weight === 'small');

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

      <div className="mt-14 grid border-t border-white/15 md:mt-20 md:grid-cols-2">
        {lead.map((it, i) => (
          <Reveal
            key={it.id}
            delay={0.06 * i}
            className={`border-b border-white/10 py-10 md:py-14 ${i === 0 ? 'md:border-e md:pe-12' : 'md:ps-12'}`}
          >
            <h3 dir="ltr" className={`${TITLE.lead} text-cinema-soft rtl:text-right`}>{it.t}</h3>
            {it.d && (
              <p className="mt-4 max-w-[30rem] text-[15px] leading-relaxed text-cinema-text/70 md:text-[16px]">{it.d}</p>
            )}
            <div className="mt-6">
              <Meta item={it} t={t} locale={locale} />
            </div>
          </Reveal>
        ))}
      </div>

      <div className="grid md:grid-cols-3">
        {mid.map((it, i) => (
          <Reveal
            key={it.id}
            delay={0.05 * i}
            className="border-b border-white/10 py-8 md:border-e md:px-8 md:py-10 md:first:ps-0 md:last:border-e-0 md:last:pe-0"
          >
            <h3 dir="ltr" className={`${TITLE.mid} text-cinema-soft rtl:text-right`}>{it.t}</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-cinema-text/65">{it.d}</p>
            <div className="mt-5">
              <Meta item={it} t={t} locale={locale} />
            </div>
          </Reveal>
        ))}
      </div>

      {Object.keys(SHOTS).map((id) => (
        <Screens key={id} id={id} title={items.find((i) => i.id === id)?.t ?? id} t={t} />
      ))}

      <ul>
        {small.map((it) => (
          <Reveal
            as="li"
            key={it.id}
            className="flex flex-col gap-1 border-b border-white/10 py-5 md:flex-row md:items-baseline md:gap-8"
          >
            <span dir="ltr" className={`${TITLE.small} text-cinema-text md:w-56 rtl:text-right`}>{it.t}</span>
            <span className="flex-1 text-[14.5px] text-cinema-text/60">{it.d}</span>
            <Meta item={it} t={t} locale={locale} />
          </Reveal>
        ))}
      </ul>
    </StoryChapter>
  );
}
