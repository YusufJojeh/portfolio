'use client';

import { useReducedMotionPref } from './useMedia';

/** Renders `fallback` instead of `children` when the visitor prefers reduced motion. */
export default function ReducedMotionFallback({ fallback, children }) {
  return useReducedMotionPref() ? fallback : children;
}
