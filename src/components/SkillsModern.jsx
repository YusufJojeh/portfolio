import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { skills } from '../data/portfolio.js';
import AnimatedIcon from './AnimatedIcon';
import { Search } from 'lucide-react';

const CircularProgress = ({ percentage, color, size = 80 }) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="6"
          stroke="currentColor"
          className="text-slate-200 dark:text-slate-700"
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="6"
          stroke="currentColor"
          className={color}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset
          }}
        />
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-sm font-bold"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {percentage}%
        </motion.span>
      </div>
    </div>
  );
};

const SkillCard = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const percentage = (skill.proficiency / 5) * 100;

  const categoryColors = {
    ai: 'text-primary-500',
    backend: 'text-secondary-500',
    frontend: 'text-secondary-500',
    database: 'text-emerald-500',
    devops: 'text-cyan-500',
    other: 'text-purple-500'
  };

  const getProficiencyLabel = (level) => {
    if (level >= 5) return 'expert';
    if (level >= 4) return 'advanced';
    if (level >= 3) return 'intermediate';
    return 'beginner';
  };

  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      data-aos="zoom-in"
      data-aos-delay={index * 50}
      className="glass-card p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        {/* Icon and Progress */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.6 }}
            className="p-3 rounded-xl bg-primary-500 dark:bg-secondary-500 text-white"
          >
            <AnimatedIcon name={skill.icon.toLowerCase()} size={24} />
          </motion.div>

          <CircularProgress
            percentage={percentage}
            color={categoryColors[skill.category]}
          />
        </div>

        {/* Skill Name */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:gradient-text transition-all">
          {skill.name}
        </h3>

        {/* Proficiency Badge */}
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[skill.category]} bg-current/10`}>
            {t(`skills.${getProficiencyLabel(skill.proficiency)}`)}
          </span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`w-2 h-2 rounded-full ${
                  i < skill.proficiency
                    ? categoryColors[skill.category] + ' bg-current'
                    : 'bg-slate-300 dark:bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Hover Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm"
            >
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {skill.proficiency === 5 && "Mastery level with extensive experience"}
                {skill.proficiency === 4 && "Advanced skills with production experience"}
                {skill.proficiency === 3 && "Solid understanding and practical use"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const SkillsModern = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: t('skills.filterAll'), icon: '✨' },
    { id: 'ai', label: t('skills.aiAutomation'), icon: '🤖' },
    { id: 'backend', label: t('skills.backend'), icon: '⚙️' },
    { id: 'frontend', label: t('skills.frontend'), icon: '🎨' },
    { id: 'database', label: t('skills.database'), icon: '🗄️' },
    { id: 'devops', label: t('skills.devops'), icon: '🚀' }
  ];

  const filteredSkills = skills.filter(skill => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container-custom" ref={ref}>
        {/* Section Header */}
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

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('skills.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl glass-card border border-primary-200/20 dark:border-primary-800/20
                         focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
          </div>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary-500 dark:bg-secondary-500 text-white shadow-lg'
                  : 'glass-card hover:shadow-md'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <div className="glass-card p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center gradient-text">
              {t('skills.summary')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {categories.slice(1).map((cat, index) => (
                <motion.div
                  key={cat.id}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                  className="text-center"
                >
                  <motion.div
                    className="text-4xl font-bold gradient-text mb-2"
                    whileHover={{ scale: 1.2 }}
                  >
                    {skills.filter(s => s.category === cat.id).length}
                  </motion.div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {cat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsModern;
