'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotionPref } from '../../engine/useMedia';
import { EASE } from '../../engine/motion';

/*
 * A replay of the copilot screen further down the page. The run plays up to
 * the approval gate on its own and stops there; only the viewer's decision
 * moves it on. The proposal, its fields and its reason are copied from the
 * real capture (record content stays in English, as it does in the app's
 * Arabic interface). The timing is illustrative.
 */

const PROPOSAL = {
  ask: 'Saffron asked for a formal proposal — update the deal stage.',
  title: 'Move deal “Saffron Hospitality – WhatsApp channel add-on” to Proposal',
  tool: 'deal.stage_change',
  reason: 'Pricing was shared on the last call and the buyer asked for a formal proposal.',
  rows: [
    ['stage', 'Qualification', 'Proposal'],
    ['status', '', 'open'],
    ['stage_id', '1', '2'],
  ],
};

const RUN = ['started', 'searched', 'proposed', 'waiting'];
const STEP_MS = 520;

export default function GovernanceGate({ labels }) {
  const reduce = useReducedMotionPref();
  const root = useRef(null);
  const replayBtn = useRef(null);
  const [started, setStarted] = useState(false);
  const [shown, setShown] = useState(0); // run steps shown so far
  const [decision, setDecision] = useState(null); // null | 'approved' | 'rejected'

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || shown >= RUN.length) return undefined;
    const id = setTimeout(() => setShown((n) => n + 1), reduce ? 0 : STEP_MS);
    return () => clearTimeout(id);
  }, [started, shown, reduce]);

  const proposed = shown >= 3;
  const atGate = shown >= RUN.length && !decision;

  const decide = useCallback((d) => {
    setDecision(d);
    // The decision buttons disable themselves; hand focus on so a keyboard user is not dropped onto <body>.
    requestAnimationFrame(() => replayBtn.current?.focus());
  }, []);

  const replay = useCallback(() => {
    setDecision(null);
    setShown(0);
  }, []);

  const steps = [
    ...RUN.slice(0, shown),
    ...(decision === 'approved' ? ['approved', 'resumed'] : decision === 'rejected' ? ['rejected'] : []),
  ];
  const status = decision ? labels.steps[decision] : atGate ? labels.steps.waiting : labels.steps[RUN[Math.max(0, shown - 1)]];

  return (
    <div ref={root} className="overflow-hidden rounded-[6px] border border-white/15 bg-cinema-elevated">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5">
        <span className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-cinema-muted">
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              decision === 'approved' ? 'bg-emerald-300' : decision === 'rejected' ? 'bg-cinema-steel' : 'bg-amber-300'
            } ${atGate ? 'motion-safe:animate-pulse' : ''}`}
          />
          {labels.agent}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cinema-muted">{labels.replayOf}</span>
      </div>

      <div className="grid gap-6 p-5 md:p-7">
        <p lang="en" dir="ltr" className="ms-auto max-w-[30rem] rounded-[6px] bg-white/[0.06] px-4 py-2.5 text-[14px] text-cinema-text/85">
          {PROPOSAL.ask}
        </p>

        <ol className="grid gap-2" aria-label={labels.runLabel}>
          <AnimatePresence initial={false}>
            {steps.map((s) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className={`flex items-center gap-3 text-[14px] ${
                  s === 'waiting' && atGate
                    ? 'text-amber-200'
                    : s === 'approved' || s === 'resumed'
                      ? 'text-emerald-200'
                      : 'text-cinema-text/65'
                }`}
              >
                <span aria-hidden="true" className="w-4 text-center font-mono text-[12px]">
                  {s === 'waiting' ? (decision ? '✓' : '◷') : s === 'rejected' ? '×' : '✓'}
                </span>
                {labels.steps[s]}
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>

        <motion.div
          initial={false}
          animate={{ opacity: proposed ? 1 : 0, y: proposed ? 0 : 10 }}
          transition={{ duration: 0.45, ease: EASE }}
          aria-hidden={!proposed}
          className="rounded-[6px] border border-white/15 bg-cinema-bg p-5"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cinema-muted">{labels.proposed}</p>
          <p lang="en" dir="ltr" className="mt-3 text-[15.5px] font-medium leading-snug text-cinema-soft rtl:text-right">
            {PROPOSAL.title}
          </p>
          <p dir="ltr" className="mt-1 font-mono text-[12px] text-cinema-muted rtl:text-right">
            {PROPOSAL.tool}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[12px]">
            <span className="rounded-[3px] border border-amber-200/30 bg-amber-200/10 px-2 py-0.5 text-amber-100">{labels.changesData}</span>
            <span className="px-1 py-0.5 text-amber-200/90">
              {decision === 'approved' ? labels.done : decision === 'rejected' ? labels.rejected : labels.needsReview}
            </span>
          </div>
          <p lang="en" dir="ltr" className="mt-3 text-[13.5px] leading-relaxed text-cinema-text/65 rtl:text-right">
            {PROPOSAL.reason}
          </p>

          <table className="mt-4 w-full border-collapse text-[13.5px]">
            <thead>
              <tr className="border-b border-white/10 text-cinema-muted">
                <th scope="col" className="py-2 text-start font-normal">{labels.field}</th>
                <th scope="col" className="py-2 text-start font-normal">{labels.current}</th>
                <th scope="col" className="py-2 text-start font-normal">{labels.proposedCol}</th>
              </tr>
            </thead>
            <tbody>
              {PROPOSAL.rows.map(([field, from, to], i) => (
                <tr key={field} className="border-b border-white/[0.06]">
                  <th scope="row" dir="ltr" className="py-2 text-start font-mono text-[12.5px] font-normal text-cinema-text/80">
                    {field}
                  </th>
                  <td dir="ltr" className="py-2 text-start text-cinema-text/55">
                    {from && (
                      <span className="relative inline-block">
                        {from}
                        {/* The strike draws across once the proposal is on screen, and stays drawn once approved. */}
                        <motion.span
                          aria-hidden="true"
                          initial={false}
                          animate={{ scaleX: proposed && decision !== 'rejected' ? 1 : 0 }}
                          transition={{ duration: 0.4, ease: EASE, delay: proposed ? 0.25 + i * 0.08 : 0 }}
                          className="absolute inset-x-0 top-1/2 h-px origin-left bg-rose-300/80"
                        />
                      </span>
                    )}
                  </td>
                  <td
                    dir="ltr"
                    className={`py-2 text-start transition-colors duration-300 ${
                      decision === 'rejected' ? 'text-cinema-text/35 line-through' : 'text-emerald-300'
                    }`}
                  >
                    {to}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => decide('approved')}
              disabled={!atGate}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-[3px] bg-cinema-soft px-5 text-[13.5px] font-medium text-cinema-bg transition-[opacity,background-color,transform] duration-150 ease-cinematic enabled:hover:bg-cinema-cream motion-safe:enabled:active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <span aria-hidden="true">✓</span>
              {labels.approve}
            </button>
            <button
              type="button"
              onClick={() => decide('rejected')}
              disabled={!atGate}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-[3px] border border-white/25 px-5 text-[13.5px] text-cinema-text transition-[opacity,border-color,background-color,transform] duration-150 ease-cinematic enabled:hover:border-white/60 enabled:hover:bg-white/[0.05] motion-safe:enabled:active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <span aria-hidden="true">×</span>
              {labels.reject}
            </button>
            <button
              ref={replayBtn}
              type="button"
              onClick={replay}
              className="hit ms-auto font-mono text-[11px] uppercase tracking-[0.18em] text-cinema-muted transition-colors duration-200 hover:text-cinema-cream"
            >
              <span aria-hidden="true">↺</span> {labels.replay}
            </button>
          </div>
        </motion.div>
      </div>
      <p className="sr-only" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
