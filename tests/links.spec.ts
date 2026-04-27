import { test, expect, type Page } from '@playwright/test';

async function expectNotFound(page: Page, href: string) {
  const response = await page.goto(href);
  expect(response?.status(), `${href} returned 404`).not.toBe(404);
}

// ──────────────────────────────────────────────────────────
// NAV MENU  (logo + 4 main items)
// ──────────────────────────────────────────────────────────
test.describe('nav menu', () => {
  const links = [
    { label: 'Pixodesk', href: '/' },
    { label: 'Animator (Lottie)', href: '/animator' },
    { label: 'SVG Editor', href: '/svg-editor' },
    { label: 'SVG Animator', href: '/svg-animator' },
    { label: 'Pricing', href: '/pricing' },
  ];

  for (const { label, href } of links) {
    test(`"${label}" link goes to ${href}`, async ({ page }) => {
      await page.goto('/');
      const link = page.locator(`nav a[href="${href}"]`).first();
      await expect(link).toHaveAttribute('href', href);
      await expect(link).toHaveText(label);
      await expectNotFound(page, href);
    });
  }
});

// ──────────────────────────────────────────────────────────
// NAV SUBMENUS
// ──────────────────────────────────────────────────────────
test.describe('nav submenu links', () => {
  const sections = [
    {
      section: 'Animator (Lottie)',
      parentHref: '/animator',
      subLinks: [
        { label: 'Lottie Animation', href: '/animator/lottie-animation' },
        { label: 'Tutorials', href: '/animator/tutorials' },
        { label: 'Features', href: '/animator/features' },
        { label: 'Releases', href: '/animator/releases' },
        { label: 'Download', href: '/animator/download' },
      ],
    },
    {
      section: 'SVG Editor',
      parentHref: '/svg-editor',
      subLinks: [
        { label: 'Features', href: '/svg-editor/features' },
        { label: 'Releases', href: '/svg-editor/releases' },
        { label: 'Download', href: '/svg-editor/download' },
      ],
    },
    {
      section: 'SVG Animator',
      parentHref: '/svg-animator',
      subLinks: [
        { label: 'Features', href: '/svg-animator/features' },
        { label: 'Download', href: '/svg-animator/download' },
      ],
    },
  ];

  for (const { section, parentHref, subLinks } of sections) {
    test.describe(section, () => {
      for (const { label, href } of subLinks) {
        test(`"${label}" link goes to ${href}`, async ({ page }) => {
          await page.goto(parentHref);
          const link = page.locator(`nav a[href="${href}"]`).first();
          await expect(link).toHaveAttribute('href', href);
          await expect(link).toHaveText(label);
          await expectNotFound(page, href);
        });
      }
    });
  }
});

// ──────────────────────────────────────────────────────────
// INDEX PAGE  →  3 app cards
// ──────────────────────────────────────────────────────────
test.describe('index page - app cards', () => {
  // hrefs are relative in the source ("./svg-editor" etc.)
  const cards = [
    { name: 'SVG Editor', href: './svg-editor', resolvedPath: '/svg-editor' },
    { name: 'Animator', href: './animator', resolvedPath: '/animator' },
    { name: 'SVG Animator', href: './svg-animator', resolvedPath: '/svg-animator' },
  ];

  for (const { name, href, resolvedPath } of cards) {
    test(`"${name}" card href is correct and page is not 404`, async ({ page }) => {
      await page.goto('/');
      const card = page.locator(`a.studio-card[href="${href}"]`);
      await expect(card).toHaveAttribute('href', href);
      await expectNotFound(page, resolvedPath);
    });
  }
});

// ──────────────────────────────────────────────────────────
// PRICING PAGE  →  3 download links
// ──────────────────────────────────────────────────────────
test.describe('pricing page - download buttons', () => {
  const links = [
    { name: 'SVG Editor', href: '/svg-editor/download' },
    { name: 'Animator', href: '/animator/download' },
    { name: 'SVG Animator', href: '/svg-animator/download' },
  ];

  for (const { name, href } of links) {
    test(`"${name}" button href is correct and page is not 404`, async ({ page }) => {
      await page.goto('/pricing');
      const button = page.locator(`a.button[href="${href}"]`);
      await expect(button).toHaveAttribute('href', href);
      await expectNotFound(page, href);
    });
  }
});

// ──────────────────────────────────────────────────────────
// DOWNLOAD PAGES  →  store links (href check only, no navigation)
// ──────────────────────────────────────────────────────────
test.describe('download pages - store button hrefs', () => {
  const pages = [
    {
      path: '/animator/download',
      microsoft: 'https://apps.microsoft.com/detail/9ppd94xqfpc9',
      apple: 'https://apps.apple.com/gb/app/pixodesk-animator/id1632981604',
    },
    {
      path: '/svg-editor/download',
      microsoft: 'https://apps.microsoft.com/detail/9pczdhjv026p',
      apple: 'https://apps.apple.com/gb/app/pixodesk-svg/id6476456257',
    },
  ];

  for (const { path, microsoft, apple } of pages) {
    test(`${path} - Microsoft Store href`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator(`a[href="${microsoft}"]`)).toHaveAttribute('href', microsoft);
    });

    test(`${path} - Apple Store href`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator(`a[href="${apple}"]`)).toHaveAttribute('href', apple);
    });
  }
});
