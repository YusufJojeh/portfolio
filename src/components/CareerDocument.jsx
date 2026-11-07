export default function CareerDocument({ text }) {
  const blocks = text.trim().match(/```[\s\S]*?```|[^\n]+(?:\n(?!\n)[^\n]+)*/g) || [];
  return <article lang="en" dir="ltr" className="mx-auto max-w-3xl space-y-6 px-6 pb-24 pt-36 text-cinema-text">
    {blocks.map((block, index) => {
      if (block.startsWith('```')) return <pre key={index} className="overflow-x-auto rounded-xl border border-white/15 bg-white/5 p-6 text-sm leading-7">{block.replace(/^```\w*\n|\n```$/g, '')}</pre>;
      if (block.startsWith('# ')) return <h1 key={index} className="font-display text-4xl leading-tight md:text-6xl">{block.slice(2)}</h1>;
      if (block.startsWith('## ')) return <h2 key={index} className="border-t border-white/15 pt-12 font-display text-3xl">{block.slice(3)}</h2>;
      if (block.startsWith('### ')) return <h3 key={index} className="pt-4 text-xl font-semibold">{block.slice(4)}</h3>;
      return <p key={index} className="whitespace-pre-line text-lg leading-8 text-cinema-text/80">{block}</p>;
    })}
  </article>;
}
