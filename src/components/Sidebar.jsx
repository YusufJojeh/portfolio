import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  Home,
  Rocket,
  User,
  Code,
  Briefcase,
  FolderGit2,
  Mail,
  Sun,
  Moon,
  Globe,
  Menu,
  X
} from 'lucide-react';
import Logo from './Logo';

const Sidebar = () => {
  const { t } = useTranslation();
  const { language, toggleLanguage, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', icon: Home, label: t('nav.home') },
    { id: 'flagship', icon: Rocket, label: t('nav.flagship') },
    { id: 'about', icon: User, label: t('nav.about') },
    { id: 'skills', icon: Code, label: t('nav.skills') },
    { id: 'experience', icon: Briefcase, label: t('nav.experience') },
    { id: 'projects', icon: FolderGit2, label: t('nav.projects') },
    { id: 'contact', icon: Mail, label: t('nav.contact') }
  ];

  // Smooth scroll to section
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
      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: isRTL ? 300 : -300, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const SidebarContent = () => (
    <>
      {/* Logo Section */}
      <div className="p-6 border-b border-primary-200/20 dark:border-primary-800/20">
        <div className="flex items-center gap-3">
          <Logo size="md" showText={false} />
          <div>
            <h2 className="text-lg font-bold gradient-text">YJ</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">Portfolio</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, x: isRTL ? -5 : 5 }}
              whileTap={{ scale: 0.95 }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-300 group
                ${isActive
                  ? 'bg-gradient-to-r bg-primary-500 dark:bg-secondary-500 text-white shadow-lg'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                }
              `}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-300 ${
                  isActive ? 'scale-110' : 'group-hover:scale-110'
                }`}
              />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`${isRTL ? 'mr-auto' : 'ml-auto'} w-2 h-2 rounded-full bg-white`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom Controls */}
      <div className="p-4 border-t border-primary-200/20 dark:border-primary-800/20 space-y-3">
        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
                     bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700
                     transition-colors duration-300"
          title={t('theme.toggle')}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: theme === 'dark' ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </motion.div>
          <span className="font-medium">{theme === 'dark' ? t('theme.dark') : t('theme.light')}</span>
        </motion.button>

        {/* Language Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleLanguage}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
                     bg-gradient-to-r bg-secondary-500 text-white
                     hover:from-secondary-600 hover:to-accent-600
                     transition-all duration-300 shadow-md hover:shadow-lg"
          title={t('language.toggle')}
        >
          <Globe className="w-5 h-5" />
          <span className="font-medium">
            {language === 'en' ? t('language.english') : t('language.arabic')}
          </span>
        </motion.button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-lg
                   bg-gradient-to-r bg-primary-500 dark:bg-secondary-500 text-white
                   shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: 0 }}
        className="hidden lg:flex fixed left-0 top-0 h-screen w-sidebar
                   bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
                   border-r border-primary-200/20 dark:border-primary-800/20
                   flex-col shadow-2xl z-40 sidebar"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden fixed left-0 top-0 h-screen w-80
                       bg-white dark:bg-slate-900 backdrop-blur-xl
                       border-r border-primary-200/20 dark:border-primary-800/20
                       flex flex-col shadow-2xl z-50 sidebar"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
