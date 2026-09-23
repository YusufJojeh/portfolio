import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import StoryChapter from '../engine/StoryChapter';
import ChapterLabel from '../engine/ChapterLabel';
import Reveal from '../engine/Reveal';

/* The CEFR ladder as the chapter's image: six steps, set in type. */
export default function LinguaCoach() {
  const t = useTranslations('final.linguacoach');
  const w = useTranslations('final.work.linguacoach');
  const c = useTranslations('final.chapters');
  const locale = useLocale();
  const levels = w.raw('levels');
  const points = t.raw('points');

  return (
    <StoryChapter id="linguacoach" chapter="05" label={c('05')} className="bg-cinema-bg2">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
        <div>
          <Reveal>
            <ChapterLabel index="05">{c('05')}</ChapterLabel>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-muted">
              <span dir="ltr" className="text-cinema-cream/80">{t('title')}</span>
              <span aria-hidden="true" className="mx-2 text-cinema-steel">·</span>
              {t('kicker')}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-[38px] leading-[1.02] text-cinema-soft md:text-[clamp(48px,4.6vw,72px)]">
              {t('heading')}
            </h2>
          </Reveal>
          <ul className="mt-10">
            {points.map((pt, i) => (
              <Reveal as="li" key={pt} delay={0.05 * i} className="border-t border-white/[0.08] py-4 text-[15px] leading-relaxed text-cinema-text/75 md:text-[16px]">
                {pt}
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <Link
              href={`/${locale}/work/linguacoach`}
              className="mt-8 inline-flex items-center gap-2 rounded-[3px] border border-white/25 px-5 py-3 text-[13.5px] font-medium text-cinema-text transition-colors duration-200 hover:border-white/60"
            >
              {t('cta')}
              <span aria-hidden="true" className="rtl:-scale-x-100">→</span>
            </Link>
          </Reveal>
        </div>

        <div dir="ltr" role="img" aria-label={w('ladderTitle')} className="flex items-end gap-2 self-end border-b border-white/10 md:gap-3">
          {levels.map((lv, i) => (
            <Reveal key={lv.l} delay={0.07 * i} y={24} className="min-w-0 flex-1">
              <div
                className="flex flex-col border-t border-white/20 pt-3"
                style={{ height: `${7 + i * 3}rem` }}
              >
                <span className={`font-display leading-none ${i === 5 ? 'text-cinema-soft' : 'text-cinema-text/80'} text-[34px] md:text-[clamp(40px,4.4vw,72px)]`}>
                  {lv.l}
                </span>
                <span className="mt-2 truncate font-mono text-[9px] uppercase tracking-[0.14em] text-cinema-muted md:text-[10px]">
                  {lv.n}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </StoryChapter>
  );
}
