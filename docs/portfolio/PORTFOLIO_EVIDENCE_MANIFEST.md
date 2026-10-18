# Portfolio Evidence Manifest

Audit date: 2026-10-18. Companion to `CANONICAL_PROJECTS.md` and `PROJECT_VISIBILITY_MATRIX.md`.
The typed version of this record is `src/content/portfolio/projects.ts`; site copy lives in `messages/final/{en,ar}.json`.

**Status vocabulary**

| Word | Meaning here |
|---|---|
| IMPLEMENTED / VERIFIED | Read directly in the current source during this audit |
| DOCUMENTED | Stated in a README or report in the repo; not re-checked |
| EXECUTED | A command was run during this audit |
| PASSING | Executed, and the run passed |
| TESTED | Test files exist; says nothing about whether they pass |

No `.env` values, credentials, customer data, internal URLs or production identifiers were read or copied. Where sensitive files exist, only their existence is noted.

---

## Flagship

### Rakez ERP
- **Canonical repo:** `Desktop/Projects/rakez-erp`, `3ce0992`. `Desktop/rakez-erp` (`d5eb304`) is an ancestor of it. Remote is a private GitLab.
- **Position:** lead system on the homepage (opening scene) at the owner's request, 2026-10-18.
- **Ownership:** EMPLOYER_WORK / team. Yusuf has 346 of about 610 commits on `master` (392 across all branches); four core committers and eight author identities in total. **Visibility:** case study without source, internal URLs or company data.
- **Verified claims:**
  - Laravel 12 API on **MySQL** (`DB_CONNECTION=mysql`; earlier copy wrongly said PostgreSQL)
  - Separate Vue 3 + TypeScript + Pinia SPA
  - Reverb, Sanctum, Spatie Permission, openai-php, Facebook SDK, TikTok
  - `lockForUpdate` in 16 files; `WaitingListController`
  - Commission / CommissionDistribution models
  - Yusuf's commit areas: ads attribution, architecture fixes, sales reservations, contracts, integrations
- **Removed from copy:** "The staff login is live at rakez.com.sa" (internal URL), PostgreSQL, "Laravel monolith".
- **Tests:** 320 test files present (TESTED), not run.
- **Privacy:** `n8n-secrets.txt` present in the repo root (not opened).

### CRMA
- **Canonical repo:** `Desktop/Projects/CRM`, branch `codex/ai-native-crm-production-completion`, HEAD `a627309`. Remote is private (GitHub 404).
- **Ownership:** personal (repository owner). **Visibility:** PUBLIC_SAFE (screens use seeded, sanitised data). **Maturity:** pre-launch. The repo's own `PRODUCTION_PLAN.md` scores readiness at 47/100, marks it NO-GO and lists failing backend tests.
- **Themes:** multi-tenant SaaS, governed AI, MCP, workflows, RTL.
- **Verified claims:**
  - Model-directed agent loop with `max_steps` / `max_tool_calls` (`AgentRuntime.php`)
  - AI writes become proposals with a 72h expiry (`ActionEngine.php`)
  - Hybrid retrieval: RRF (K=60) over lexical and vector results, filtered by `organization_id` (`HybridRetriever.php`)
  - MCP server with OAuth (`app/Mcp/McpServer.php`)
  - 27 AI tool classes
- **Excluded:** live provider integrations, scalability, customers or usage, "production".
- **Tests:** 421 `*Test.php` files present.
  - EXECUTED: Pest on `tests/Feature/AI`, `Rbac`, `Workflows` and tenant isolation (PHP 8.3, SQLite `:memory:`) → **139 passed, 578 assertions**. This is a targeted subset; the full suite was not run.
- **Screens:** `public/portfolio/work/crma/**`, captured locally on seed data.
- **Privacy:** `.env` present (not read).
- **Public-safe copy:** "Pre-launch multi-tenant CRM where AI agents propose and people approve."

### Dhura (ذُرى)
- **Canonical repo:** `C:/xampp/htdocs/Zraa`, branch `release/v1-rc`, HEAD `5dd2c4e` (12 dirty files). Remote private (GitHub 404). Sole author: YusufJojeh.
- **Visibility:** PUBLIC_SAFE (demo seed). **Maturity:** V1 release candidate, not in production. Earlier site copy called it a concept; that was wrong.
- **Themes:** Arabic-first, multi-tenant, real-estate CRM/ERP, governed AI.
- **Verified claims:**
  - About 30 FastAPI modules
  - `tenant_id` referenced in 634 files
  - 54 Alembic revisions
  - Deterministic agents with an allowlisted, read-only, tenant-scoped toolset
  - Actions are approved by a person, then `apply_action.py` routes them through domain use cases
  - Provider-neutral AI gateway with schema-validated output
- **Excluded:**
  - "concept"
  - "autonomous agent" / model-directed loop
  - production deployment
  - README "449 passed" and "migration 0017" (both stale)
- **Tests:**
  - DOCUMENTED: README states 449 backend tests passed; Playwright 130 passed / 6 failed / 27 not run.
  - EXECUTED: `pytest` with SQLite and model keys blanked → **644 passed, 0 failed, 1 collection error**. `tests/test_background_jobs.py` cannot import because the local venv lacks the declared `redis` package. Playwright was not rerun.
- **Privacy flag:** the monorepo root `package.json` is named "rakez" with the description "Rakez — GCC real-estate SaaS platform". Confirm Dhura is not Rakez Company IP before promoting it widely.

### ProspectIQ
- **Canonical repo:** `Desktop/Projects/ProspectIQ`, `main`, `3e94a67`. Public at github.com/YusufJojeh/ProspectIQ.
- **Ownership:** personal. **Maturity:** not deployed.
- **Verified claims:**
  - Model-directed runtime that reads `tool_calls` and resumes in the same run (`agents/runtime.py`)
  - `action_gate.py` checks expiry, workspace membership and a SHA-256 payload hash, then claims the action atomically; approval is idempotent
  - Hybrid keyword + embedding retrieval, with a default "local-hashing-v1" 256-dimension embedding
- **Excluded:** retrieval benchmark vs hosted embeddings, live provider calls, customers.
- **Tests:**
  - DOCUMENTED (release report): pytest 519 passed, Vitest 52, Playwright 202 passed.
  - EXECUTED: pytest with SQLite and provider keys blanked → **567 passed, 3 failed, 6 skipped**. All 3 failures are production-config tests that require `SERPAPI_API_KEY`, which was blanked on purpose.

### RestoCafe OS
- **Canonical repo:** `Desktop/Projects/RecafeOS`, branch `codex/deploy-app-to-vercel`, `7fa340f`. Only 2 commits; 137 dirty files. Public at github.com/YusufJojeh/RecafeOS. (`Projects/restcaf` is a different Laravel app.)
- **Maturity:** in development, not deployed.
- **Verified claims:**
  - NestJS + Prisma + PostgreSQL (41 models)
  - Socket.IO with Redis adapter and a socket token
  - Idempotency store (`src/common/idempotency/idempotency-key.store.ts`)
  - `version` / `expectedVersion` optimistic concurrency
  - `FOR UPDATE` in `order-table.service.ts`
  - ops-web `offline-queue.test.ts`
- **Excluded:** load results (k6 scripts exist but were not run), Kubernetes deployment (manifests exist only), restaurants using it.
- **Tests:** EXECUTED Jest (API) against the dirty working tree → **112 passed, 6 failed, 3 skipped**; 2 of 33 suites fail, including `order-lifecycle.service.spec`.
- **Screens:** `public/portfolio/more/restocafe/*`, from the repo's Playwright visual tests on seed data.

## Major

### Mtjri
- **Canonical repo:** `Desktop/Projects/mtjri`, `de51280`. Public at github.com/YusufJojeh/mtjri. The README says "Tijraa"; the composer name is `laravel/react-starter-kit`.
- **Provenance:** the source arrived in a single commit, so the history does not show authorship of individual parts. The case study says so.
- **Verified claims:**
  - `GenerateStoreContentJob` and `RegenerateSectionJob`
  - `AIProviderManager` (Ollama, optional OpenAI fallback)
  - `LandingPageContentValidator`
  - `Models/Ai/BelongsToStore`
- **Excluded:** "self-service web installer" (not re-verified), generation quality, merchants.
- **Tests:** 36 test files (TESTED), not run.

## Supporting / additional

| Project | Treatment | Notes |
|---|---|---|
| iLogistics | Card, no route, no source link | Canonical `Projects/i-logistic (root copy)` `0794ad5`. Co-authored; began at Mermez. Old GitHub link was 404. |
| HireLens AI | Card + existing case study | Prototype; screens from a local build. |
| LinguaCoach AI | Card + existing case study | Prototype. |
| CareerGuide AI | Row + existing case study | Graduation project. |
| HexaTerminal | Row labelled "Co-developed" | Shared repo; Majd Bayer has about 98 commits vs Yusuf's about 57. A deploy branch also hosts a CRMA page. |

## Professional experience only
- **OT2** and **Alaya Nizwa Waqf** (ArchitWeb employer work): no card, route, name, screenshot or architecture on the site. The ArchitWeb experience entry describes the type of work only. A unit test fails if either name appears in the copy.

## Excluded from the site
- ALGOAG and AgentOS: no evidence of a finished system; placeholders removed.
- Business Flow CRM: employer work with no disclosable artefact; experience entry only.
- Unused assets left on disk: `public/portfolio/work/algoag/`, `public/portfolio/more/agentos/`.

## Screenshots used

All captures come from local builds on demo or seed data. Generated art (`public/portfolio/story/**`) is used only as atmosphere and is never shown as product UI.

- **CRMA:** `work/crma/*`, plus `work/crma/mobile/pipeline.webp`
- **Dhura:** `work/dhura/app/*`, `work/dhura/{login,register}*`
- **ProspectIQ:** `work/prospectiq/**`
- **RestoCafe OS:** `more/restocafe/*`
- **Rakez ERP:** `work/rakez/app/*`, `work/rakez/login*`
- **Mtjri:** `more/mtjri/*`
- **iLogistics:** `more/ilogistics/*`
- **HireLens AI / LinguaCoach AI / CareerGuide AI:** `work/<slug>/**`

## Sensitive material observed (values not read)
- `.env` files in several repos
- `rakez-erp/n8n-secrets.txt`
- A private key in `Projects/avenuefood_gitlab_deploy`
- Patient PDFs and lead spreadsheets on the Desktop

None of these were opened or copied.

---

## Internal scorecard (NOT for publication)

Scores are 1–5: evidence strength, engineering depth, ownership clarity, demo safety.

| Project | Evidence | Depth | Ownership | Demo safety | Rank |
|---|---|---|---|---|---|
| Rakez ERP | 4 | 4 | 3 (team, employer) | 4 | 1 (owner's priority) |
| CRMA | 5 | 5 | 5 | 5 | 2 |
| Dhura | 5 | 5 | 3 (package-name flag) | 5 | 3 |
| ProspectIQ | 5 | 4 | 5 | 5 | 4 |
| RestoCafe OS | 4 | 4 | 5 | 5 | 5 |
| Mtjri | 3 | 3 | 2 (single-commit import) | 5 | 6 |
| iLogistics | 3 | 3 | 3 | 4 | 7 |
| HexaTerminal | 2 | 2 | 2 | 4 | 8 |
