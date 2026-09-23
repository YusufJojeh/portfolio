'use client';

import { motion } from 'framer-motion';
import { EASE, DURATION } from './motion';

/** Editorial entrance for content outside pinned scenes. */
export default function Reveal({ as = 'div', delay = 0, y = 16, className = '', children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: DURATION.reveal, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
