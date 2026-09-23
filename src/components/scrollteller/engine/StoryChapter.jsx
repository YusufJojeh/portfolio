export default function StoryChapter({ id, chapter, label, className = '', children }) {
  return (
    <section
      id={id}
      data-chapter={chapter}
      aria-label={label}
      className={`relative px-6 pb-24 pt-20 md:px-12 md:pb-32 md:pt-24 lg:px-16 ${className}`}
    >
      {children}
    </section>
  );
}
