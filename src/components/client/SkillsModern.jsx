'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { skillGroups } from '@/lib/data/portfolio';
import AnimatedIcon from '@/components/AnimatedIcon';

const groupIcons = {
  backend: 'code',
  saas: 'building',
  database: 'database',
  frontend: 'layout',
  ai: 'Sparkles',
  devops: 'terminal'
};

const groupColors = {
  backend: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
  saas: 'bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/20',
  database: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
  frontend: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
  ai: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
  devops: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20'
};

const badgeColors = {
  backend: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
  saas: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200',
  database: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  frontend: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
  ai: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200',
  devops: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200'
};

const SkillsModern = () => {
  const t = useTranslations();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="p-3 rounded-2xl bg-primary-500 dark:bg-secondary-500 text-white">
              <AnimatedIcon name="code" size={32} />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t('skills.title')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: groupIndex * 0.1 }}
              className={`glass-card rounded-2xl p-6 border ${groupColors[group.id]}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-white/50 dark:bg-slate-800/50">
                  <AnimatedIcon name={groupIcons[group.id]} size={20} />
                </div>
                <h3 className="text-lg font-bold">
                  {t(`skills.${group.id}`)}
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                {t(`skills.${group.id}Desc`)}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: groupIndex * 0.1 + skillIndex * 0.03 }}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full ${badgeColors[group.id]}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsModern;
