import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '../data/portfolio.js';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = {
    backend: { title: 'Back-End', color: 'blue', icon: '⚙️' },
    frontend: { title: 'Front-End', color: 'purple', icon: '🎨' },
    database: { title: 'Database', color: 'green', icon: '🗄️' },
    devops: { title: 'DevOps', color: 'orange', icon: '🚀' },
    other: { title: 'Other', color: 'pink', icon: '📚' },
  };

  const getSkillsByCategory = (category) => {
    return skills.filter(skill => skill.category === category);
  };

  const getProficiencyColor = (level) => {
    if (level >= 4) return 'text-green-600 dark:text-green-400';
    if (level >= 3) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getProficiencyText = (level) => {
    if (level >= 4) return 'Expert';
    if (level >= 3) return 'Advanced';
    return 'Intermediate';
  };

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

  return (
    <section id="skills" className="section-padding">
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
              Skills & Technologies
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and expertise across various domains
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(categories).map(([categoryKey, category]) => {
              const categorySkills = getSkillsByCategory(categoryKey);
              
              if (categorySkills.length === 0) return null;

              return (
                <motion.div
                  key={categoryKey}
                  variants={itemVariants}
                  className="glass-card p-6"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className={`text-xl font-semibold text-${category.color}-600 dark:text-${category.color}-400`}>
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {categorySkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                            {skill.name}
                          </span>
                          <span className={`text-sm font-medium ${getProficiencyColor(skill.proficiency)}`}>
                            {getProficiencyText(skill.proficiency)}
                          </span>
                        </div>
                        
                        {/* Proficiency Bar */}
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${(skill.proficiency / 5) * 100}%` } : { width: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className={`h-2 rounded-full bg-gradient-to-r from-${category.color}-400 to-${category.color}-600`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Skills Summary */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <div className="glass-card p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">
                Technical Expertise Summary
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {skills.filter(s => s.category === 'backend').length}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">Backend Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {skills.filter(s => s.category === 'frontend').length}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">Frontend Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {skills.filter(s => s.category === 'database').length}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">Database Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                    {skills.filter(s => s.category === 'devops').length}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">DevOps Skills</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 