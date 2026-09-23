'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import StickyScene from '../engine/StickyScene';
import { useSceneProgress } from '../engine/sceneProgress';
import StoryFrame from '../engine/StoryFrame';
import ChapterLabel from '../engine/ChapterLabel';
import { useReducedMotionPref, useStage } from '../engine/useMedia';
import { CONTACT } from '../contact';

const CITY = '/portfolio/story/transitions/transition-city-sunset.webp';
// Bottom falls to the page colour so the scene hands over to the footer without an edge.
const OVERLAY =
  'linear-gradient(90deg, rgba(9,11,15,0.9) 0%, rgba(9,11,15,0.55) 38%, rgba(9,11,15,0.2) 70%, rgba(9,11,15,0.8) 100%), linear-gradient(0deg, rgba(9,11,15,1) 0%, rgba(9,11,15,0.7) 22%, rgba(9,11,15,0) 55%)';

function Content() {
  const t = useTranslations('final.closing');
  const c = useTranslations('final.chapters');
  const links = [
    { label: t('github'), href: CONTACT.github },
    { label: t('linkedin'), href: CONTACT.linkedin },
  ];
  return (
    <div className="mr-auto max-w-[56rem]">
      <ChapterLabel index="11">{c('11')}</ChapterLabel>
      <h2 className="mt-6 font-display text-[48px] leading-[0.98] text-cinema-soft md:text-[clamp(64px,7.4vw,124px)]">
        {t('statement')}
      </h2>
      <p className="mt-6 max-w-[32rem] text-[15px] leading-relaxed text-cinema-text/70 md:text-[17px]">{t('body')}</p>
      <div className="mt-10 flex flex-col gap-5 border-t border-white/15 pt-6 md:flex-row md:items-baseline md:gap-10">
        <a
          href={`mailto:${CONTACT.email}`}
          dir="ltr"
          className="font-display text-[26px] text-cinema-soft underline decoration-white/25 underline-offset-[6px] transition-colors duration-200 hover:decoration-cinema-cream md:text-[34px]"
        >
          {t('email')}
        </a>
        <ul className="flex gap-6 text-[14px]">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cinema-text/75 transition-colors duration-200 hover:text-cinema-cream"
              >
                {l.label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Background({ scale, opacity }) {
  const t = useTranslations('final.closing');
  return (
    <motion.div className="absolute inset-0" style={opacity ? { opacity } : undefined}>
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={scale ? { scale, transformOrigin: '62% 55%' } : undefined}
      >
        <StoryFrame src={CITY} alt={t('imageAlt')} aspect={1672 / 941} focus={[64, 50]} mobileFocus={[70, 50]} bleed={0} />
      </motion.div>
      <div className="absolute inset-0" style={{ background: OVERLAY }} />
    </motion.div>
  );
}

function Stage() {
  const p = useSceneProgress();
  // The one chapter that closes in rather than settling: 1.00 → 1.035.
  const scale = useStage(p, [0, 1], [1, 1.035], 1);
  const bg = useStage(p, [0, 0.25], [0.45, 1], 1);
  const textIn = useStage(p, [0.14, 0.36], [0, 1], 1);
  const textY = useStage(p, [0.14, 0.4], [40, 0], 0);
  return (
    <>
      <Background scale={scale} opacity={bg} />
      <motion.div
        style={{ opacity: textIn, y: textY }}
        className="absolute inset-0 flex items-end px-6 pb-16 md:px-12 md:pb-[12svh] lg:px-16"
      >
        <Content />
      </motion.div>
    </>
  );
}

export default function Closing() {
  const reduced = useReducedMotionPref();
  const c = useTranslations('final.chapters');
  if (reduced) {
    return (
      <section id="closing" data-chapter="11" aria-label={c('11')} className="relative min-h-[100svh] overflow-hidden">
        <Background />
        <div className="relative flex min-h-[100svh] items-end px-6 pb-16 pt-28 md:px-12 lg:px-16">
          <Content />
        </div>
      </section>
    );
  }
  return (
    <StickyScene id="closing" chapter="11" label={c('11')} length={2}>
      <Stage />
    </StickyScene>
  );
}
