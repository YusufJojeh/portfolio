'use client';

/**
 * A full-viewport scene. `minHeight` controls how much scroll distance the
 * scene occupies before releasing — pass a taller value (e.g. "180vh") for
 * scenes that want scroll-driven background motion, or "100vh" for a
 * simple full-screen static scene.
 *
 * The sticky inner element is forced onto its own compositing/containing-
 * block context via `transform: translateZ(0)`. Per the CSS Positioned
 * Layout spec, `position: sticky` *should* establish a containing block for
 * `position: absolute` descendants, but engines are inconsistent about it
 * while the element transitions between its stuck/unstuck states mid-scroll
 * (verified live: the CinematicBackground overlay's measured rect drifted
 * away from its sticky parent's rect instead of matching it exactly).
 * A `transform` on the sticky element is spec-guaranteed, unconditional,
 * and independent of stuck state, so it reliably clips and scopes each
 * scene's absolutely-positioned background/gradient to its own `h-screen`
 * box — preventing it from bleeding into (and stacking additively on top
 * of) neighboring scenes as the page scrolls.
 */
export default function StickyScene({ children, minHeight = '100vh', className = '', id, containerRef }) {
  return (
    <section ref={containerRef} id={id} className={`relative ${className}`} style={{ minHeight }}>
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center isolate"
        style={{ transform: 'translateZ(0)' }}
      >
        {children}
      </div>
    </section>
  );
}
