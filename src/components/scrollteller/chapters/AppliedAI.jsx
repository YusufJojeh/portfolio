import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import StoryChapter from '../engine/StoryChapter';
import ChapterLabel from '../engine/ChapterLabel';
import Reveal from '../engine/Reveal';
import { workTitle } from '../projects';

export default function AppliedAI() {
  const t = useTranslations('final.ai');
  const c = useTranslations('final.chapters');
  const locale = useLocale();
  const principles = t.raw('principles');

  return (
    <StoryChapter id="applied-ai" chapter="08" label={c('08')}>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <ChapterLabel index="08">{c('08')}</ChapterLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-[40px] leading-[1.02] text-cinema-soft md:text-[clamp(52px,5vw,80px)]">
              {t('heading')}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-[28rem] text-[15px] leading-relaxed text-cinema-text/65 md:text-[16px]">{t('intro')}</p>
          </Reveal>
        </div>
        <ol>
          {principles.map((pr, i) => (
            <Reveal as="li" key={pr.t} className="border-t border-white/10 py-8 md:py-10">
              <div className="flex gap-5">
                <span dir="ltr" className="pt-2 font-mono text-[10.5px] tracking-[0.2em] text-cinema-steel">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-[28px] leading-[1.05] text-cinema-soft md:text-[36px]">{pr.t}</h3>
                  <p className="mt-3 max-w-[36rem] text-[15px] leading-relaxed text-cinema-text/70 md:text-[16px]">{pr.d}</p>
                  <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cinema-muted">
                    {t('seenIn')}
                    {pr.refs.map((r, j) => (
                      <span key={r}>
                        <span aria-hidden="true" className="mx-2 text-cinema-steel">
                          {j === 0 ? '—' : '·'}
                        </span>
                        <Link
                          href={`/${locale}/work/${r}`}
                          dir="ltr"
                          className="normal-case tracking-[0.06em] text-cinema-cream/85 underline decoration-white/20 underline-offset-4 transition-colors duration-200 hover:decoration-cinema-cream"
                        >
                          {workTitle(r)}
                        </Link>
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </StoryChapter>
  );
}
