'use client';

import React from 'react';
import Image from 'next/image';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { Download, Mail, ArrowDown, Briefcase } from 'lucide-react';
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
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const proofItems = [
    t('proof.years'),
    t('proof.projects'),
    t('proof.endpoints'),
    t('proof.performance'),
    t('proof.bilingual')
  ];

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
              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-4 tracking-wide uppercase"
              >
                {t('hero.greeting')} {t('hero.name')}
              </m.p>

              <m.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              >
                <span className="gradient-text">{t('hero.headline')}</span>
              </m.h1>

              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                {t('hero.subheadline')}
              </m.p>

              {/* Tagline with Typewriter Effect */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
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

              {/* CTA Buttons */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('case-studies')}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 dark:bg-secondary-600 text-white rounded-lg font-medium hover:bg-primary-700 dark:hover:bg-secondary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Briefcase className="w-5 h-5" />
                  {t('hero.viewCaseStudies')}
                </m.button>

                <m.a
                  href="/cv.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 glass-card text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-white/30 transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  {t('hero.downloadCV')}
                </m.a>

                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center justify-center gap-2 px-6 py-3 glass-card text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-primary-400/30"
                >
                  <Mail className="w-5 h-5" />
                  {t('hero.contactRemote')}
                </m.button>
              </m.div>

              {/* Location */}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-6 text-sm text-slate-500 dark:text-slate-400"
              >
                {t('hero.location')}
              </m.div>
            </m.div>

            {/* Profile Image */}
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

          {/* Proof of Work Strip */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 glass-card rounded-2xl p-6"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {proofItems.map((item, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                  className="text-center px-3 py-2"
                >
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {item}
                  </p>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* Scroll Indicator */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <m.button
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={() => scrollToSection('case-studies')}
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
