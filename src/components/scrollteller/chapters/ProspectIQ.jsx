import { useLocale, useTranslations } from 'next-intl';
import ProjectScene from '../engine/ProjectScene';

export default function ProspectIQ() {
  const t = useTranslations('final.prospectiq');
  const c = useTranslations('final.chapters');
  const locale = useLocale();
  const steps = t.raw('steps');

  return (
    <ProjectScene
      id="prospectiq"
      chapter="06"
      chapterName={c('06')}
      variant="lower"
      image={{
        src: '/portfolio/work/prospectiq/hero-dark.webp',
        aspect: 1440 / 690,
        alt: t('imageAlt'),
        focus: [50, 45],
        mobileFocus: [12, 45],
        origin: '50% 45%',
      }}
      kicker={t('kicker')}
      title={t('title')}
      lede={t('lede')}
      cta={{ href: `/${locale}/work/prospectiq`, label: t('cta') }}
      details={
        <div>
          <p dir="ltr" className="font-mono text-[11px] uppercase tracking-[0.24em] text-cinema-cream/80 rtl:text-right">
            {t('title')}
          </p>
          <ol className="mt-5 grid grid-cols-2 border-t border-white/15 md:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s}
                className="border-b border-white/10 py-4 pe-4 md:border-b-0 md:border-e md:py-6 md:pe-6 md:last:border-e-0 md:[&:not(:first-child)]:ps-6"
              >
                <span dir="ltr" className="block font-mono text-[10.5px] tracking-[0.2em] text-cinema-steel">
                  0{i + 1}
                </span>
                <span className="mt-2 block font-display text-[26px] leading-none text-cinema-soft md:text-[clamp(30px,3vw,44px)]">
                  {s}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-[40rem] text-[14.5px] leading-relaxed text-cinema-text/70 md:text-[16px]">{t('modes')}</p>
        </div>
      }
    />
  );
}
