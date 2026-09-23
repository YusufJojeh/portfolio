'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { EASE } from '../engine/motion';

const LINKS = [
  { key: 'work', hash: 'rakez' },
  { key: 'approach', hash: 'business-to-system' },
  { key: 'experience', hash: 'experience' },
  { key: 'contact', hash: 'closing' },
];

export default function SiteNav() {
  const t = useTranslations('final.nav');
  const locale = useLocale();
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef(null);
  const firstLink = useRef(null);

  const other = locale === 'ar' ? 'en' : 'ar';
  const switchHref = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${other}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const button = menuButton.current;
    document.body.style.overflow = 'hidden';
    firstLink.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      button?.focus();
    };
  }, [open]);

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-cinema-cream focus:px-3 focus:py-2 focus:text-sm focus:text-cinema-bg"
      >
        {t('skip')}
      </a>
      <header className="fixed inset-x-0 top-0 z-40">
        {/* A soft falloff instead of a bar, so the photography runs to the top edge. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-cinema-bg/85 via-cinema-bg/40 to-transparent transition-opacity duration-500 ease-cinematic ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="relative flex h-16 items-center justify-between px-6 md:px-12 lg:px-16">
          <Link
            href={`/${locale}`}
            className="font-grotesk text-[15px] font-medium tracking-tight text-cinema-cream"
          >
            {t('name')}
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.key}
                href={`/${locale}#${l.hash}`}
                className="text-[13px] text-cinema-muted transition-colors duration-200 hover:text-cinema-cream"
              >
                {t(l.key)}
              </Link>
            ))}
            <Link
              href={switchHref}
              hrefLang={other}
              className="text-[13px] text-cinema-muted transition-colors duration-200 hover:text-cinema-cream"
            >
              {t('language')}
            </Link>
          </nav>

          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-drawer"
            className="rounded-sm border border-white/20 px-3 py-1.5 text-[12px] uppercase tracking-[0.18em] text-cinema-cream md:hidden"
          >
            {t('menu')}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={t('menu')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-50 flex flex-col bg-cinema-bg/95 px-6 backdrop-blur-lg md:hidden"
          >
            <div className="flex h-16 items-center justify-between">
              <span className="font-grotesk text-[15px] font-medium text-cinema-cream">{t('name')}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-sm border border-white/20 px-3 py-1.5 text-[12px] uppercase tracking-[0.18em] text-cinema-cream"
              >
                {t('close')}
              </button>
            </div>
            <ul className="mt-16 flex flex-col gap-6">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.08 + i * 0.06 }}
                >
                  <Link
                    ref={i === 0 ? firstLink : undefined}
                    href={`/${locale}#${l.hash}`}
                    onClick={() => setOpen(false)}
                    className="font-display text-[44px] leading-none text-cinema-cream"
                  >
                    {t(l.key)}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-auto border-t border-white/10 py-6"
            >
              <Link href={switchHref} hrefLang={other} className="text-sm text-cinema-muted">
                {t('language')}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
