'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2, Target } from 'lucide-react';

const WhyHireMe = () => {
  const t = useTranslations();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const points = t.raw('whyHireMe.points');

  return (
    <section className="section-padding">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Target className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {t('whyHireMe.title')}
            </h2>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {t('whyHireMe.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 glass-card rounded-xl p-5"
              >
                <CheckCircle2 className="w-6 h-6 text-primary-500 dark:text-primary-400 mt-0.5 shrink-0" />
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyHireMe;
