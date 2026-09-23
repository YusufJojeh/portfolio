'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ChapterLabel from '../ChapterLabel';
import { experiences } from '@/lib/data/portfolio';

export default function ExperienceTimeline() {
  const t = useTranslations('experience');
  const s = useTranslations('story.experience');

  return (
    <section id="experience" className="relative bg-cinema-bg px-6 md:px-16 lg:px-24 py-24 md:py-36">
      <div className="max-w-4xl mx-auto">
        <ChapterLabel className="mb-4">{s('chapterLabel')}</ChapterLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl font-bold text-cinema-text tracking-tight mb-4"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="text-cinema-muted leading-relaxed max-w-2xl mb-16"
        >
          {t('subtitle')}
        </motion.p>

        <div className="space-y-12">
          {experiences.map((exp, i) => {
            const listItem = t.raw(`list.exp${exp.id}`);
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                className="border-l border-white/10 pl-6 md:pl-8 relative"
              >
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-cinema-accent" />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h3 className="text-lg font-semibold text-cinema-text">{listItem.title}</h3>
                  <span className="text-xs font-mono uppercase tracking-wide text-cinema-accent">{listItem.period}</span>
                </div>
                <p className="text-sm text-cinema-muted mb-4">
                  {listItem.company} · {listItem.location}
                </p>
                <ul className="space-y-2">
                  {listItem.description.map((line, idx) => (
                    <li key={idx} className="text-sm text-cinema-text-alt/85 leading-relaxed flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="text-[11px] text-cinema-muted border border-white/10 rounded-full px-2.5 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
