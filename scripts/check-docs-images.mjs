#!/usr/bin/env node
// Lists (or with --delete removes) orphaned docs images: files under public/images/docs/**
// that no file under src/content/docs/** references. Run from the website root:
//   node scripts/check-docs-images.mjs           — report orphans (exit 1 if any)
//   node scripts/check-docs-images.mjs --delete  — delete them
// Referenced = the image path appears in any content file (markdown image, provenance comment, html).
import { readdirSync, readFileSync, statSync, unlinkSync } from 'node:fs';
import { join, relative } from 'node:path';

const IMAGES_ROOT = 'public/images/docs';
const CONTENT_ROOT = 'src/content/docs';

const walk = (dir) => readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
});

const content = walk(CONTENT_ROOT)
    .filter((p) => /\.(mdx?|astro|html)$/.test(p))
    .map((p) => readFileSync(p, 'utf8'))
    .join('\n');

const orphans = walk(IMAGES_ROOT).filter((p) => {
    const url = '/' + relative('public', p).replaceAll('\\', '/');
    return !content.includes(url);
});

if (!orphans.length) {
    console.log('No orphaned docs images.');
} else if (process.argv.includes('--delete')) {
    for (const p of orphans) { unlinkSync(p); console.log('deleted', p); }
} else {
    console.log('Orphaned docs images (' + orphans.length + ') — not referenced by any content file:');
    for (const p of orphans) console.log('  ' + p);
    console.log('Run with --delete to remove them.');
    process.exitCode = 1;
}
