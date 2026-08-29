/**
 * Prepares the synced SVG Animator docs for rendering as site pages.
 *
 * 1. Rewrites the relative `.md` cross-links so they point at the rendered
 *    routes instead of the raw markdown files:
 *
 *      ./README.md                  -> /app/svga/docs
 *      ./07-player--react.md#nextjs -> /app/svga/docs/07-player--react#nextjs
 *      ../README.md                 -> the repository README on GitHub
 *
 * 2. Lifts ```mermaid fences into raw `<pre class="mermaid">` blocks. Astro's
 *    expressive-code runs as a *rehype* plugin, i.e. after this one, so
 *    replacing the code node here is enough to keep it from rendering the
 *    diagram source as a syntax-highlighted code block. The client-side
 *    mermaid script in the docs route then draws them.
 *
 * Scoped by file path: markdown anywhere else in the site is left untouched.
 */
const DOCS_DIR = 'src/content/docs2';
const BASE = '/app/svga/docs';
const REPO_README = 'https://github.com/pixodesk/pixodesk-svg-animator#readme';

function rewrite(url) {
  const match = /^(\.{1,2})\/([^#?]+)\.md(#.*)?$/.exec(url);
  if (!match) return url;

  const [, dots, name, hash = ''] = match;
  if (dots === '..') return name === 'README' ? REPO_README : url;
  if (name === 'README') return BASE + hash;
  return `${BASE}/${name}${hash}`;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function walk(node, fn) {
  fn(node);
  for (const child of node.children ?? []) walk(child, fn);
}

export function remarkSvgaDocLinks() {
  return (tree, file) => {
    const path = (file?.history?.[0] ?? file?.path ?? '').replace(/\\/g, '/');
    if (!path.includes(DOCS_DIR)) return;

    walk(tree, (node) => {
      if ((node.type === 'link' || node.type === 'definition') && node.url) {
        node.url = rewrite(node.url);
      }

      if (node.type === 'code' && node.lang === 'mermaid') {
        node.type = 'html';
        node.value = `<pre class="mermaid">${escapeHtml(node.value)}</pre>`;
        delete node.lang;
        delete node.meta;
      }
    });
  };
}
