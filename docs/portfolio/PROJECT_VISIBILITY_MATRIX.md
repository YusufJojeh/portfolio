# Project Visibility Matrix

Audit date: 2026-10-18. Ownership is derived from git authorship, remotes and the experience record in `messages/final/en.json`. Where the evidence is mixed it says so.

Legend — Ownership: PERSONAL · EMPLOYER_WORK · CLIENT_WORK · UNKNOWN. Visibility: PUBLIC_SAFE · PRIVATE_CASE_STUDY_CANDIDATE · PERMISSION_REQUIRED · RESTRICTED · DO_NOT_PUBLISH. Evidence: VERIFIED · SUPPORTED · USER_CONFIRMED · UNVERIFIED.

| Project | Ownership | Visibility | Evidence | Basis | Portfolio treatment |
|---|---|---|---|---|---|
| CRMA | PERSONAL | PUBLIC_SAFE (private repo; screens from seeded demo) | VERIFIED | Remote `YusufJojeh/CRM`; commits by Yusuf's identities plus AI-assistant commits | Flagship case study `/work/crma` |
| Dhura (ذُرى) | PERSONAL — **flag** | PUBLIC_SAFE for architecture and demo screens; confirm before naming any client | VERIFIED | Sole author `YusufJojeh`, remote `YusufJojeh/Estatea`. **The monorepo root `package.json` is still named `rakez` ("Rakez — GCC real-estate SaaS platform").** Yusuf worked at Rakez Real Estate Company until Aug 2026. Confirm Dhura is not Rakez Company IP. | Flagship case study `/work/dhura`, no link to Rakez |
| ProspectIQ / LeadScope AI | PERSONAL | PUBLIC_SAFE | VERIFIED | Remote `YusufJojeh/ProspectIQ`; 78 of 82 commits by `YusufJojeh` | Flagship case study `/work/prospectiq` |
| RestoCafe OS | PERSONAL | PUBLIC_SAFE | VERIFIED (code) / thin history | Remote `YusufJojeh/RecafeOS`; 2 commits, 137 uncommitted files | Flagship case study `/work/restocafe` |
| Rakez ERP | EMPLOYER_WORK | PERMISSION_REQUIRED for internals; current page limited to domain, responsibilities and demo-seed screens | VERIFIED | Remote `gitlab.com/mohammedolabi77/rakez-erp`; 8 author identities, 4 core; Yusuf is the largest committer (346 of ~610 on master). Built during the Rakez Real Estate Company role. | Lead flagship (homepage opening) and `/work/rakez`, framed as team work at Rakez; no source, internal URLs or company data |
| Mtjri (Tijraa) | PERSONAL — **flag** | PUBLIC_SAFE | SUPPORTED | Remote `YusufJojeh/mtjri`. Application source arrived in one commit on 2026-04-14 ("Add application source"); composer name is the stock `laravel/react-starter-kit`. Base provenance cannot be proven from git. | Additional system `/work/mtjri`, scoped to the AI content pipeline that has commit history |
| iLogistics | EMPLOYER_WORK origin, later personal expansion — **flag** | PERMISSION_REQUIRED for anything specific to Mermez | SUPPORTED | Remote `gitlab.com/YUSUFJOJEH/i-logistic`; co-author "Reem" (53 commits); experience lists "Backend Developer, iLogistics — Mermez" (Jan–Nov 2025). 2026 commits (Laravel 12 expansion) are by Yusuf alone. | Additional system card only, no route |
| HexaTerminal | CLIENT_WORK / shared company work | PERMISSION_REQUIRED | SUPPORTED | Remote `majdba123/hexaterminal`; Majd Bayer 98 commits, Yusuf ~57 | One line under additional systems as co-developed company platform |
| HireLens AI | PERSONAL | PUBLIC_SAFE | VERIFIED (prior session) | Own checkout; README "HireLens AI" | Kept: `/work/hirelens`, card under additional systems |
| LinguaCoach AI | PERSONAL | PUBLIC_SAFE | VERIFIED (prior session) | Remote `gitlab.com/yusufmohammdjojeh/linguacoach` | Kept: `/work/linguacoach`, card under additional systems |
| CareerGuide AI | PERSONAL (graduation project) | PUBLIC_SAFE | SUPPORTED | Own checkout | Kept: `/work/careerguide`, listed under additional systems |
| ALGOAG | PERSONAL | — | UNVERIFIED (page had no content) | Placeholder page only | **Removed** from the site |
| AgentOS | UNKNOWN | — | UNVERIFIED | "Details on request" line only | **Removed** from the site |
| Business Flow CRM | EMPLOYER_WORK | — | UNVERIFIED | No repository found | Removed from systems; stays as an experience entry |
| OT2 | EMPLOYER_WORK (ArchitWeb) | RESTRICTED | USER_CONFIRMED | Remote `architweb/ot2-api`, 9,400+ commits by many engineers | Experience entry only, generic wording |
| Alaya Nizwa Waqf | EMPLOYER_WORK (ArchitWeb) | RESTRICTED | USER_CONFIRMED | Remote `architweb/alaya-nizwa-waqf-backend` | Not named publicly; covered by the ArchitWeb experience entry |

## Sensitive material observed (values not read or printed)

- `.env` files exist in most repositories (CRM, ProspectIQ, Zraa, mtjri, ot2-api and others). None were opened.
- `Desktop/Projects/rakez-erp/n8n-secrets.txt` exists in the working tree of an employer repository. Not opened. Recommend removing it from the working tree and checking it is git-ignored.
- `Desktop/Projects/avenuefood_gitlab_deploy` (private deploy key) sits loose in the Projects folder. Not opened.
- Desktop root contains patient treatment-plan PDFs and lead spreadsheets. Not opened; nothing from them is used.
