/*
 * The portfolio's evidence layer.
 *
 * One record per logical project, with where it lives, who owns it, how far
 * it got, and the claims the site is allowed to make about it. Copy shown on
 * the site lives in messages/final/{en,ar}.json; this file decides which
 * projects appear, in what order, and what each one may claim.
 *
 * Status vocabulary (see docs/portfolio/PORTFOLIO_EVIDENCE_MANIFEST.md):
 *   VERIFIED     read directly in the current source during the audit
 *   SUPPORTED    backed by repository docs or reports, not re-read in code
 *   UNVERIFIED   never shown publicly
 *
 * Test vocabulary: `documented` is what a README says, `executed` is what
 * actually ran during the 2026-10-18 audit.
 */

export type Ownership = 'PERSONAL' | 'EMPLOYER_WORK' | 'CLIENT_WORK' | 'UNKNOWN';
export type Visibility =
  | 'PUBLIC_SAFE'
  | 'PRIVATE_CASE_STUDY_CANDIDATE'
  | 'PERMISSION_REQUIRED'
  | 'RESTRICTED'
  | 'DO_NOT_PUBLISH';
export type EvidenceStatus = 'VERIFIED' | 'SUPPORTED' | 'USER_CONFIRMED' | 'UNVERIFIED';
export type Tier = 'flagship' | 'major' | 'supporting' | 'professional' | 'excluded';
export type Maturity = 'pre-launch' | 'release-candidate' | 'in-development' | 'production-employer' | 'prototype';

export interface Claim {
  claim: string;
  status: EvidenceStatus;
  /** Path inside the canonical repository. */
  source: string;
}

export interface TestRun {
  command: string;
  result: string;
  /** Why the result should not be read at face value, if anything. */
  note?: string;
}

export interface Project {
  slug: string;
  name: string;
  alternateNames: string[];
  category: string;
  tier: Tier;
  ownership: Ownership;
  visibility: Visibility;
  evidence: EvidenceStatus;
  maturity: Maturity;
  canonicalPath: string;
  gitCommit: string | null;
  /** Public repository, checked to return HTTP 200 on 2026-10-18. */
  sourceUrl: string | null;
  stack: string[];
  /** Case-study route under /[locale]/work, if the project has one. */
  route: string | null;
  claims: Claim[];
  /** Claims seen in older copy or docs that the site must not make. */
  excluded: string[];
  tests: { documented: string | null; executed: TestRun[] };
  privacy: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: 'rakez',
    name: 'Rakez ERP',
    alternateNames: [],
    category: 'Real-estate ERP/CRM (employer)',
    tier: 'flagship',
    ownership: 'EMPLOYER_WORK',
    visibility: 'PERMISSION_REQUIRED',
    evidence: 'VERIFIED',
    maturity: 'production-employer',
    canonicalPath: 'Desktop/Projects/rakez-erp',
    gitCommit: '3ce0992',
    sourceUrl: null,
    stack: ['Laravel 12', 'MySQL', 'Redis', 'Sanctum', 'Reverb', 'Spatie Permission', 'Vue 3', 'TypeScript', 'OpenAI API'],
    route: 'rakez',
    claims: [
      { claim: 'Waiting-list reservations and row locks for contested units', status: 'VERIFIED', source: 'back/app/Http/Controllers/Sales/WaitingListController.php; lockForUpdate in 16 files' },
      { claim: 'Ads attribution with Meta Business SDK and TikTok', status: 'VERIFIED', source: 'back/composer.json, back/app/Services/Ads/*' },
      { claim: 'Spatie roles, Reverb, Sanctum, OpenAI client', status: 'VERIFIED', source: 'back/composer.json' },
      { claim: 'Team project; Yusuf is the largest committer', status: 'VERIFIED', source: 'git shortlog' },
    ],
    excluded: ['PostgreSQL (repo uses MySQL)', 'Laravel monolith frontend (frontend is a separate Vue 3 SPA)', 'link to a public source repository', 'live staff-portal URL'],
    tests: { documented: null, executed: [] },
    privacy: ['Employer code and data. Only domain, responsibilities and demo-seed screens are shown.', 'n8n-secrets.txt in working tree (not opened).'],
  },
  {
    slug: 'crma',
    name: 'CRMA',
    alternateNames: ['CRM'],
    category: 'Multi-tenant CRM SaaS with governed AI',
    tier: 'flagship',
    ownership: 'PERSONAL',
    visibility: 'PUBLIC_SAFE',
    evidence: 'VERIFIED',
    maturity: 'pre-launch',
    canonicalPath: 'Desktop/Projects/CRM',
    gitCommit: 'a627309',
    sourceUrl: null,
    stack: ['Laravel 12', 'PHP 8.3', 'Inertia v2', 'React 19', 'TypeScript', 'MySQL 8', 'Redis 7', 'Horizon', 'Reverb'],
    route: 'crma',
    claims: [
      { claim: 'Agent loop is model-directed with step and tool-call limits', status: 'VERIFIED', source: 'app/Ai/Runtime/AgentRuntime.php' },
      { claim: 'Consequential tool calls become proposals that expire (72h default)', status: 'VERIFIED', source: 'app/Ai/Actions/ActionEngine.php' },
      { claim: 'Knowledge search fuses lexical and vector results with RRF, filtered by organisation', status: 'VERIFIED', source: 'app/Services/KnowledgeBase/HybridRetriever.php' },
      { claim: 'MCP server with OAuth', status: 'VERIFIED', source: 'app/Mcp/McpServer.php, app/Mcp/OAuth' },
      { claim: 'Production plan scores readiness 47/100 and marks launch NO-GO', status: 'VERIFIED', source: 'PRODUCTION_PLAN.md' },
    ],
    excluded: ['customers', 'revenue', 'uptime', 'load-tested scale', 'live Stripe/Twilio/WhatsApp/Meta integrations'],
    tests: {
      documented: '360 backend + 265 frontend test files (PRODUCTION_PLAN.md); 421 *Test.php files counted',
      executed: [
        {
          command: 'pest tests/Feature/AI tests/Feature/Rbac tests/Feature/Workflows + tenant-isolation tests (PHP 8.3, SQLite :memory:)',
          result: '139 passed, 578 assertions',
          note: 'Targeted subset only; the full suite was not run. The production plan records 42 failing backend tests.',
        },
      ],
    },
    privacy: ['Screens use seeded demo data.', 'The CRMA page also appears on the HexaTerminal company site; confirm ownership wording stays consistent.'],
  },
  {
    slug: 'dhura',
    name: 'Dhura',
    alternateNames: ['ذُرى', 'Zraa', 'Estatea'],
    category: 'Arabic-first real-estate SaaS (CRM/ERP)',
    tier: 'flagship',
    ownership: 'PERSONAL',
    visibility: 'PUBLIC_SAFE',
    evidence: 'VERIFIED',
    maturity: 'release-candidate',
    canonicalPath: 'C:/xampp/htdocs/Zraa',
    gitCommit: '5dd2c4e',
    sourceUrl: null,
    stack: ['FastAPI', 'Pydantic v2', 'SQLAlchemy 2', 'Alembic', 'PostgreSQL', 'Redis', 'React', 'TypeScript', 'Playwright'],
    route: 'dhura',
    claims: [
      { claim: 'Tenant-scoped modules across inventory, CRM, sales, finance, portal and AI', status: 'VERIFIED', source: 'apps/api/app/modules/*' },
      { claim: 'AI agents compute results deterministically through an allowlisted, tenant-scoped, read-only toolset', status: 'VERIFIED', source: 'docs/ai-architecture.md, apps/api/app/modules/ai/agent_tools' },
      { claim: 'Agent actions need human approval and apply through domain use cases, never raw writes', status: 'VERIFIED', source: 'apps/api/app/modules/ai/agent_actions/application/apply_action.py' },
      { claim: 'Provider-neutral generation gateway with schema-validated output', status: 'VERIFIED', source: 'apps/api/app/modules/ai/gateway/domain/contracts.py' },
      { claim: 'V1 release candidate, not a live production deployment', status: 'VERIFIED', source: 'README.md' },
    ],
    excluded: ['concept-only (outdated)', 'production deployment', 'autonomous ERP', 'model-directed agent loop', 'README "449 passed" as a current figure'],
    tests: {
      documented: 'README: 449 backend tests passed, Playwright 130 passed / 6 failed / 27 not run',
      executed: [
        {
          command: 'pytest (SQLite in-memory, provider keys blank, --continue-on-collection-errors)',
          result: '644 passed, 0 failed, 1 collection error',
          note: 'tests/test_background_jobs.py cannot be collected: the local venv lacks the declared `redis` package.',
        },
      ],
    },
    privacy: ['Monorepo root package.json is named "rakez". Confirm Dhura is not Rakez Company IP before wider promotion.', 'Screens use the repo demo seed.'],
  },
  {
    slug: 'prospectiq',
    name: 'ProspectIQ',
    alternateNames: ['LeadScope AI'],
    category: 'Evidence-grounded B2B research and sales intelligence',
    tier: 'flagship',
    ownership: 'PERSONAL',
    visibility: 'PUBLIC_SAFE',
    evidence: 'VERIFIED',
    maturity: 'in-development',
    canonicalPath: 'Desktop/Projects/ProspectIQ',
    gitCommit: '3e94a67',
    sourceUrl: 'https://github.com/YusufJojeh/ProspectIQ',
    stack: ['FastAPI', 'Pydantic v2', 'SQLAlchemy 2', 'Alembic', 'MariaDB', 'React', 'TypeScript', 'Vite'],
    route: 'prospectiq',
    claims: [
      { claim: 'Model chooses the next tool from tool results (model-directed loop)', status: 'VERIFIED', source: 'apps/api/app/modules/agents/runtime.py' },
      { claim: 'Approval checks expiry, workspace membership and a SHA-256 payload hash, then claims the action atomically', status: 'VERIFIED', source: 'apps/api/app/modules/agents/action_gate.py' },
      { claim: 'Repeated approval after execution is idempotent; actions carry a unique idempotency key', status: 'VERIFIED', source: 'apps/api/app/modules/agents/action_gate.py, models.py' },
      { claim: 'The same agent run resumes after approval', status: 'VERIFIED', source: 'apps/api/app/modules/agents/runtime.py (resume_after_action)' },
      { claim: 'Sales knowledge retrieval is hybrid keyword + embedding; default embedding is a local hashing model', status: 'VERIFIED', source: 'apps/api/app/modules/knowledge/retrieval.py, embeddings.py' },
    ],
    excluded: ['semantic embeddings by default', 'production customers'],
    tests: {
      documented: null,
      executed: [
        {
          command: 'pytest (SQLite, provider keys blanked, provider URLs pointed at a closed port)',
          result: '567 passed, 3 failed, 6 skipped',
          note: 'All 3 failures are production-config tests that require SERPAPI_API_KEY, which the audit blanked on purpose.',
        },
      ],
    },
    privacy: ['Marketing strip on the landing capture carries placeholder claims and stays cropped out.'],
  },
  {
    slug: 'restocafe',
    name: 'RestoCafe OS',
    alternateNames: ['RecafeOS'],
    category: 'Multi-tenant restaurant POS and kitchen operations',
    tier: 'flagship',
    ownership: 'PERSONAL',
    visibility: 'PUBLIC_SAFE',
    evidence: 'VERIFIED',
    maturity: 'in-development',
    canonicalPath: 'Desktop/Projects/RecafeOS',
    gitCommit: '7fa340f',
    sourceUrl: 'https://github.com/YusufJojeh/RecafeOS',
    stack: ['NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis', 'Socket.IO', 'React', 'PWA'],
    route: 'restocafe',
    claims: [
      { claim: 'Order state changes bump a version column; clients send expectedVersion', status: 'VERIFIED', source: 'apps/api/src/modules/orders/order-lifecycle.service.ts, dto/*.dto.ts' },
      { claim: 'Idempotency-key store for mutating requests', status: 'VERIFIED', source: 'apps/api/src/common/idempotency/idempotency-key.store.ts' },
      { claim: 'Row locks around table and order operations', status: 'VERIFIED', source: 'apps/api/src/modules/orders/order-table.service.ts' },
      { claim: 'Socket.IO gateways with a Redis adapter and signed socket tokens', status: 'VERIFIED', source: 'apps/api/src/websocket/*' },
      { claim: 'Offline mutation queue in the operations app', status: 'VERIFIED', source: 'apps/ops-web/src/lib/offline-queue.test.ts' },
      { claim: 'k6 load scripts exist', status: 'VERIFIED', source: 'package.json (load:*), ops/load' },
    ],
    excluded: ['measured throughput or latency', 'load-tested at production scale', 'Kubernetes in production (manifests exist only)'],
    tests: {
      documented: null,
      executed: [
        {
          command: 'jest (apps/api, unit)',
          result: '112 passed, 6 failed, 3 skipped (2 of 33 suites failing)',
          note: 'Ran against the working tree, which has 137 uncommitted files. Failures are in order-lifecycle and public-tracking specs.',
        },
      ],
    },
    privacy: ['Screens come from the repo Playwright visual suite on demo data.'],
  },
  {
    slug: 'mtjri',
    name: 'Mtjri',
    alternateNames: ['Tijraa', 'Matjrii'],
    category: 'Multi-store commerce SaaS with AI store content',
    tier: 'major',
    ownership: 'PERSONAL',
    visibility: 'PUBLIC_SAFE',
    evidence: 'SUPPORTED',
    maturity: 'in-development',
    canonicalPath: 'Desktop/Projects/mtjri',
    gitCommit: 'de51280',
    sourceUrl: 'https://github.com/YusufJojeh/mtjri',
    stack: ['Laravel', 'Inertia', 'React', 'TypeScript', 'MySQL', 'Queues', 'Ollama', 'OpenAI'],
    route: 'mtjri',
    claims: [
      { claim: 'Store content generated by queued jobs, with per-section regeneration', status: 'VERIFIED', source: 'app/Jobs/GenerateStoreContentJob.php, RegenerateSectionJob.php' },
      { claim: 'Provider manager: Ollama first, optional fallback to OpenAI', status: 'VERIFIED', source: 'app/Services/AIProviderManager.php' },
      { claim: 'Generated landing content is validated before use', status: 'VERIFIED', source: 'app/Services/LandingPageContentValidator.php' },
      { claim: 'AI runs, tool calls and usage are store-scoped', status: 'VERIFIED', source: 'app/Models/Ai/BelongsToStore.php' },
    ],
    excluded: ['self-service web installer as a headline feature', 'base platform written from scratch (provenance not provable from git)'],
    tests: { documented: '36 *Test.php files', executed: [] },
    privacy: ['Base application arrived in one commit; keep claims to the AI content pipeline.'],
  },
  {
    slug: 'ilogistics',
    name: 'iLogistics',
    alternateNames: ['i-logistic'],
    category: 'Logistics platform with four portals',
    tier: 'supporting',
    ownership: 'EMPLOYER_WORK',
    visibility: 'PERMISSION_REQUIRED',
    evidence: 'SUPPORTED',
    maturity: 'in-development',
    canonicalPath: 'Desktop/Projects/i-logistic (root copy)',
    gitCommit: '0794ad5',
    sourceUrl: null,
    stack: ['Laravel 12', 'Inertia', 'React 19', 'TypeScript', 'MySQL', 'Redis'],
    route: null,
    claims: [
      { claim: 'Admin, customer, driver and employee portals with server-owned shipment transitions', status: 'SUPPORTED', source: 'README.md' },
      { claim: 'Tenant context propagated through queued shipment work', status: 'SUPPORTED', source: 'git log 2026-09-08' },
    ],
    excluded: ['~25% query-speed improvement (no benchmark found)', 'JWT (README describes session auth)'],
    tests: { documented: '41 *Test.php, 2 Playwright specs', executed: [] },
    privacy: ['Started as Mermez work (co-author on early history). Keep wording generic.'],
  },
  {
    slug: 'hexaterminal',
    name: 'HexaTerminal',
    alternateNames: [],
    category: 'Company website, Filament CMS and public API (co-developed)',
    tier: 'supporting',
    ownership: 'CLIENT_WORK',
    visibility: 'PERMISSION_REQUIRED',
    evidence: 'SUPPORTED',
    maturity: 'production-employer',
    canonicalPath: 'Desktop/hexaterminal',
    gitCommit: 'b0748d7',
    sourceUrl: null,
    stack: ['Next.js', 'Laravel 12', 'Filament 4'],
    route: null,
    claims: [{ claim: 'Next.js frontend over a Laravel/Filament CMS and versioned public API', status: 'SUPPORTED', source: 'README.md' }],
    excluded: ['sole authorship'],
    tests: { documented: null, executed: [] },
    privacy: ['Shared repository; another engineer has the majority of commits.'],
  },
  {
    slug: 'hirelens',
    name: 'HireLens AI',
    alternateNames: ['talent-lens-arabic'],
    category: 'Evidence-based hiring copilot',
    tier: 'supporting',
    ownership: 'PERSONAL',
    visibility: 'PUBLIC_SAFE',
    evidence: 'SUPPORTED',
    maturity: 'prototype',
    canonicalPath: 'Desktop/Projects/talent-lens-arabic-main/talent-lens-arabic-main',
    gitCommit: '7b1ef52',
    sourceUrl: null,
    stack: ['Laravel 12', 'Inertia.js 2', 'React 19', 'Tailwind CSS 4', 'Pest', 'Playwright'],
    route: 'hirelens',
    claims: [],
    excluded: [],
    tests: { documented: null, executed: [] },
    privacy: [],
  },
  {
    slug: 'linguacoach',
    name: 'LinguaCoach AI',
    alternateNames: [],
    category: 'Language coaching with provider-optional AI',
    tier: 'supporting',
    ownership: 'PERSONAL',
    visibility: 'PUBLIC_SAFE',
    evidence: 'SUPPORTED',
    maturity: 'prototype',
    canonicalPath: 'Desktop/Projects/lingua-coach-ai-prototype',
    gitCommit: 'fc1adc9',
    sourceUrl: null,
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'SQLAlchemy 2', 'PostgreSQL', 'Redis'],
    route: 'linguacoach',
    claims: [],
    excluded: [],
    tests: { documented: null, executed: [] },
    privacy: [],
  },
  {
    slug: 'careerguide',
    name: 'CareerGuide AI',
    alternateNames: [],
    category: 'Deterministic career matching (graduation project)',
    tier: 'supporting',
    ownership: 'PERSONAL',
    visibility: 'PUBLIC_SAFE',
    evidence: 'SUPPORTED',
    maturity: 'prototype',
    canonicalPath: 'Desktop/Projects/stitch_careerguide_ai_graduation_project',
    gitCommit: 'e7d5fd0',
    sourceUrl: null,
    stack: ['React 19', 'Vite', 'TypeScript', 'FastAPI', 'SQLAlchemy 2', 'Alembic', 'PostgreSQL'],
    route: 'careerguide',
    claims: [],
    excluded: [],
    tests: { documented: null, executed: [] },
    privacy: [],
  },
];

/** Selected systems on the home page, in order. */
export const HOMEPAGE_FLAGSHIPS = ['rakez', 'crma', 'dhura', 'prospectiq', 'restocafe'] as const;

/** Case-study routes, in "next project" order. */
export const WORK_ORDER = PROJECTS.filter((p) => p.route).map((p) => p.slug);

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
