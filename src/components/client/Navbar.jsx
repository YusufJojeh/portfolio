'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';

const Navbar = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: t('nav.home'), section: 'home' },
    { name: t('nav.caseStudies'), section: 'case-studies' },
    { name: t('nav.about'), section: 'about' },
    { name: t('nav.skills'), section: 'skills' },
    { name: t('nav.experience'), section: 'experience' },
    { name: t('nav.projects'), section: 'projects' },
    { name: t('nav.contact'), section: 'contact' }
  ];

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    router.push(pathname.replace(`/${locale}`, `/${newLocale}`));
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section
      const sections = navLinks.map(link => link.section);
      const navbarHeight = 80;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= navbarHeight + 100 && rect.bottom >= navbarHeight + 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cinema-elevated/85 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 text-cinema-soft"
          >
            <span className="text-lg md:text-xl font-bold tracking-tight">YJ</span>
            <span className="hidden sm:inline text-xs md:text-sm font-medium text-cinema-muted">
              Yusuf Jojeh
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollToSection(link.section)}
                className="relative group"
              >
                <span
                  className={`text-xs font-medium uppercase tracking-wide transition-colors duration-200 ${
                    activeSection === link.section
                      ? 'text-cinema-soft'
                      : 'text-cinema-muted hover:text-cinema-text'
                  }`}
                >
                  {link.name}
                </span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-md bg-cinema-elevated/60 border border-white/10 text-xs font-medium text-cinema-muted hover:text-cinema-text hover:border-white/20 transition-colors"
              title={t('language.toggle')}
            >
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                {locale === 'en' ? 'AR' : 'EN'}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md bg-cinema-elevated/60 border border-white/10 text-cinema-text"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-cinema-bg2/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="container-custom py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.section}
                  onClick={() => scrollToSection(link.section)}
                  className={`block w-full text-left px-4 py-3 rounded-md text-sm transition-colors ${
                    activeSection === link.section
                      ? 'bg-cinema-elevated text-cinema-soft'
                      : 'text-cinema-muted hover:bg-cinema-elevated/60 hover:text-cinema-text'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-3">
                <button
                  onClick={toggleLanguage}
                  className="w-full px-4 py-3 rounded-md border border-white/10 text-cinema-muted flex items-center justify-center gap-2 text-sm"
                >
                  <Globe className="w-4 h-4" />
                  <span>{locale === 'en' ? 'العربية' : 'English'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
