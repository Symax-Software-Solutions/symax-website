import { test, expect } from '@playwright/test';

test.describe('Events Portfolio', () => {
  test('events page loads at /events', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('.events-page')).toBeAttached();
    await expect(page.locator('h1')).toContainText('Event Portfolio');
  });

  test('events grid shows event cards', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('networkidle');

    const cards = page.locator('[data-testid="event-card"]');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test('event card shows title, date, and location', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('networkidle');

    const firstCard = page.locator('[data-testid="event-card"]').first();
    await expect(firstCard.locator('[data-testid="event-title"]')).toBeVisible();
    await expect(firstCard.locator('[data-testid="event-date"]')).toBeVisible();
    await expect(firstCard.locator('[data-testid="event-location"]')).toBeVisible();
  });

  test('clicking View Event navigates to /events/:slug', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="view-event-btn"]').first().click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/\/events\/.+/);
  });

  test('event detail page loads', async ({ page }) => {
    await page.goto('/events/pumptrack-worlds-2024');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('.event-detail-page')).toBeAttached();
  });

  test('event detail shows hero with title', async ({ page }) => {
    await page.goto('/events/pumptrack-worlds-2024');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="event-hero"]')).toBeVisible();
    await expect(page.locator('[data-testid="event-detail-title"]')).toContainText('Pumptrack World Championships 2024');
  });

  test('event detail without scoreboard does NOT show scoreboard section', async ({ page }) => {
    await page.goto('/events/austria-qualifier-2026');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="event-detail-title"]')).toContainText('Austria Qualifier 2026');
    await expect(page.locator('[data-testid="scoreboard-section"]')).not.toBeAttached();
  });

  test('event detail WITH show_scoreboard shows scoreboard section', async ({ page }) => {
    await page.goto('/events/pumptrack-worlds-2024');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="scoreboard-section"]')).toBeVisible();
    await expect(page.locator('[data-testid="scoreboard"]')).toBeVisible();
  });
});
