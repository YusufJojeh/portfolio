'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { useMotionValue, useTransform } from 'framer-motion';

function subscribeTo(query) {
  return (callback) => {
    const list = window.matchMedia(query);
    list.addEventListener('change', callback);
    return () => list.removeEventListener('change', callback);
  };
}

// Server snapshot is always false so hydration matches; the real value applies right after.
export function useMediaQuery(query) {
  const subscribe = useMemo(() => subscribeTo(query), [query]);
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function useReducedMotionPref() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)');
}

/**
 * Scroll-linked value that collapses to a fixed `rest` value under reduced motion,
 * so every scene still renders its readable end state without movement.
 */
export function useStage(progress, input, output, rest) {
  const reduced = useReducedMotionPref();
  const live = useTransform(progress, input, output, { clamp: true });
  const still = useMotionValue(rest ?? output[output.length - 1]);
  return reduced ? still : live;
}
