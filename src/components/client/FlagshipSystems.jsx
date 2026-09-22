'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { caseStudies } from '@/lib/data/portfolio';
import {
  Rocket,
  AlertCircle,
  User,
  Layers,
  Wrench,
  Brain,
  TrendingUp,
  ExternalLink,
  Github
} from 'lucide-react';

const CaseStudies = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const sections = [
    { key: 'problem', icon: AlertCircle, color: 'text-red-600 dark:text-red-400' },
    { key: 'myRole', icon: User, color: 'text-blue-600 dark:text-blue-400', field: 'role' },
    { key: 'architecture', icon: Layers, color: 'text-purple-600 dark:text-purple-400' },
    { key: 'backendChallenges', icon: Wrench, color: 'text-orange-600 dark:text-orange-400', field: 'challenges' },
    { key: 'aiFeatures', icon: Brain, color: 'text-violet-600 dark:text-violet-400' },
    { key: 'businessImpact', icon: TrendingUp, color: 'text-green-600 dark:text-green-400', field: 'impact' }
  ];

  return (
    <section id="case-studies" className="section-padding bg-transparent">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Rocket className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {t('caseStudies.title')}
            </h2>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {t('caseStudies.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-10"
        >
          {caseStudies.map((study) => {
            const k = study.id;
            const title = t(`caseStudies.cases.${k}.title`);
            const positioning = t(`caseStudies.cases.${k}.positioning`);
            const type = t(`caseStudies.cases.${k}.type`);
            const highlights = t.raw(`caseStudies.cases.${k}.highlights`) || [];

            return (
              <motion.div
                key={study.id}
                variants={cardVariants}
                className="glass-card rounded-2xl p-6 md:p-8 border border-primary-200/20 dark:border-primary-800/20"
              >
                {/* Header */}
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        {type}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      {highlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 italic">
                    {positioning}
                  </p>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-5">
                  {sections.map(({ key, icon: Icon, color, field }) => (
                    <div key={key} className="space-y-1.5">
                      <div className={`flex items-center gap-2 ${color}`}>
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wide">
                          {t(`caseStudies.${key}`)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {t(`caseStudies.cases.${k}.${field || key}`)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Stack + Links */}
                <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                      {t('caseStudies.techStack')}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {study.stack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 shrink-0">
                    {study.githubUrl && (
                      <motion.a
                        href={study.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg text-sm font-medium shadow-md"
                      >
                        <Github className="w-4 h-4" />
                        {t('caseStudies.github')}
                      </motion.a>
                    )}
                    {study.demoUrl && (
                      <motion.a
                        href={study.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium shadow-md"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {t('caseStudies.liveDemo')}
                      </motion.a>
                    )}
                    {!study.githubUrl && !study.demoUrl && (
                      <div className="flex items-center px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-lg text-sm font-medium">
                        {t('caseStudies.privateProject')}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {t('caseStudies.wantMore')}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 dark:bg-secondary-600 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-secondary-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            {t('caseStudies.getInTouch')}
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
