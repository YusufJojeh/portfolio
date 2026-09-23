// Captures the /work case-study pages one viewport at a time.
//
//   node scripts/capture-work.mjs [outDir] [baseUrl] [--locale=ar] [--only=390] [--slugs=rakez,dhura]
//
// Viewport-stepped rather than full-page: a full-page capture stretches the
// viewport, which changes every svh-based height it is meant to check.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith('--'));
const flag = (name, fallback) => (flags.find((f) => f.startsWith(`--${name}=`)) || `--${name}=${fallback}`).split('=')[1];
const [outDir = 'qa-work', baseUrl = 'http://localhost:3000'] = args.filter((a) => !a.startsWith('--'));
const locale = flag('locale', 'en');
const only = flag('only', '1440,390').split(',');
const slugs = flag('slugs', 'rakez,hirelens,linguacoach,prospectiq,dhura,careerguide,algoag').split(',');

const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1024', width: 1024, height: 768 },
  { name: '768', width: 768, height: 1024 },
  { name: '390', width: 390, height: 844 },
].filter((v) => only.includes(v.name));

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  for (const slug of slugs) {
    const res = await page.goto(`${baseUrl}/${locale}/work/${slug}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log(`${vp.name} ${slug}: status ${res.status()}, overflow ${overflow}px, height ${height}px`);
    const steps = Math.min(10, Math.ceil(height / vp.height));
    for (let i = 0; i < steps; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), i * vp.height);
      await page.waitForTimeout(500);
      await page.screenshot({ path: join(outDir, `${locale}-${vp.name}-${slug}-${i}.png`) });
    }
  }
  await page.close();
}

await browser.close();
