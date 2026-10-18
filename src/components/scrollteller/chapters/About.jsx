import { useTranslations } from 'next-intl';
import StoryChapter from '../engine/StoryChapter';
import ChapterLabel from '../engine/ChapterLabel';
import Reveal from '../engine/Reveal';

export default function About() {
  const t = useTranslations('final.about');
  const c = useTranslations('final.chapters');
  const body = t.raw('body');
  const focus = t.raw('focus');

  return (
    <StoryChapter id="about" chapter="11" label={c('11')}>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <ChapterLabel index="11">{c('11')}</ChapterLabel>
          <h2 className="mt-6 font-display text-[40px] leading-[1.02] text-cinema-soft md:text-[clamp(52px,5vw,80px)]">
            {t('heading')}
          </h2>
        </Reveal>
        <div>
          {body.map((p, i) => (
            <Reveal key={p} delay={0.06 * i}>
              <p className="mb-6 max-w-[38rem] text-[16px] leading-relaxed text-cinema-text/75 md:text-[18px]">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.16}>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-cinema-muted">
              {focus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </StoryChapter>
  );
}
