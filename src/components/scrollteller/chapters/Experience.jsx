import { useTranslations } from 'next-intl';
import StoryChapter from '../engine/StoryChapter';
import ChapterLabel from '../engine/ChapterLabel';
import Reveal from '../engine/Reveal';

export default function Experience() {
  const t = useTranslations('final.experience');
  const c = useTranslations('final.chapters');
  const items = t.raw('items');

  return (
    <StoryChapter id="experience" chapter="09" label={c('09')} className="bg-cinema-bg2">
      <Reveal>
        <ChapterLabel index="09">{c('09')}</ChapterLabel>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 font-display text-[44px] leading-[1.0] text-cinema-soft md:text-[clamp(60px,6.4vw,104px)]">
          {t('heading')}
        </h2>
      </Reveal>

      <ol className="mt-14 md:mt-20">
        {items.map((it) => (
          <Reveal
            as="li"
            key={it.company + it.period}
            className="grid gap-2 border-t border-white/10 py-7 md:grid-cols-[12rem_1fr_1.3fr] md:gap-10 md:py-9"
          >
            <p dir="ltr" className="font-mono text-[11px] uppercase tracking-[0.16em] text-cinema-muted rtl:text-right">
              {it.period}
            </p>
            <div>
              <p className="font-display text-[28px] leading-[1.05] text-cinema-soft md:text-[34px]">{it.company}</p>
              <p className="mt-1.5 text-[14px] text-cinema-text/70">{it.role}</p>
            </div>
            <p className="max-w-[36rem] text-[15px] leading-relaxed text-cinema-text/65 md:pt-1.5">{it.d}</p>
          </Reveal>
        ))}
      </ol>
      <Reveal>
        <p className="border-t border-white/10 pt-7 font-mono text-[11px] leading-relaxed tracking-[0.1em] text-cinema-muted">
          {t('education')}
        </p>
      </Reveal>
    </StoryChapter>
  );
}
