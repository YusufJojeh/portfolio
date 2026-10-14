'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useStage } from '../../engine/useMedia';
import { EASE } from '../../engine/motion';
import { Frame } from './Screen';

/*
 * The business workflow, read top to bottom. A hairline draws down the steps
 * with the scroll, and a step lights up as it crosses the middle of the
 * viewport. On wide screens the matching capture holds still beside the
 * steps and crossfades as the active step changes; a step with no capture of
 * its own keeps the last one. On phones each capture sits under its step.
 * Reduced motion: the line is drawn in full and only the crossfade remains.
 */

export default function FlowTimeline({ steps, stepLabel }) {
  const list = useRef(null);
  const items = useRef([]);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 62%', 'end 50%'] });
  const line = useStage(scrollYProgress, [0, 1], [0, 1], 1);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index));
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // The capture shown for a step: its own, or the nearest earlier one.
  const shotFor = (i) => {
    for (let k = i; k >= 0; k--) if (steps[k].file) return k;
    return 0;
  };
  const shown = shotFor(active);

  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
      <ol ref={list} className="relative md:col-span-6 lg:col-span-5">
        {/* Track and drawn line. They sit on the inline-start edge, through the step markers. */}
        <span aria-hidden="true" className="absolute bottom-3 start-[5px] top-3 w-px bg-white/10" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: line }}
          className="absolute bottom-3 start-[5px] top-3 w-px origin-top bg-cinema-cream/70"
        />
        {steps.map((s, i) => {
          const lit = i <= active;
          return (
            <li
              key={s.t}
              ref={(el) => (items.current[i] = el)}
              data-index={i}
              aria-current={i === active ? 'step' : undefined}
              className="relative ps-10 pb-14 last:pb-0 md:pb-24"
            >
              <span
                aria-hidden="true"
                className={`absolute start-0 top-[0.4rem] h-[11px] w-[11px] rounded-full border transition-[background-color,border-color,box-shadow] duration-300 ${
                  lit ? 'border-cinema-cream bg-cinema-cream' : 'border-white/30 bg-cinema-bg'
                } ${i === active ? 'shadow-[0_0_0_5px_rgba(239,238,233,0.12)]' : ''}`}
              />
              <p dir="ltr" className="font-mono text-[11px] tracking-[0.2em] text-cinema-muted rtl:text-right">
                <span className="sr-only">{stepLabel} </span>
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3
                className={`mt-2 font-display text-[28px] leading-[1.05] transition-colors duration-300 md:text-[34px] ${
                  lit ? 'text-cinema-soft' : 'text-cinema-text/45'
                }`}
              >
                {s.t}
              </h3>
              <p className={`mt-3 max-w-[30rem] text-[15px] leading-relaxed transition-colors duration-300 md:text-[16px] ${lit ? 'text-cinema-text/75' : 'text-cinema-text/50'}`}>
                {s.d}
              </p>
              {s.tags && (
                <ul dir="ltr" className="mt-4 flex flex-wrap gap-2 rtl:justify-end">
                  {s.tags.map((tag) => (
                    <li key={tag} className="border border-white/15 px-2.5 py-1 font-mono text-[11.5px] text-cinema-text/70">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
              {s.file && (
                <div className="mt-6 md:hidden">
                  <Frame file={s.file} alt={s.alt} sizes="92vw" />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="hidden md:col-span-6 md:block lg:col-span-7">
        <div className="sticky top-[max(7rem,calc(50vh-18vw))]">
          <div className="relative" style={{ aspectRatio: 1.6 }}>
            {steps.map((s, i) =>
              s.file ? (
                <motion.div
                  key={s.t}
                  aria-hidden={i !== shown}
                  initial={false}
                  animate={{ opacity: i === shown ? 1 : 0, y: i === shown ? 0 : i < shown ? -10 : 10 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Frame file={s.file} alt={i === shown ? s.alt : ''} sizes="(min-width: 1024px) 52vw, 46vw" />
                </motion.div>
              ) : null,
            )}
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cinema-muted" aria-hidden="true">
            <span dir="ltr">{String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}</span>
            <span className="mx-2 text-cinema-steel">·</span>
            {steps[shown].alt}
          </p>
        </div>
      </div>
    </div>
  );
}
