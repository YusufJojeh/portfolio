'use client';

import { useState } from 'react';
import { useMotionValue, useMotionValueEvent } from 'framer-motion';
import { useSceneProgress } from '../engine/sceneProgress';

/*
 * The ProspectIQ run lifecycle, driven by scroll. The waiting state owns the
 * widest stretch of the track, so the scene visibly holds there before the
 * same run carries on. Without a scene (reduced motion) it shows the end state.
 */

const RUN_STATES = ['queued', 'running', 'waiting', 'resumed', 'completed'];

// Scene progress at which each state becomes current; details are fully in by 0.58.
const AT = [0, 0.56, 0.61, 0.77, 0.83];

const stateAt = (v) => AT.reduce((cur, at, i) => (v >= at ? i : cur), 0);

export default function ApprovalRail({ labels, paused, resumed }) {
  const scene = useSceneProgress();
  const still = useMotionValue(1);
  const p = scene ?? still;
  const [i, setI] = useState(() => stateAt(p.get()));
  useMotionValueEvent(p, 'change', (v) => setI(stateAt(v)));

  const waiting = i === 2;
  const status = waiting ? paused : i >= 3 ? resumed : null;

  return (
    <div className="mt-6 max-w-[62rem]">
      <ol className="grid border-t border-white/15 md:grid-cols-5">
        {RUN_STATES.map((s, k) => {
          const done = k < i;
          const now = k === i;
          return (
            <li
              key={s}
              aria-current={now ? 'step' : undefined}
              className="relative flex items-center gap-3 border-b border-white/10 py-2.5 md:block md:border-b-0 md:py-4 md:pe-4"
            >
              <span
                aria-hidden="true"
                className={`absolute -top-px start-0 hidden h-px transition-all duration-500 md:block ${
                  done ? 'w-full bg-cinema-soft/60' : now ? 'w-full bg-cinema-cream' : 'w-0'
                }`}
              />
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 rounded-full border transition-colors duration-300 md:mb-3 md:block ${
                  now
                    ? `border-cinema-cream bg-cinema-cream ${k === 2 ? 'animate-pulse' : ''}`
                    : done
                      ? 'border-cinema-soft/60 bg-cinema-soft/60'
                      : 'border-white/30'
                }`}
              />
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 md:text-[11.5px] ${
                  now ? 'text-cinema-soft' : done ? 'text-cinema-text/60' : 'text-cinema-text/35'
                }`}
              >
                {labels[s]}
              </span>
            </li>
          );
        })}
      </ol>
      <p
        aria-live="off"
        className={`mt-4 min-h-[1.5em] font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
          waiting ? 'text-cinema-cream' : 'text-cinema-muted'
        }`}
      >
        {status}
      </p>
    </div>
  );
}
