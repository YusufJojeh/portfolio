'use client';

import { motion } from 'framer-motion';
import { useStage } from './useMedia';

/**
 * Two background layers bridged by scroll: `from` darkens over `dimAt`, then
 * `to` fades in over it across `at`. `rest` picks the layer shown when
 * motion is reduced.
 */
export default function BackgroundCrossfade({
  progress,
  from,
  to,
  at = [0.1, 0.3],
  dimAt,
  dimTo = 0.7,
  rest = 'to',
}) {
  const toOpacity = useStage(progress, at, [0, 1], rest === 'to' ? 1 : 0);
  const dim = useStage(progress, dimAt ?? at, [0, dimAt ? dimTo : 0], 0);

  return (
    <>
      {from && (
        <div className="absolute inset-0">
          {from}
          <motion.div className="absolute inset-0 bg-cinema-bg" style={{ opacity: dim }} />
        </div>
      )}
      <motion.div className="absolute inset-0" style={{ opacity: toOpacity }}>
        {to}
      </motion.div>
    </>
  );
}
