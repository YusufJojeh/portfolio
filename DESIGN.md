---
name: Yusuf Jojeh Portfolio
description: A dark, photographic, pinned-scroll portfolio where real systems are shown like footage in a darkened screening room.
colors:
  night-bg: "#090B0F"
  night-bg-2: "#0E1117"
  night-elevated: "#141820"
  projector-soft: "#FAF9F6"
  projector-text: "#F3F1EC"
  cream: "#EFEEE9"
  muted-slate: "#8A9099"
  steel: "#7A818B"
  signal-blue: "#5A8CFF"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(64px, 11vw, 176px)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "normal"
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(44px, 4.4vw, 68px)"
    fontWeight: 400
    lineHeight: 1.1
  title:
    fontFamily: "Inter Tight, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "0.2em"
rounded:
  sm: "3px"
  md: "4px"
spacing:
  gutter-mobile: "24px"
  gutter-tablet: "48px"
  gutter-desktop: "64px"
  section: "112px"
components:
  button-primary:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.night-bg}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.projector-soft}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.projector-text}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
  frame:
    backgroundColor: "{colors.night-bg-2}"
    rounded: "{rounded.md}"
---

# Design System: Yusuf Jojeh Portfolio

## Overview

**Creative North Star: "The Night Projection Room"**

The page is a darkened screening room. Photography and real product screens are the only light source; the interface is the slate and the caption beneath them. Everything chrome-like (type, hairlines, buttons) stays quiet and cream-on-black so the footage carries the claim. A reader scrolls through pinned scenes the way a film advances, and each case study opens as if a lens is finding focus.

Depth is flat and photography-lit. There are no UI shadows; layers separate by tone (page, raised panel, elevated panel) and by 1px white hairlines. Motion is deliberate and from an already-visible default: a scene's camera settles, copy rises once, arrows lean toward their destination. Nothing loops except what is paused when offscreen.

Arabic is a first-class voice, not a translation layer: right-to-left layout, Ruq'ah calligraphy for display, and no letter-spacing so joins stay intact.

**Key Characteristics:**
- Near-black field (`#090B0F`) with cream and soft-white type, one cool blue accent held in reserve.
- Instrument Serif at large sizes for display; tracked mono caps for captions and data.
- Hairline borders at 10% white; tonal layering instead of shadow.
- Small 3-4px corners and square-ish frames; no pills, no rounded cards.
- Real, unretouched screenshots as evidence; generated art is disclosed and blurred.

## Colors

A monochrome night palette with warm-cream type. Color enters through photography, not through UI.

### Primary
- **Cream** (`#EFEEE9`): the one primary action fill and the focus ring. Used for the main button and for emphasis that must read at a glance.

### Secondary
- **Signal Blue** (`#5A8CFF`): defined for rare status or data emphasis. Hold it back; it is not a UI accent.

### Neutral
- **Night Black** (`#090B0F`): page and button-on-cream text.
- **Night Panel** (`#0E1117`): raised panels, screenshot frames, alternate bands.
- **Night Elevated** (`#141820`): the highest tonal layer.
- **Projector Soft** (`#FAF9F6`): headlines and hover state of the primary button.
- **Projector Text** (`#F3F1EC`): body copy, usually at 70-80% opacity.
- **Muted Slate** (`#8A9099`): captions, labels, metadata (about 6:1 on night black).
- **Steel** (`#7A818B`): quiet secondary marks (about 5:1; do not go darker).

### Named Rules
**The Light Is Photography Rule.** Chromatic color belongs to imagery. UI never adds a hue to look branded.

**The 4.5 Floor Rule.** Text on night black never falls below 4.5:1. Muted body copy is Projector Text at 60% at the lowest, never steel-on-steel.

## Typography

**Display Font:** Instrument Serif (Georgia fallback); Arabic display uses Aref Ruqaa
**Body Font:** Inter (system-ui fallback); Arabic body uses IBM Plex Sans Arabic
**Label/Mono Font:** JetBrains Mono, with Plex Arabic for Arabic runs
**Wordmark/title:** Inter Tight 500-600

**Character:** A cinematic serif for statements against a plain, readable sans, with mono caps doing the caption work of a film slate.

### Hierarchy
- **Display** (400, clamp(64px, 11vw, 176px), 0.92): case-study titles and the opening headline. Max 6rem on narrow viewports.
- **Headline** (400, clamp(44px, 4.4vw, 68px), 1.1): ledes and section statements.
- **Title** (Inter Tight 500, 15px): wordmark and small headings.
- **Body** (400, 15-17px, 1.6): copy at 65-75ch, Projector Text at 70-80%.
- **Label** (mono 400, 11px, 0.2em tracking, uppercase): captions, indices, source lines. Arabic labels drop tracking and rise to 12.5px.

### Named Rules
**The No-Tracking-In-Arabic Rule.** Any letter-spacing breaks Arabic joins. RTL headings and labels set tracking to 0; Latin runs marked `dir="ltr"` keep it.

**The Floor Size Rule.** No text under 11px.

## Layout

A full-bleed stage with generous side gutters (24px mobile, 48px tablet, 64px desktop) and sections spaced 80-112px apart. The home page is a series of pinned scenes: a tall track whose sticky stage shows stacked full-screen layers that fade by scroll progress. Case studies are conventional long pages: cover, lede, evidence, architecture, next project.

Content is left-aligned in Latin and mirrored in Arabic; arrows and positional cues flip with direction. Two-column grids collapse at the `md` and `lg` breakpoints. Hit areas reach 44px even where the drawn control is smaller.

## Elevation & Depth

Flat and tonal. Depth comes from the stack bg, bg-2, elevated, and from hairline borders at 10% white (20% on hover). The only shadow is a single deep, soft drop under screenshot frames (`0 40px 80px -40px rgba(0,0,0,0.9)`), which reads as ambient darkness rather than lift. A top-of-page scrim fades the nav into the photograph.

### Named Rules
**The Hairline Rule.** Separation is a 1px line or a tonal step. A new shadow needs a reason a hairline cannot give.

## Shapes

Square-leaning. Buttons and tags use a 3px corner, frames 4px. No fully rounded pills. Borders are thin and low-contrast. Photography stays full-bleed and uncropped by decorative masks.

## Components

### Buttons
- **Shape:** 3px corner, 12px by 20px padding, 13.5px medium type.
- **Primary:** cream fill, night-black text; hover moves to Projector Soft. The trailing arrow leans 3px toward the destination (reversed in RTL); press settles 1px.
- **Secondary:** transparent with a 25% white outline, brightening to 60% on hover.
- **Focus:** a 2px cream outline with 4px offset on every interactive element.

### Screenshot Frame
- 4px corner, 1px white hairline on Night Panel, the deep soft shadow above. Hover lifts the hairline to 20%. Screens crossfade with a slow drift so they read as footage.

### Navigation
- Fixed top, no bar: a gradient scrim keeps links legible over photography. Links are 13px Projector Text at 80%, going to cream on hover. On mobile a Menu button opens a full-screen dialog with large serif links, a Tab trap and Escape to close.

### Captions and Labels
- Mono, uppercase, tracked, in Muted Slate. They label sections, sources and indices and never act as decoration.

### Case-Study Arrival
- The cover image resolves from blur and dim over about 1.1s while the copy rises 14px; reduced motion keeps only a 300ms fade.

## Do's and Don'ts

### Do:
- **Do** let photography and real screenshots carry color; keep UI cream, soft white and slate.
- **Do** use 1px white/10 hairlines and tonal layers for separation.
- **Do** keep every nonessential loop paused when offscreen and removed under reduced motion.
- **Do** give every control a 44px hit area and a cream focus ring.
- **Do** mirror layout and flip arrows in Arabic, with no letter-spacing.

### Don't:
- **Don't** add gradients on text, glow shadows, glass blur, or colored side borders.
- **Don't** put rounded cards, pills or icon-grid card rows on the page.
- **Don't** put text under 11px or below 4.5:1 contrast.
- **Don't** retouch or mock up real screenshots; disclose generated art with the art note.
- **Don't** repeat one scroll-reveal on every section; motion is authored moments, not a default.
