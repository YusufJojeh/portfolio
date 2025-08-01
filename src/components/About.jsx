import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, MapPin, Mail, Phone, Github } from 'lucide-react';
import { personalInfo, education, certifications } from '../data/portfolio.js';

const About = () => {
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
              About Me
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {personalInfo.summary}
              </p>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                I'm passionate about creating scalable web applications and delivering exceptional user experiences. 
                With expertise in both frontend and backend development, I enjoy working on full-stack projects 
                that challenge me to think creatively and solve complex problems.
              </p>

              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or sharing knowledge with the developer community through tutoring and mentoring.
              </p>
            </div>

            {/* Contact Info */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                Get In Touch
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
                  Education
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                    {education.degree}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    {education.institution}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    {education.period} • GPA: {education.gpa}
                  </p>
                  {education.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                      {education.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                  Certifications
                </h3>
              </div>
              
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-2 border-purple-200 dark:border-purple-800 pl-4"
                  >
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                      {cert.name}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {cert.issuer}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                      {cert.date}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                Languages
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