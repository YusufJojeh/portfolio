'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Github, Linkedin, MessageCircle, Download, CreditCard } from 'lucide-react';
import { personalInfo } from '@/lib/data/portfolio';

const Contact = () => {
  const t = useTranslations();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const whatsappMessage = `*${formData.subject}*\n\nFrom: ${formData.name} (${formData.email})\n\n${formData.message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = personalInfo.contact.phone.replace(/\s/g, '');
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const emailSubject = encodeURIComponent(formData.subject);
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${personalInfo.contact.email}?subject=${emailSubject}&body=${emailBody}`;
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: Mail,
      label: t('contact.email'),
      value: personalInfo.contact.email,
      href: `mailto:${personalInfo.contact.email}`,
      color: 'text-cinema-muted',
      primary: true
    },
    {
      icon: Github,
      label: t('contact.github'),
      value: personalInfo.contact.github,
      href: `https://${personalInfo.contact.github}`,
      color: 'text-cinema-muted'
    },
    {
      icon: Linkedin,
      label: t('contact.linkedin'),
      value: 'linkedin.com/in/yusuf-jojeh',
      href: `https://${personalInfo.contact.linkedin}`,
      color: 'text-cinema-muted'
    },
    {
      icon: MapPin,
      label: t('contact.location'),
      value: personalInfo.location,
      href: null,
      color: 'text-cinema-muted'
    },
    {
      icon: Phone,
      label: t('contact.phone'),
      value: personalInfo.contact.phone,
      href: `tel:${personalInfo.contact.phone}`,
      color: 'text-cinema-muted'
    },
    {
      icon: CreditCard,
      label: t('contact.paymentReady'),
      value: t('contact.paymentMethods'),
      href: null,
      color: 'text-cinema-muted'
    }
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-cinema-soft max-w-3xl mx-auto">
              {t('contact.title')}
            </h2>
            <p className="text-base text-cinema-muted max-w-2xl mx-auto leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          {/* Primary CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            <motion.a
              href={`mailto:${personalInfo.contact.email}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 bg-cinema-soft text-cinema-bg rounded-md font-semibold transition-transform duration-300 ease-cinematic"
            >
              <Mail className="w-5 h-5" />
              {t('contact.emailMe')}
            </motion.a>
            <motion.a
              href={`https://${personalInfo.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 border border-white/20 bg-transparent text-cinema-text rounded-md font-semibold transition-colors duration-300 ease-cinematic hover:border-cinema-text/60"
            >
              <Github className="w-5 h-5" />
              {t('contact.viewGithub')}
            </motion.a>
            <motion.a
              href="/cv.pdf"
              download
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 border border-white/20 bg-transparent text-cinema-text rounded-md font-semibold transition-colors duration-300 ease-cinematic hover:border-cinema-text/60"
            >
              <Download className="w-5 h-5" />
              {t('hero.downloadCV')}
            </motion.a>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6 text-cinema-text">
                {t('contact.letsConnect')}
              </h3>

              <div className="space-y-5">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <div className={`p-3 rounded-lg bg-cinema-elevated/60 border border-white/10 ${method.color}`}>
                      <method.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-cinema-text">
                        {method.label}
                      </h4>
                      {method.href ? (
                        <a
                          href={method.href}
                          target={method.href.startsWith('http') ? '_blank' : undefined}
                          rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm text-cinema-muted hover:text-cinema-soft transition-colors"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-sm text-cinema-muted">
                          {method.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Best Fit Roles */}
              <div className="mt-8 p-6 bg-cinema-elevated/40 border border-white/10 rounded-xl">
                <h4 className="font-semibold text-cinema-text mb-3">
                  {t('contact.lookingFor')}
                </h4>
                <ul className="space-y-2 text-cinema-muted">
                  {t.raw('contact.opportunities').map((opportunity, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-cinema-muted rounded-full shrink-0"></span>
                      {opportunity}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6 text-cinema-text">
                {t('contact.sendMessage')}
              </h3>

              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-cinema-muted mb-2">
                      {t('contact.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-cinema-elevated/40 border border-white/10 text-cinema-text focus:border-cinema-accent/60 focus:outline-none focus:ring-2 focus:ring-cinema-accent/10 transition-all"
                      placeholder={t('contact.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-cinema-muted mb-2">
                      {t('contact.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-cinema-elevated/40 border border-white/10 text-cinema-text focus:border-cinema-accent/60 focus:outline-none focus:ring-2 focus:ring-cinema-accent/10 transition-all"
                      placeholder={t('contact.emailPlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-cinema-muted mb-2">
                    {t('contact.subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-cinema-elevated/40 border border-white/10 text-cinema-text focus:border-cinema-accent/60 focus:outline-none focus:ring-2 focus:ring-cinema-accent/10 transition-all"
                    placeholder={t('contact.subjectPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-cinema-muted mb-2">
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-cinema-elevated/40 border border-white/10 text-cinema-text focus:border-cinema-accent/60 focus:outline-none focus:ring-2 focus:ring-cinema-accent/10 transition-all resize-none"
                    placeholder={t('contact.messagePlaceholder')}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold bg-cinema-soft text-cinema-bg transition-transform duration-300 ease-cinematic"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleEmailSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold border border-white/20 bg-transparent text-cinema-text transition-colors duration-300 ease-cinematic hover:border-cinema-text/60"
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
