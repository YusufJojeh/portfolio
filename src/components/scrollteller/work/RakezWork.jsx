import { useTranslations } from 'next-intl';
import WorkCover from './WorkCover';
import { Architecture, BackLink, Label, NextWork, Section, Evidence } from './WorkParts';

const OVERLAY =
  'linear-gradient(90deg, rgba(9,11,15,0.92) 0%, rgba(9,11,15,0.6) 42%, rgba(9,11,15,0.35) 100%), linear-gradient(0deg, rgba(9,11,15,1) 0%, rgba(9,11,15,0.4) 40%, rgba(9,11,15,0.3) 100%)';

/* Rakez: a cinematic arrival, then the system laid out layer by layer. */
export default function RakezWork({ locale, work }) {
  const t = useTranslations('final.work');
  const r = useTranslations('final.work.rakez');
  const facts = r.raw('facts');
  const layers = r.raw('layers');
  const hard = r.raw('hard');

  return (
    <>
      <WorkCover
        overlay={OVERLAY}
        image={{
          // Real capture of the live staff login (its brand panel), not generated art.
          src: '/portfolio/work/rakez/app/marketing-performance-dashboard.webp',
          alt: t('evidence.app.rakez.marketing-performance-dashboard'),
          aspect: 1600 / 1000,
          mobileSrc: '/portfolio/work/rakez/mobile.webp',
          mobileAspect: 780 / 800,
          focus: [50, 42],
          mobileFocus: [50, 42],
        }}
      >
        <BackLink locale={locale} label={t('back')} />
        <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-muted">{r('kicker')}</p>
        <h1 dir="ltr" className="mt-5 font-display text-[68px] leading-[0.92] text-cinema-soft md:text-[clamp(104px,12vw,192px)] rtl:text-right">
          {r('title')}
        </h1>
        <p className="mt-8 max-w-[36rem] text-[17px] leading-relaxed text-cinema-text/80 md:text-[20px]">{r('lede')}</p>
      </WorkCover>

      <Section className="py-10">
        <dl className="grid gap-8 border-y border-white/10 py-10 md:grid-cols-3">
          {facts.map((f) => (
            <div key={f.k}>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-cinema-muted">{f.k}</dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-cinema-text/85">{f.v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section className="py-20 md:py-32">
        <Label>{r('problemTitle')}</Label>
        <p className="mt-8 max-w-[62rem] font-display text-[34px] leading-[1.08] text-cinema-soft md:text-[clamp(44px,4.6vw,72px)]">
          {r('problem')}
        </p>
      </Section>

      <Section className="py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Label>{r('layersTitle')}</Label>
          </div>
          <ol className="border-t border-white/15">
            {layers.map((l, i) => (
              <li
                key={l.t}
                className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 border-b border-white/10 py-8 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1.3fr)] md:gap-x-10 md:py-10"
              >
                <span dir="ltr" className="font-display text-[34px] leading-none text-cinema-steel md:text-[48px]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-[26px] leading-tight text-cinema-soft md:text-[32px]">{l.t}</h3>
                <p className="col-start-2 mt-3 text-[15px] leading-relaxed text-cinema-text/70 md:col-start-3 md:mt-1 md:text-[16px]">
                  {l.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="bg-cinema-bg2 py-20 md:py-32">
        <Label>{r('hardTitle')}</Label>
        <ul className="mt-12 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {hard.map((h, i) => (
            <li key={h} className="border-s border-white/15 ps-6">
              <span dir="ltr" className="font-mono text-[10.5px] tracking-[0.2em] text-cinema-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-3 text-[18px] leading-relaxed text-cinema-text/85 md:text-[21px]">{h}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Evidence t={t} slug="rakez" />
      <Architecture t={t} text={r('architecture')} stack={work.stack} url={work.githubUrl} />
      <NextWork locale={locale} t={t} next={work.next} />
    </>
  );
}
