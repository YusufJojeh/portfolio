'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { useReducedMotionPref } from './useMedia';
import { SceneProgressContext } from './sceneProgress';

/**
 * A tall scroll track with a pinned full-viewport stage. Children read the
 * track's 0→1 progress through useSceneProgress(). Under reduced motion the
 * track collapses to a normal, unpinned section.
 *
 * `markers` lets one track hold several chapters: each marker becomes an
 * invisible anchor spanning its [from, to] progress range, so nav links and
 * the chapter rail can target a chapter that lives inside a longer scene.
 */
export default function StickyScene({
  id,
  chapter,
  label,
  length = 2,
  className = '',
  stageClassName = '',
  markers,
  children,
}) {
  const trackRef = useRef(null);
  const reduced = useReducedMotionPref();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={trackRef}
      id={id}
      data-chapter={markers ? undefined : chapter}
      aria-label={label}
      className={`relative ${className}`}
      style={{ height: reduced ? 'auto' : `${length * 100}svh` }}
    >
      {!reduced &&
        markers?.map((m) => {
          // Progress p maps to track offset p * (length - 1) / length.
          const k = (length - 1) / length;
          return (
            <div
              key={m.id}
              id={m.id}
              data-chapter={m.chapter}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0"
              style={{ top: `${m.from * k * 100}%`, height: `${(m.to - m.from) * k * 100}%` }}
            />
          );
        })}
      <div
        className={`${reduced ? 'relative min-h-[100svh]' : 'sticky top-0 h-[100svh]'} w-full overflow-hidden isolate ${stageClassName}`}
        // translateZ gives the pinned stage its own containing block so absolutely
        // positioned overlays never bleed into neighbouring scenes mid-transition.
        style={{ transform: 'translateZ(0)' }}
      >
        <SceneProgressContext.Provider value={scrollYProgress}>
          {children}
        </SceneProgressContext.Provider>
      </div>
    </section>
  );
}
