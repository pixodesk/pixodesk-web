import { test, expect, type Page } from '@playwright/test';

async function expectNotFound(page: Page, href: string) {
  const response = await page.goto(href);
  expect(response?.status(), `${href} returned 404`).not.toBe(404);
}

// ──────────────────────────────────────────────────────────
// FOOTER  →  policy links (terms of use & privacy policy)
// ──────────────────────────────────────────────────────────
test.describe('footer policy links', () => {
  const links = [
    { label: 'Animator Terms of Use', href: '/app/animator/eula' },
    { label: 'Animator Privacy Policy', href: '/app/animator/privacy-policy' },
    { label: 'SVG Editor Terms of Use', href: '/app/svg/eula' },
    { label: 'SVG Editor Privacy Policy', href: '/app/svg/privacy-policy' },
  ];

  for (const { label, href } of links) {
    test(`"${label}" link goes to ${href}`, async ({ page }) => {
      await page.goto('/');
      const link = page.locator(`footer a[href="${href}"]`);
      await expect(link).toHaveAttribute('href', href);
      await expect(link).toHaveText(label);
      await expectNotFound(page, href);
    });
  }
});
