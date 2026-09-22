'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import CinematicBackground from '../CinematicBackground';
import ChapterLabel from '../ChapterLabel';
import StickyScene from '../StickyScene';
import { useReducedMotionPref } from '../useReducedMotion';

/**
 * Opening identity scene: a giant moving name reading through the portrait
 * via mix-blend-mode, with restrained positioning copy beneath.
 *
 * NOTE: there is no true alpha-matted cutout of the portrait yet, so the
 * "name behind the body" effect is approximated with `mix-blend-mode:
 * overlay` on the marquee text rather than true foreground/background
 * layer compositing. Swap in a real cutout PNG under the portrait layer
 * (see MARQUEE below) once one exists for the literal reference effect.
 */
export default function OpeningIdentityScene() {
  const t = useTranslations('hero');
  const s = useTranslations('story.hero');
  const sceneRef = useRef(null);
  const reduced = useReducedMotionPref();

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end start'],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.6], reduced ? [1, 1] : [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.6], reduced ? [0, 0] : [0, -24]);
  const marqueeOpacity = useTransform(scrollYProgress, [0, 0.5], reduced ? [1, 1] : [1, 0.15]);

  const name = 'YUSUF — JOJEH';

  return (
    <StickyScene minHeight="160vh" id="hero" containerRef={sceneRef}>
      <CinematicBackground
        src="/portfolio/story/hero/hero-yusuf-city.webp"
        alt="Yusuf Jojeh, backend engineer, cinematic city dusk"
        priority
        focus="65% center"
        overlay="linear-gradient(90deg, rgba(9,11,15,0.9) 0%, rgba(9,11,15,0.55) 35%, rgba(9,11,15,0.2) 65%, rgba(9,11,15,0.1) 100%)"
        scaleRange={[1.06, 1.0]}
        yRange={['0%', '-6%']}
        containerRef={sceneRef}
      />

      {/* MARQUEE — giant moving name, blended into the portrait */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: marqueeOpacity }}
        className="absolute inset-x-0 top-[7vh] sm:top-[12vh] z-[5] overflow-hidden select-none pointer-events-none"
      >
        <div
          className="flex w-max whitespace-nowrap font-mono font-bold text-cinema-soft mix-blend-overlay animate-marquee"
          style={{ fontSize: 'clamp(40px, 15vw, 220px)', lineHeight: 1 }}
        >
          <span className="pr-[6vw]">{name}</span>
          <span className="pr-[6vw]">{name}</span>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 w-full px-6 md:px-16 lg:px-24 pb-24 md:pb-0 pt-[24vh] md:pt-0"
      >
        <div className="max-w-2xl">
          <ChapterLabel className="mb-4 md:mb-6">{s('chapterLabel')}</ChapterLabel>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            className="text-[11px] md:text-xs font-mono uppercase tracking-[0.2em] text-cinema-muted mb-3 md:mb-4"
          >
            {t('positioningLabel')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1 }}
            className="text-[36px] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cinema-soft leading-[1.05] tracking-tight mb-5 md:mb-6"
          >
            {t('headlineMobile')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
            className="text-sm md:text-lg text-cinema-muted leading-relaxed mb-8 md:mb-10 max-w-xl"
          >
            {t('subheadline')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
            className="flex flex-wrap items-center gap-3 md:gap-4"
          >
            <a
              href="#case-studies"
              className="inline-flex items-center justify-center rounded-md bg-cinema-soft px-6 py-3 text-sm font-semibold text-cinema-bg transition-transform duration-300 ease-cinematic hover:scale-[1.02]"
            >
              {t('viewCaseStudies')}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-cinema-text transition-colors duration-300 ease-cinematic hover:border-cinema-text/60"
            >
              {t('contactRemote')}
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
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
