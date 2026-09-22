'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import ChapterLabel from '../ChapterLabel';
import { caseStudies } from '@/lib/data/portfolio';

const GALLERY_IDS = ['matjrii', 'restocafe', 'medical', 'ilogistics', 'mtjri'];

export default function GalleryChapter() {
  const t = useTranslations('story.gallery');

  return (
    <section id="additional-systems" className="relative bg-cinema-bg px-6 md:px-16 lg:px-24 py-24 md:py-36">
      <div className="max-w-6xl mx-auto">
        <ChapterLabel className="mb-4">{t('chapterLabel')}</ChapterLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl font-bold text-cinema-text tracking-tight mb-4"
        >
          {t('heading')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="text-cinema-muted leading-relaxed max-w-2xl mb-16"
        >
          {t('body')}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GALLERY_IDS.map((id, i) => {
            const data = caseStudies.find((c) => c.id === id);
            return <GalleryCard key={id} caseKey={id} githubUrl={data?.githubUrl} stack={data?.stack} delay={i * 0.08} />;
          })}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ caseKey, githubUrl, stack = [], delay }) {
  const t = useTranslations(`caseStudies.cases.${caseKey}`);
  const cs = useTranslations('caseStudies');

  return (
    <motion.a
      href={githubUrl || undefined}
      target={githubUrl ? '_blank' : undefined}
      rel={githubUrl ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className="group block rounded-2xl border border-white/10 bg-cinema-elevated/60 p-8 transition-colors duration-300 ease-cinematic hover:border-cinema-accent/40"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-cinema-text">{t('title')}</h3>
        {githubUrl && (
          <ArrowUpRight
            size={18}
            className="text-cinema-muted transition-transform duration-300 ease-cinematic group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cinema-accent"
          />
        )}
      </div>
      <p className="text-sm text-cinema-muted leading-relaxed mb-6">{t('positioning')}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {(t.raw('highlights') || []).map((h) => (
          <span key={h} className="text-[11px] font-mono uppercase tracking-wide text-cinema-accent/90 border border-cinema-accent/25 rounded-full px-2.5 py-1">
            {h}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {stack.slice(0, 5).map((tech) => (
          <span key={tech} className="text-[11px] text-cinema-muted border border-white/10 rounded-full px-2.5 py-1">
            {tech}
          </span>
        ))}
      </div>

      {githubUrl && (
        <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-cinema-text-alt">
          <Github size={14} />
          {cs('github')}
        </div>
      )}
    </motion.a>
  );
}
