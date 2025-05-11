import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60000, // Increase timeout to 60 seconds
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://d-eiat-folder-my-projects-my-other-projects-eiat5522s-projects.vercel.app',
    trace: 'on-first-retry',
    actionTimeout: 30000,
  },
  projects: [
    {
      name: 'api-testing',
      testMatch: /.*\.test\.ts/,
    },
  ],
  // Don't run local dev server for API tests
  webServer: {
    command: 'npm run build',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
