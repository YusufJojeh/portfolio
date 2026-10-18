import { useTranslations } from 'next-intl';
import WorkCover from './WorkCover';
import { Architecture, BackLink, Evidence, Label, NextWork, Section } from './WorkParts';
import { Claims, Decisions, Facts, FlowSteps } from './CaseParts';

const OVERLAY =
  'linear-gradient(270deg, rgba(9,11,15,0.9) 0%, rgba(9,11,15,0.55) 45%, rgba(9,11,15,0.35) 100%), linear-gradient(0deg, rgba(9,11,15,1) 0%, rgba(9,11,15,0.35) 45%, rgba(9,11,15,0.45) 100%)';

/*
 * Dhura (ذُرى) is a V1 release candidate, not a live deployment, and the cover
 * says so. The Arabic name leads, set right-aligned in both locales. The page
 * follows the business journey first, then the safety spine that keeps the
 * AI layer advisory, then the evidence.
 */
export default function DhuraWork({ locale, work }) {
  const t = useTranslations('final.work');
  const d = useTranslations('final.work.dhura');
  const home = useTranslations('final.dhura');
  const principles = d.raw('principles');

  return (
    <>
      <WorkCover
        overlay={OVERLAY}
        image={{
          src: '/portfolio/work/dhura/app/executive-overview.webp',
          aspect: 1600 / 1000,
          mobileSrc: '/portfolio/work/dhura/mobile.webp',
          mobileAspect: 780 / 1688,
          alt: home('imageAlt'),
          focus: [50, 50],
          mobileFocus: [50, 50],
        }}
      >
        <BackLink locale={locale} label={t('back')} />
        <div className="ml-auto mt-14 max-w-[44rem] text-right">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-muted">{d('kicker')}</p>
          <h1 className="mt-10 md:mt-20">
            <span lang="ar" dir="rtl" className="block font-arabic text-[112px] font-semibold leading-[1.15] text-cinema-soft md:text-[clamp(180px,18vw,300px)]">
              {d('arabicTitle')}
            </span>
            <span dir="ltr" className="mt-1 block font-display text-[36px] leading-none text-cinema-text/80 md:text-[52px]">
              {d('title')}
            </span>
          </h1>
          <p className="mt-8 inline-block border border-white/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-cinema-cream/85">
            {d('status')}
          </p>
        </div>
      </WorkCover>

      <Section className="py-20 md:py-28">
        <p className="max-w-[56rem] font-display text-[32px] leading-[1.1] text-cinema-soft md:text-[clamp(44px,4.4vw,68px)]">{d('lede')}</p>
      </Section>

      <Facts facts={d.raw('facts')} />

      <Section className="py-16 md:py-24">
        <Label as="h2">{d('journeyTitle')}</Label>
        <p className="mt-6 max-w-[40rem] text-[15px] leading-relaxed text-cinema-text/70">{d('journeyIntro')}</p>
        <div className="mt-12">
          <FlowSteps steps={d.raw('journey')} stepLabel={t('step')} horizontal />
        </div>
      </Section>

      <Section className="pb-20 md:pb-28">
        <Label as="h2">{d('aiTitle')}</Label>
        <ol className="mt-10 grid gap-px bg-white/10 md:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.t} className="bg-cinema-bg p-8 md:p-10">
              <span dir="ltr" className="font-mono text-[11px] tracking-[0.18em] text-cinema-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 font-display text-[28px] leading-tight text-cinema-soft md:text-[34px]">{p.t}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-cinema-text/70 md:text-[16px]">{p.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Decisions title={d('decisionsTitle')} items={d.raw('decisions')} />
      <Evidence t={t} slug="dhura" />
      <Claims labels={t.raw('claims')} verified={d.raw('verified')} notClaimed={d.raw('notClaimed')} tests={d('tests')} />
      <Architecture t={t} text={d('architecture')} stack={work.stack} url={work.githubUrl} />
      <NextWork locale={locale} t={t} next={work.next} />
    </>
  );
}
