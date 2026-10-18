'use client';

import { motion } from 'framer-motion';
import { Stagger, StaggerItem } from '../../engine/Stagger';
import { EASE } from '../../engine/motion';

/*
 * The five risk classes as a scale of consequence. Each row's bar grows to
 * its weight as the row enters, so the escalation reads before the words do.
 * The bar inherits the row's variant state; reduced motion skips the growth
 * (MotionRoot) and shows the bar at full weight.
 */

const bar = (weight) => ({
  hidden: { scaleX: 0 },
  shown: { scaleX: weight, transition: { duration: 0.7, ease: EASE, delay: 0.15 } },
});

export default function RiskLadder({ classes, gateFrom = 1 }) {
  return (
    <Stagger as="ol" step={0.08} className="border-t border-white/15">
      {classes.map((c, i) => {
        const weight = (i + 1) / classes.length;
        const gated = i >= gateFrom;
        return (
          <StaggerItem
            as="li"
            key={c.k}
            className="grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] items-center gap-x-6 gap-y-2 border-b border-white/10 py-4 md:grid-cols-[11rem_minmax(0,1fr)_minmax(0,10rem)]"
          >
            <span dir="ltr" className={`font-mono text-[12.5px] tracking-[0.06em] rtl:text-right ${gated ? 'text-cinema-soft' : 'text-cinema-text/70'}`}>
              {c.k}
            </span>
            <span className="text-[14.5px] text-cinema-text/75">{c.v}</span>
            <span aria-hidden="true" className="relative col-span-2 h-[3px] bg-white/[0.06] md:col-span-1">
              <motion.span
                variants={bar(weight)}
                className={`absolute inset-y-0 start-0 w-full origin-left rtl:origin-right ${
                  i === classes.length - 1 ? 'bg-cinema-cream' : gated ? 'bg-cinema-cream/55' : 'bg-cinema-steel/60'
                }`}
              />
            </span>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
