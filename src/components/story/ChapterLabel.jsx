'use client';

import { motion } from 'framer-motion';

/**
 * Small uppercase chapter marker, e.g. "CASE STUDY 01".
 */
export default function ChapterLabel({ children, className = '' }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-cinema-accent ${className}`}
    >
      {children}
    </motion.p>
  );
}
