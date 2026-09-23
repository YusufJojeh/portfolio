'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import CinematicBackground from '../CinematicBackground';
import ChapterLabel from '../ChapterLabel';
import StickyScene from '../StickyScene';
import { personalInfo } from '@/lib/data/portfolio';

/**
 * Shared transition/closing scene using the city-sunset art. `variant`
 * switches the overlay gradient and content alignment so the closing
 * scene doesn't feel identical to the mid-page transition.
 */
export default function TransitionScene({ variant = 'mid', id }) {
  const t = useTranslations(variant === 'mid' ? 'story.transition' : 'story.closing');

  const overlay =
    variant === 'mid'
      ? 'linear-gradient(180deg, rgba(9,11,15,0.55) 0%, rgba(9,11,15,0.7) 55%, rgba(9,11,15,0.95) 100%)'
      : 'radial-gradient(ellipse at 30% 40%, rgba(9,11,15,0.35) 0%, rgba(9,11,15,0.85) 55%, rgba(9,11,15,0.98) 100%)';

  return (
    <StickyScene minHeight="120vh" id={id}>
      <CinematicBackground
        src="/portfolio/story/transitions/transition-city-sunset.webp"
        alt="Cinematic city at sunset"
        overlay={overlay}
        focus={variant === 'mid' ? 'center' : '35% center'}
      />

      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24">
        <div className={`max-w-2xl ${variant === 'closing' ? 'mx-auto text-center md:mx-0 md:text-left' : ''}`}>
          <ChapterLabel className="mb-6">{t('chapterLabel')}</ChapterLabel>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl font-bold text-cinema-text leading-tight tracking-tight mb-6"
          >
            {t('heading')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-cinema-muted leading-relaxed mb-8"
          >
            {t('body')}
          </motion.p>

          {variant === 'mid' && (
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3"
            >
              {t.raw('signals').map((signal, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-cinema-text-alt/90">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cinema-accent" />
                  {signal}
                </li>
              ))}
            </motion.ul>
          )}

          {variant === 'closing' && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="inline-flex items-center justify-center rounded-md bg-cinema-soft px-8 py-3.5 text-sm font-semibold text-cinema-bg transition-transform duration-300 ease-cinematic hover:scale-[1.02]"
              >
                {t('cta')}
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </StickyScene>
  );
}
