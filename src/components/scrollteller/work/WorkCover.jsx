'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import StoryFrame from '../engine/StoryFrame';
import ArtNote from '../engine/ArtNote';
import { useIsMobile, useStage } from '../engine/useMedia';

/**
 * A full-bleed opening frame for a case study. As the reader scrolls away
 * the camera settles (scale → 1), drifts up and the frame sinks into the
 * page colour, so the page below reads as the same scene continuing.
 */
// Phone captures are read at native size, so their UI text needs extra cover under the copy.
const MOBILE_SCRIM = 'linear-gradient(0deg, rgba(9,11,15,0.95) 0%, rgba(9,11,15,0.86) 50%, rgba(9,11,15,0.35) 78%, rgba(9,11,15,0.2) 100%)';

export default function WorkCover({
  image,
  overlay,
  children,
  align = 'end',
  className = 'min-h-[92svh]',
}) {
  const ref = useRef(null);
  const mobile = useIsMobile();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useStage(p, [0, 1], [1.06, 1], 1);
  const y = useStage(p, [0, 1], [0, mobile ? -15 : -40], 0);
  const dim = useStage(p, [0, 0.85], [0, 0.85], 0);
  const textY = useStage(p, [0, 0.6], [0, -24], 0);
  const textOut = useStage(p, [0.2, 0.6], [1, 0], 1);

  return (
    <section ref={ref} className={`relative flex overflow-hidden ${align === 'end' ? 'items-end' : 'items-center'} ${className}`}>
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-x-0 top-0 h-[calc(100%+48px)] will-change-transform"
          style={{ scale, y, transformOrigin: image.origin ?? '60% 45%' }}
        >
          <StoryFrame
            src={image.src}
            mobileSrc={image.mobileSrc}
            mobileAspect={image.mobileAspect}
            alt={image.alt}
            aspect={image.aspect ?? 1672 / 941}
            focus={image.focus ?? [60, 45]}
            mobileFocus={image.mobileFocus}
            bleed={0}
            priority
            className={image.illustrative ? 'blur-[5px]' : ''}
          />
        </motion.div>
        <div className="absolute inset-0" style={{ background: overlay }} />
        {image.mobileSrc && (
          <div className="absolute inset-0 md:hidden" style={{ background: MOBILE_SCRIM }} />
        )}
        <motion.div className="absolute inset-0 bg-cinema-bg" style={{ opacity: dim }} />
      </div>
      <motion.div style={{ y: textY, opacity: textOut }} className="relative z-10 w-full px-6 pb-16 pt-32 md:px-12 md:pb-24 lg:px-16">
        {children}
      </motion.div>
      {image.illustrative && <ArtNote />}
    </section>
  );
}
