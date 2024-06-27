import { test as base, expect, chromium } from '@playwright/test';
import type { Page, BrowserContext } from '@playwright/test';

// Extend the test type to include authenticated page and context
type AuthenticatedTestFixtures = {
  authenticatedPage: Page;
  authenticatedContext: BrowserContext;
};

const test = base.extend<AuthenticatedTestFixtures>({
  authenticatedContext: async ({}, use) => {
    const context = await chromium.launchPersistentContext('', {
      headless: true,
      storageState: 'auth.json', // Path to the stored authentication state
    });
    await use(context);
    await context.close();
  },

  authenticatedPage: async ({ authenticatedContext }, use) => {
    const page = await authenticatedContext.newPage();
    await use(page);
  },
});

// Login function to set up authentication state
async function login(page: Page) {
  await page.goto('http://your-app-url.com/login');
  await page.fill('input[name="email"]', 'your-email@example.com');
  await page.fill('input[name="password"]', 'your-password');
  await page.click('button:has-text("Log in")');
  await page.waitForNavigation();

  // Store the authentication state
  await page.context().storageState({ path: 'auth.json' });
}

// Run this once to set up the authentication state
test('authenticate', async ({ page }) => {
  await login(page);
});

// Your actual tests using the authenticated page
test('Home Page', async ({ authenticatedPage: page }) => {
  await page.goto('http://your-app.com');

  // Navigate to a section (adjust selector as needed)
  await page.click('text=Get Started');

  // Wait for the content to load
  await page.waitForSelector('text=Welcome');


  // ... rest of your test code ...
});