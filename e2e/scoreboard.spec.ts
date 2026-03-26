import { test, expect } from '@playwright/test';

test.describe('Scoreboard Component', () => {
  test('scoreboard renders when show_scoreboard is true', async ({ page }) => {
    await page.goto('/events/pumptrack-worlds-2024');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="scoreboard-section"]')).toBeVisible();
    await expect(page.locator('[data-testid="scoreboard"]')).toBeVisible();
  });

  test('scoreboard shows correct column headers', async ({ page }) => {
    await page.goto('/events/pumptrack-worlds-2024');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="scoreboard-header-pos"]')).toContainText('POS');
    await expect(page.locator('[data-testid="scoreboard-header-rider"]')).toContainText('RIDER');
    await expect(page.locator('[data-testid="scoreboard-header-time"]')).toContainText('TIME');
    await expect(page.locator('[data-testid="scoreboard-header-gap"]')).toContainText('GAP');
  });

  test('scoreboard shows Powered by Phoenix label', async ({ page }) => {
    await page.goto('/events/pumptrack-worlds-2024');
    await page.waitForLoadState('networkidle');

    const powered = page.locator('[data-testid="powered-by-phoenix"]');
    await expect(powered).toBeVisible();
    await expect(powered).toContainText('Phoenix');
  });

  test('scoreboard shows data rows', async ({ page }) => {
    await page.goto('/events/pumptrack-worlds-2024');
    await page.waitForLoadState('networkidle');

    const rows = page.locator('.scoreboard__row');
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test('scoreboard is not present for events without it', async ({ page }) => {
    await page.goto('/events/uci-mtb-worlds-2024');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="scoreboard-section"]')).not.toBeAttached();
  });
});
