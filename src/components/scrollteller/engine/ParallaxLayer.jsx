'use client';

import { motion } from 'framer-motion';
import { useStage } from './useMedia';

/** Moves its children against scroll at a different rate than the stage. */
export default function ParallaxLayer({
  progress,
  range = [0, 1],
  y = [0, -40],
  opacity = [1, 1],
  opacityRange,
  restOpacity = 1,
  className = '',
  children,
}) {
  const ty = useStage(progress, range, y, 0);
  const op = useStage(progress, opacityRange ?? range, opacity, restOpacity);
  return (
    <motion.div className={className} style={{ y: ty, opacity: op }}>
      {children}
    </motion.div>
  );
}
