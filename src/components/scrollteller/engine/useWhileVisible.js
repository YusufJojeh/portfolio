'use client';

import { useState } from 'react';
import { useMotionValueEvent, useTransform } from 'framer-motion';

/** False once the motion value (a layer's opacity) falls to `threshold`, so a loop inside it can stop. */
export function useWhileVisible(value, threshold = 0.02) {
  const [visible, setVisible] = useState(true);
  useMotionValueEvent(value, 'change', (v) => setVisible(v > threshold));
  return visible;
}

/**
 * Pinned scenes stack full-screen layers whose opacity is driven by scroll. A layer at
 * opacity 0 still takes pointer events, so it would swallow clicks meant for the layer
 * beneath. Spread the result into `style` so a layer is only interactive while readable.
 */
export function usePointerWhenVisible(value, threshold = 0.5) {
  return useTransform(value, (v) => (v > threshold ? 'auto' : 'none'));
}
