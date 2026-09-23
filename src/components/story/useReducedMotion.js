'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks prefers-reduced-motion so scenes can disable parallax/scale
 * and fall back to opacity-only fades.
 */
export function useReducedMotionPref() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}
