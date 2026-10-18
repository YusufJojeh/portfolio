'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll } from 'framer-motion';
import { useStage } from '../engine/useMedia';
import Reveal from '../engine/Reveal';
import { Label, Section } from './WorkParts';

/*
 * Building blocks for the evidence-led case studies (Dhura, RestoCafe, Mtjri).
 * Each page composes them in its own order and rhythm; the blocks only fix
 * how a fact, a step, a screen or a claim is shown, so the evidence reads the
 * same way everywhere.
 */

/** Role, domain, status and similar one-line facts under the cover. */
export function Facts({ facts, cols = 4 }) {
  const grid = cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4';
  return (
    <Section className="py-10">
      <dl className={`grid gap-8 border-y border-white/10 py-10 ${grid}`}>
        {facts.map((f) => (
          <div key={f.k}>
            <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-muted">{f.k}</dt>
            <dd className="mt-3 text-[15px] leading-relaxed text-cinema-text/85">{f.v}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/**
 * A workflow read as a sequence. A hairline draws along the steps with the
 * scroll and each step lights once it reaches the middle of the viewport.
 * Horizontal on wide screens when `horizontal` is set, always vertical on
 * phones. Reduced motion: MotionConfig skips the draw; every step stays legible
 * whether lit or not.
 */
export function FlowSteps({ steps, stepLabel, horizontal = false, codes }) {
  const list = useRef(null);
  const items = useRef([]);
  const [active, setActive] = useState(-1);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 70%', 'end 55%'] });
  const line = useStage(scrollYProgress, [0, 1], [0, 1], 1);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive((a) => Math.max(a, Number(e.target.dataset.index)));
        }
      },
      { rootMargin: '-40% 0px -45% 0px' },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Literal class names so Tailwind can see them.
  const COLS = { 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6', 7: 'lg:grid-cols-7' };
  const rowLayout = horizontal ? `lg:grid lg:gap-6 ${COLS[steps.length] ?? 'lg:grid-cols-6'}` : '';

  return (
    <div ref={list} className="relative">
      <span aria-hidden="true" className={`absolute bottom-3 start-[5px] top-3 w-px bg-white/10 ${horizontal ? 'lg:hidden' : ''}`} />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: line }}
        className={`absolute bottom-3 start-[5px] top-3 w-px origin-top bg-cinema-cream/70 ${horizontal ? 'lg:hidden' : ''}`}
      />
      <ol className={`relative ${rowLayout}`}>
        {steps.map((s, i) => {
          const lit = i <= active;
          return (
            <li
              key={s.t}
              ref={(el) => (items.current[i] = el)}
              data-index={i}
              className={`relative ps-10 pb-12 last:pb-0 ${horizontal ? 'lg:border-t lg:border-white/15 lg:ps-0 lg:pb-0 lg:pt-8' : 'md:pb-16'}`}
            >
              <span
                aria-hidden="true"
                className={`absolute start-0 top-[0.4rem] h-[11px] w-[11px] rounded-full border transition-[background-color,border-color] duration-300 ${
                  horizontal ? 'lg:-top-[6px]' : ''
                } ${lit ? 'border-cinema-cream bg-cinema-cream' : 'border-white/30 bg-cinema-bg'}`}
              />
              <p dir="ltr" className="font-mono text-[11px] tracking-[0.2em] text-cinema-muted rtl:text-right">
                <span className="sr-only">{stepLabel} </span>
                {String(i + 1).padStart(2, '0')}
                {codes?.[i] && <span className="ms-3 text-cinema-steel">{codes[i]}</span>}
              </p>
              <h3
                className={`mt-2 font-display text-[26px] leading-[1.05] transition-colors duration-300 md:text-[30px] ${
                  lit ? 'text-cinema-soft' : 'text-cinema-text/55'
                }`}
              >
                {s.t}
              </h3>
              {s.d && <p className="mt-3 max-w-[34rem] text-[15px] leading-relaxed text-cinema-text/70">{s.d}</p>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Numbered engineering decisions: what was decided and why. */
export function Decisions({ title, items }) {
  return (
    <Section className="py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Label as="h2">{title}</Label>
        </div>
        <ol className="border-t border-white/15">
          {items.map((l, i) => (
            <Reveal
              as="li"
              key={l.t}
              className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 border-b border-white/10 py-8 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1.3fr)] md:gap-x-10 md:py-10"
            >
              <span dir="ltr" className="font-display text-[34px] leading-none text-cinema-steel md:text-[48px]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-[24px] leading-tight text-cinema-soft md:text-[30px]">{l.t}</h3>
              <p className="col-start-2 mt-3 text-[15px] leading-relaxed text-cinema-text/70 md:col-start-3 md:mt-1 md:text-[16px]">
                {l.d}
              </p>
              {l.code && (
                <p dir="ltr" className="col-start-2 mt-3 break-all font-mono text-[11px] text-cinema-steel md:col-start-3 rtl:text-right">
                  {l.code}
                </p>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/**
 * Real screens, plain. The first one leads at full width; the rest sit two to
 * a row. Images are lazy below the fold and sized to the column they fill.
 */
export function Gallery({ label, intro, shots, ratio = 1600 / 1000 }) {
  const [lead, ...rest] = shots;
  const frame = 'overflow-hidden rounded-[3px] border border-white/10 bg-cinema-bg2';
  const cap = 'mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cinema-muted';
  return (
    <Section className="py-20 md:py-28">
      <Label as="h2">{label}</Label>
      {intro && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-cinema-text/70">{intro}</p>}
      <Reveal as="figure" className="m-0 mt-12">
        <div className={frame} style={{ aspectRatio: ratio }}>
          <Image src={lead.src} alt={lead.alt} sizes="88vw" width={1600} height={Math.round(1600 / ratio)} className="block h-full w-full object-cover object-top" />
        </div>
        <figcaption className={cap}>{lead.caption}</figcaption>
      </Reveal>
      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-14">
        {rest.map((s) => (
          <Reveal as="figure" key={s.src} className="m-0">
            <div className={frame} style={{ aspectRatio: ratio }}>
              <Image src={s.src} alt={s.alt} sizes="(min-width: 768px) 44vw, 100vw" width={1600} height={Math.round(1600 / ratio)} className="block h-full w-full object-cover object-top" />
            </div>
            <figcaption className={cap}>{s.caption}</figcaption>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/** What the audit verified, and what the page deliberately does not claim. */
export function Claims({ labels, verified, notClaimed, tests }) {
  return (
    <Section className="bg-cinema-bg2 py-20 md:py-28">
      <div className="grid gap-14 md:grid-cols-2 md:gap-16">
        <div>
          <Label as="h2">{labels.verified}</Label>
          <ul className="mt-8 border-t border-white/10">
            {verified.map((v) => (
              <li key={v} className="flex gap-4 border-b border-white/10 py-4 text-[15px] leading-relaxed text-cinema-text/80">
                <span aria-hidden="true" className="pt-[2px] font-mono text-[12px] text-cinema-cream/80">✓</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
          {tests && <p className="mt-6 max-w-[34rem] text-[14px] leading-relaxed text-cinema-text/60">{tests}</p>}
        </div>
        <div>
          <Label as="h2">{labels.notClaimed}</Label>
          <ul className="mt-8 border-t border-white/10">
            {notClaimed.map((v) => (
              <li key={v} className="flex gap-4 border-b border-white/10 py-4 text-[15px] leading-relaxed text-cinema-text/65">
                <span aria-hidden="true" className="pt-[2px] font-mono text-[12px] text-cinema-steel">—</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
