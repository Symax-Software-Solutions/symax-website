import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('clicking "Phoenix Timing" in dropdown navigates to /phoenix', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.locator('button.navbar__link--dropdown').click();
    await page.locator('.navbar__dropdown-item', { hasText: 'Phoenix Timing' }).click();

    await expect(page).toHaveURL(/\/phoenix/);
  });

  test('clicking "RaceHub" in dropdown navigates to /racing', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.locator('button.navbar__link--dropdown').click();
    await page.locator('.navbar__dropdown-item', { hasText: 'RaceHub' }).click();

    await expect(page).toHaveURL(/\/racing/);
  });

  test('clicking logo navigates to /', async ({ page }) => {
    await page.goto('/phoenix');
    await page.waitForLoadState('networkidle');

    await page.locator('.navbar__logo').click();

    await expect(page).toHaveURL(/\/$/);
  });

  test('/racing loads the HomeComponent without errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/racing');
    await page.waitForLoadState('networkidle');

    // HomeComponent renders a navbar and hero
    await expect(page.locator('app-navbar')).toBeAttached();
    expect(consoleErrors).toHaveLength(0);
  });

  test('/phoenix loads the PhoenixComponent without errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/phoenix');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('.phoenix-page')).toBeAttached();
    expect(consoleErrors).toHaveLength(0);
  });

  test('"Portfolio" link in navbar navigates to /events', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="nav-portfolio"]').click();
    await expect(page).toHaveURL(/\/events/);
    await expect(page.locator('.events-page')).toBeAttached();
  });

  test('back navigation works (history)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate to /phoenix
    await page.locator('button.navbar__link--dropdown').click();
    await page.locator('.navbar__dropdown-item', { hasText: 'Phoenix Timing' }).click();
    await expect(page).toHaveURL(/\/phoenix/);

    // Go back
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
  });
});
