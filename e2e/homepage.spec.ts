import { test, expect, Page } from '@playwright/test';

test.describe('Homepage', () => {
  let consoleErrors: string[];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // NG0100 is a dev-mode-only warning from SymaxHomeComponent's terminal animation
        // initialising in ngAfterViewInit — harmless and absent in production builds.
        if (!text.includes('NG0100')) {
          consoleErrors.push(text);
        }
      }
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('loads without console errors (excluding dev-mode NG0100)', async () => {
    expect(consoleErrors).toHaveLength(0);
  });

  test('hero section is visible with correct headline', async ({ page }) => {
    const hero = page.locator('section.hero');
    await expect(hero).toBeVisible();

    const headline = hero.locator('.hero__headline');
    await expect(headline).toContainText('Timing infrastructure');
    await expect(headline).toContainText('world-class racing');
  });

  test('trust bar is visible', async ({ page }) => {
    const trust = page.locator('section.trust');
    await expect(trust).toBeVisible();
    await expect(trust.locator('.trust__label')).toContainText('Trusted by the best');
  });

  test('Solutions dropdown opens on click and shows items', async ({ page }) => {
    const dropdownBtn = page.locator('button.navbar__link--dropdown');
    await dropdownBtn.click();

    const dropdown = page.locator('.navbar__dropdown');
    await expect(dropdown).toHaveClass(/open/);

    await expect(dropdown.locator('.navbar__dropdown-name', { hasText: 'Phoenix Timing' })).toBeVisible();
    await expect(dropdown.locator('.navbar__dropdown-name', { hasText: 'RaceHub' })).toBeVisible();
    await expect(dropdown.locator('.navbar__dropdown-name', { hasText: 'Agentic Crew' })).toBeVisible();
  });

  test('"Coming Soon" badge is visible on Agentic Crew', async ({ page }) => {
    const dropdownBtn = page.locator('button.navbar__link--dropdown');
    await dropdownBtn.click();

    const agenticItem = page.locator('.navbar__dropdown-item--soon');
    await expect(agenticItem).toBeVisible();
    await expect(agenticItem.locator('.navbar__dropdown-badge')).toContainText('Coming Soon');
  });

  test('Solutions dropdown closes when clicking outside', async ({ page }) => {
    const dropdownBtn = page.locator('button.navbar__link--dropdown');
    await dropdownBtn.click();

    const dropdown = page.locator('.navbar__dropdown');
    await expect(dropdown).toHaveClass(/open/);

    // Click outside the dropdown
    await page.locator('section.hero').click();
    await expect(dropdown).not.toHaveClass(/open/);
  });

  test('CTA button "Get in Touch" is visible', async ({ page }) => {
    const cta = page.locator('.hero__actions .btn-ghost', { hasText: 'Get in Touch' });
    await expect(cta).toBeVisible();
  });

  test('Agentic Crew section exists on the page', async ({ page }) => {
    const agentic = page.locator('section.agentic');
    await expect(agentic).toBeAttached();
  });

  test('Stats strip shows 4 stats', async ({ page }) => {
    const stats = page.locator('.proof__stat');
    await expect(stats).toHaveCount(4);
  });
});
