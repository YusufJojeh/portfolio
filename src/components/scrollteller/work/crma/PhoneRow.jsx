'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll } from 'framer-motion';
import { useIsMobile, useStage } from '../../engine/useMedia';
import { Stagger, StaggerItem } from '../../engine/Stagger';

/*
 * Four phone captures at 390px. On wide screens they stand in a row and the
 * second and fourth drift against the scroll, so a row of equal tall shapes
 * reads with some depth instead of as a wall. On phones they become a
 * horizontal strip that snaps one capture at a time. Plain rounded frames:
 * no device chrome, these are the app's own pixels.
 */

const RATIO = 780 / 1688;

function Phone({ file, alt, caption, offset }) {
  return (
    <figure className="m-0">
      <motion.div style={{ y: offset }} className="will-change-transform">
        <div className="overflow-hidden rounded-[18px] border border-white/15 bg-cinema-bg2 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.9)]" style={{ aspectRatio: RATIO }}>
          <Image
            src={`/portfolio/work/crma/mobile/${file}.webp`}
            alt={alt}
            width={780}
            height={1688}
            sizes="(min-width: 768px) 22vw, 70vw"
            className="block h-full w-full object-cover object-top"
          />
        </div>
        <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cinema-muted">{caption}</figcaption>
      </motion.div>
    </figure>
  );
}

export default function PhoneRow({ phones }) {
  const ref = useRef(null);
  const mobile = useIsMobile();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lift = useStage(p, [0, 1], mobile ? [0, 0] : [56, -56], 0);
  const still = useStage(p, [0, 1], [0, 0], 0);

  return (
    <div ref={ref}>
      <Stagger
        step={0.08}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:gap-8"
      >
        {phones.map((ph, i) => (
          <StaggerItem key={ph.file} className={`w-[68%] shrink-0 snap-center sm:w-[44%] md:w-auto ${i % 2 === 1 ? 'md:mt-16' : ''}`}>
            <Phone {...ph} offset={i % 2 === 1 ? lift : still} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
