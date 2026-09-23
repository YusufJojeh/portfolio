'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { personalInfo } from '@/lib/data/portfolio';

const Footer = () => {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: `https://${personalInfo.contact.github}`,
      label: 'GitHub',
      color: 'hover:text-cinema-soft'
    },
    {
      icon: Linkedin,
      href: `https://${personalInfo.contact.linkedin}`,
      label: 'LinkedIn',
      color: 'hover:text-cinema-soft'
    },
    {
      icon: Mail,
      href: `mailto:${personalInfo.contact.email}`,
      label: 'Email',
      color: 'hover:text-cinema-soft'
    }
  ];

  const navLinks = [
    { name: t('nav.home'), id: 'home' },
    { name: t('nav.caseStudies'), id: 'case-studies' },
    { name: t('nav.about'), id: 'about' },
    { name: t('nav.skills'), id: 'skills' },
    { name: t('nav.experience'), id: 'experience' },
    { name: t('nav.projects'), id: 'projects' },
    { name: t('nav.contact'), id: 'contact' }
  ];

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
    <footer className="bg-cinema-bg2/60 backdrop-blur-lg border-t border-white/5">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="font-bold text-xl text-cinema-soft">YJ · {t('hero.shortName')}</span>
              <p className="text-cinema-muted mt-2 text-center md:text-left">
                {t('hero.title')}
              </p>
            </motion.div>
            <p className="text-cinema-muted text-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold text-cinema-text mb-4">
                {t('footer.quickLinks')}
              </h4>
              <div className="flex flex-wrap justify-center gap-4">
                {navLinks.map((link) => (
                  <motion.span
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-cinema-muted hover:text-cinema-soft transition-colors duration-200 text-sm cursor-pointer"
                  >
                    {link.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold text-cinema-text mb-4">
                {t('footer.connectWithMe')}
              </h4>
              <div className="flex justify-center md:justify-end gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 rounded-lg bg-cinema-elevated/60 backdrop-blur-md border border-white/10 text-cinema-muted transition-colors duration-200 ${social.color}`}
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-white/10 mt-8 pt-8 text-center"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-cinema-muted text-sm">
              © {currentYear} {t('hero.shortName')}. {t('footer.rights')}
            </p>

            <div className="flex items-center gap-2 text-cinema-muted text-sm">
              <span>{t('footer.madeWith')}</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-cinema-muted" />
              </motion.div>
              <span>{t('footer.using')}</span>
            </div>

            <div className="text-cinema-muted text-sm">
              <span>📍 {t('hero.location')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
