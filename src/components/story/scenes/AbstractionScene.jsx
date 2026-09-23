'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ChapterLabel from '../ChapterLabel';
import Image from 'next/image';

/**
 * Progressive, project-agnostic diagram generalizing the backend pattern
 * seen across the real case studies. Uses the Dhura art only as a muted
 * background mood layer — never labeled as a real Yusuf project.
 */
export default function AbstractionScene() {
  const t = useTranslations('story.abstraction');
  const steps = t.raw('steps');

  return (
    <section className="relative bg-cinema-bg px-6 md:px-16 lg:px-24 py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08]">
        <Image
          src="/portfolio/work/dhura/login.webp"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-cinema-bg/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <ChapterLabel className="mb-4">{t('chapterLabel')}</ChapterLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl font-bold text-cinema-text tracking-tight mb-5"
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

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
          <ol className="space-y-10">
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10 md:items-center"
              >
                <span className="absolute left-0 md:left-1/2 top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-cinema-accent/50 bg-cinema-bg text-xs font-mono text-cinema-accent">
                  {i + 1}
                </span>
                <div className={i % 2 === 0 ? 'md:text-right md:pr-14' : 'md:col-start-2 md:pl-14'}>
                  <h3 className="text-lg font-semibold text-cinema-text mb-1">{step.title}</h3>
                  <p className="text-sm text-cinema-muted leading-relaxed">{step.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
