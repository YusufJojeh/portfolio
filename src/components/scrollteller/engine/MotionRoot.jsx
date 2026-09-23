'use client';

import { MotionConfig } from 'framer-motion';
import { EASE, DURATION } from './motion';

/** Honors prefers-reduced-motion for every framer-motion animation below it. */
export default function MotionRoot({ children }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: DURATION.reveal, ease: EASE }}>
      {children}
    </MotionConfig>
  );
}
