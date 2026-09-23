'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

/**
 * Disclosure shown over generated art-direction frames: interfaces and
 * figures in those images are illustrative, never evidence.
 */
export default function ArtNote({ opacity, className = '' }) {
  const t = useTranslations('final.art');
  return (
    <motion.p
      style={opacity ? { opacity } : undefined}
      className={`absolute end-6 top-[4.25rem] z-30 max-w-[15rem] text-end font-mono text-[9px] leading-relaxed tracking-[0.08em] text-cinema-muted/80 md:bottom-5 md:end-12 md:top-auto md:max-w-[16rem] md:text-[9.5px] lg:end-16 ${className}`}
    >
      {t('note')}
    </motion.p>
  );
}
