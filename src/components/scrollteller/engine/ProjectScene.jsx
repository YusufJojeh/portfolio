'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import StickyScene from './StickyScene';
import { useSceneProgress } from './sceneProgress';
import StoryFrame from './StoryFrame';
import ChapterLabel from './ChapterLabel';
import ArtNote from './ArtNote';
import { useIsMobile, useStage } from './useMedia';
import ReducedMotionFallback from './ReducedMotionFallback';

/*
 * An image-led project chapter. It opens from shadow, lets the frame settle,
 * brings the title in, then pushes the camera toward `origin` while the
 * title gives way to the details, and settles into shadow so the next
 * chapter can open from the same darkness.
 *
 * Variants change the composition, not the timing:
 *   left    title low-left, details centred left (default)
 *   lower   title across the lower third, details as a bottom band
 *   arabic  an oversized Arabic title set against the frame
 */

// Phone captures are read at native size, so their UI text needs extra cover under the copy.
const MOBILE_SCRIM = 'linear-gradient(0deg, rgba(9,11,15,0.95) 0%, rgba(9,11,15,0.86) 50%, rgba(9,11,15,0.35) 78%, rgba(9,11,15,0.2) 100%)';

const OVERLAY = {
  left: 'linear-gradient(90deg, rgba(9,11,15,0.92) 0%, rgba(9,11,15,0.66) 36%, rgba(9,11,15,0.28) 66%, rgba(9,11,15,0.5) 100%), linear-gradient(0deg, rgba(9,11,15,0.85) 0%, rgba(9,11,15,0) 42%), rgba(9,11,15,0.2)',
  lower: 'linear-gradient(0deg, rgba(9,11,15,0.96) 0%, rgba(9,11,15,0.78) 34%, rgba(9,11,15,0.18) 70%, rgba(9,11,15,0.45) 100%), rgba(9,11,15,0.22)',
  arabic: 'linear-gradient(270deg, rgba(9,11,15,0.9) 0%, rgba(9,11,15,0.6) 38%, rgba(9,11,15,0.3) 70%, rgba(9,11,15,0.55) 100%), linear-gradient(0deg, rgba(9,11,15,0.88) 0%, rgba(9,11,15,0) 45%), rgba(9,11,15,0.2)',
};

function Frame({ p, image, variant }) {
  const mobile = useIsMobile();
  // Never fully black at either end: progress sits at 0 while the scene scrolls in
  // and at 1 while it scrolls out, so a black frame there reads as an empty gap.
  const fadeIn = useStage(p, [0, 0.06], [0.5, 1], 1);
  const scale = useStage(p, [0, 0.26, 0.4, 0.88], [1.05, 1, 1, mobile ? 1.08 : 1.12], 1);
  const y = useStage(p, [0, 0.3], [0, mobile ? -15 : -30], 0);
  // Light captures need more shade than dark ones: image.dim = [under details, on mobile, under the title].
  const [held, heldMobile, base = 0] = image.dim ?? [0.28, 0.55];
  const hold = mobile ? heldMobile : held;
  const dim = useStage(p, [0.4, 0.5, 0.92, 1], [base, hold, hold, Math.max(hold, 0.72)], 0.4);

  return (
    <motion.div style={{ opacity: fadeIn }} className="absolute inset-0">
      <motion.div
        className="absolute inset-x-0 top-0 h-[calc(100%+48px)] will-change-transform"
        style={{ scale, y, transformOrigin: image.origin ?? '60% 45%' }}
      >
        <StoryFrame
          src={image.src}
          mobileSrc={image.mobileSrc}
          mobileAspect={image.mobileAspect}
          alt={image.alt}
          aspect={image.aspect ?? 1672 / 941}
          focus={image.focus ?? [60, 45]}
          mobileFocus={image.mobileFocus}
          bleed={0}
          // Generated interface art: softened so its invented figures stay atmosphere.
          className={image.illustrative ? 'blur-[2px] max-md:blur-[3px]' : ''}
        />
      </motion.div>
      <div className="absolute inset-0" style={{ background: image.overlay ?? OVERLAY[variant] }} />
      {image.mobileSrc && (
        <div className="absolute inset-0 md:hidden" style={{ background: MOBILE_SCRIM }} />
      )}
      <motion.div className="absolute inset-0 bg-cinema-bg" style={{ opacity: dim }} />
    </motion.div>
  );
}

function Title({ chapter, chapterName, kicker, title, arabicTitle, lede, status, variant }) {
  const arabic = variant === 'arabic';
  return (
    <div className={arabic ? 'ml-auto max-w-[38rem] text-end' : 'mr-auto max-w-[38rem]'}>
      <ChapterLabel index={chapter}>{chapterName}</ChapterLabel>
      {kicker && (
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-muted">{kicker}</p>
      )}
      {arabic ? (
        <h2 className="mt-6 md:mt-4">
          <span lang="ar" dir="rtl" className="block font-arabic text-[96px] font-semibold leading-[1.15] text-cinema-soft md:text-[clamp(140px,14vw,220px)]">
            {arabicTitle}
          </span>
          <span dir="ltr" className="mt-1 block font-display text-[34px] leading-none text-cinema-text/80 md:text-[44px]">
            {title}
          </span>
        </h2>
      ) : (
        <h2 dir="ltr" className="mt-3 font-display text-[60px] leading-[0.95] text-cinema-soft md:text-[clamp(80px,8vw,128px)] rtl:text-right">
          {title}
        </h2>
      )}
      {lede && (
        <p className={`mt-5 max-w-[32rem] text-[15px] leading-relaxed text-cinema-text/75 md:text-[16px] ${arabic ? 'ms-auto' : ''}`}>
          {lede}
        </p>
      )}
      {status && (
        <p className="mt-5 inline-block border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cinema-cream/80">
          {status}
        </p>
      )}
    </div>
  );
}

function CtaLink({ href, children }) {
  return (
    <Link
      href={href}
      className="mt-6 inline-flex items-center gap-2 rounded-[3px] border border-white/25 px-5 py-3 text-[13.5px] font-medium text-cinema-text transition-colors duration-200 hover:border-white/60 md:mt-8"
    >
      {children}
      <span aria-hidden="true" className="rtl:-scale-x-100">→</span>
    </Link>
  );
}

function Stage({ variant, image, titleProps, details, cta }) {
  const p = useSceneProgress();
  const titleIn = useStage(p, [0.05, 0.16], [0, 1], 1);
  const titleY = useStage(p, [0.05, 0.18, 0.4, 0.48], [36, 0, 0, -28], 0);
  const titleOut = useStage(p, [0.4, 0.48], [1, 0], 1);
  const detailsIn = useStage(p, [0.48, 0.58], [0, 1], 1);
  const detailsY = useStage(p, [0.48, 0.6], [24, 0], 0);
  const out = useStage(p, [0.9, 0.97], [1, 0], 1);
  const note = useStage(p, [0.03, 0.1, 0.9, 0.97], [0, 1, 1, 0], 1);

  const lower = variant === 'lower';
  const arabic = variant === 'arabic';

  return (
    <>
      <Frame p={p} image={image} variant={variant} />
      <motion.div style={{ opacity: out }} className="absolute inset-0 z-30 px-6 md:px-12 lg:px-16">
        <motion.div
          style={{ opacity: titleIn, y: titleY }}
          className="absolute inset-x-6 bottom-[13svh] md:inset-x-12 lg:inset-x-16"
        >
          <motion.div style={{ opacity: titleOut }}>
            <Title {...titleProps} variant={variant} />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: detailsIn, y: detailsY }}
          className={`absolute inset-0 flex px-6 pb-12 pt-24 md:px-12 md:pb-16 lg:px-16 ${
            lower ? 'items-end' : 'items-center'
          }`}
        >
          <div className={`w-full ${lower ? '' : arabic ? 'ml-auto max-w-[34rem] text-start' : 'mr-auto max-w-[34rem]'}`}>
            {details}
            {cta && <CtaLink href={cta.href}>{cta.label}</CtaLink>}
          </div>
        </motion.div>
      </motion.div>
      {image.illustrative && <ArtNote opacity={note} />}
    </>
  );
}

function StillScene({ id, chapter, chapterName, variant, image, titleProps, details, cta }) {
  return (
    <section id={id} data-chapter={chapter} aria-label={chapterName} className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <StoryFrame
          src={image.src}
          mobileSrc={image.mobileSrc}
          mobileAspect={image.mobileAspect}
          alt={image.alt}
          aspect={image.aspect ?? 1672 / 941}
          focus={image.focus ?? [60, 45]}
          mobileFocus={image.mobileFocus}
          bleed={0}
          className={image.illustrative ? 'blur-[3px]' : ''}
        />
        <div className="absolute inset-0" style={{ background: image.overlay ?? OVERLAY[variant] }} />
        {image.mobileSrc && (
          <div className="absolute inset-0 md:hidden" style={{ background: MOBILE_SCRIM }} />
        )}
        <div className="absolute inset-0 bg-cinema-bg/50" />
      </div>
      <div className="relative px-6 py-28 md:px-12 lg:px-16">
        <Title {...titleProps} variant={variant} />
        <div className={`mt-12 ${variant === 'arabic' ? 'ml-auto max-w-[34rem]' : 'max-w-[34rem]'}`}>
          {details}
          {cta && <CtaLink href={cta.href}>{cta.label}</CtaLink>}
        </div>
      </div>
      {image.illustrative && <ArtNote />}
    </section>
  );
}

export default function ProjectScene({
  id,
  chapter,
  chapterName,
  variant = 'left',
  length = 3.2,
  image,
  kicker,
  title,
  arabicTitle,
  lede,
  status,
  details,
  cta,
}) {
  const titleProps = { chapter, chapterName, kicker, title, arabicTitle, lede, status };
  const props = { id, chapter, chapterName, variant, image, titleProps, details, cta };

  return (
    <ReducedMotionFallback fallback={<StillScene {...props} />}>
      <StickyScene id={id} chapter={chapter} label={chapterName} length={length}>
        <Stage {...props} />
      </StickyScene>
    </ReducedMotionFallback>
  );
}
