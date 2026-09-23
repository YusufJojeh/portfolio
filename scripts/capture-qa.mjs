// Captures the design-QA scroll states of the cinematic home page.
//
//   node scripts/capture-qa.mjs [outDir] [baseUrl] [--reduced] [--locale=ar]
//
// Uses the locally installed Chrome (channel "chrome"), so no browser download
// is needed. States are expressed as progress through the opening sequence
// (chapters 00–02 share one pinned track of LENGTH viewports) or as a chapter id.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith('--'));
const [outDir = 'qa-shots', baseUrl = 'http://localhost:3000'] = args.filter((a) => !a.startsWith('--'));
const reduced = flags.includes('--reduced');
const locale = (flags.find((f) => f.startsWith('--locale=')) || '--locale=en').split('=')[1];
const only = (flags.find((f) => f.startsWith('--only=')) || '').split('=')[1];

const LENGTH = 7.2;
const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1024', width: 1024, height: 768 },
  { name: '768', width: 768, height: 1024 },
  { name: '390', width: 390, height: 844 },
];
const STATES = [
  { name: 'A-hero-top', p: 0 },
  { name: 'B-hero-mid', p: 0.1 },
  { name: 'C1-city-crossfade', p: 0.2 },
  { name: 'C2-operations', p: 0.45 },
  { name: 'D1-rakez-arrival', p: 0.72 },
  { name: 'D2-rakez-system', p: 0.91 },
  { name: 'E-architecture', id: 'business-to-system', offset: 0.45 },
  { name: 'F-prospectiq', id: 'prospectiq', offset: 0.3 },
  { name: 'G-dhura', id: 'dhura', offset: 0.3 },
  { name: 'H-closing', id: 'closing', offset: 0.35 },
  { name: 'I-hirelens', id: 'hirelens', offset: 0 },
  { name: 'J-linguacoach', id: 'linguacoach', offset: 0.1 },
  { name: 'K-applied-ai', id: 'applied-ai', offset: 0 },
  { name: 'L-experience', id: 'experience', offset: 0.1 },
  { name: 'M-more-systems', id: 'more-systems', offset: 0.05 },
  { name: 'N-footer', bottom: true },
];

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const viewports = only ? VIEWPORTS.filter((v) => only.split(',').includes(v.name)) : VIEWPORTS;

for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    reducedMotion: reduced ? 'reduce' : 'no-preference',
  });
  await page.goto(`${baseUrl}/${locale}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2200);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(`${vp.name}: horizontal overflow ${overflow}px`);

  for (const s of STATES) {
    const y = await page.evaluate(
      ({ s, LENGTH, reduced }) => {
        const vh = window.innerHeight;
        if (s.p !== undefined) {
          if (reduced) {
            const id = s.p < 0.24 ? 'opening' : s.p < 0.62 ? 'real-operations' : 'rakez';
            const el = document.getElementById(id);
            return el ? el.getBoundingClientRect().top + window.scrollY : null;
          }
          return s.p * (LENGTH - 1) * vh;
        }
        if (s.bottom) return document.documentElement.scrollHeight - vh;
        const el = document.getElementById(s.id);
        if (!el) return null;
        const top = el.getBoundingClientRect().top + window.scrollY;
        return top + Math.max(0, el.offsetHeight - vh) * s.offset;
      },
      { s, LENGTH, reduced },
    );
    if (y === null) continue;
    // Step there so scroll-linked values settle the way a reader would see them.
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(900);
    await page.screenshot({ path: join(outDir, `${locale}-${vp.name}${reduced ? '-reduced' : ''}-${s.name}.png`) });
  }
  await page.close();
}

await browser.close();
