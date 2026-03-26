import { test, expect } from '@playwright/test';

test.describe('Navbar', () => {
  test('navbar is fixed and stays visible on scroll', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const navbar = page.locator('nav.navbar');
    await expect(navbar).toBeVisible();

    // Scroll down a lot
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(300);

    // Navbar should still be visible
    await expect(navbar).toBeVisible();
    await expect(navbar).toHaveClass(/scrolled/);
  });

  test('on mobile viewport, hamburger button is visible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hamburger = page.locator('.navbar__hamburger');
    await expect(hamburger).toBeVisible();
  });

  test('on mobile, clicking hamburger opens mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hamburger = page.locator('.navbar__hamburger');
    await hamburger.click();

    const mobileMenu = page.locator('.navbar__mobile');
    await expect(mobileMenu).toHaveClass(/open/);
  });

  test('mobile menu contains Phoenix Timing, RaceHub, Agentic Crew', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.locator('.navbar__hamburger').click();

    const mobileMenu = page.locator('.navbar__mobile');
    await expect(mobileMenu.locator('.navbar__mobile-link', { hasText: 'Phoenix Timing' })).toBeVisible();
    await expect(mobileMenu.locator('.navbar__mobile-link', { hasText: 'RaceHub' })).toBeVisible();
    await expect(mobileMenu.locator('.navbar__mobile-link', { hasText: 'Agentic Crew' })).toBeVisible();
  });

  test('desktop navbar shows Solutions, Racing, Contact links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const navLinks = page.locator('.navbar__links');
    await expect(navLinks.locator('button', { hasText: 'Solutions' })).toBeVisible();
    await expect(navLinks.locator('a.navbar__link', { hasText: 'Racing' })).toBeVisible();
    await expect(navLinks.locator('a.navbar__link', { hasText: 'Contact' })).toBeVisible();
  });
});
