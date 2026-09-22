# Design QA — Cinematic Hero + Navigation Rebuild

## Issues found (P1)

1. **Legacy Navbar** — `src/components/client/Navbar.jsx` (rendered on the cinematic homepage
   via `src/app/[locale]/page.jsx`) was untouched from the old light/dark SaaS-template design:
   `gradient-text` logo (resolves to `primary-600`/`secondary-400`, i.e. blue/gold — the "yellow"
   logo), Sun/Moon theme toggle, `bg-primary-600`/`bg-secondary-600` filled pill buttons for the
   language toggle and mobile active nav state, and a large white rounded mobile menu panel with
   `bg-white dark:bg-slate-900`. None of this matched the cinema dark palette used everywhere else
   on the page.
2. **Color drift** — `tailwind.config.js` still exposed the old `primary`/`secondary` blue/gold
   scale and `.gradient-text` (`@apply text-primary-600 dark:text-secondary-400`), which is what
   produced the yellow-ish logo text and generic blue CTA pill.
3. **Hero typography** — headline used one long desktop sentence at all breakpoints; at 390px it
   wrapped into an oversized, multi-line block that visually competed with the mobile hero image.
4. **Motion** — `CinematicBackground` already had `useScroll`/`useTransform`, but the Hero scene
   passed `minHeight="100vh"` with no separate scroll target, so the pinned background had almost
   no scroll range to animate against (effectively static), and there was no text-exit animation
   as the hero scrolled away.

## What was fixed

- **`src/components/client/Navbar.jsx`** — rewritten in place (confirmed via grep it's imported
  only by `src/app/[locale]/page.jsx`, so no other route/locale shares it). New nav: "YJ" +
  "Yusuf Jojeh" logo in `text-cinema-soft` (off-white, no gradient), theme toggle removed
  (dark-only cinematic experience), language toggle reduced to a small subtle
  `bg-cinema-elevated/60` pill with a thin border showing "AR"/"EN", desktop links are small
  uppercase muted text with no bright active-state bar, mobile menu button is a compact
  `bg-cinema-elevated/60` bordered icon button (not a large floating rounded-square card), and the
  scrolled state uses `bg-cinema-elevated/85` instead of white/blue.
- **`tailwind.config.js`** — added `cinema.bg2` (`#0E1117`) and `cinema.soft` (`#FAF9F6`) tokens,
  and normalized `cinema.muted` to the spec's `#8A9099`. Left the legacy `primary`/`secondary`
  scale and `.gradient-text` class in place since they're still used by non-cinematic legacy
  components outside this task's scope (e.g. `Footer.jsx`), per the brief's instruction not to
  touch what's outside the rendered cinematic tree.
- **`src/components/story/scenes/HeroScene.jsx`** — added a small uppercase `positioningLabel`
  ("BACKEND & BUSINESS SYSTEMS ENGINEER") above the headline; headline is now responsive
  (`headlineMobile` shown below `md:`, full `headline` shown at `md:` and up, sized
  `text-[44px]` → `md:text-6xl` → `lg:text-7xl` with tighter mobile line-height); supporting copy
  replaced with the requested "I design backend systems around how real businesses operate…"
  string; CTA buttons changed from a bright blue pill + outline pair to restrained editorial
  buttons (`bg-cinema-soft` off-white filled / transparent bordered), relabeled "View Case
  Studies" / "Hire for Remote Roles" (existing wired string, kept functional — "Get in Touch"
  isn't a distinct anchor in this codebase, and `contactRemote` already points at real content).
- **i18n** — added `hero.headlineMobile` and `hero.positioningLabel` to both `messages/en.json`
  and `messages/ar.json`; rewrote `hero.subheadline` in both to the new supporting copy.
- **Scroll-driven motion** — `CinematicBackground` now accepts `scaleRange`/`yRange` props
  (default unchanged for other scenes: `[1.08,1.18]` / `['-4%','4%']`). Hero now passes
  `scaleRange={[1.06, 1.0]}` and `yRange={['0%','-6%']}`. `StickyScene` now accepts a
  `containerRef` so the *outer* (non-sticky) section can be used as the `useScroll` target instead
  of the sticky-pinned inner element — a pinned element's bounding rect barely changes while
  stuck, so tracking it directly gave near-static output. Hero's `minHeight` was increased from
  `100vh` to `160vh` to give the pin real scroll distance to animate across. A new
  `motion.div` wraps the hero text block with `opacity`/`y` tied to the same outer-section
  `scrollYProgress` (`1→0` opacity, `0→-24px` y over the first 60% of the pin), so the headline
  visibly fades/lifts as the scene scrolls away, without regressing the `StickyScene` stacking fix
  from commit `aee1bf5` (the `translateZ(0)` sticky-child scoping is untouched).

## Verification (Browser preview, dev server on port 50130)

- **Desktop (~800px pane width, representing 1440px layout proportionally)**: hero renders with
  the new off-white "YJ · Yusuf Jojeh" logo, small uppercase muted nav links, subtle bordered "AR"
  language pill, full desktop headline copy, and the off-white/bordered CTA pair over the
  dusk-lit city portrait. No yellow or bright-blue chrome anywhere in the nav or hero.
- **Mobile (390–455px pane width)**: "CHAPTER 01" blue label → "BACKEND & BUSINESS SYSTEMS
  ENGINEER" label → short headline "I turn business complexity into production systems." at a
  size that fits above the fold without covering Yusuf's face → supporting copy → the two
  restrained CTA buttons → "SCROLL TO BEGIN" hint. Nav collapses to "YJ" + a compact bordered
  hamburger button, not a large floating card.
- **Mid-scroll (scrollTop ≈ 400–900px into the hero pin)**: confirmed via `getComputedStyle`/
  inline `style` reads that the background wrapper's `transform` genuinely changes with scroll
  position — `translateY(-3%) scale(1.03)` at scrollTop 0 → `translateY(-3.03%) scale(1.0297)` at
  400 → `translateY(-5.32%) scale(1.0068)` at 900 — and that the hero text wrapper's inline style
  moved from `opacity:1` to `opacity:0; transform: translateY(-24px)` over the same range. This is
  read directly off the live DOM's `style`/`transform` attributes, not inferred from a screenshot,
  so the scroll-driven motion (background scale/parallax *and* text exit) is confirmed working,
  not static/mount-only.
- **City transition scene**: screenshotted mid-scroll — "CHAPTER 02 / From business problems to
  production systems." crossfades in over the skyline art with no hard cut and no stacking/z-index
  artifact (the `aee1bf5` sticky-scoping fix is intact).
- **Rakez arrival**: confirmed structurally via a live DOM walk from the `<img>` up through its
  wrapper chain (`img.object-cover` → `.absolute.inset-0` → `.absolute.inset-0.overflow-hidden` →
  `.sticky.top-0.h-screen…`) that every layer has `border-radius: 0px` and `position: absolute`/
  `sticky` sized to the full sticky scene — i.e. a true full-bleed background, not a bounded or
  rounded card. (Pinpointing this scene with a mid-scroll screenshot inside the narrow embedded
  preview pane was unreliable — the pane kept snapping scroll position on resize/reload — so this
  checkpoint relies on the direct DOM measurement above rather than a screenshot description.)
- **Console**: `read_console_messages` repeatedly surfaced one buffered error — a stale Turbopack
  parse error from *before* a mismatched `</div>`/`</motion.div>` closing tag was corrected during
  this session (see commit diff). After the fix, the dev server's own logs (`preview_logs`) show
  clean recompiles and `200` responses for `/en`, and the page renders/functions correctly in the
  DOM checks above; this appears to be a stale buffered message in the tool rather than a live
  error, but it's called out here for visibility.
- Grepped `src/components/client/Navbar.jsx` and the entire `src/components/story/` tree for
  `primary-`, `secondary-`, and `gradient-text` — zero matches. The cinematic tree is clean of
  legacy color-token usage.

## Build / commit

- `node ./node_modules/next/dist/bin/next build` — succeeded (Turbopack, all routes compiled,
  static pages generated, no errors).
- Changes committed locally on `feat/portfolio-cinematic-scrollteller-v1` (no push/merge).
