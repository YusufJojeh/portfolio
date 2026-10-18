# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: hiring managers and engineering leads evaluating a remote backend, business-systems or applied-AI engineer. They arrive from a link on a CV, LinkedIn or a message, skim to judge whether the work is real and relevant, and either contact Yusuf or leave. Success is an email or message from one of them.

Visitors read in English or Arabic (RTL). Other audiences, such as freelance clients, are not confirmed and are not a design target.

## Product Purpose

A bilingual (en/ar) personal portfolio for Yusuf Jojeh, Backend & Business Systems Engineer, based in Syria and working remotely. It presents seven systems as case studies, a short experience record and a contact route, so a reader can judge the work and reach out.

## Positioning

Applied AI in production: LLM features wired into governed, audited business workflows (CRMA, Dhura, ProspectIQ, Mtjri), built on top of business-first backend engineering (workflows, permissions, data, APIs, integrations, reliability). The claim is carried by real case studies, not assertions.

## Operating Context

- Home page is a single scroll: hero, engineering signals, selected systems (Rakez ERP first, then CRMA, Dhura, ProspectIQ, RestoCafe OS), how I engineer business systems, applied AI, additional systems, experience, about, contact.
- Case studies live at `/work/<slug>`, in the order of `WORK_ORDER` in `src/content/portfolio/projects.ts`: rakez, crma, dhura, prospectiq, restocafe, mtjri, hirelens, linguacoach, careerguide. The order is also the "next project" loop. Employer systems (OT2, Alaya Nizwa) never get a route or a card.
- Locales `/en` and `/ar`; Arabic is RTL and uses its own display and body faces.
- Contact is by email, GitHub and LinkedIn; there is no form.
- Deployed to Vercel (see DEPLOYMENT.md). Stack: Next.js (App Router, webpack build), next-intl, framer-motion, Tailwind.

## Capabilities and Constraints

- Dhura is a V1 release candidate, not in production. Its page says so before anything else; the repository is private, so there is no source link.
- Every flagship and major case study ends with "What was verified" and "What I do not claim". Evidence and test runs are recorded in `docs/portfolio/PORTFOLIO_EVIDENCE_MANIFEST.md`.
- Some hero and chapter art is illustrative and is disclosed as such with the art note. Real product screenshots are unretouched evidence and stay plain.
- Every user-facing change must ship in both locales with RTL intact; Arabic copy is not a machine afterthought.
- Public source links exist only for projects with public repos; private work is labelled private.
- Two stacks exist in the repo: the live scrollteller site (`src/components/scrollteller`, `messages/final`) and legacy components/pages. The scrollteller site is the product.
- Open decisions: none recorded for product scope.

## Brand Commitments

- Name is "Yusuf Jojeh"; role line is "Backend & Business Systems Engineer".
- Headline voice: "I turn business complexity into production systems." Copy is plain and first-person, with no marketing superlatives.
- Location is shown as "Syria / Remote".

## Evidence on Hand

- Real roles in `messages/final/en.json` (`experience`): ArchitWeb (employer work, product names withheld), Rakez Real Estate Company, Business Flow, Mermez (iLogistics), independent, with periods and scopes. BSc, Information Engineering & Distributed Systems, Al-Shahbaa University.
- Case studies with real screenshots from local builds running each repo's own demo seed: `public/portfolio/work/<slug>/` (crma, rakez, prospectiq, hirelens, linguacoach, dhura app screens) and `public/portfolio/more/` (restocafe, mtjri, ilogistics).
- Public repos for some systems via `src/lib/data/portfolio.js`.
- Absent, and not to be invented: client names beyond those above, revenue or usage metrics, testimonials, awards.

## Product Principles

1. Evidence over assertion: show the real system, screens and architecture; label concepts and illustrations honestly.
2. The reader's time is short; the first screen states who, what and how to reach out, and every case study answers "what business problem, what system".
3. Business-first: describe systems by the workflow and permissions they serve before the technology.
4. Arabic and English are equal citizens; nothing ships in one locale only.
5. Motion and imagery serve the story and never block reading, clicking or keyboard use.

## Accessibility & Inclusion

- Target WCAG 2.2 AA: body text at least 4.5:1, tap targets at least 44px (or equivalent hit area), visible keyboard focus.
- Honor `prefers-reduced-motion`: pinned scenes fall back to still layouts, loops stop, and spatial movement is removed.
- Content hidden by scroll position must be reachable by keyboard (focus reveals it).
- Arabic is set without letter-spacing so letter joins are not broken.
