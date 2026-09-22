'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { Search, MapPin } from 'lucide-react';

const CurrentlySeeking = () => {
  const t = useTranslations();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Search className="w-7 h-7 text-primary-600 dark:text-primary-400" />
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">
              {t('seeking.title')}
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-8"
          >
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              {t('seeking.description')}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" />
              {t('seeking.relocateNote')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentlySeeking;
