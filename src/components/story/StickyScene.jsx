'use client';

/**
 * A full-viewport scene. `minHeight` controls how much scroll distance the
 * scene occupies before releasing — pass a taller value (e.g. "180vh") for
 * scenes that want scroll-driven background motion, or "100vh" for a
 * simple full-screen static scene.
 */
export default function StickyScene({ children, minHeight = '100vh', className = '', id }) {
  return (
    <section id={id} className={`relative ${className}`} style={{ minHeight }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {children}
      </div>
    </section>
  );
}
