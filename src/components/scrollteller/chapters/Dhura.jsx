import { useLocale, useTranslations } from 'next-intl';
import ProjectScene from '../engine/ProjectScene';

export default function Dhura() {
  const t = useTranslations('final.dhura');
  const c = useTranslations('final.chapters');
  const locale = useLocale();
  const points = t.raw('points');

  return (
    <ProjectScene
      id="dhura"
      chapter="07"
      chapterName={c('07')}
      variant="arabic"
      image={{
        src: '/portfolio/work/dhura/app/executive-overview.webp',
        aspect: 1600 / 1000,
        mobileSrc: '/portfolio/work/dhura/mobile.webp',
        mobileAspect: 780 / 1688,
        alt: t('imageAlt'),
        focus: [50, 50],
        mobileFocus: [50, 50],
        origin: '50% 50%',
        dim: [0.28, 0.7],
      }}
      kicker={t('kicker')}
      title={t('title')}
      arabicTitle={t('arabicTitle')}
      lede={t('lede')}
      status={t('status')}
      cta={{ href: `/${locale}/work/dhura`, label: t('cta') }}
      details={
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cinema-muted">
            <span lang="ar" className="font-arabic text-[15px] normal-case tracking-normal text-cinema-cream/90">
              {t('arabicTitle')}
            </span>
            <span aria-hidden="true" className="mx-2 text-cinema-steel">/</span>
            {t('status')}
          </p>
          <ol className="mt-5">
            {points.map((pt, i) => (
              <li key={pt} className="flex gap-4 border-t border-white/10 py-4">
                <span dir="ltr" className="pt-1 font-mono text-[10.5px] tracking-[0.2em] text-cinema-steel">
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
