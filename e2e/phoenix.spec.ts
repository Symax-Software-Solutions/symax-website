import { test, expect } from '@playwright/test';

test.describe('Phoenix Page', () => {
  let consoleErrors: string[];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    await page.goto('/phoenix');
    await page.waitForLoadState('networkidle');
  });

  test('loads without errors', async () => {
    expect(consoleErrors).toHaveLength(0);
  });

  test('hero headline contains "Phoenix"', async ({ page }) => {
    const headline = page.locator('.phoenix-hero__headline');
    await expect(headline).toContainText('Phoenix');
  });

  test('download section is visible', async ({ page }) => {
    const download = page.locator('#download');
    await expect(download).toBeVisible();
  });

  test('Windows download card is visible with "Download" button', async ({ page }) => {
    const cards = page.locator('.download-card--available');
    await expect(cards).toHaveCount(1);

    const windowsCard = cards.first();
    await expect(windowsCard.locator('.download-card__os')).toContainText('Windows');
    await expect(windowsCard.locator('.download-card__btn')).toContainText('Download');
  });

  test('macOS and Linux cards show "Coming Soon" / "Soon" badge', async ({ page }) => {
    const soonCards = page.locator('.download-card--soon');
    await expect(soonCards).toHaveCount(2);

    // Each soon card should have "Coming soon" text and a "Soon" badge
    for (let i = 0; i < 2; i++) {
      const card = soonCards.nth(i);
      await expect(card.locator('.download-card__soon-text')).toContainText('Coming soon');
      await expect(card.locator('.download-card__badge-soon')).toContainText('Soon');
    }
  });

  test('"Back to Symax" link exists', async ({ page }) => {
    const backLink = page.locator('.phoenix-cta__back a');
    await expect(backLink).toBeVisible();
    await expect(backLink).toContainText('Back to Symax');
  });
});
