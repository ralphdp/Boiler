import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check if the main heading is present
    await expect(page.getByRole('heading', { name: /Boilerplate/i })).toBeVisible();
  });

  test('should have theme toggle button', async ({ page }) => {
    await page.goto('/');

    // Check if theme toggle button exists
    await expect(page.getByRole('button', { name: /toggle theme/i })).toBeVisible();
  });
});

test.describe('Health Checks', () => {
  test('should return healthy status from /api/health', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.status).toBe('healthy');
  });
});
