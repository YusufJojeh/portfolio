'use client';

import { MotionConfig } from 'framer-motion';
import { EASE, DURATION } from './motion';
import { useForcedReducedMotion } from './motionPref';

/** Honors prefers-reduced-motion, and the site's motion switch, for every framer-motion animation below it. */
export default function MotionRoot({ children }) {
  const forced = useForcedReducedMotion();
  return (
    <MotionConfig reducedMotion={forced ? 'always' : 'user'} transition={{ duration: DURATION.reveal, ease: EASE }}>
      {children}
    </MotionConfig>
  );
}
