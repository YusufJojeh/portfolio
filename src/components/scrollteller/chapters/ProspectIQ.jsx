import { useLocale, useTranslations } from 'next-intl';
import ProjectScene from '../engine/ProjectScene';
import ApprovalRail from './ApprovalRail';

export default function ProspectIQ() {
  const t = useTranslations('final.prospectiq');
  const c = useTranslations('final.chapters');
  const locale = useLocale();

  return (
    <ProjectScene
      id="prospectiq"
      chapter="06"
      chapterName={c('06')}
      variant="lower"
      image={{
        src: '/portfolio/work/prospectiq/app/operational-lead-intelligence-dashboard.webp',
        aspect: 1600 / 882,
        mobileSrc: '/portfolio/work/prospectiq/mobile.webp',
        mobileAspect: 780 / 1390,
        alt: t('imageAlt'),
        focus: [50, 45],
        mobileFocus: [12, 45],
        origin: '50% 45%',
        dim: [0.6, 0.7, 0.5],
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
          <p className="mt-4 font-display text-[34px] leading-[1.02] text-cinema-soft md:text-[clamp(40px,4vw,60px)]">
            {t('detailsTitle')}
          </p>
          <ApprovalRail labels={t.raw('states')} paused={t('paused')} resumed={t('resumed')} />
          <p className="mt-2 max-w-[44rem] text-[14.5px] leading-relaxed text-cinema-text/70 md:text-[16px]">{t('note')}</p>
        </div>
      }
    />
  );
}
