'use client';

import { useMediaQuery } from '../engine/useMedia';
import { setForcedReducedMotion, useForcedReducedMotion } from '../engine/motionPref';

/*
 * A plain switch for the site's motion. When the system already asks for
 * reduced motion it shows as on and cannot be turned off here, because the
 * system setting wins.
 */
export default function MotionToggle({ label, systemNote }) {
  const system = useMediaQuery('(prefers-reduced-motion: reduce)');
  const forced = useForcedReducedMotion();
  const on = system || forced;

  return (
    <button
      type="button"
      aria-pressed={on}
      disabled={system}
      title={system ? systemNote : undefined}
      onClick={() => setForcedReducedMotion(!forced)}
      className="hit inline-flex items-center gap-2.5 uppercase transition-colors duration-200 hover:text-cinema-cream disabled:cursor-default disabled:hover:text-cinema-muted"
    >
      <span
        aria-hidden="true"
        className={`relative inline-block h-3 w-6 rounded-full border transition-colors duration-200 ${
          on ? 'border-cinema-cream/70 bg-cinema-cream/20' : 'border-white/25'
        }`}
      >
        {/* The knob changes side without travelling: this is the switch that turns motion off. */}
        <span
          className={`absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full transition-colors duration-200 ${
            on ? 'end-0.5 bg-cinema-cream' : 'start-0.5 bg-cinema-muted'
          }`}
        />
      </span>
      {label}
    </button>
  );
}
