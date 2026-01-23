'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { Github, Star, Code } from 'lucide-react';
import { projects } from '@/lib/data/portfolio';

const Projects = () => {
  const t = useTranslations();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [filter, setFilter] = useState('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.featured);

  const categories = [
    { key: 'all', label: t('projects.allProjects'), count: projects.length },
    { key: 'featured', label: t('projects.featured'), count: projects.filter(p => p.featured).length },
  ];

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">
              {t('projects.title')}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="flex gap-2 p-1 glass rounded-lg">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setFilter(category.key)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    filter === category.key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const projectKey = `project${project.id}`;
              const projectTitle = t(`projects.list.${projectKey}.title`);
              const projectDescription = t(`projects.list.${projectKey}.description`);
              
              return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="glass-card h-full flex flex-col">
                  {/* Project Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {projectTitle}
                      </h3>
                      {project.featured && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white rounded-full text-xs font-medium">
                          <Star className="w-3 h-3" />
                          {t('projects.featured')}
                        </div>
                      )}
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                      {projectDescription}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs font-medium">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Link - Spans full width at bottom */}
                  <div className="mt-auto p-6 pt-0">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-800 dark:bg-slate-700 text-white rounded-lg text-sm font-medium hover:bg-slate-700 dark:hover:bg-slate-600 transition-all duration-200 group-hover:shadow-lg"
                      >
                        <Github className="w-4 h-4" />
                        <span>{t('projects.viewGithub')}</span>
                        <Code className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>

          {/* Projects Summary */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="glass-card p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">
                {t('projects.statistics')}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {projects.length}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">{t('projects.totalProjects')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {projects.filter(p => p.featured).length}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">{t('projects.featuredProjects')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {projects.filter(p => p.githubUrl).length}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">{t('projects.openSource')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
