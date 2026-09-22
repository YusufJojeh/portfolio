'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import ChapterLabel from '../ChapterLabel';
import ArchitectureDiagram from '../ArchitectureDiagram';

/**
 * Typography/diagram-led case-study chapter for projects with no cinematic
 * cover art available. Same real-data contract as CaseStudyChapter
 * (messages/en.json `caseStudies.cases.<caseKey>` + portfolio.js stack),
 * but opens on a large type treatment instead of a photographic cover.
 */
export default function TypographyCaseStudyChapter({
  caseKey,
  chapterLabel,
  githubUrl,
  stack = [],
  tier = 'flagship',
}) {
  const t = useTranslations(`caseStudies.cases.${caseKey}`);
  const cs = useTranslations('caseStudies');
  const s = useTranslations('story.caseStudy');

  return (
    <section
      id={caseKey}
      className="relative bg-cinema-bg px-6 md:px-16 lg:px-24 py-24 md:py-36 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto">
        <ChapterLabel className="mb-6">{chapterLabel}</ChapterLabel>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={
            tier === 'flagship'
              ? 'text-4xl md:text-7xl font-bold text-cinema-text tracking-tight mb-5'
              : 'text-3xl md:text-5xl font-bold text-cinema-text tracking-tight mb-4'
          }
        >
          {t('title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="text-cinema-muted text-base md:text-lg max-w-2xl mb-16"
        >
          {t('positioning')}
        </motion.p>

        <ChapterLabel className="mb-4">{s('realSystemLabel')}</ChapterLabel>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl md:text-3xl font-bold text-cinema-text mb-10"
        >
          {t('type')}
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <Field label={cs('problem')} value={t('problem')} />
          <Field label={cs('myRole')} value={t('role')} />
          <Field label={cs('backendChallenges')} value={t('challenges')} />
          <Field label={cs('aiFeatures')} value={t('aiFeatures')} />
        </div>

        <Field label={cs('businessImpact')} value={t('impact')} className="mb-12" wide />

        <ChapterLabel className="mb-4">{s('architectureLabel')}</ChapterLabel>
        <ArchitectureDiagram
          architecture={t('architecture')}
          stack={stack}
          highlights={t.raw('highlights')}
        />

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-10 text-sm font-medium text-cinema-text-alt hover:text-cinema-accent transition-colors duration-300"
          >
            <Github size={16} />
            {cs('github')}
          </a>
        )}
      </div>
    </section>
  );
}

function Field({ label, value, className = '', wide = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`${className} ${wide ? 'max-w-3xl' : ''}`}
    >
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-cinema-accent mb-2">{label}</p>
      <p className="text-cinema-text-alt/90 leading-relaxed">{value}</p>
    </motion.div>
  );
}
