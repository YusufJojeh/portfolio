'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotionPref } from './useReducedMotion';

/**
 * Full-bleed background image that gently scales/parallaxes while its
 * sticky scene is pinned, then crossfades to the overlay gradient.
 * Respects prefers-reduced-motion by disabling scale/parallax and
 * keeping only opacity transitions.
 */
export default function CinematicBackground({
  src,
  alt,
  priority = false,
  overlay = 'linear-gradient(180deg, rgba(9,11,15,0.35) 0%, rgba(9,11,15,0.55) 45%, rgba(9,11,15,0.95) 100%)',
  focus = 'center',
  parallax = true,
  containerRef,
}) {
  const localRef = useRef(null);
  const ref = containerRef || localRef;
  const reduced = useReducedMotionPref();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], reduced || !parallax ? [1, 1] : [1.08, 1.18]);
  const y = useTransform(scrollYProgress, [0, 1], reduced || !parallax ? [0, 0] : ['-4%', '4%']);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale, y }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: focus }}
        />
      </motion.div>
      <div className="absolute inset-0" style={{ background: overlay }} />
    </div>
  );
}
