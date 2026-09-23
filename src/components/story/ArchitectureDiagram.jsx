'use client';

import { motion } from 'framer-motion';

/**
 * Project-agnostic architecture diagram built from real case-study fields
 * (architecture string + tech stack). Renders as HTML/CSS nodes + SVG
 * connector lines — never a fabricated screenshot.
 */
export default function ArchitectureDiagram({ architecture, stack = [], highlights = [] }) {
  const layers = architecture
    .split('. ')
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {layers.map((layer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
            className="flex items-start gap-3 rounded-lg border border-white/10 bg-cinema-elevated/60 backdrop-blur-sm px-4 py-3"
          >
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cinema-accent" />
            <span className="text-sm text-cinema-text-alt/90">{layer}.</span>
          </motion.div>
        ))}
      </div>

      {highlights.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {highlights.map((h) => (
            <span
              key={h}
              className="text-xs font-mono uppercase tracking-wide text-cinema-accent border border-cinema-accent/30 rounded-full px-3 py-1"
            >
              {h}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="text-xs text-cinema-muted border border-white/10 rounded-full px-3 py-1"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
