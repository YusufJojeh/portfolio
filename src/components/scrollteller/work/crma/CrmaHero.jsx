'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useIsMobile, useStage } from '../../engine/useMedia';
import { EASE } from '../../engine/motion';
import { Crop, Frame } from './Screen';

/*
 * The opening frame states the thesis with the product itself: the copilot
 * paused on a proposal. A window onto the proposal floats over the capture
 * and moves at a faster rate as the page scrolls, so the one detail that
 * matters separates from the screen it lives in. The capture develops from
 * soft to sharp on load (CSS, once), then the window arrives.
 */

// The proposal card in the 1600px copilot capture: diff, reason, Approve / Reject.
const PROPOSAL = { x: 1100, y: 250, w: 492, h: 300 };

export default function CrmaHero({ alt, calloutLabel, children }) {
  const ref = useRef(null);
  const mobile = useIsMobile();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const frameY = useStage(p, [0, 1], [0, mobile ? -10 : -40], 0);
  const frameScale = useStage(p, [0, 1], [1, 0.97], 1);
  const calloutY = useStage(p, [0, 1], [0, mobile ? -24 : -120], 0);

  return (
    <section ref={ref} className="relative overflow-hidden pb-16 md:pb-28">
      {/* A soft pool of light behind the stage, so the light UI does not sit on flat black. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[38%] h-[70%]"
        style={{ background: 'radial-gradient(60% 50% at 55% 40%, rgba(239,238,233,0.07), transparent 70%)' }}
      />
      <div className="work-rise relative px-6 pt-32 md:px-12 md:pt-44 lg:px-16">{children}</div>

      <div className="relative mt-14 px-6 md:mt-20 md:px-12 lg:px-16">
        <div className="relative mx-auto max-w-[1280px]">
          <motion.div style={{ y: frameY, scale: frameScale }} className="work-develop origin-top will-change-transform">
            <Frame file="copilot-approval" alt={alt} sizes="(min-width: 1280px) 1280px, 92vw" priority />
          </motion.div>
          <motion.div
            style={{ y: calloutY }}
            className="relative z-10 -mt-10 ml-auto w-[86%] will-change-transform sm:w-[62%] md:absolute md:-bottom-14 md:right-[-3%] md:mt-0 md:w-[40%] lg:right-[-5%]"
          >
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
            >
              {/* The label can land over the light capture, so it carries its own dark ground. */}
              <p className="mb-3 flex w-fit items-center gap-2 rounded-[3px] bg-cinema-bg/90 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-cinema-cream/90">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cinema-cream motion-safe:animate-pulse" />
                {calloutLabel}
              </p>
              <Crop file="copilot-approval" region={PROPOSAL} vw={[40, 86]} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
