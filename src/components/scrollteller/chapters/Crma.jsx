import { useLocale, useTranslations } from 'next-intl';
import ProjectScene from '../engine/ProjectScene';

export default function Crma() {
  const t = useTranslations('final.crmaTeaser');
  const c = useTranslations('final.chapters');
  const locale = useLocale();
  const items = t.raw('items');

  return (
    <ProjectScene
      id="crma"
      chapter="03"
      chapterName={c('03')}
      variant="left"
      image={{
        src: '/portfolio/work/crma/pipeline.webp',
        aspect: 1600 / 1000,
        mobileSrc: '/portfolio/work/crma/mobile/pipeline.webp',
        mobileAspect: 780 / 1688,
        alt: t('imageAlt'),
        focus: [50, 42],
        mobileFocus: [50, 30],
        origin: '50% 42%',
        dim: [0.3, 0.72],
      }}
      kicker={t('kicker')}
      title={t('title')}
      lede={t('lede')}
      status={t('status')}
      cta={{ href: `/${locale}/work/crma`, label: t('cta') }}
      details={
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cinema-muted">
            <span dir="ltr" className="text-cinema-cream/80">{t('title')}</span>
            <span aria-hidden="true" className="mx-2 text-cinema-steel">/</span>
            {t('handles')}
          </p>
          <ul className="mt-5">
            {items.map((it) => (
              <li key={it.t} className="border-t border-white/10 py-3 md:grid md:grid-cols-[9rem_1fr] md:gap-4">
                <span className="block text-[15px] font-medium text-cinema-soft">{it.t}</span>
                <span className="mt-0.5 block text-[14.5px] leading-snug text-cinema-text/70 md:mt-0 md:text-[15px]">{it.d}</span>
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
}
