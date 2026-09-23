'use client';

import Link from 'next/link';
import { motion, useMotionValue } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import StickyScene from '../engine/StickyScene';
import { useSceneProgress } from '../engine/sceneProgress';
import StoryFrame from '../engine/StoryFrame';
import CinematicBackground from '../engine/CinematicBackground';
import ChapterLabel from '../engine/ChapterLabel';
import { useIsMobile, useReducedMotionPref, useStage } from '../engine/useMedia';
import { EASE } from '../engine/motion';

/*
 * Chapters 00–02 share one pinned stage, so every change of scene is a real
 * crossfade on the same frame instead of one section scrolling off another:
 *
 *   00 Opening     portrait + name → copy leaves → camera push → Yusuf fades
 *   01 Operations  the city settles in, signals appear one by one, city dims
 *   02 Rakez       the Rakez frame crossfades over the dimmed city, the camera
 *                  pushes toward the system, then the stage fades to black
 *
 * All values below are positions on the sequence's 0→1 scroll progress.
 */

const LENGTH = 7.2;

const HERO = '/portfolio/story/hero/hero-yusuf-city.webp';
const CUTOUT = '/portfolio/story/hero/hero-yusuf-cutout.webp';
const HERO_ASPECT = 1672 / 941;
// Face sits at ~70% x / ~21% y of the photo.
const HERO_FOCUS = [72, 28];
const HERO_FOCUS_MOBILE = [75, 18];

const CITY = '/portfolio/story/transitions/transition-city-sunset.webp';
// Left and bottom falloff also hides lettering baked into the generated frame.
const CITY_OVERLAY =
  'linear-gradient(90deg, rgba(9,11,15,0.88) 0%, rgba(9,11,15,0.6) 30%, rgba(9,11,15,0.12) 60%, rgba(9,11,15,0.3) 86%, rgba(9,11,15,0.82) 100%), linear-gradient(0deg, rgba(9,11,15,0.92) 0%, rgba(9,11,15,0) 38%)';

// The brand panel of the live Rakez staff login: a real capture, not generated art.
const RAKEZ = '/portfolio/work/rakez/cover.webp';
const RAKEZ_OVERLAY =
  'linear-gradient(90deg, rgba(9,11,15,0.92) 0%, rgba(9,11,15,0.7) 34%, rgba(9,11,15,0.3) 64%, rgba(9,11,15,0.45) 100%), linear-gradient(0deg, rgba(9,11,15,0.85) 0%, rgba(9,11,15,0) 40%), rgba(9,11,15,0.25)';

const MARKERS = [
  { id: 'opening', chapter: '00', from: 0, to: 0.24 },
  { id: 'real-operations', chapter: '01', from: 0.24, to: 0.62 },
  { id: 'rakez', chapter: '02', from: 0.7, to: 1 },
];

/* ------------------------------------------------------------------ */

function Marquee({ text, className = '' }) {
  const run = (
    <span className="flex shrink-0 items-center">
      {[0, 1].map((i) => (
        <span key={i} className="flex items-center">
          <span>{text}</span>
          <span className="mx-[0.28em] text-cinema-steel/70">·</span>
        </span>
      ))}
    </span>
  );
  return (
    <div dir="ltr" aria-hidden="true" className={`pointer-events-none select-none overflow-hidden ${className}`}>
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {run}
        {run}
      </div>
    </div>
  );
}

function Enter({ delay = 0, className = '', children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------- 00 Opening --------------------------- */

function HeroCopy({ p }) {
  const t = useTranslations('final.opening');
  const locale = useLocale();
  const opacity = useStage(p, [0, 0.07], [1, 0], 1);
  const y = useStage(p, [0, 0.07], [0, -24], 0);
  const lines = t.raw('headlineLines');
  const mobileLines = t.raw('headlineLinesMobile');

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 bottom-0 z-30 px-6 pb-20 md:px-12 md:pb-[15svh] lg:px-16"
    >
      <div className="mr-auto max-w-[36rem]">
        <Enter delay={0.5}>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.26em] text-cinema-cream/75 md:text-[11px]">
            {t('role')}
          </p>
        </Enter>
        <Enter delay={0.65}>
          <h1 className="mt-4 font-display text-[46px] font-normal leading-[0.98] tracking-[-0.01em] text-cinema-soft md:mt-5 md:text-[clamp(52px,4.6vw,68px)]">
            <span className="md:hidden">
              {mobileLines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </span>
            <span className="hidden md:inline">
              {lines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </span>
          </h1>
        </Enter>
        <Enter delay={0.8}>
          <p className="mt-4 max-w-[30rem] text-[14.5px] leading-relaxed text-cinema-text/70 md:mt-6 md:text-[16px]">
            <span className="md:hidden">{t('supportShort')}</span>
            <span className="hidden md:inline">{t('support')}</span>
          </p>
        </Enter>
        <Enter delay={0.95} className="mt-6 flex flex-wrap items-center gap-3 md:mt-8">
          <Link
            href={`/${locale}#rakez`}
            className="inline-flex items-center gap-2 rounded-[3px] bg-cinema-cream px-5 py-3 text-[13.5px] font-medium text-cinema-bg transition-colors duration-200 hover:bg-cinema-soft"
          >
            {t('ctaPrimary')}
            <span aria-hidden="true" className="rtl:-scale-x-100">→</span>
          </Link>
          <Link
            href={`/${locale}#closing`}
            className="inline-flex items-center rounded-[3px] border border-white/25 px-5 py-3 text-[13.5px] font-medium text-cinema-text transition-colors duration-200 hover:border-white/60"
          >
            {t('ctaSecondary')}
          </Link>
        </Enter>
      </div>
    </motion.div>
  );
}

function HeroBaseline({ p }) {
  const t = useTranslations('final.opening');
  const opacity = useStage(p, [0, 0.05], [1, 0], 1);
  const micro = t.raw('microcopy');
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-x-0 bottom-0 z-30 px-6 pb-6 md:px-12 md:pb-7 lg:px-16"
    >
      <Enter delay={1.2}>
        <div className="flex items-center justify-between gap-6 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-cinema-muted">
          <span className="hidden md:inline">
            {micro.map((m, i) => (
              <span key={m}>
                {i > 0 && <span aria-hidden="true" className="mx-2.5 text-cinema-steel">/</span>}
                {m}
              </span>
            ))}
          </span>
          <span className="hidden lg:inline">{t('location')}</span>
          <span className="flex items-center gap-2.5">
            {t('scroll')}
            <span aria-hidden="true" className="block h-3 w-px bg-cinema-cream/50" />
          </span>
        </div>
      </Enter>
    </motion.div>
  );
}

/** Portrait, moving name and cutout. Photo and cutout share one camera. */
function HeroPortrait({ p, reduced }) {
  const t = useTranslations('final.opening');
  const mobile = useIsMobile();
  const scale = useStage(p, [0, 0.1, 0.24], [1.06, 1, 1.045], 1);
  const y = useStage(p, [0, 0.1], [0, mobile ? -15 : -40], 0);
  const marquee = useStage(p, [0.03, 0.12], [1, 0], 1);
  const dim = useStage(p, [0.1, 0.19], [0, 0.55], 0);
  const fade = useStage(p, [0.15, 0.23], [1, 0], 1);

  const camera = { scale, y, transformOrigin: '72% 30%' };
  const cameraClass = 'absolute inset-x-0 top-0 h-[calc(100%+48px)] will-change-transform';
  const frame = { aspect: HERO_ASPECT, focus: HERO_FOCUS, mobileFocus: HERO_FOCUS_MOBILE };

  return (
    <motion.div style={{ opacity: reduced ? 1 : fade }} className="absolute inset-0 isolate">
      <motion.div className={`${cameraClass} z-0`} style={camera}>
        <StoryFrame src={HERO} alt={t('portraitAlt')} priority {...frame} />
      </motion.div>

      <motion.div style={{ opacity: marquee }} className="absolute inset-x-0 top-[15svh] z-10 md:top-[15svh]">
        <Marquee
          text={t('name')}
          className="font-grotesk text-[26vw] font-semibold leading-none tracking-[-0.035em] text-cinema-cream md:text-[clamp(88px,15.5vw,280px)]"
        />
      </motion.div>

      <motion.div className={`${cameraClass} z-20`} style={camera} aria-hidden="true">
        <StoryFrame src={CUTOUT} priority {...frame} />
      </motion.div>

      {/* Grade above the cutout so figure and photo stay one exposure. */}
      <div
        className="absolute inset-0 z-[25] hidden md:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(9,11,15,0.86) 0%, rgba(9,11,15,0.55) 30%, rgba(9,11,15,0) 58%), linear-gradient(0deg, rgba(9,11,15,0.9) 0%, rgba(9,11,15,0) 42%), linear-gradient(180deg, rgba(9,11,15,0.5) 0%, rgba(9,11,15,0) 16%)',
        }}
      />
      <div
        className="absolute inset-0 z-[25] md:hidden"
        style={{
          background:
            'linear-gradient(0deg, rgba(9,11,15,0.97) 0%, rgba(9,11,15,0.86) 34%, rgba(9,11,15,0.2) 60%, rgba(9,11,15,0) 70%), linear-gradient(180deg, rgba(9,11,15,0.55) 0%, rgba(9,11,15,0) 14%)',
        }}
      />
      <motion.div className="absolute inset-0 z-[26] bg-cinema-bg" style={{ opacity: dim }} />
    </motion.div>
  );
}

/* --------------------------- 01 Operations -------------------------- */

function CityBackground({ p }) {
  const t = useTranslations('final.operations');
  const mobile = useIsMobile();
  const scale = useStage(p, [0.14, 0.26, 0.52], [1.1, 1.05, 1], 1);
  const y = useStage(p, [0.26, 0.52], [0, mobile ? -15 : -40], 0);
  // Arrives from dark as Yusuf leaves, dims again before Rakez.
  const dim = useStage(p, [0.17, 0.3, 0.5, 0.62], [0.7, 0, 0, 0.72], 0);

  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute inset-x-0 top-0 h-[calc(100%+48px)] will-change-transform"
        style={{ scale, y, transformOrigin: '60% 55%' }}
      >
        <CityImage alt={t('imageAlt')} />
      </motion.div>
      <div className="absolute inset-0" style={{ background: CITY_OVERLAY }} />
      <motion.div className="absolute inset-0 bg-cinema-bg" style={{ opacity: dim }} />
    </div>
  );
}

function CityImage({ alt }) {
  return (
    <StoryFrame
      src={CITY}
      alt={alt}
      aspect={1672 / 941}
      focus={[60, 50]}
      mobileFocus={[66, 50]}
      bleed={0}
      sizes="(max-width: 767px) 400vw, 125vw"
    />
  );
}

function Signal({ p, i, children }) {
  const at = 0.34 + i * 0.035;
  const opacity = useStage(p, [at, at + 0.03], [0, 1], 1);
  const x = useStage(p, [at, at + 0.03], [-12, 0], 0);
  return (
    <motion.li style={{ opacity, x }} className="flex gap-4 border-t border-white/10 py-3.5 md:py-4">
      <span dir="ltr" className="pt-0.5 font-mono text-[10.5px] tracking-[0.2em] text-cinema-steel">
        0{i + 1}
      </span>
      <span className="text-[15px] leading-snug text-cinema-text/85 md:text-[16px]">{children}</span>
    </motion.li>
  );
}

function OperationsCopy({ p }) {
  const t = useTranslations('final.operations');
  const c = useTranslations('final.chapters');
  const headIn = useStage(p, [0.27, 0.32], [0, 1], 1);
  const headY = useStage(p, [0.27, 0.33], [28, 0], 0);
  const bodyIn = useStage(p, [0.3, 0.35], [0, 1], 1);
  const out = useStage(p, [0.53, 0.58], [1, 0], 1);
  const outY = useStage(p, [0.53, 0.58], [0, -24], 0);
  const signals = t.raw('signals');

  return (
    <motion.div
      style={{ opacity: out, y: outY }}
      className="absolute inset-0 z-30 flex items-center px-6 pt-16 md:px-12 lg:px-16"
    >
      <div className="mr-auto w-full max-w-[34rem]">
        <motion.div style={{ opacity: headIn, y: headY }}>
          <ChapterLabel index="01">{c('01')}</ChapterLabel>
          <h2 className="mt-5 font-display text-[40px] leading-[1.02] text-cinema-soft md:text-[clamp(48px,4.4vw,64px)]">
            {t('heading')}
          </h2>
        </motion.div>
        <motion.p
          style={{ opacity: bodyIn }}
          className="mt-5 max-w-[30rem] text-[15px] leading-relaxed text-cinema-text/70 md:mt-6 md:text-[16px]"
        >
          {t('body')}
        </motion.p>
        <ul className="mt-7 md:mt-9">
          {signals.map((s, i) => (
            <Signal key={s} p={p} i={i}>{s}</Signal>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ------------------------------ 02 Rakez ---------------------------- */

function RakezBackground({ p }) {
  const t = useTranslations('final.rakez');
  const mobile = useIsMobile();
  const opacity = useStage(p, [0.6, 0.68], [0, 1], 1);
  // Settle as it arrives, then a slow push toward the system panels.
  const scale = useStage(p, [0.6, 0.72, 0.8, 0.94], [1.05, 1, 1, mobile ? 1.1 : 1.14], 1);
  const y = useStage(p, [0.6, 0.72], [0, mobile ? -15 : -30], 0);
  const dim = useStage(p, [0.8, 0.86, 0.95, 1], [mobile ? 0.25 : 0, mobile ? 0.55 : 0.35, mobile ? 0.55 : 0.35, 1], 0.35);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div
        className="absolute inset-x-0 top-0 h-[calc(100%+48px)] will-change-transform"
        style={{ scale, y, transformOrigin: '50% 42%' }}
      >
        <StoryFrame
          src={RAKEZ}
          alt={t('imageAlt')}
          aspect={736 / 900}
          mobileSrc="/portfolio/work/rakez/mobile.webp"
          mobileAspect={780 / 800}
          focus={[50, 42]}
          mobileFocus={[50, 42]}
          bleed={0}
        />
      </motion.div>
      <div className="absolute inset-0" style={{ background: RAKEZ_OVERLAY }} />
      <motion.div className="absolute inset-0 bg-cinema-bg" style={{ opacity: dim }} />
    </motion.div>
  );
}

function RakezCopy({ p }) {
  const t = useTranslations('final.rakez');
  const c = useTranslations('final.chapters');
  const locale = useLocale();
  const titleIn = useStage(p, [0.67, 0.73], [0, 1], 1);
  const titleY = useStage(p, [0.67, 0.74, 0.82, 0.86], [36, 0, 0, -28], 0);
  const titleOut = useStage(p, [0.82, 0.86], [1, 0], 1);
  const listIn = useStage(p, [0.85, 0.89], [0, 1], 1);
  const listY = useStage(p, [0.85, 0.9], [24, 0], 0);
  const out = useStage(p, [0.955, 0.99], [1, 0], 1);
  const items = t.raw('items');
  const stack = t.raw('stack');

  return (
    <motion.div style={{ opacity: out }} className="absolute inset-0 z-30 px-6 md:px-12 lg:px-16">
      {/* Arrival: the title over the full frame. */}
      <motion.div
        style={{ opacity: titleIn, y: titleY }}
        className="absolute inset-x-6 bottom-[14svh] md:inset-x-12 lg:inset-x-16"
      >
        <motion.div style={{ opacity: titleOut }} className="mr-auto max-w-[36rem]">
          <ChapterLabel index="02">{c('02')}</ChapterLabel>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-muted">{t('kicker')}</p>
          <h2 dir="ltr" className="mt-3 font-display text-[64px] leading-[0.95] text-cinema-soft md:text-[clamp(80px,8vw,128px)]">
            {t('title')}
          </h2>
          <p className="mt-5 max-w-[30rem] text-[15px] leading-relaxed text-cinema-text/75 md:text-[16px]">{t('lede')}</p>
        </motion.div>
      </motion.div>

      {/* After the push: what the system handles. */}
      <motion.div
        style={{ opacity: listIn, y: listY }}
        className="absolute inset-0 flex items-center px-6 pb-10 pt-20 md:px-12 md:pb-16 lg:px-16"
      >
        <div className="mr-auto w-full max-w-[34rem]">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cinema-muted">
            <span dir="ltr" className="text-cinema-cream/80">{t('title')}</span>
            <span aria-hidden="true" className="mx-2 text-cinema-steel">/</span>
            {t('handles')}
          </p>
          <ul className="mt-4 md:mt-6">
            {items.map((it) => (
              <li key={it.t} className="border-t border-white/10 py-2.5 md:grid md:grid-cols-[9rem_1fr] md:gap-4 md:py-3.5">
                <span className="block text-[14px] font-medium text-cinema-soft md:text-[15px]">{it.t}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-cinema-text/65 md:mt-0 md:text-[15px] md:text-cinema-text/70">{it.d}</span>
              </li>
            ))}
          </ul>
          <p dir="ltr" className="mt-4 font-mono text-[10px] leading-relaxed tracking-[0.1em] text-cinema-muted md:mt-5 md:text-[10.5px] md:tracking-[0.12em] rtl:text-right">
            {stack.join('  ·  ')}
          </p>
          <Link
            href={`/${locale}/work/rakez`}
            className="mt-5 inline-flex items-center gap-2 rounded-[3px] border border-white/25 px-5 py-3 text-[13.5px] font-medium text-cinema-text transition-colors duration-200 hover:border-white/60 md:mt-7"
          >
            {t('cta')}
            <span aria-hidden="true" className="rtl:-scale-x-100">→</span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------- Stage ------------------------------ */

function Stage() {
  const p = useSceneProgress();
  return (
    <>
      <CityBackground p={p} />
      <RakezBackground p={p} />
      <HeroPortrait p={p} />
      <HeroCopy p={p} />
      <HeroBaseline p={p} />
      <OperationsCopy p={p} />
      <RakezCopy p={p} />
    </>
  );
}

/* Reduced motion: the same three chapters as still, readable frames. */
function StillSequence() {
  const c = useTranslations('final.chapters');
  const t = useTranslations('final.operations');
  const r = useTranslations('final.rakez');
  const still = useMotionValue(0);
  return (
    <>
      <section id="opening" data-chapter="00" aria-label={c('00')} className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <HeroPortrait p={still} reduced />
        <HeroCopy p={still} />
        <HeroBaseline p={still} />
      </section>
      <section id="real-operations" data-chapter="01" aria-label={c('01')} className="relative min-h-[100svh] overflow-hidden">
        <CinematicBackground src={CITY} alt={t('imageAlt')} overlay={CITY_OVERLAY} focus="60% 50%" />
        <div className="relative min-h-[100svh] [&>div]:relative [&>div]:inset-auto [&>div]:py-28">
          <OperationsCopy p={still} />
        </div>
      </section>
      <section id="rakez" data-chapter="02" aria-label={c('02')} className="relative min-h-[100svh] overflow-hidden">
        <CinematicBackground
          src={RAKEZ}
          alt={r('imageAlt')}
          overlay={`linear-gradient(90deg, rgba(9,11,15,0.9) 0%, rgba(9,11,15,0.55) 55%, rgba(9,11,15,0.35) 100%), rgba(9,11,15,0.5)`}
          focus="50% 42%"
        />
        <div className="relative px-6 py-28 md:px-12 lg:px-16">
          <RakezStill />
        </div>
      </section>
    </>
  );
}

function RakezStill() {
  const t = useTranslations('final.rakez');
  const c = useTranslations('final.chapters');
  const locale = useLocale();
  const items = t.raw('items');
  return (
    <div className="mr-auto max-w-[36rem]">
      <ChapterLabel index="02">{c('02')}</ChapterLabel>
      <h2 dir="ltr" className="mt-5 font-display text-[64px] leading-[0.95] text-cinema-soft md:text-[96px] rtl:text-right">
        {t('title')}
      </h2>
      <p className="mt-5 text-[16px] leading-relaxed text-cinema-text/75">{t('lede')}</p>
      <ul className="mt-8">
        {items.map((it) => (
          <li key={it.t} className="grid gap-1 border-t border-white/10 py-3 md:grid-cols-[8rem_1fr] md:gap-4">
            <span className="text-[15px] font-medium text-cinema-soft">{it.t}</span>
            <span className="text-[15px] text-cinema-text/70">{it.d}</span>
          </li>
        ))}
      </ul>
      <Link href={`/${locale}/work/rakez`} className="mt-8 inline-flex rounded-[3px] border border-white/25 px-5 py-3 text-[13.5px] text-cinema-text">
        {t('cta')}
      </Link>
    </div>
  );
}

export default function OpeningSequence() {
  const reduced = useReducedMotionPref();
  const c = useTranslations('final.chapters');
  if (reduced) return <StillSequence />;
  return (
    <StickyScene length={LENGTH} label={`${c('00')} · ${c('01')} · ${c('02')}`} markers={MARKERS}>
      <Stage />
    </StickyScene>
  );
}
