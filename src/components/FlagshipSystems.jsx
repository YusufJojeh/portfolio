import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { flagshipSystems } from '../data/portfolio';
import {
  Rocket,
  Sparkles,
  Building2,
  Heart,
  ExternalLink,
  Github,
  CheckCircle2
} from 'lucide-react';

const FlagshipSystems = () => {
  const { t } = useTranslation();

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

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Enterprise SaaS':
        return <Building2 className="w-6 h-6" />;
      case 'Healthcare AI':
        return <Heart className="w-6 h-6" />;
      case 'Business Platform':
        return <Rocket className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="flagship" className="section-padding bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container-custom">
        {/* Section Header */}
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
              {t('flagship.title')}
            </h2>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {t('flagship.subtitle')}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {flagshipSystems.map((system, index) => (
            <motion.div
              key={system.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.3 }
              }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-primary-200/20 dark:border-primary-800/20 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary-500 dark:bg-secondary-600 text-white group-hover:shadow-lg transition-all duration-300">
                    <div className="group-hover:animate-rotate">
                      {getTypeIcon(system.type)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {system.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {system.type}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                {system.description}
              </p>

              {/* AI Features */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t('flagship.aiIntegration')}:
                  </span>
                </div>
                <ul className="space-y-1">
                  {system.aiFeatures.map((feature, idx) => (
                    <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                  {t('flagship.techStack')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {system.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {system.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r bg-secondary-500 text-white"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Role */}
              <div className="mb-6 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">
                  {t('flagship.myRole')}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {system.role}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {system.demoUrl && (
                  <motion.a
                    href={system.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('flagship.liveDemo')}
                  </motion.a>
                )}
                {system.githubUrl && (
                  <motion.a
                    href={system.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
                  >
                    <Github className="w-4 h-4" />
                    {t('flagship.github')}
                  </motion.a>
                )}
                {!system.demoUrl && !system.githubUrl && (
                  <div className="flex-1 flex items-center justify-center px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-lg text-sm font-medium">
                    {t('flagship.privateProject')}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {t('flagship.wantMore')}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 dark:bg-secondary-600 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-secondary-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            {t('flagship.getInTouch')}
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FlagshipSystems;
