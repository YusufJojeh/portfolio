import { useTranslations } from 'next-intl';
import Reveal from '../engine/Reveal';
import { Stagger, StaggerItem } from '../engine/Stagger';
import CrmaHero from './crma/CrmaHero';
import ModuleStage from './crma/ModuleStage';
import FlowTimeline from './crma/FlowTimeline';
import ArchitectureStack from './crma/ArchitectureStack';
import GovernanceGate from './crma/GovernanceGate';
import RiskLadder from './crma/RiskLadder';
import DefenceLayers from './crma/DefenceLayers';
import PhoneRow from './crma/PhoneRow';
import RtlCompare from './crma/RtlCompare';
import { Crop, Screen } from './crma/Screen';
import { Architecture, BackLink, Label, NextWork, Section } from './WorkParts';
import { Claims } from './CaseParts';

/*
 * CRMA is told in the order a reviewer would test it: what it is, what it
 * does, how work flows, how it is built, how the AI is held back, how the
 * numbers are made, how it is secured, and where it honestly stands.
 * Every capture is the running app on seeded, sanitised demo data. Motion
 * follows the reading order: chapters enter, diagrams build in the order
 * they are read, and nothing loops except the one live indicator.
 */

const STACK = ['Laravel 12', 'PHP 8.3', 'Inertia v2', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'MySQL 8', 'Redis 7', 'Horizon', 'Reverb', 'Sanctum', 'Pest', 'Vitest', 'Playwright', 'Docker', 'GitHub Actions'];

const MODULE_FILES = ['pipeline', 'deal-workspace', 'contacts', 'leads', 'tasks', 'workflows'];

// Capture shown beside each workflow step (null keeps the previous one), and code-level identifiers.
const FLOW = [
  { file: 'leads', tags: ['Meta lead ads', 'WhatsApp', 'Forms', 'CSV import'] },
  { file: 'pipeline' },
  { file: 'workflow-builder', tags: ['trigger → condition → action'] },
  { file: 'copilot-task-proposal', tags: ['agent_action_proposals'] },
  { file: 'action-center' },
  { file: null },
];

const TIER_IDS = {
  async: 'queues: default/imports · email · ai/agents · webhook · whatsapp_outbound',
  app: 'app/Ai/* · DealSignalCalculator · PipelineIntelligence',
};

const RISK = ['READ', 'LOW_WRITE', 'MEDIUM_WRITE', 'HIGH_EXTERNAL', 'CRITICAL'];

const LAYER_SRC = [
  null,
  'app/Http/Middleware',
  'app/Rules/TenantExists.php · tests/Feature/Tenancy',
  'tests/Feature/Rbac',
  'app/Support/Http/SafeHttpFetcher.php',
];

// Measured from the repository on 14 Oct 2026 (manifest §5).
const METRICS = [
  ['routes', '1,054'],
  ['models', '150'],
  ['migrations', '168'],
  ['controllers', '155'],
  ['policies', '49'],
  ['middleware', '26'],
  ['jobs', '25'],
  ['pages', '183'],
  ['tools', '19'],
  ['profiles', '15'],
  ['actions', '8'],
  ['php', '417'],
  ['frontend', '268'],
  ['e2e', '22'],
];

// The deal-health card in the 1600px deal workspace capture.
const DEAL_HEALTH = { x: 376, y: 252, w: 730, h: 158 };

/** A numbered chapter: claim on the start side, evidence on the end side. */
function Chapter({ n, title, lede, children, className = '', wide = false }) {
  return (
    <Section className={`border-t border-white/10 py-20 md:py-32 ${className}`}>
      <div className={wide ? '' : 'grid gap-10 lg:grid-cols-12 lg:gap-14'}>
        {/* Beside a long column of evidence, the claim holds its place on large screens. */}
        <div className={wide ? 'max-w-[52rem]' : 'lg:sticky lg:top-28 lg:col-span-4 lg:self-start'}>
          <Reveal>
            <span dir="ltr" className="font-mono text-[11px] tracking-[0.2em] text-cinema-muted">
              {n}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 font-display text-[40px] leading-[1] text-cinema-soft md:text-[clamp(48px,4.4vw,68px)]">{title}</h2>
          </Reveal>
          {lede && (
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[34rem] text-[16px] leading-relaxed text-cinema-text/75 md:text-[17px]">{lede}</p>
            </Reveal>
          )}
        </div>
        <div className={wide ? 'mt-14 md:mt-20' : 'lg:col-span-8'}>{children}</div>
      </div>
    </Section>
  );
}

function Note({ children, className = '' }) {
  return <p className={`max-w-[46rem] text-[14px] leading-relaxed text-cinema-text/55 ${className}`}>{children}</p>;
}

export default function CrmaWork({ locale, work }) {
  const t = useTranslations('final.work');
  const c = useTranslations('final.work.crma');

  const facts = c.raw('facts');
  const mod = c.raw('modules');
  const flow = c.raw('flow');
  const arch = c.raw('arch');
  const ai = c.raw('ai');
  const ana = c.raw('analytics');
  const sec = c.raw('security');
  const mob = c.raw('mobile');
  const rtl = c.raw('rtl');
  const ev = c.raw('evidence');
  const honest = c.raw('honest');

  return (
    <>
      <CrmaHero alt={c('heroAlt')} calloutLabel={c('calloutLabel')}>
        <BackLink locale={locale} label={t('back')} />
        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-muted">{c('kicker')}</p>
            <h1 dir="ltr" className="mt-5 font-display text-[72px] leading-[0.9] text-cinema-soft md:text-[clamp(112px,12vw,196px)] rtl:text-right">
              {c('title')}
            </h1>
          </div>
          <div>
            <p className="max-w-[34rem] font-display text-[26px] leading-[1.15] text-cinema-soft md:text-[34px]">{c('lede')}</p>
            <p className="mt-6 inline-block border border-white/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-cinema-cream/85">
              {c('status')}
            </p>
          </div>
        </div>
      </CrmaHero>

      {/* Summary and facts */}
      <Section className="py-20 md:py-28">
        <Reveal>
          <p className="max-w-[58rem] text-[18px] leading-relaxed text-cinema-text/80 md:text-[22px]">{c('summary')}</p>
        </Reveal>
        <Stagger as="dl" className="mt-16 grid gap-px border-y border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <StaggerItem key={f.k} className="bg-cinema-bg py-6 sm:px-6 sm:first:ps-0">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-muted">{f.k}</dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-cinema-text/85">{f.v}</dd>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <Label as="h2">{c('problemTitle')}</Label>
          </Reveal>
          <Stagger as="ol" className="grid gap-6 lg:col-span-8">
            {c.raw('problem').map((p, i) => (
              <StaggerItem as="li" key={p} className="flex gap-5 border-t border-white/10 pt-6">
                <span dir="ltr" className="pt-1 font-mono text-[11px] tracking-[0.2em] text-cinema-steel">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="max-w-[44rem] text-[16px] leading-relaxed text-cinema-text/80 md:text-[17px]">{p}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* 01 — Core modules */}
      <Chapter n="01" title={mod.t} lede={mod.d} wide>
        <ModuleStage
          label={mod.tablist}
          modules={MODULE_FILES.map((f) => ({ id: f, file: f, t: mod.items[f].t, d: mod.items[f].d, alt: mod.items[f].alt }))}
        />
      </Chapter>

      {/* 02 — Business workflow */}
      <Chapter n="02" title={flow.t} lede={flow.d} wide className="bg-cinema-bg2">
        <FlowTimeline stepLabel={flow.step} steps={flow.steps.map((s, i) => ({ ...s, ...FLOW[i] }))} />
      </Chapter>

      {/* 03 — Architecture */}
      <Chapter n="03" title={arch.t} lede={arch.d}>
        <ArchitectureStack
          tiers={['surfaces', 'edge', 'app', 'async', 'data'].map((id) => ({
            id,
            ...arch.tiers[id],
            core: id === 'app',
            ids: TIER_IDS[id],
          }))}
          delivery={{ t: arch.deliveryT, d: arch.delivery }}
        />
      </Chapter>

      {/* 04 — Governed AI */}
      <Chapter n="04" title={ai.t} lede={ai.d} className="bg-cinema-bg2">
        <Reveal>
          <blockquote className="border-s-2 border-cinema-cream/70 ps-6 font-display text-[28px] leading-[1.15] text-cinema-soft md:text-[40px]">
            {ai.quote}
          </blockquote>
        </Reveal>
        <div className="mt-14">
          <GovernanceGate labels={ai.gate} />
          <Note className="mt-4">{ai.gate.illustrative}</Note>
        </div>
        <div className="mt-20">
          <Reveal>
            <Label as="h3">{ai.risk.t}</Label>
            <p className="mt-3 max-w-[40rem] text-[15px] leading-relaxed text-cinema-text/65">{ai.risk.d}</p>
          </Reveal>
          <div className="mt-8">
            <RiskLadder classes={RISK.map((k, i) => ({ k, v: ai.risk.classes[i] }))} />
          </div>
          <p dir="ltr" className="mt-4 font-mono text-[11px] text-cinema-muted rtl:text-right">
            app/Ai/Tools/Risk.php
          </p>
          <Note className="mt-4">{ai.risk.note}</Note>
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-14">
          <Screen file="copilot-approval" alt={ai.screens.approval} caption={ai.screens.approval} sizes="(min-width: 768px) 30vw, 100vw" />
          <Screen file="action-center" alt={ai.screens.actions} caption={ai.screens.actions} sizes="(min-width: 768px) 30vw, 100vw" delay={0.08} />
          <Screen file="ai-inbox" alt={ai.screens.inbox} caption={ai.screens.inbox} sizes="(min-width: 768px) 30vw, 100vw" />
          <Screen file="mcp-connectors" alt={ai.screens.mcp} caption={ai.screens.mcp} sizes="(min-width: 768px) 30vw, 100vw" delay={0.08} />
        </div>
        <div className="mt-12 border border-dashed border-white/25 p-5 md:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cinema-cream">{ai.disclosureT}</p>
          <p className="mt-3 max-w-[48rem] text-[14.5px] leading-relaxed text-cinema-text/70">{ai.disclosure}</p>
        </div>
      </Chapter>

      {/* 05 — Analytics */}
      <Chapter n="05" title={ana.t} lede={ana.d}>
        <div className="relative pb-24 md:pb-20">
          <Screen file="deal-workspace" alt={ana.screens.deal} sizes="(min-width: 1024px) 60vw, 100vw" />
          <Reveal y={24} delay={0.25} className="absolute -bottom-2 end-0 w-[88%] md:end-[-3%] md:w-[66%]">
            <p className="mb-3 w-fit rounded-[3px] bg-cinema-bg/90 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-cinema-cream/90">{ana.calloutLabel}</p>
            <Crop file="deal-workspace" region={DEAL_HEALTH} vw={[40, 88]} />
          </Reveal>
        </div>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cinema-muted">{ana.screens.deal}</p>

        <div className="mt-16">
          <Reveal>
            <Label as="h3">{ana.signalsT}</Label>
            <p className="mt-3 max-w-[40rem] text-[15px] leading-relaxed text-cinema-text/65">{ana.signalsD}</p>
          </Reveal>
          <Stagger as="ul" step={0.045} className="mt-6 grid grid-cols-2 border-s border-t border-white/10 md:grid-cols-4">
            {ana.signals.map((s) => (
              <StaggerItem as="li" key={s} className="border-b border-e border-white/10 px-4 py-5 text-[14.5px] text-cinema-soft">
                {s}
              </StaggerItem>
            ))}
          </Stagger>
          <p dir="ltr" className="mt-4 font-mono text-[11px] text-cinema-muted rtl:text-right">
            DealSignalCalculator · PipelineIntelligence · config/intelligence.php
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-8">
          <Screen file="dashboard" alt={ana.screens.dashboard} caption={ana.screens.dashboard} sizes="(min-width: 768px) 30vw, 100vw" />
          <Screen file="reports" alt={ana.screens.reports} caption={ana.screens.reports} sizes="(min-width: 768px) 30vw, 100vw" delay={0.08} />
        </div>
        <Note className="mt-6">{ana.note}</Note>
      </Chapter>

      {/* 06 — Security */}
      <Chapter n="06" title={sec.t} lede={sec.d} wide className="bg-cinema-bg2">
        <DefenceLayers core={sec.core} layers={sec.layers.map((l, i) => ({ ...l, src: LAYER_SRC[i] }))} />
        <div className="mt-20 grid gap-10 md:grid-cols-2 md:gap-8">
          <Screen file="roles" alt={sec.screens.roles} caption={sec.screens.roles} sizes="(min-width: 768px) 44vw, 100vw" />
          <Screen file="activity-audit" alt={sec.screens.audit} caption={sec.screens.audit} sizes="(min-width: 768px) 44vw, 100vw" delay={0.08} />
        </div>
      </Chapter>

      {/* 07 — Mobile */}
      <Chapter n="07" title={mob.t} lede={mob.d} wide>
        <PhoneRow
          phones={['dashboard', 'pipeline', 'ai-actions', 'deal-workspace'].map((f) => ({ file: f, alt: mob.screens[f], caption: mob.screens[f] }))}
        />
      </Chapter>

      {/* 08 — Arabic / English */}
      <Chapter n="08" title={rtl.t} lede={rtl.d} wide className="bg-cinema-bg2">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            <RtlCompare labels={rtl.compare} />
          </div>
          <Stagger as="ul" className="lg:col-span-4">
            {rtl.points.map((p) => (
              <StaggerItem as="li" key={p} className="border-t border-white/10 py-5 text-[15px] leading-relaxed text-cinema-text/75">
                {p}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Chapter>

      {/* 09 — Engineering evidence */}
      <Chapter n="09" title={ev.t} lede={ev.d}>
        <Stagger as="dl" step={0.035} className="grid grid-cols-2 border-s border-t border-white/10 sm:grid-cols-3 lg:grid-cols-4">
          {METRICS.map(([k, v]) => (
            <StaggerItem key={k} className="border-b border-e border-white/10 p-5">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-cinema-muted">{ev.metrics[k]}</dt>
              <dd dir="ltr" className="mt-3 font-display text-[34px] leading-none tabular-nums text-cinema-soft md:text-[40px] rtl:text-right">
                {v}
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
        <Stagger className="mt-16 grid gap-10 md:grid-cols-3">
          {ev.highlights.map((h) => (
            <StaggerItem key={h.t} className="border-t border-white/20 pt-5">
              <h3 className="font-display text-[26px] leading-tight text-cinema-soft">{h.t}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-cinema-text/70">{h.d}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Chapter>

      {/* What was verified, and what this page does not claim */}
      <Claims labels={t.raw('claims')} verified={c.raw('verified')} notClaimed={honest.items} tests={ev.tests} />

      <Architecture t={t} text={c('architecture')} stack={STACK} url={work.githubUrl} />
      <NextWork locale={locale} t={t} next={work.next} />
    </>
  );
}
