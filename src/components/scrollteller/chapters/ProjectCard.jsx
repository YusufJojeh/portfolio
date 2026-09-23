'use client';

import { useCallback, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/*
 * A wide project card: the copy and a screen list on one side, a large stage
 * on the other. Hovering or focusing a screen name swaps the stage with a
 * short crossfade; the active screen drifts slowly so it reads as footage,
 * not a thumbnail. Even cards mirror the layout so the list has a rhythm.
 */

const EASE = [0.22, 1, 0.36, 1];

export default function ProjectCard({ index, title, description, note, meta, screens, flip = false }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const stageId = useId();
  const tabs = useRef([]);
  const count = screens.length;
  const shot = screens[active];

  const go = useCallback(
    (i, focus = false) => {
      const next = (i + count) % count;
      setActive(next);
      if (focus) tabs.current[next]?.focus();
    },
    [count],
  );

  const onKey = (e) => {
    const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
    const fwd = rtl ? 'ArrowLeft' : 'ArrowRight';
    const back = rtl ? 'ArrowRight' : 'ArrowLeft';
    if (e.key === fwd || e.key === 'ArrowDown') go(active + 1, true);
    else if (e.key === back || e.key === 'ArrowUp') go(active - 1, true);
    else if (e.key === 'Home') go(0, true);
    else if (e.key === 'End') go(count - 1, true);
    else return;
    e.preventDefault();
  };

  return (
    <article className="group/card grid gap-6 border-b border-white/10 py-12 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-10 md:gap-y-0 md:py-16 lg:gap-x-14">
      <header className={`md:col-span-5 md:row-start-1 lg:col-span-4 ${flip ? 'md:col-start-8 lg:col-start-9' : ''}`}>
        <span className="font-mono text-[11px] tracking-[0.2em] text-cinema-muted">{index}</span>
        <h3 dir="ltr" className="mt-4 font-display text-[40px] leading-[0.98] text-cinema-soft md:text-[clamp(44px,4.2vw,64px)] rtl:text-right">
          {title}
        </h3>
        {description && (
          <p className="mt-4 max-w-[30rem] text-[15px] leading-relaxed text-cinema-text/70 md:text-[16px]">{description}</p>
        )}
        {meta && <div className="mt-6">{meta}</div>}
      </header>

      <div className={`md:col-span-7 md:row-span-2 md:row-start-1 lg:col-span-8 ${flip ? 'md:col-start-1' : 'md:col-start-6 lg:col-start-5'}`}>
        <div
          id={stageId}
          role="tabpanel"
          aria-live="polite"
          className="relative overflow-hidden rounded-[4px] border border-white/10 bg-cinema-bg2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] transition-colors duration-300 group-hover/card:border-white/20"
          style={{ aspectRatio: 1.6 }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={shot.src}
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.025 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: reduce ? 0.2 : 0.55, ease: EASE } }}
              exit={{ opacity: 0, transition: { duration: reduce ? 0.15 : 0.3, ease: EASE } }}
            >
              <motion.div
                className="h-full w-full"
                animate={reduce ? undefined : { scale: [1, 1.035], y: ['0%', '-1.2%'] }}
                transition={{ duration: 9, ease: 'linear' }}
              >
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  fill
                  sizes="(min-width: 1024px) 62vw, (min-width: 768px) 56vw, 100vw"
                  className="object-cover object-top"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-cinema-bg/70 to-transparent" />
          <span dir="ltr" className="pointer-events-none absolute bottom-3 end-4 font-mono text-[10.5px] tracking-[0.18em] text-cinema-soft/80">
            {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </div>
        {note && <p className="mt-4 max-w-2xl text-[12.5px] leading-relaxed text-cinema-text/45">{note}</p>}
      </div>

      <div
        role="tablist"
        aria-label={title}
        aria-orientation="vertical"
        onKeyDown={onKey}
        className={`grid grid-cols-2 gap-x-4 self-start border-t border-white/10 md:col-span-5 md:row-start-2 md:mt-10 md:grid-cols-1 lg:col-span-4 ${flip ? 'md:col-start-8 lg:col-start-9' : ''}`}
      >
        {screens.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.src}
              ref={(el) => (tabs.current[i] = el)}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={stageId}
              tabIndex={on ? 0 : -1}
              onClick={() => go(i)}
              onMouseEnter={() => go(i)}
              onFocus={() => go(i)}
              className={`flex min-h-[44px] items-center gap-3 border-b border-white/10 py-2.5 text-start text-[13.5px] outline-none transition-colors duration-200 focus-visible:border-cinema-cream/70 ${
                on ? 'text-cinema-soft' : 'text-cinema-text/50 hover:text-cinema-text/80'
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-px shrink-0 bg-cinema-cream transition-all duration-300 ${on ? 'w-6 opacity-100' : 'w-2 opacity-30'}`}
              />
              <span className="truncate">{s.caption}</span>
            </button>
          );
        })}
      </div>
    </article>
  );
}
