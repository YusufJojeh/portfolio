'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import CinematicBackground from '../CinematicBackground';
import ChapterLabel from '../ChapterLabel';
import StickyScene from '../StickyScene';

export default function HeroScene() {
  const t = useTranslations('hero');
  const s = useTranslations('story.hero');

  return (
    <StickyScene minHeight="100vh" id="hero">
      <CinematicBackground
        src="/portfolio/story/hero/hero-yusuf-city.webp"
        alt="Yusuf Jojeh, backend engineer, cinematic city dusk"
        priority
        focus="65% center"
        overlay="linear-gradient(90deg, rgba(9,11,15,0.96) 0%, rgba(9,11,15,0.75) 32%, rgba(9,11,15,0.25) 62%, rgba(9,11,15,0.15) 100%)"
      />

      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          <ChapterLabel className="mb-6">{s('chapterLabel')}</ChapterLabel>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-cinema-text leading-[1.05] tracking-tight mb-6"
          >
            {t('headline')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="text-base md:text-lg text-cinema-muted leading-relaxed mb-10 max-w-xl"
          >
            {t('subheadline')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#case-studies"
              className="inline-flex items-center justify-center rounded-full bg-cinema-accent px-7 py-3 text-sm font-semibold text-cinema-bg transition-transform duration-300 ease-cinematic hover:scale-[1.03]"
            >
              {t('viewCaseStudies')}
            </a>
            <a
              href="/cv.pdf"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-cinema-text transition-colors duration-300 ease-cinematic hover:border-cinema-accent hover:text-cinema-accent"
            >
              {t('downloadCV')}
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cinema-muted"
      >
        <span className="text-xs uppercase tracking-widest font-mono">{s('scrollHint')}</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </StickyScene>
  );
}
