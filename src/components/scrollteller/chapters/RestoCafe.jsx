import { useLocale, useTranslations } from 'next-intl';
import ProjectScene from '../engine/ProjectScene';

// The order states as spelled in the RestoCafe code, lit one after another.
const STATES = ['DRAFT', 'CONFIRMED', 'IN_PREPARATION', 'READY', 'SERVED', 'PAID'];

export default function RestoCafe() {
  const t = useTranslations('final.restocafe');
  const c = useTranslations('final.chapters');
  const locale = useLocale();
  const points = t.raw('points');

  return (
    <ProjectScene
      id="restocafe"
      chapter="06"
      chapterName={c('06')}
      variant="left"
      image={{
        src: '/portfolio/more/restocafe/kitchen.webp',
        aspect: 1600 / 1000,
        alt: t('imageAlt'),
        focus: [62, 40],
        mobileFocus: [70, 40],
        origin: '60% 40%',
        dim: [0.3, 0.72],
      }}
      kicker={t('kicker')}
      title={t('title')}
      lede={t('lede')}
      status={t('status')}
      cta={{ href: `/${locale}/work/restocafe`, label: t('cta') }}
      details={
        <div>
          <p dir="ltr" className="font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-steel rtl:text-right">
            {STATES.join('  →  ')}
          </p>
          <ol className="mt-5">
            {points.map((pt, i) => (
              <li key={pt} className="flex gap-4 border-t border-white/10 py-4">
                <span dir="ltr" className="pt-1 font-mono text-[11px] tracking-[0.2em] text-cinema-steel">
                  0{i + 1}
                </span>
                <span className="text-[16px] leading-relaxed text-cinema-text/80 md:text-[18px]">{pt}</span>
              </li>
            ))}
          </ol>
        </div>
      }
    />
  );
}
