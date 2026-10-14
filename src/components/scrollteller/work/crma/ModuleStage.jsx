'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../../engine/motion';
import { Frame } from './Screen';

/*
 * The core modules as one stage and a list of tabs. Every capture is mounted
 * up front and stacked, so switching is an instant crossfade with no image
 * load in between. The active capture settles from a hair of overscale; the
 * indicator slides between tabs as a shared layout element.
 */

export default function ModuleStage({ label, modules }) {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const id = useId();
  const count = modules.length;

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

  const current = modules[active];

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        className="-mx-6 flex snap-x gap-1 overflow-x-auto px-6 [scrollbar-width:none] lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-white/10 lg:px-0"
      >
        {modules.map((m, i) => {
          const on = i === active;
          return (
            <button
              key={m.id}
              ref={(el) => (tabs.current[i] = el)}
              type="button"
              role="tab"
              id={`${id}-tab-${m.id}`}
              aria-selected={on}
              aria-controls={`${id}-panel`}
              aria-labelledby={`${id}-t-${m.id}`}
              aria-describedby={`${id}-d-${m.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => go(i)}
              onKeyDown={onKey}
              className={`group relative shrink-0 snap-start px-4 py-3 text-start transition-colors duration-200 lg:border-b lg:border-white/10 lg:px-0 lg:py-5 ${
                on ? 'text-cinema-soft' : 'text-cinema-text/55 hover:text-cinema-text/85'
              }`}
            >
              {on && (
                <motion.span
                  layoutId={`${id}-indicator`}
                  aria-hidden="true"
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute inset-x-3 bottom-0 h-px bg-cinema-cream lg:inset-x-auto lg:inset-y-4 lg:start-[-1.25rem] lg:h-auto lg:w-px"
                />
              )}
              <span className="flex items-baseline gap-4">
                <span dir="ltr" className="hidden font-mono text-[11px] tracking-[0.18em] text-cinema-muted lg:inline">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span id={`${id}-t-${m.id}`} className="whitespace-nowrap text-[15px] font-medium lg:font-display lg:text-[24px] lg:font-normal lg:leading-tight">{m.t}</span>
              </span>
              {/* The description lives in the list on large screens (always present, so nothing shifts) and under the stage on small ones. */}
              <span
                id={`${id}-d-${m.id}`}
                className={`mt-2 hidden max-w-[24rem] ps-[calc(2ch+1rem)] text-[14px] leading-relaxed transition-colors duration-300 lg:block ${
                  on ? 'text-cinema-text/75' : 'text-cinema-text/50'
                }`}
              >
                {m.d}
              </span>
            </button>
          );
        })}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${current.id}`} className="lg:col-span-8">
        <div className="relative" style={{ aspectRatio: 1.6 }}>
          {modules.map((m, i) => {
            const on = i === active;
            return (
              <motion.div
                key={m.id}
                aria-hidden={!on}
                initial={false}
                animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 1.015 }}
                transition={{ duration: on ? 0.45 : 0.3, ease: EASE }}
                className="absolute inset-0"
                style={{ zIndex: on ? 1 : 0 }}
              >
                <Frame file={m.file} alt={on ? m.alt : ''} sizes="(min-width: 1024px) 62vw, 100vw" />
              </motion.div>
            );
          })}
        </div>
        <p className="mt-5 max-w-[40rem] text-[15px] leading-relaxed text-cinema-text/65 lg:hidden" aria-live="polite">
          {current.d}
        </p>
      </div>
    </div>
  );
}
