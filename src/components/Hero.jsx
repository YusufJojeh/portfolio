import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, ArrowDown } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { useTranslation } from 'react-i18next';
import { personalInfo } from '../data/portfolio.js';

const Hero = () => {
  const { t } = useTranslation();

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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-4 flex items-center justify-center lg:justify-start gap-3"
            >
              <img
                src="/logo.svg"
                alt="YJ Logo"
                className="w-6 h-6"
                loading="eager"
              />
              <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary-600 dark:text-primary-400">
                {t('hero.welcome')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              {t('hero.greeting')}{' '}
              <span className="gradient-text">{personalInfo.name}</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mb-8"
            >
              {t('hero.title')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg text-slate-600 dark:text-slate-400 mb-4 max-w-2xl mx-auto lg:mx-0"
            >
              {t('hero.summary')}
            </motion.p>

            {/* Tagline with Typewriter Effect */}
            <motion.div
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-primary-600 dark:bg-secondary-600 text-white rounded-lg font-medium hover:bg-primary-700 dark:hover:bg-secondary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Mail className="w-5 h-5" />
                {t('hero.getInTouch')}
              </motion.button>

              <motion.a
                href="/cv.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-8 py-3 glass-card text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-white/30 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                {t('hero.downloadCV')}
              </motion.a>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-8 text-slate-500 dark:text-slate-400"
            >
              📍 {t('hero.location')}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-secondary-500 p-1"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-50 to-primary-50 dark:from-slate-900 dark:to-slate-800"></div>
              </motion.div>

              <div className="relative w-80 h-80 rounded-full overflow-hidden glass-card p-2">
                <img
                  src="/profile.jpg"
                  alt={personalInfo.name}
                  className="w-full h-full object-cover rounded-full transition-opacity duration-300"
                  loading="eager"
                  decoding="async"
                  onLoad={(e) => {
                    e.target.style.opacity = '1';
                  }}
                  onError={(e) => {
                    // Fallback to a placeholder if image doesn't exist
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(personalInfo.name)}&size=320&background=10b981&color=fff&font-size=0.4`;
                  }}
                  style={{ opacity: 0 }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => scrollToSection('flagship')}
            className="p-2 rounded-full glass hover:bg-white/20 transition-colors duration-200"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
