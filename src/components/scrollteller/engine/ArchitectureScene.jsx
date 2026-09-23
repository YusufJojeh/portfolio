'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent } from 'framer-motion';
import StickyScene from './StickyScene';
import { useSceneProgress } from './sceneProgress';
import ChapterLabel from './ChapterLabel';
import { useStage } from './useMedia';
import ReducedMotionFallback from './ReducedMotionFallback';
import { EASE } from './motion';

/*
 * One business rule followed down through the layers of a system. Scroll
 * moves the focus from layer to layer; the stack itself never moves, only
 * the light on it does.
 */

function Intro({ chapter, chapterName, heading, intro }) {
  return (
    <div>
      <ChapterLabel index={chapter}>{chapterName}</ChapterLabel>
      <h2 className="mt-5 max-w-[34rem] font-display text-[36px] leading-[1.02] text-cinema-soft md:text-[clamp(44px,4.2vw,62px)]">
        {heading}
      </h2>
      <p className="mt-4 max-w-[28rem] text-[14.5px] leading-relaxed text-cinema-text/65 md:mt-6 md:text-[16px]">
        {intro}
      </p>
    </div>
  );
}

function LiveStage({ chapter, chapterName, heading, intro, layers }) {
  const p = useSceneProgress();
  const [active, setActive] = useState(0);
  const n = layers.length;
  // Layers take turns across 0.12–0.9; the ends give the scene room to arrive and leave.
  useMotionValueEvent(p, 'change', (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(((v - 0.12) / 0.78) * n)));
    setActive(i);
  });
  const fill = useStage(p, [0.12, 0.9], [0, 1], 1);
  const enter = useStage(p, [0, 0.1], [0, 1], 1);
  const enterY = useStage(p, [0, 0.12], [28, 0], 0);
  const out = useStage(p, [0.92, 1], [1, 0], 1);

  return (
    <motion.div
      style={{ opacity: out }}
      className="absolute inset-0 grid content-center gap-8 px-6 pb-8 pt-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-center md:gap-16 md:px-12 lg:px-16"
    >
      <motion.div style={{ opacity: enter, y: enterY }}>
        <Intro chapter={chapter} chapterName={chapterName} heading={heading} intro={intro} />
      </motion.div>

      <motion.div style={{ opacity: enter }} className="relative ps-6 md:ps-8">
        {/* The path the rule travels, filled by scroll. */}
        <span aria-hidden="true" className="absolute inset-y-1 start-0 w-px bg-white/10" />
        <motion.span
          aria-hidden="true"
          className="absolute start-0 top-1 w-px origin-top bg-cinema-cream/70"
          style={{ scaleY: fill, bottom: 4 }}
        />
        <ol>
          {layers.map((l, i) => {
            const on = i === active;
            return (
              <li key={l.t} aria-current={on ? 'step' : undefined} className="border-t border-white/[0.07] first:border-t-0">
                <div className="flex items-baseline gap-4 py-2.5 md:py-3.5">
                  <span dir="ltr" className={`font-mono text-[10.5px] tracking-[0.2em] transition-colors duration-500 ${on ? 'text-cinema-cream' : 'text-cinema-steel'}`}>
                    0{i + 1}
                  </span>
                  <span
                    className={`font-display text-[24px] leading-none transition-colors duration-500 ease-cinematic md:text-[30px] ${
                      on ? 'text-cinema-soft' : i < active ? 'text-cinema-muted' : 'text-cinema-steel'
                    }`}
                  >
                    {l.t}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="relative mt-4 min-h-[5.5rem] border-t border-white/10 pt-4 md:mt-6 md:min-h-[6rem] md:pt-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="max-w-[32rem] text-[14.5px] leading-relaxed text-cinema-text/75 md:text-[16px]"
              aria-live="polite"
            >
              {layers[active].d}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StillStage({ id, chapter, chapterName, heading, intro, layers }) {
  return (
    <section id={id} data-chapter={chapter} aria-label={chapterName} className="relative px-6 py-28 md:px-12 md:py-36 lg:px-16">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <Intro chapter={chapter} chapterName={chapterName} heading={heading} intro={intro} />
        <ol className="border-s border-white/10 ps-6 md:ps-8">
          {layers.map((l, i) => (
            <li key={l.t} className="border-t border-white/[0.07] py-4 first:border-t-0">
              <p className="flex items-baseline gap-4">
                <span dir="ltr" className="font-mono text-[10.5px] tracking-[0.2em] text-cinema-steel">0{i + 1}</span>
                <span className="font-display text-[26px] leading-none text-cinema-soft">{l.t}</span>
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-cinema-text/70">{l.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function ArchitectureScene({ id, chapter, chapterName, heading, intro, layers, length = 3.4 }) {
  const props = { id, chapter, chapterName, heading, intro, layers };
  return (
    <ReducedMotionFallback fallback={<StillStage {...props} />}>
      <StickyScene id={id} chapter={chapter} label={chapterName} length={length}>
        <LiveStage {...props} />
      </StickyScene>
    </ReducedMotionFallback>
  );
}
