import Link from 'next/link';
import { useTranslations } from 'next-intl';
import WorkCover from './WorkCover';
import { workTitle } from '../projects';
import { Arrow, BackLink, Evidence, Label, NextWork, Section, StackLine } from './WorkParts';

const OVERLAY =
  'linear-gradient(270deg, rgba(9,11,15,0.9) 0%, rgba(9,11,15,0.55) 45%, rgba(9,11,15,0.35) 100%), linear-gradient(0deg, rgba(9,11,15,1) 0%, rgba(9,11,15,0.35) 45%, rgba(9,11,15,0.45) 100%)';

/*
 * Dhura is a concept, and the page says so before anything else. The Arabic
 * name leads, set right-aligned in both locales, and there is no source
 * block because there is no shipped code to point to.
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
          src: '/portfolio/work/dhura/login.webp',
          aspect: 1440 / 900,
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
          <p className="mt-8 inline-block border border-white/20 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cinema-cream/85">
            {d('status')}
          </p>
        </div>
      </WorkCover>

      <Section className="py-20 md:py-28">
        <p className="max-w-[56rem] font-display text-[32px] leading-[1.1] text-cinema-soft md:text-[clamp(44px,4.4vw,68px)]">{d('lede')}</p>
      </Section>

      <Section className="pb-20 md:pb-28">
        <ol className="grid gap-px bg-white/10 md:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.t} className="bg-cinema-bg p-8 md:p-10">
              <span dir="ltr" className="font-mono text-[10.5px] tracking-[0.18em] text-cinema-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-6 font-display text-[30px] leading-tight text-cinema-soft md:text-[36px]">{p.t}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-cinema-text/70 md:text-[16px]">{p.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-cinema-bg2 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <p className="max-w-[40rem] text-[18px] leading-relaxed text-cinema-text/80 md:text-[21px]">{d('lineage')}</p>
            <div className="mt-8 flex flex-wrap gap-6 font-mono text-[10.5px] uppercase tracking-[0.18em]">
              {['rakez', 'hirelens'].map((slug) => (
                <Link key={slug} href={`/${locale}/work/${slug}`} className="text-cinema-cream/85 transition-colors duration-200 hover:text-cinema-soft">
                  {workTitle(slug)} <Arrow />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <StackLine label={d('stackLabel')} stack={work.stack} />
            <Label className="mt-10">{t('status')}</Label>
            <p className="mt-3 text-[14px] text-cinema-text/60">{d('status')}</p>
          </div>
        </div>
      </Section>

      <Evidence t={t} slug="dhura" />
      <NextWork locale={locale} t={t} next={work.next} />
    </>
  );
}
