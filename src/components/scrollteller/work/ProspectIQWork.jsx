import { useTranslations } from 'next-intl';
import WorkCover from './WorkCover';
import { Architecture, BackLink, Label, NextWork, Section, Evidence } from './WorkParts';

const OVERLAY =
  'linear-gradient(0deg, rgba(9,11,15,1) 0%, rgba(9,11,15,0.82) 38%, rgba(9,11,15,0.35) 75%, rgba(9,11,15,0.6) 100%), rgba(9,11,15,0.25)';

/* ProspectIQ: the pipeline reads left to right; the runtime modes are a real table. */
export default function ProspectIQWork({ locale, work }) {
  const t = useTranslations('final.work');
  const p = useTranslations('final.work.prospectiq');
  const home = useTranslations('final.prospectiq');
  const pipeline = p.raw('pipeline');
  const modes = p.raw('modeList');

  return (
    <>
      <WorkCover
        overlay={OVERLAY}
        className="min-h-[84svh]"
        image={{
          src: '/portfolio/work/prospectiq/hero-dark.webp',
          aspect: 1440 / 690,
          alt: home('imageAlt'),
          focus: [50, 45],
          mobileFocus: [12, 45],
        }}
      >
        <BackLink locale={locale} label={t('back')} />
        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-muted">{p('kicker')}</p>
            <h1 dir="ltr" className="mt-5 font-display text-[64px] leading-[0.92] text-cinema-soft md:text-[clamp(96px,10vw,168px)] rtl:text-right">
              {p('title')}
            </h1>
            <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cinema-muted">{p('alias')}</p>
          </div>
          <p className="max-w-[34rem] text-[17px] leading-relaxed text-cinema-text/80 md:text-[19px]">{p('lede')}</p>
        </div>
      </WorkCover>

      <Section className="py-20 md:py-28">
        <Label>{p('pipelineTitle')}</Label>
        <ol className="mt-10 grid gap-10 md:grid-cols-4 md:gap-0">
          {pipeline.map((s, i) => (
            <li key={s.t} className="relative border-t border-white/20 pt-6 md:pe-8">
              <span dir="ltr" className="font-mono text-[10.5px] tracking-[0.18em] text-cinema-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-[34px] leading-none text-cinema-soft md:text-[40px]">{s.t}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-cinema-text/70">{s.d}</p>
              {i < pipeline.length - 1 && (
                <span aria-hidden="true" className="absolute -top-[9px] end-0 hidden text-[13px] text-cinema-steel md:block rtl:-scale-x-100">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-cinema-bg2 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <Label>{p('modesTitle')}</Label>
            <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-cinema-text/80">{p('modes')}</p>
          </div>
          <table className="w-full border-collapse text-start">
            <tbody>
              {modes.map((m) => (
                <tr key={m.m} className="border-b border-white/10 first:border-t first:border-white/20">
                  <th scope="row" dir="ltr" className="w-28 py-6 text-start align-baseline font-mono text-[13px] font-normal tracking-[0.1em] text-cinema-cream md:w-40 rtl:text-right">
                    {m.m}
                  </th>
                  <td className="py-6 align-baseline text-[16px] text-cinema-text/80 md:text-[18px]">{m.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section className="py-20 md:py-28">
        <div className="grid gap-6 border-s border-white/15 ps-6 md:max-w-[48rem] md:ps-10">
          <Label>{p('ciTitle')}</Label>
          <p className="font-display text-[28px] leading-[1.15] text-cinema-soft md:text-[40px]">{p('ci')}</p>
        </div>
      </Section>

      <Evidence t={t} slug="prospectiq" />
      <Architecture t={t} text={p('architecture')} stack={work.stack} url={work.githubUrl} />
      <NextWork locale={locale} t={t} next={work.next} />
    </>
  );
}
