'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Stagger, StaggerItem } from '../../engine/Stagger';
import { EASE } from '../../engine/motion';

/*
 * Defence in depth as nested rings, outermost first. The rings draw in when
 * the section enters; pointing at a layer in the list lights its
 * ring, so the diagram and the list read as one figure. The rings are
 * decoration for the list, which carries all of the content.
 */

const SIZE = 320;

export default function DefenceLayers({ layers, core }) {
  const [hot, setHot] = useState(null);
  const n = layers.length;

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
      <div aria-hidden="true" className="mx-auto w-full max-w-[300px] lg:sticky lg:top-32 lg:max-w-[360px]">
        <motion.svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="block h-auto w-full"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.4 }}
        >
          {layers.map((l, i) => {
            const r = SIZE / 2 - 6 - i * ((SIZE / 2 - 34) / n);
            const on = hot === null || hot === i;
            return (
              <motion.circle
                key={l.t}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={r}
                fill="none"
                strokeWidth={hot === i ? 1.6 : 1}
                className="transition-[stroke,stroke-width] duration-200"
                stroke={on ? 'rgba(239,238,233,0.75)' : 'rgba(239,238,233,0.16)'}
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  shown: { pathLength: 1, opacity: 1, transition: { duration: 1.1, ease: EASE, delay: i * 0.12 } },
                }}
                transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
              />
            );
          })}
          <motion.text
            x={SIZE / 2}
            y={SIZE / 2 + 4}
            textAnchor="middle"
            className="fill-cinema-cream font-mono text-[11px] uppercase tracking-[0.2em]"
            variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: { delay: 0.9 } } }}
          >
            {core}
          </motion.text>
        </motion.svg>
      </div>

      <Stagger as="ol" step={0.07} className="border-t border-white/15">
        {layers.map((l, i) => (
          <StaggerItem
            as="li"
            key={l.t}
            onPointerEnter={() => setHot(i)}
            onPointerLeave={() => setHot(null)}
            className={`grid gap-2 border-b border-white/10 py-6 transition-colors duration-200 md:grid-cols-[3rem_minmax(0,1fr)] ${
              hot === i ? 'bg-white/[0.025]' : ''
            }`}
          >
            <span dir="ltr" className="font-mono text-[11px] tracking-[0.2em] text-cinema-muted md:pt-1.5 rtl:text-right">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-display text-[26px] leading-tight text-cinema-soft md:text-[30px]">{l.t}</h3>
              <p className="mt-2 max-w-[40rem] text-[15px] leading-relaxed text-cinema-text/70">{l.d}</p>
              {l.src && (
                <p dir="ltr" className="mt-3 font-mono text-[11.5px] text-cinema-muted rtl:text-right">
                  {l.src}
                </p>
              )}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
