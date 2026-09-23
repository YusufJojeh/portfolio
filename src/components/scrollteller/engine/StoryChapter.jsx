export default function StoryChapter({ id, chapter, label, className = '', children }) {
  return (
    <section
      id={id}
      data-chapter={chapter}
      aria-label={label}
      className={`relative px-6 py-28 md:px-12 md:py-40 lg:px-16 ${className}`}
    >
      {children}
    </section>
  );
}
