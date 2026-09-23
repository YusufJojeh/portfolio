# Design QA — feat/cinematic-scrollteller-final

**Status: passed**

This file replaces the QA doc for the earlier hero/nav rebuild. That version is still in git history.

## Scope checked

| Area | What was checked |
|---|---|
| Home, chapters 00–11 | 1440, 1024, 768 and 390; `en` and `ar` (RTL); reduced motion on and off |
| `/work/*`, all seven slugs | 1440 and 390 in `en`; 390 in `ar` for dhura, careerguide and hirelens |

The review used browser-rendered screenshots taken by `scripts/capture-qa.mjs` and `scripts/capture-work.mjs` against the dev server. A second pass of Playwright e2e ran against `next start`.

## Findings

### P1 — fixed

1. **Arabic pages rendered English copy in server components.** next-intl v4 only fills `locale` when it is passed explicitly.
   - Fix: `getRequestConfig` now falls back to `requestLocale`, and the layout and pages call `setRequestLocale`.
   - This change affects every route in the app.
   - Guarded by an e2e test.
2. **Generated dashboard figures were near-legible.** This applied to the reduced-motion Rakez still and the work-page covers, and those figures could read as real metrics.
   - Fix: blur (8px on the Rakez still, 5px on the covers), a stronger overlay, and the "illustrative" art note.
3. **The progress rail sat on the left in RTL and overlapped the copy.** It is now physically on the right, with an LTR list.
4. **LinguaCoach overflowed horizontally at 390**, and the Dhura mobile title clipped. Both are fixed; overflow is 0 at every width checked.

### P2 — fixed

5. Arabic mono labels had their letter joins broken by letter-spacing. Tracking is reset under RTL, and the Arabic font is in the mono stack.
6. The Dhura work page's diacritic collided with the kicker. The h1 top margin was increased.
7. The legacy blue/gold scrollbar showed on cinematic pages. It is overridden to #3a3f47 / #090b0f.
8. The Rakez still list was cramped on mobile. Items now stack below `md`.

### Known, accepted

- There is no purple, yellow UI, SaaS gradient or blue pill anywhere in `src/components/scrollteller` or `src/app/[locale]`. Legacy tokens remain in `globals.css` and `tailwind.config.js` for the legacy components, which the new pages do not use.
- Generated images are art, not evidence. They are blurred where they contain figures, and they are disclosed.

## Motion

| Behaviour | Status |
|---|---|
| Hero camera: scale 1.06→1.00, y 0→-40px desktop / -15px mobile, scroll-linked | Verified by the e2e transform test |
| Text exits before the crossfade | Checked in screenshots |
| Easing `cubic-bezier(0.22,1,0.36,1)` | In use |
| Reduced motion | Every sticky scene falls back to a still layout via `ReducedMotionFallback`; `useStage` returns static values. Verified by e2e (heading opacity > 0.95) |

## Gates

| Gate | Result |
|---|---|
| `npm run typecheck` | pass |
| `npm run lint` (cinematic tree) | 0 problems |
| `npm test` | 7/7 |
| `next build` | pass, 14 SSG work paths |
| Playwright on dev | 24/24 |
| Playwright on production | 24/24 |

The repo-wide `lint:all` still reports 15 legacy findings, down from 57. All of them are in untouched legacy components.
