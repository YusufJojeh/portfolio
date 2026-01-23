'use client';

import React from 'react';
import Image from 'next/image';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { Download, Mail, ArrowDown } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { useTranslations } from 'next-intl';
import { personalInfo } from '@/lib/data/portfolio';

const Hero = () => {
  const t = useTranslations();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container-custom section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <m.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >

            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              {t('hero.greeting')}{' '}
              <span className="gradient-text">{t('hero.name')}</span>
            </m.h1>

            <m.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mb-8"
            >
              {t('hero.title')}
            </m.h2>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg text-slate-600 dark:text-slate-400 mb-4 max-w-2xl mx-auto lg:mx-0"
            >
              {t('hero.summary')}
            </m.p>

            {/* Tagline with Typewriter Effect */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-sm sm:text-base text-primary-600 dark:text-primary-400 font-medium mb-8 max-w-2xl mx-auto lg:mx-0 min-h-[2rem]"
            >
              <Typewriter
                words={[t('hero.tagline1'), t('hero.tagline2'), t('hero.tagline3')]}
                loop={0}
                cursor
                cursorStyle='|'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-primary-600 dark:bg-secondary-600 text-white rounded-lg font-medium hover:bg-primary-700 dark:hover:bg-secondary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Mail className="w-5 h-5" />
                {t('hero.getInTouch')}
              </m.button>

              <m.a
                href="/cv.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-8 py-3 glass-card text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-white/30 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                {t('hero.downloadCV')}
              </m.a>
            </m.div>

            {/* Location */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-8 text-slate-500 dark:text-slate-400"
            >
              📍 {t('hero.location')}
            </m.div>
          </m.div>

          {/* Profile Image Display */}
          <m.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <Image
              src="/profile.jpg"
              alt={t('hero.name')}
              width={256}
              height={256}
              className="w-64 h-64 rounded-full object-cover shadow-xl"
              quality={90}
              style={{ objectPosition: 'center' }}
              priority
            />
          </m.div>
        </div>

        {/* Scroll Indicator */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <m.button
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => scrollToSection('flagship')}
            className="p-2 rounded-full glass hover:bg-white/20 transition-colors duration-200"
          >
            <ArrowDown className="w-6 h-6" />
          </m.button>
        </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default Hero;
