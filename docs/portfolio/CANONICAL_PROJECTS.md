# Canonical Projects

Audit date: 2026-10-18. Scope: `C:\Users\Yusuf\OneDrive\Desktop\Projects`, `C:\xampp\htdocs`, `C:\Users\Yusuf\OneDrive\Desktop`.

Rules applied:

- A directory is mapped to a project only when its README, package metadata, app name or docs name the project.
- Duplicates are not counted as separate projects. Nothing was modified, moved or deleted in any source repository.
- "Git HEAD" is the short hash at audit time. "Dirty" = uncommitted files reported by `git status --porcelain`.
- Several folders (`Projects/i-logistic`, `Projects/talent-lens-arabic-main`, `Projects/TrainingApplyPlatform`, `Desktop/TrainingApplyPlatform`, `Desktop/mtjri`, `Projects/RakezSite`) are not repositories of their own: `git` resolves them to a repository rooted at `C:\Users\Yusuf`. Their HEAD (`746033b65`) belongs to that home-directory repository, not to the project, and was ignored.

| Project | Canonical path | Branch | HEAD | Other copies found | Reason selected | Confidence |
|---|---|---|---|---|---|---|
| CRMA | `Desktop/Projects/CRM` | `codex/ai-native-crm-production-completion` | `a627309` (2026-10-14) | `Desktop/Projects/CRM.zip` (archive); `C:/xampp/htdocs/crm` (no git, older Laravel CRM scaffold; identity as CRMA not proven) | README title "CRMA"; only git checkout; latest commits; `PRODUCTION_PLAN.md` present | High |
| Dhura (ذُرى) / Zraa | `C:/xampp/htdocs/Zraa` | `release/v1-rc` | `5dd2c4e` (2026-08-27, 12 dirty files — Snap integration work in progress) | `C:/xampp/htdocs/Zraa.zip` (archive) | README "ذُرى (Dhura) — GCC Real-Estate SaaS Platform"; only checkout | High |
| ProspectIQ / LeadScope AI | `Desktop/Projects/ProspectIQ` | `main` | `3e94a67` (2026-10-12) | `Desktop/Projects/ProspectIQ.zip` (archive) | README "LeadScope AI … `ProspectIQ` is the repository slug"; only checkout | High |
| RestoCafe OS | `Desktop/Projects/RecafeOS` | `codex/deploy-app-to-vercel` | `7fa340f` (2026-04-01, **137 dirty files**) | `Desktop/Projects/restcaf` + `restcaf.zip` — a *different* Laravel restaurant app (`resto` remote, `laravel/react-starter-kit`); not RestoCafe OS | README title "RestoCafe OS"; NestJS/Prisma/Socket.IO monorepo | High (identity) / Medium (state: history is 2 commits and most current work is uncommitted) |
| Rakez ERP | `Desktop/Projects/rakez-erp` | `master` | `3ce0992` (2026-08-26) | `Desktop/rakez-erp` (`d5eb304`, 2026-08-16 — verified ancestor of canonical HEAD); `Desktop/Projects/rakez-erp.zip`; `Desktop/Projects/RakezSite` (separate Filament/Next.js site, not the ERP) | Canonical HEAD contains the other checkout's HEAD; newer | High |
| Mtjri (Tijraa) | `Desktop/Projects/mtjri` | `main` | `de51280` (2026-10-06) | `Desktop/Projects/mtjri.zip`; `Desktop/mtjri` (only `_remote/`, `e2e/`, `graphify-out/`; not a checkout); `Projects/RakezSite/backend-filament` has remote `mtjrii.git` (unrelated Filament code, identity not proven) | Only full checkout; README "Tijraa - Multi-Store E-commerce Platform" | High |
| iLogistics | `Desktop/Projects/i-logistic (root copy)` | `feat/logistics-platform-expansion-laravel12` | `0794ad5` (2026-09-08) | `Desktop/Projects/i-logistic/i-logistic` (`af1a5d9`, 2025-07-04, branch `YusufApi`) | Newest, Laravel 12 expansion branch, README "iLogistics" | Medium-High |
| HexaTerminal | `Desktop/hexaterminal` | `main` | `b0748d7` (2026-09-03) | `Desktop/hexaterminal-crma` (`0f7a16f`, branch `deploy/crma-case-study`, 2026-10-15 — diverged, not a descendant of `main`) | `main` is the product line; `hexaterminal-crma` is a deploy branch that adds a CRMA page to the company site | Medium |
| HireLens AI | `Desktop/Projects/talent-lens-arabic-main/talent-lens-arabic-main` | `master` | `7b1ef52` (2026-08-29) | `talent-lens-arabic-main.zip` | README "HireLens AI" | High |
| LinguaCoach AI | `Desktop/Projects/lingua-coach-ai-prototype` | `fix/final-audit-remediation` | `fc1adc9` (2026-08-31, 131 dirty) | — | Only checkout | High |
| CareerGuide AI | `Desktop/Projects/stitch_careerguide_ai_graduation_project` | `master` | `e7d5fd0` (2026-08-30, 686 dirty) | — | Only checkout | Medium |
| OT2 (employer) | `Desktop/ot2-api` | `feat/agent-commerce-complete-auth-checkout` | `4e735f5fa` | `ot2-api.zip`, `_scratch_ot2api` | Employer repository (ArchitWeb). Not inspected beyond git metadata. | n/a |
| Alaya Nizwa Waqf (employer) | `Desktop/alaya-nizwa-waqf-backend` | `fix/acp-waqf-nazir-checkbox-labels` | `4ba3813` | `alaya-local-safety-20260928-100439` | Employer repository (ArchitWeb). Not inspected beyond git metadata. | n/a |
| Portfolio | `Desktop/Projects/portfolio (root copy)` | `feat/cinematic-scrollteller-final` | `ab94004` | `Desktop/Projects/portfolio` (Vite, 2025-08); `C:/xampp/htdocs/portfolio` (Vite, 2026-01) | Current Next.js cinematic site; others are older generations | High |
| TrainingApplyPlatform | `Desktop/Projects/TrainingApplyPlatform` | `main` | `072d022` | `Desktop/TrainingApplyPlatform` (not its own repo) | Only real checkout. Not a portfolio candidate. | Medium |

## Not mapped

These were seen but not mapped to any portfolio project, because nothing in them names one: `C:/xampp/htdocs/ERP` (plain PHP, no git), `C:/xampp/htdocs/crm` (no git), `Projects/restcaf` (separate restaurant app), `Projects/medical-booking`, `C:/xampp/htdocs/algoag`, `C:/xampp/htdocs/agentos`, and the many tutorial/experiment folders.
