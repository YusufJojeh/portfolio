import { test, expect } from '@playwright/test';

const SLUGS = ['rakez', 'hirelens', 'linguacoach', 'prospectiq', 'dhura', 'careerguide', 'algoag'];
const CHAPTERS = [
  'opening',
  'real-operations',
  'rakez',
  'business-to-system',
  'hirelens',
  'linguacoach',
  'prospectiq',
  'dhura',
  'applied-ai',
  'experience',
  'more-systems',
  'closing',
];

const overflow = (page) => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);

test.describe('home', () => {
  test('renders the opening and every chapter anchor', async ({ page }) => {
    await page.goto('/en');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('business complexity');
    for (const id of CHAPTERS) await expect(page.locator(`#${id}`)).toHaveCount(1);
  });

  test('Arabic renders right-to-left with Arabic copy from server components', async ({ page }) => {
    await page.goto('/ar');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    // The HireLens chapter is a server component: this guards the request-locale wiring.
    await expect(page.locator('#hirelens h2')).toContainText('الذكاء الاصطناعي');
  });

  test('no horizontal overflow at 390px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const locale of ['en', 'ar']) {
      await page.goto(`/${locale}`);
      expect(await overflow(page)).toBeLessThanOrEqual(0);
    }
  });

  test('scrolling the opening moves the hero image', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en');
    // The hero photo's frame sits inside the scroll-driven camera wrapper.
    const camera = () =>
      page.evaluate(
        () => document.querySelector('img[src*="hero-yusuf-city"]')?.closest('.story-frame')?.parentElement?.style.transform ?? '',
      );
    const before = await camera();
    expect(before).toContain('scale');
    await page.mouse.wheel(0, 700);
    await page.waitForTimeout(600);
    expect(await camera()).not.toEqual(before);
  });
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('chapter content is visible without scroll-driven reveals', async ({ page }) => {
    await page.goto('/en');
    for (const id of ['rakez', 'prospectiq', 'dhura', 'closing']) {
      const heading = page.locator(`#${id} h2`).first();
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
      const opacity = await heading.evaluate((el) => {
        let o = 1;
        for (let n = el; n; n = n.parentElement) o *= Number(getComputedStyle(n).opacity);
        return o;
      });
      expect(opacity).toBeGreaterThan(0.95);
    }
  });
});

test.describe('work routes', () => {
  for (const locale of ['en', 'ar']) {
    for (const slug of SLUGS) {
      test(`/${locale}/work/${slug} renders`, async ({ page }) => {
        const res = await page.goto(`/${locale}/work/${slug}`);
        expect(res?.status()).toBe(200);
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      });
    }
  }

  test('unknown slug is a 404', async ({ page }) => {
    const res = await page.goto('/en/work/not-a-project');
    expect(res?.status()).toBe(404);
  });

  test('no horizontal overflow at 390px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const slug of SLUGS) {
      await page.goto(`/en/work/${slug}`);
      expect(await overflow(page), slug).toBeLessThanOrEqual(0);
    }
  });

  test('next-project links form one loop', async ({ page }) => {
    const seen = [];
    let slug = SLUGS[0];
    for (let i = 0; i < SLUGS.length; i++) {
      await page.goto(`/en/work/${slug}`);
      seen.push(slug);
      const href = await page.locator(`a[href^="/en/work/"]`).last().getAttribute('href');
      slug = href.split('/').pop();
    }
    expect(slug).toBe(SLUGS[0]);
    expect(new Set(seen).size).toBe(SLUGS.length);
  });
});

test.describe('navigation', () => {
  test('mobile menu opens, closes on Escape and returns focus', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/en');
    const button = page.getByRole('button', { name: /menu/i });
    await button.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(button).toBeFocused();
  });

  test('skip link targets main content', async ({ page }) => {
    await page.goto('/en');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: /skip to content/i });
    await expect(skip).toBeFocused();
  });
});
