import { test, expect } from '@playwright/test';

// Mirrors WORK_ORDER in src/content/portfolio/projects.ts.
const SLUGS = ['rakez', 'crma', 'dhura', 'prospectiq', 'restocafe', 'mtjri', 'hirelens', 'linguacoach', 'careerguide'];
const CHAPTERS = [
  'opening',
  'real-operations',
  'rakez',
  'crma',
  'dhura',
  'prospectiq',
  'restocafe',
  'business-to-system',
  'applied-ai',
  'more-systems',
  'experience',
  'about',
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
    // The Applied AI chapter is a server component: this guards the request-locale wiring.
    await expect(page.locator('#applied-ai h2')).toContainText('ذكاء اصطناعي');
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
    for (const id of ['rakez', 'crma', 'dhura', 'prospectiq', 'restocafe', 'closing']) {
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

  test('real screenshots load on every page that has them', async ({ page }) => {
    for (const slug of SLUGS.filter((s) => s !== 'crma')) {
      await page.goto(`/en/work/${slug}`);
      const img = page.locator(`figure img[src*="${slug}"]`).first();
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveJSProperty('complete', true);
      expect(await img.evaluate((el) => el.naturalWidth), slug).toBeGreaterThan(0);
      expect(await img.getAttribute('alt'), slug).toBeTruthy();
    }
  });

  test('flagship pages say what was verified and what is not claimed', async ({ page }) => {
    for (const slug of ['rakez', 'crma', 'dhura', 'prospectiq', 'restocafe']) {
      await page.goto(`/en/work/${slug}`);
      await expect(page.getByRole('heading', { name: 'What was verified' })).toHaveCount(1);
      await expect(page.getByRole('heading', { name: 'What I do not claim' })).toHaveCount(1);
    }
  });

  test('employer projects have no routes', async ({ page }) => {
    for (const slug of ['ot2', 'alaya', 'algoag']) {
      const res = await page.goto(`/en/work/${slug}`);
      expect(res?.status(), slug).toBe(404);
    }
  });

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

test.describe('cv and availability', () => {
  for (const locale of ['en', 'ar']) {
    test(`/${locale} links a downloadable CV and states availability`, async ({ page, request }) => {
      await page.goto(`/${locale}`);
      const links = page.locator('a[href$=".pdf"][download]');
      // First screen, nav, closing chapter and footer.
      expect(await links.count()).toBeGreaterThanOrEqual(3);
      await expect(page.getByTestId('hero-availability')).toBeVisible();
      await expect(page.getByTestId('hero-availability')).toContainText('UTC+3');
      await expect(page.getByTestId('hero-availability').locator('a[download]')).toBeVisible();
      await expect(page.getByTestId('availability')).toContainText(locale === 'en' ? 'GCC/EMEA' : 'EMEA');
      const res = await request.get(await links.first().getAttribute('href'));
      expect(res.status()).toBe(200);
      expect(res.headers()['content-type']).toContain('application/pdf');
    });
  }
});

test('CV and contact clicks are sent as analytics events', async ({ page }) => {
  await page.goto('/en');
  // Keep the download and mailto from leaving the page; the tracker listens in the capture phase.
  await page.evaluate(() => document.addEventListener('click', (e) => e.preventDefault()));
  await page.getByTestId('hero-availability').locator('a[download]').click();
  await page.locator('footer a[href^="mailto:"]').click();
  const events = await page.evaluate(() =>
    (window.vaq || []).filter((c) => c[0] === 'event').map((c) => c[1]),
  );
  expect(events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: 'cv_download', data: expect.objectContaining({ locale: 'en' }) }),
      expect.objectContaining({ name: 'contact_click', data: expect.objectContaining({ channel: 'email', placement: 'footer' }) }),
    ]),
  );
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
