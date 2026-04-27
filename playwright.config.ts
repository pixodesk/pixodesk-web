import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://127.0.0.1:4321',
  },
  // Uncomment to auto-start the dev server before running tests:
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://127.0.0.1:4321',
  //   reuseExistingServer: true,
  // },
});
