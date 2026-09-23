'use client';

import Image from 'next/image';
import { motion, useMotionValue } from 'framer-motion';
import { useIsMobile, useStage } from './useMedia';

/**
 * Full-bleed photograph driven by scroll: a slow camera settle or push
 * (scale) plus a small vertical drift. The frame is 48px taller than the
 * stage so the upward drift never exposes an edge.
 */
export default function CinematicBackground({
  src,
  alt,
  progress,
  priority = false,
  focus = '50% 50%',
  origin = '50% 50%',
  overlay,
  scale = [1.05, 1],
  y = [0, -40],
  mobileY = -15,
  range = [0, 1],
  sizes = '100vw',
  quality = 80,
  imageClassName = '',
}) {
  const fallback = useMotionValue(0);
  const p = progress ?? fallback;
  const mobile = useIsMobile();
  const s = useStage(p, range, scale, 1);
  const ty = useStage(p, range, [y[0], mobile ? mobileY : y[1]], 0);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden={alt ? undefined : true}>
      <motion.div
        className="absolute inset-x-0 top-0 h-[calc(100%+48px)] will-change-transform"
        style={{ scale: s, y: ty, transformOrigin: origin }}
      >
        <Image
          src={src}
          alt={alt || ''}
          fill
          priority={priority}
          sizes={sizes}
          quality={quality}
          className={`object-cover ${imageClassName}`}
          style={{ objectPosition: focus }}
        />
      </motion.div>
      {overlay && <div className="absolute inset-0" style={{ background: overlay }} />}
    </div>
  );
}
