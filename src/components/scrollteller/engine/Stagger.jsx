'use client';

import { motion } from 'framer-motion';
import { EASE, DURATION, STAGGER } from './motion';

/*
 * A list that enters as one gesture: the parent waits for the viewport, then
 * each child rises in turn. Children must be <StaggerItem>. Reduced motion
 * comes from MotionRoot, which drops the y offset and keeps the fade.
 */

const item = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: { duration: DURATION.reveal, ease: EASE } },
};

export function Stagger({ as = 'div', step = STAGGER, delay = 0, amount = 0.25, className = '', children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: step, delayChildren: delay } } }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ as = 'div', className = '', children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag variants={item} className={className} {...rest}>
      {children}
    </Tag>
  );
}
