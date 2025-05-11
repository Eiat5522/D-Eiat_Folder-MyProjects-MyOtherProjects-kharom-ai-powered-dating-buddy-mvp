import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://d-eiat-folder-my-projects-my-other-projects-eiat5522s-projects.vercel.app',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'api-testing',
      testMatch: /.*\.test\.ts/,
    },
  ],
});
