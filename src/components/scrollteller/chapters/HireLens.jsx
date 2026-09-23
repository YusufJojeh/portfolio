import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import StoryChapter from '../engine/StoryChapter';
import ChapterLabel from '../engine/ChapterLabel';
import Reveal from '../engine/Reveal';
import ProjectCard from './ProjectCard';

// Real screens from the repo's own captures, on demo data.
const HIRELENS_SCREENS = ['dashboard', 'evaluation', 'human-review', 'interview-kit', 'rubric', 'audit'];
/* A typographic ledger: what the model may do, set against what only people decide. */
export default function HireLens() {
  const t = useTranslations('final.hirelens');
  const c = useTranslations('final.chapters');
  const locale = useLocale();
  const ai = t.raw('ai');
  const human = t.raw('human');

  return (
    <StoryChapter id="hirelens" chapter="04" label={c('04')}>
      <Reveal>
        <ChapterLabel index="04">{c('04')}</ChapterLabel>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-muted">
          <span dir="ltr" className="text-cinema-cream/80">{t('title')}</span>
          <span aria-hidden="true" className="mx-2 text-cinema-steel">·</span>
          {t('kicker')}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 max-w-[16ch] font-display text-[42px] leading-[1.0] text-cinema-soft md:text-[clamp(56px,6.4vw,104px)]">
          {t('heading')}
        </h2>
      </Reveal>

      <div className="mt-16 grid border-t border-white/10 md:mt-24 md:grid-cols-[1.1fr_1fr]">
        <div className="py-8 md:border-e md:border-white/10 md:py-12 md:pe-12">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cinema-muted">{t('aiTitle')}</p>
          </Reveal>
          <ol className="mt-6">
            {ai.map((line, i) => (
              <Reveal as="li" key={line} delay={0.06 * i} className="flex gap-5 border-t border-white/[0.07] py-4 first:border-t-0">
                <span dir="ltr" className="pt-1 font-mono text-[10.5px] tracking-[0.2em] text-cinema-steel">0{i + 1}</span>
                <span className="text-[16px] leading-relaxed text-cinema-text/80 md:text-[18px]">{line}</span>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="border-t border-white/10 py-8 md:border-t-0 md:py-12 md:ps-12">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cinema-muted">{t('humanTitle')}</p>
          </Reveal>
          <div className="mt-6">
            {human.map((line, i) => (
              <Reveal key={line} delay={0.1 + 0.1 * i}>
                <p className="font-display text-[56px] italic leading-[1.02] text-cinema-soft md:text-[clamp(64px,6vw,96px)]">{line}.</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
        <Reveal>
          <p className="max-w-[40rem] font-mono text-[11px] leading-relaxed tracking-[0.08em] text-cinema-muted">{t('guard')}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href={`/${locale}/work/hirelens`}
            className="inline-flex items-center gap-2 rounded-[3px] border border-white/25 px-5 py-3 text-[13.5px] font-medium text-cinema-text transition-colors duration-200 hover:border-white/60"
          >
            {t('cta')}
            <span aria-hidden="true" className="rtl:-scale-x-100">→</span>
          </Link>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-20 border-t border-white/15 md:mt-28">
          <ProjectCard
            index={t('title')}
            title={t('screensTitle')}
            titleDir="auto"
            description={t('screensIntro')}
            note={t('screensNote')}
            screens={HIRELENS_SCREENS.map((f) => ({ src: `/portfolio/work/hirelens/app/${f}.webp`, caption: t(`screens.${f}`) }))}
          />
        </div>
      </Reveal>
    </StoryChapter>
  );
}
