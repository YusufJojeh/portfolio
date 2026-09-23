import { useTranslations } from 'next-intl';
import { CONTACT } from '../contact';
import { BackLink, NextWork, Section } from './WorkParts';

/* ALGOAG has no documented evidence yet, so the page is short on purpose. */
export default function AlgoagWork({ locale, work }) {
  const t = useTranslations('final.work');
  const a = useTranslations('final.work.algoag');

  return (
    <>
      <Section className="flex min-h-[86svh] flex-col justify-end pb-20 pt-32 md:pb-28">
        <BackLink locale={locale} label={t('back')} />
        <p className="mt-auto pt-20 font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-muted">{a('kicker')}</p>
        <h1 dir="ltr" className="mt-5 font-display text-[72px] leading-[0.9] text-cinema-soft md:text-[clamp(120px,14vw,220px)] rtl:text-right">
          {a('title')}
        </h1>
        <div className="mt-10 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-[14rem_minmax(0,1fr)]">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-cinema-cream/80">{a('status')}</p>
          <div>
            <p className="max-w-[40rem] text-[17px] leading-relaxed text-cinema-text/75 md:text-[19px]">{a('body')}</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-8 inline-flex items-center gap-2 rounded-[3px] border border-white/25 px-5 py-3 text-[13.5px] font-medium text-cinema-text transition-colors duration-200 hover:border-white/60"
            >
              {a('cta')}
            </a>
          </div>
        </div>
      </Section>
      <NextWork locale={locale} t={t} next={work.next} />
    </>
  );
}
