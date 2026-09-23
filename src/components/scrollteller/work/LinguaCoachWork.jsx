import { useTranslations } from 'next-intl';
import { Architecture, BackLink, Label, NextWork, Section, Evidence } from './WorkParts';

/* LinguaCoach: the CEFR ladder is the cover; the runtime rules follow as a spec sheet. */
export default function LinguaCoachWork({ locale, work }) {
  const t = useTranslations('final.work');
  const l = useTranslations('final.work.linguacoach');
  const levels = l.raw('levels');
  const runtime = l.raw('runtime');

  return (
    <>
      <Section className="bg-cinema-bg2 pb-0 pt-32 md:pt-44">
        <BackLink locale={locale} label={t('back')} />
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-muted">{l('kicker')}</p>
            <h1 dir="ltr" className="mt-5 font-display text-[60px] leading-[0.92] text-cinema-soft md:text-[clamp(88px,9vw,150px)] rtl:text-right">
              {l('title')}
            </h1>
          </div>
          <p className="max-w-[34rem] self-end text-[17px] leading-relaxed text-cinema-text/75 md:text-[20px]">{l('lede')}</p>
        </div>

        {/* The ladder rises across the full width and sits on the section edge. */}
        <div role="img" aria-label={levels.map((v) => `${v.l} ${v.n}`).join(', ')} className="mt-16 flex items-end gap-2 md:mt-24 md:gap-4" dir="ltr">
          {levels.map((v, i) => (
            <div
              key={v.l}
              className="min-w-0 flex-1 border-t border-white/25 bg-white/[0.025] pt-3 md:pt-5"
              style={{ height: `${6 + i * 2.6}rem` }}
            >
              <span className="block font-display text-[28px] leading-none text-cinema-soft md:text-[56px]">{v.l}</span>
              <span className="mt-2 block truncate font-mono text-[8.5px] uppercase tracking-[0.14em] text-cinema-muted md:text-[10px]">
                {v.n}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-20">
          <Label>{l('ladderTitle')}</Label>
          <p className="max-w-[48rem] font-display text-[28px] leading-[1.15] text-cinema-soft md:text-[40px]">{l('ladder')}</p>
        </div>
      </Section>

      <Section className="border-t border-white/10 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-20">
          <Label>{l('runtimeTitle')}</Label>
          <dl className="border-t border-white/15">
            {runtime.map((r, i) => (
              <div key={r} className="grid grid-cols-[3rem_minmax(0,1fr)] border-b border-white/10 py-6 md:grid-cols-[5rem_minmax(0,1fr)]">
                <dt dir="ltr" className="font-mono text-[10.5px] tracking-[0.18em] text-cinema-muted">
                  R{i + 1}
                </dt>
                <dd className="text-[16px] leading-relaxed text-cinema-text/85 md:text-[18px]">{r}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section className="py-20 md:py-28">
        <div className="grid gap-px bg-white/10 md:grid-cols-2">
          <div className="bg-cinema-bg p-8 md:p-12">
            <Label>{l('durableTitle')}</Label>
            <p className="mt-6 text-[17px] leading-relaxed text-cinema-text/80 md:text-[19px]">{l('durable')}</p>
          </div>
          <div className="flex items-end bg-cinema-bg p-8 md:p-12">
            <p className="font-display text-[30px] leading-[1.1] text-cinema-soft md:text-[40px]">{l('realtime')}</p>
          </div>
        </div>
      </Section>

      <Evidence t={t} slug="linguacoach" />
      <Architecture t={t} text={l('architecture')} stack={work.stack} url={work.githubUrl} />
      <NextWork locale={locale} t={t} next={work.next} />
    </>
  );
}
