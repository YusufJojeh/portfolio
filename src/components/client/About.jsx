'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { GraduationCap, Award, MapPin, Mail, Phone, Github } from 'lucide-react';
import { personalInfo, education, certifications } from '@/lib/data/portfolio';

const About = () => {
  const t = useTranslations();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* About Content */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 gradient-text">
              {t('about.title')}
            </h2>

            <div className="space-y-6">
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {personalInfo.summary}
              </p>

              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('about.summary3')}
              </p>

              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('about.summary4')}
              </p>
            </div>

            {/* Contact Info */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                {t('about.getInTouch')}
              </h3>

              <div className="space-y-3">
                <motion.a
                  href={`tel:${personalInfo.contact.phone}`}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <Phone className="w-5 h-5" />
                  <span>{personalInfo.contact.phone}</span>
                </motion.a>

                <motion.a
                  href={`mailto:${personalInfo.contact.email}`}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <Mail className="w-5 h-5" />
                  <span>{personalInfo.contact.email}</span>
                </motion.a>

                <motion.a
                  href={`https://${personalInfo.contact.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <Github className="w-5 h-5" />
                  <span>{personalInfo.contact.github}</span>
                </motion.a>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-400"
                >
                  <MapPin className="w-5 h-5" />
                  <span>{personalInfo.location}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Education & Certifications */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Education */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                  {t('about.education')}
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                    {t('about.educationDegree')}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    {t('about.educationInstitution')}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    {t('about.educationPeriod')} • {t('about.educationGPA')}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                    {t('about.educationDescription')}
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                  {t('about.certifications')}
                </h3>
              </div>

              <div className="space-y-4">
                {certifications.map((cert, index) => {
                  const certKey = `cert${index + 1}`;
                  return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-2 border-purple-200 dark:border-purple-800 pl-4"
                  >
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                      {t(`about.certificationsList.${certKey}.name`)}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {t(`about.certificationsList.${certKey}.issuer`)}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                      {t(`about.certificationsList.${certKey}.date`)}
                    </p>
                  </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Languages */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                {t('about.languages')}
              </h3>

              <div className="space-y-3">
                {personalInfo.languages.map((lang, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center"
                  >
                    <span className="text-slate-700 dark:text-slate-300">
                      {lang.name}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                      {lang.level}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
