import { useTranslations } from 'next-intl';
import { Architecture, Label, NextWork, Section, WorkHeader, Evidence } from './WorkParts';

/* HireLens: no imagery. The page is a ledger of what the AI may do and what only people do. */
export default function HireLensWork({ locale, work }) {
  const t = useTranslations('final.work');
  const h = useTranslations('final.work.hirelens');
  const ai = h.raw('ai');
  const human = h.raw('human');
  const flow = h.raw('flow');
  const guard = h.raw('guard');

  return (
    <>
      <WorkHeader locale={locale} t={t} kicker={h('kicker')} title={h('title')} lede={h('lede')} />

      <Section className="pb-16">
        <p className="max-w-[52rem] border-t border-white/10 pt-10 text-[17px] leading-relaxed text-cinema-text/70 md:text-[19px]">
          {h('problem')}
        </p>
      </Section>

      <Section className="py-10">
        <div className="grid border-y border-white/15 lg:grid-cols-2">
          <div className="py-12 lg:border-e lg:border-white/15 lg:pe-14 lg:py-16">
            <Label>{h('aiTitle')}</Label>
            <ol className="mt-8">
              {ai.map((item, i) => (
                <li key={item} className="flex gap-5 border-b border-white/10 py-5 last:border-b-0">
                  <span dir="ltr" className="pt-1 font-mono text-[10.5px] tracking-[0.18em] text-cinema-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[16px] leading-relaxed text-cinema-text/85 md:text-[18px]">{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="border-t border-white/15 py-12 lg:border-t-0 lg:ps-14 lg:py-16">
            <Label>{h('humanTitle')}</Label>
            <p className="mt-8 font-display text-[56px] italic leading-[0.98] text-cinema-soft md:text-[clamp(72px,7vw,112px)]">
              {human.map((line) => (
                <span key={line} className="block">
                  {line}.
                </span>
              ))}
            </p>
            <p className="mt-8 max-w-[30rem] text-[15px] leading-relaxed text-cinema-text/65">{h('humanNote')}</p>
          </div>
        </div>
      </Section>

      <Section className="py-20 md:py-28">
        <Label>{h('flowTitle')}</Label>
        <ol className="mt-10 grid gap-px bg-white/10 md:grid-cols-5">
          {flow.map((step, i) => {
            const last = i === flow.length - 1;
            return (
              <li
                key={step}
                className={`flex min-h-[9rem] flex-col justify-between gap-6 p-5 md:min-h-[13rem] ${
                  last ? 'bg-cinema-cream text-cinema-bg' : 'bg-cinema-bg text-cinema-text'
                }`}
              >
                <span dir="ltr" className={`font-mono text-[10.5px] tracking-[0.18em] ${last ? 'text-cinema-bg/60' : 'text-cinema-muted'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`font-display text-[24px] leading-tight md:text-[26px] ${last ? '' : 'text-cinema-soft'}`}>{step}</span>
              </li>
            );
          })}
        </ol>
        <p className="mt-8 max-w-[44rem] text-[15px] leading-relaxed text-cinema-text/65">{h('versions')}</p>
      </Section>

      <Section className="bg-cinema-bg2 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-20">
          <div>
            <Label>{h('guardTitle')}</Label>
            <p className="mt-6 max-w-[20rem] text-[15px] leading-relaxed text-cinema-text/60">{h('bilingual')}</p>
          </div>
          <ul className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {guard.map((g) => (
              <li key={g} className="border-t border-white/15 pt-5 text-[16px] leading-relaxed text-cinema-text/80">
                {g}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Evidence t={t} slug="hirelens" />
      <Architecture t={t} text={h('architecture')} stack={work.stack} url={work.githubUrl} />
      <NextWork locale={locale} t={t} next={work.next} />
    </>
  );
}
