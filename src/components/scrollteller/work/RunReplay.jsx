'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/*
 * An interactive replay of one ProspectIQ AgentRun. The run plays up to the
 * approval gate on its own and then stops: only the viewer's Approve moves it
 * on, and the same run and the same stream continue. Event names are the
 * backend's real SSE event types; the sequence is illustrative.
 */

const PHASES = [
  { state: 'queued', events: ['agent_started'] },
  { state: 'running', events: ['model_started', 'tool_requested', 'tool_completed', 'rag_search_completed', 'knowledge_selected', 'action_proposed'] },
  { state: 'waiting', events: ['waiting_for_approval'], gate: true },
  { state: 'resumed', events: ['action_approved', 'action_executing', 'action_completed', 'agent_resumed', 'model_completed'] },
  { state: 'completed', events: ['agent_completed'] },
];

const STEP_MS = 420;

export default function RunReplay({ labels }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const [shown, setShown] = useState(0); // events shown within the current phase
  const [log, setLog] = useState([]);
  const [started, setStarted] = useState(false);
  const root = useRef(null);

  // Start once the replay scrolls into view.
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
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const current = PHASES[phase];
  const atGate = current.gate && shown === current.events.length;
  const done = phase === PHASES.length - 1 && shown === current.events.length;

  useEffect(() => {
    if (!started || atGate || done) return undefined;
    const id = setTimeout(
      () => {
        if (shown < current.events.length) {
          setLog((l) => [...l, { name: current.events[shown], resumed: current.events[shown] === 'agent_resumed' }]);
          setShown((n) => n + 1);
        } else {
          setPhase((n) => n + 1);
          setShown(0);
        }
      },
      reduce ? 0 : STEP_MS,
    );
    return () => clearTimeout(id);
  }, [started, atGate, done, shown, phase, current, reduce]);

  const approve = useCallback(() => {
    setPhase(3);
    setShown(0);
  }, []);

  const replay = useCallback(() => {
    setLog([]);
    setPhase(0);
    setShown(0);
  }, []);

  return (
    <div ref={root} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
      <div>
        <ol className="border-t border-white/15">
          {PHASES.map((ph, k) => {
            const now = k === phase;
            const past = k < phase;
            return (
              <li
                key={ph.state}
                aria-current={now ? 'step' : undefined}
                className="flex items-center gap-4 border-b border-white/10 py-4"
              >
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 shrink-0 rounded-full border transition-colors duration-300 ${
                    now
                      ? `border-cinema-cream bg-cinema-cream ${ph.gate && atGate && !reduce ? 'animate-pulse' : ''}`
                      : past
                        ? 'border-cinema-soft/60 bg-cinema-soft/60'
                        : 'border-white/30'
                  }`}
                />
                <span
                  className={`font-mono text-[12px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                    now ? 'text-cinema-soft' : past ? 'text-cinema-text/60' : 'text-cinema-text/35'
                  }`}
                >
                  {labels.states[ph.state]}
                </span>
                {ph.gate && now && atGate && (
                  <span className="ms-auto text-[12.5px] text-cinema-cream">{labels.waiting}</span>
                )}
              </li>
            );
          })}
        </ol>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={approve}
            disabled={!atGate}
            className="inline-flex min-h-[44px] items-center rounded-[3px] bg-cinema-soft px-5 text-[13.5px] font-medium text-cinema-bg transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {labels.approve}
          </button>
          <button
            type="button"
            onClick={replay}
            className="inline-flex min-h-[44px] items-center rounded-[3px] border border-white/25 px-5 text-[13.5px] text-cinema-text transition-colors duration-200 hover:border-white/60"
          >
            {labels.replay}
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {labels.states[current.state]}
        </p>
      </div>

      <div className="rounded-[4px] border border-white/10 bg-cinema-bg">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cinema-muted">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${done ? 'bg-cinema-steel' : 'bg-cinema-cream'}`} />
            {labels.stream}
          </span>
          <span dir="ltr">{labels.run} · {labels.same}</span>
        </div>
        <ol dir="ltr" className="flex h-[300px] flex-col justify-end overflow-hidden px-4 py-3 font-mono text-[12px] leading-[1.9] md:h-[340px]">
          {log.slice(-12).map((e, k) => (
            <li
              key={`${e.name}-${log.length - Math.min(log.length, 12) + k}`}
              className={`flex justify-between gap-4 ${e.name === 'waiting_for_approval' ? 'text-cinema-cream' : 'text-cinema-text/70'}`}
            >
              <span>{e.name}</span>
              {e.resumed && <span className="text-cinema-muted">{labels.same}</span>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
