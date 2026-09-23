import { useTranslations } from 'next-intl';
import { Architecture, Label, NextWork, Section, WorkHeader } from './WorkParts';

/*
 * CareerGuide: the scoring rule is the picture. The weights are the rules
 * engine's documented configuration, not a measured outcome.
 */
export default function CareerGuideWork({ locale, work }) {
  const t = useTranslations('final.work');
  const c = useTranslations('final.work.careerguide');
  const weights = c.raw('weightList');
  const ai = c.raw('ai');

  return (
    <>
      <WorkHeader locale={locale} t={t} kicker={c('kicker')} title={c('title')} lede={c('lede')} />

      <Section className="py-16 md:py-24">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <Label>{c('weightsTitle')}</Label>
          <p className="max-w-[32rem] text-[15px] text-cinema-text/65">{c('weights')}</p>
        </div>

        {/* One bar, four proportional segments; physical LTR so widths read the same in both locales. */}
        <div dir="ltr" className="mt-10 flex w-full gap-px bg-white/10" role="img" aria-label={weights.map((w) => `${w.k} ${w.v}`).join(', ')}>
          {weights.map((w, i) => (
            <div
              key={w.k}
              className={`flex min-h-[10rem] min-w-0 flex-col justify-between p-3 md:min-h-[14rem] md:p-5 ${
                i === 0 ? 'bg-cinema-cream text-cinema-bg' : 'bg-cinema-bg text-cinema-soft'
              }`}
              style={{ flexGrow: w.v, flexBasis: 0 }}
            >
              <span className="font-display text-[34px] leading-none md:text-[72px]">{w.v}</span>
              <span className={`hidden font-mono text-[10px] uppercase tracking-[0.14em] md:block ${i === 0 ? 'text-cinema-bg/70' : 'text-cinema-muted'}`}>
                {w.k}
              </span>
            </div>
          ))}
        </div>
        {/* Labels move under the bar on small screens, where the thin segments cannot hold them. */}
        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 md:hidden">
          {weights.map((w) => (
            <li key={w.k} className="flex items-baseline gap-3 text-[13.5px] text-cinema-text/75">
              <span dir="ltr" className="font-mono text-[11px] text-cinema-cream">{w.v}</span>
              {w.k}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-[44rem] text-[15px] leading-relaxed text-cinema-text/65">{c('weightsNote')}</p>
      </Section>

      <Section className="py-16 md:py-24">
        <div className="grid gap-12 border-t border-white/15 pt-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Label>{c('immutableTitle')}</Label>
            <p className="mt-6 font-display text-[30px] leading-[1.12] text-cinema-soft md:text-[42px]">{c('immutable')}</p>
          </div>
          <div>
            <Label>{c('aiTitle')}</Label>
            <ul className="mt-6">
              {ai.map((a) => (
                <li key={a} className="border-b border-white/10 py-5 text-[16px] leading-relaxed text-cinema-text/80 first:pt-0">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-cinema-bg2 py-20 md:py-28">
        <Label>{c('checksTitle')}</Label>
        <p className="mt-6 max-w-[56rem] text-[18px] leading-relaxed text-cinema-text/80 md:text-[21px]">{c('checks')}</p>
      </Section>

      <Architecture t={t} text={c('architecture')} stack={work.stack} url={work.githubUrl} />
      <NextWork locale={locale} t={t} next={work.next} />
    </>
  );
}
