export default function ChapterLabel({ index, children, className = '' }) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.28em] text-cinema-muted ${className}`}
    >
      <span className="text-cinema-cream/80" dir="ltr">{index}</span>
      <span aria-hidden="true" className="mx-2 text-cinema-steel">/</span>
      {children}
    </p>
  );
}
