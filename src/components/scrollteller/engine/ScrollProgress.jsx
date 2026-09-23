'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotionPref } from './useMedia';

/** Hairline page progress plus a quiet chapter rail on wide screens. */
export default function ScrollProgress({ showRail = true }) {
  const t = useTranslations('final');
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotionPref();
  const [chapters, setChapters] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-chapter]'));
    setChapters(nodes.map((n) => ({ key: n.dataset.chapter, id: n.id })));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.dataset.chapter);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-cinema-cream/60 rtl:origin-right"
        style={{ scaleX: scrollYProgress }}
      />
      {showRail && chapters.length > 1 && (
        <nav
          aria-label={t('nav.chapters')}
          className={`fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-500 ease-cinematic xl:block ${
            !active || active === '00' ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <ol dir="ltr" className="flex flex-col gap-2.5">
            {chapters.map((c) => {
              const on = c.key === active;
              return (
                <li key={c.key}>
                  <button
                    type="button"
                    onClick={() => jump(c.id)}
                    aria-current={on ? 'step' : undefined}
                    className="group flex w-full items-center justify-end gap-2 font-mono text-[10px] tracking-[0.2em] text-cinema-steel transition-colors duration-200 hover:text-cinema-cream"
                  >
                    <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                      {t(`chapters.${c.key}`)}
                    </span>
                    <span dir="ltr" className={on ? 'text-cinema-cream' : ''}>
                      {c.key}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`h-px bg-current transition-all duration-300 ease-cinematic ${on ? 'w-5' : 'w-2'}`}
                    />
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </>
  );
}
