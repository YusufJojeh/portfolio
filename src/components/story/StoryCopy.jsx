'use client';

import { motion } from 'framer-motion';

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function StoryHeading({ as = 'h2', children, className = '', delay = 0 }) {
  const Tag = as;
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={revealVariants}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <Tag className={`font-bold text-cinema-text tracking-tight ${className}`}>{children}</Tag>
    </motion.div>
  );
}

export function StoryBody({ children, className = '', delay = 0.1 }) {
  return (
    <motion.p
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={revealVariants}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={`text-cinema-muted leading-relaxed ${className}`}
    >
      {children}
    </motion.p>
  );
}
