'use client';

import { motion } from 'framer-motion';
import { EASE, STAGGER } from '../../engine/motion';

/*
 * The system as tiers, read from the edge inward. Each tier enters with its
 * parts following one after another, and a connector draws down into the
 * next tier, so the eye is led through the stack in request order. Pointing
 * at a tier quiets the others (fine pointers only).
 */

const tierV = {
  hidden: {},
  shown: { transition: { staggerChildren: STAGGER * 0.8, delayChildren: 0.1 } },
};
const rise = {
  hidden: { opacity: 0, y: 10 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const draw = {
  hidden: { scaleY: 0 },
  shown: { scaleY: 1, transition: { duration: 0.5, ease: EASE, delay: 0.35 } },
};

export default function ArchitectureStack({ tiers, delivery }) {
  return (
    <div className="group/arch">
      {tiers.map((tier, i) => (
        <motion.div
          key={tier.id}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.5 }}
          variants={tierV}
          className="transition-opacity duration-300 [@media(hover:hover)]:group-hover/arch:opacity-45 [@media(hover:hover)]:hover:!opacity-100"
        >
          <div
            className={`grid gap-4 rounded-[4px] border p-5 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8 md:p-6 ${
              tier.core ? 'border-cinema-cream/35 bg-white/[0.035]' : 'border-white/15 bg-cinema-bg'
            }`}
          >
            <motion.div variants={rise}>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-muted">{tier.t}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-cinema-text/60">{tier.d}</p>
            </motion.div>
            <div>
              <ul className="flex flex-wrap gap-2">
                {tier.items.map((it) => (
                  <motion.li
                    key={it}
                    variants={rise}
                    className={`border px-3 py-2 text-[14px] ${
                      tier.core ? 'border-cinema-cream/25 text-cinema-soft' : 'border-white/15 text-cinema-text/85'
                    }`}
                  >
                    {it}
                  </motion.li>
                ))}
              </ul>
              {tier.ids && (
                <motion.p variants={rise} dir="ltr" className="mt-4 font-mono text-[11.5px] leading-relaxed text-cinema-muted rtl:text-right">
                  {tier.ids}
                </motion.p>
              )}
            </div>
          </div>
          {i < tiers.length - 1 && (
            <div aria-hidden="true" className="flex h-8 justify-center md:h-10">
              <motion.span variants={draw} className="block w-px origin-top bg-gradient-to-b from-cinema-cream/60 to-white/10" />
            </div>
          )}
        </motion.div>
      ))}

      {delivery && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-8 border-t border-dashed border-white/20 pt-6 md:grid md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-muted">{delivery.t}</p>
          <p className="mt-2 max-w-[44rem] text-[14.5px] leading-relaxed text-cinema-text/70 md:mt-0">{delivery.d}</p>
        </motion.div>
      )}
    </div>
  );
}
