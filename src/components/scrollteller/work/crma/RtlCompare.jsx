'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { animate, useInView } from 'framer-motion';
import { useReducedMotionPref } from '../../engine/useMedia';
import { EASE } from '../../engine/motion';

/*
 * The same pipeline in English and in Arabic, one over the other. The divider
 * follows a horizontal drag anywhere on the image (vertical swipes still
 * scroll the page) and the arrow keys on the slider. Once, on first view, the
 * divider eases from one side toward the middle to show that it moves.
 * The widget is laid out left to right in both locales: it compares two
 * physical reading directions, so its own geometry must not flip.
 */

export default function RtlCompare({ labels }) {
  const box = useRef(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const reduce = useReducedMotionPref();
  const seen = useInView(box, { once: true, amount: 0.5 });
  const touched = useRef(false);
  const hint = useRef(null);

  useEffect(() => {
    if (!seen || reduce || touched.current) return undefined;
    hint.current = animate(78, 50, { duration: 1.1, ease: EASE, delay: 0.2, onUpdate: (v) => setPos(v) });
    return () => hint.current?.stop();
  }, [seen, reduce]);

  // Any direct input wins over the hint.
  const take = () => {
    touched.current = true;
    hint.current?.stop();
  };

  const fromPointer = useCallback((clientX) => {
    const r = box.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onDown = (e) => {
    take();
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    fromPointer(e.clientX);
  };
  const onMove = (e) => dragging && fromPointer(e.clientX);
  const onUp = () => setDragging(false);

  const value = Math.round(pos);

  return (
    <div dir="ltr">
      <div
        ref={box}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className={`relative select-none overflow-hidden rounded-[4px] border border-white/10 bg-cinema-bg2 [touch-action:pan-y] ${dragging ? 'cursor-grabbing' : 'cursor-ew-resize'}`}
        style={{ aspectRatio: 1.6 }}
      >
        <Image
          src="/portfolio/work/crma/rtl-pipeline.webp"
          alt={labels.altAr}
          width={1600}
          height={1000}
          sizes="(min-width: 1024px) 80vw, 100vw"
          draggable={false}
          className="absolute inset-0 block h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image
            src="/portfolio/work/crma/pipeline.webp"
            alt={labels.altEn}
            width={1600}
            height={1000}
            sizes="(min-width: 1024px) 80vw, 100vw"
            draggable={false}
            className="block h-full w-full object-cover object-top"
          />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-[3px] bg-cinema-bg/85 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-cinema-cream">
          {labels.en}
        </span>
        <span lang="ar" dir="rtl" className="pointer-events-none absolute right-3 top-3 rounded-[3px] bg-cinema-bg/85 px-2.5 py-1 font-arabic text-[13px] text-cinema-cream">
          {labels.ar}
        </span>

        {/* Divider and handle. The real control is the range input below; this mirrors its value and focus. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-px bg-cinema-cream/90" style={{ left: `${pos}%` }}>
          <span
            className={`absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-cinema-bg/90 font-mono text-[13px] text-cinema-cream shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] transition-[transform,border-color] duration-150 ${
              dragging ? 'scale-95 border-cinema-cream' : 'border-white/40'
            }`}
          >
            ⇆
          </span>
        </div>
      </div>

      <label className="mt-4 flex items-center gap-4">
        <span className="sr-only">{labels.slider}</span>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          aria-valuetext={labels.valueText.replace('{value}', value)}
          onChange={(e) => {
            take();
            setPos(Number(e.target.value));
          }}
          className="h-11 w-full cursor-ew-resize accent-[#EFEEE9]"
        />
      </label>
    </div>
  );
}
