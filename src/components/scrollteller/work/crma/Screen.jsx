'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { EASE, DURATION } from '../../engine/motion';

/*
 * The evidence layer for CRMA. Captures sit plainly: a hairline frame, no
 * device chrome, no retouching. Crops are done only by positioning the
 * unmodified image inside a smaller window, never by editing pixels.
 */

const BASE = { w: 1600, h: 1000 };
const src = (file) => `/portfolio/work/crma/${file}.webp`;

/** A capture that rises into place and settles from a slight overscale as it enters. */
export function Screen({ file, alt, caption, sizes = '(min-width: 1024px) 60vw, 100vw', priority = false, className = '', delay = 0 }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: DURATION.reveal, ease: EASE, delay }}
      className={`m-0 ${className}`}
    >
      <Frame file={file} alt={alt} sizes={sizes} priority={priority} />
      {caption && (
        <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cinema-muted">{caption}</figcaption>
      )}
    </motion.figure>
  );
}

/** The bare frame, for places that animate it themselves. */
export function Frame({ file, alt, sizes = '100vw', priority = false, ratio = BASE.w / BASE.h, className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-[4px] border border-white/10 bg-cinema-bg2 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src(file)}
        alt={alt}
        sizes={sizes}
        width={BASE.w}
        height={Math.round(BASE.w / ratio)}
        priority={priority}
        className="block h-full w-full object-cover object-top"
      />
    </div>
  );
}

/**
 * A window onto one region of a capture, at a larger scale. `region` is in
 * the 1600px capture's pixels; the image itself is the full-resolution
 * `-hires` source so the enlargement stays sharp. `vw` is the window's width
 * in viewport units at desktop and phone sizes, used to request the right
 * file size. With an empty alt the crop is a visual echo of a frame already
 * on the page, so it is hidden from assistive tech.
 */
export function Crop({ file, region, alt = '', vw = [30, 80], className = '' }) {
  const { x, y, w, h } = region;
  const scale = BASE.w / w;
  const sizes = `(min-width: 768px) ${Math.round(vw[0] * scale)}vw, ${Math.round(vw[1] * scale)}vw`;
  return (
    <div
      aria-hidden={alt ? undefined : true}
      className={`relative overflow-hidden rounded-[4px] border border-white/20 bg-cinema-bg2 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] ${className}`}
      style={{ aspectRatio: w / h }}
    >
      <Image
        src={src(`${file}-hires`)}
        alt={alt}
        sizes={sizes}
        width={BASE.w * 2}
        height={BASE.h * 2}
        className="absolute max-w-none"
        style={{
          width: `${(BASE.w / w) * 100}%`,
          height: `${(BASE.h / h) * 100}%`,
          left: `${(-x / w) * 100}%`,
          top: `${(-y / h) * 100}%`,
        }}
      />
    </div>
  );
}
