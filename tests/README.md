# Playwright Link Tests

Tests that verify all internal navigation links return non-404 responses, and that external store links have the correct `href` values.

## Prerequisites

Node modules must be installed:

```bash
npm install
```

## Running tests

The dev server must be running before you start the tests:

```bash
# Terminal 1 — start the dev server
npm run dev

# Terminal 2 — run the tests
npm test
```

To open the Playwright visual UI (lets you step through tests and see screenshots):

```bash
npm run test:ui
```

## What is tested

| File | Description |
|---|---|
| `links.spec.ts` | All link and navigation tests |

### Test groups inside `links.spec.ts`

**nav menu** — checks the logo and 4 main nav items (`/animator`, `/svg-editor`, `/svg-animator`, `/pricing`) by verifying the `href` attribute and navigating to confirm no 404.

**index page - app cards** — checks the 3 app cards link to the correct main pages.

**pricing page - download buttons** — checks the 3 download buttons link to the correct download pages (`/animator/download`, `/svg-editor/download`, `/svg-animator/download`).

**download pages - store button hrefs** — checks only the `href` attribute value of the Apple Store and Microsoft Store buttons on the Animator and SVG Editor download pages. Does not navigate to external URLs.

## When a test fails

- **Internal link test fails** — a page was renamed or removed. Update the link in the source YAML or Astro component, then rerun.
- **Store href test fails** — the store URL in the YAML data file was changed. Check `src/data/2d-animator/lottie-pages-text-content.yaml` and `src/data/svg/svg-pages-text-content.yaml`.
