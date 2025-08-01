import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolio.js';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: `https://${personalInfo.contact.github}`,
      label: 'GitHub',
      color: 'hover:text-slate-600 dark:hover:text-slate-400'
    },
    {
      icon: Linkedin,
      href: `https://${personalInfo.contact.linkedin}`,
      label: 'LinkedIn',
      color: 'hover:text-blue-600 dark:hover:text-blue-400'
    },
    {
      icon: Mail,
      href: `mailto:${personalInfo.contact.email}`,
      label: 'Email',
      color: 'hover:text-red-600 dark:hover:text-red-400'
    }
  ];

  return (
    <footer className="bg-slate-900/50 backdrop-blur-lg border-t border-white/10">
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
              <Logo size="lg" showText={true} className="justify-center md:justify-start" />
              <p className="text-slate-400 mt-2 text-center md:text-left">
                {personalInfo.title}
              </p>
            </motion.div>
            <p className="text-slate-500 text-sm">
              Passionate about creating innovative web solutions and sharing knowledge with the developer community.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold text-slate-200 mb-4">
                Quick Links
              </h4>
              <div className="flex flex-wrap justify-center gap-4">
                {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((link) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link}
                  </motion.a>
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
              <h4 className="text-lg font-semibold text-slate-200 mb-4">
                Connect With Me
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
                    className={`p-3 rounded-lg glass-card text-slate-400 transition-colors duration-200 ${social.color}`}
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
            <p className="text-slate-500 text-sm">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500" />
              </motion.div>
              <span>using React & Tailwind CSS</span>
            </div>

            <div className="text-slate-500 text-sm">
              <span>📍 {personalInfo.location}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 