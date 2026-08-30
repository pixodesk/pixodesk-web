/**
 * Builds the docs sidebar from the section files in src/content/docs/docs:
 * one group per file (ordered by `sidebar.order`), whose items are hash links to the
 * file's `##` headings. Keeps the sidebar in sync with the content — add a `##` heading
 * and it appears; no list to maintain here.
 */
import fs from 'node:fs';
import path from 'node:path';

const DOCS_DIR = path.resolve('src/content/docs/docs');

/** Sub-folders of DOCS_DIR that become always-open super-sections in the sidebar (folder → label).
 *  Their position follows the lowest `sidebar.order` of the files inside. */
export const SUPER_SECTIONS = {
    vector: 'Vector Editing',
    animation: 'Animation Editing',
};

/** Same rules as github-slugger (the heading-id algorithm Starlight uses). */
export function headingSlug(text) {
    return text.toLowerCase().replace(/[^\p{L}\p{N}_\- ]/gu, '').replace(/ /g, '-');
}

function parseSection(file) {
    const src = fs.readFileSync(file, 'utf8');
    const fm = src.match(/^---\n([\s\S]*?)\n---\n/);
    if (!fm) return undefined;
    const get = (key) => (fm[1].match(new RegExp('^' + key + ':\\s*"?(.*?)"?\\s*$', 'm')) || [])[1];
    if (get('draft') === 'true') return undefined;
    const order = Number((fm[1].match(/^\s+order:\s*(\d+)/m) || [])[1] ?? 999);
    const slug = get('slug');
    const body = src.slice(fm[0].length).replace(/```[\s\S]*?```/g, '');   // ignore headings inside code fences
    const seen = new Map();
    const items = [];
    for (const m of body.matchAll(/^## (.+)$/gm)) {
        const label = m[1].trim();
        let id = headingSlug(label);
        const n = seen.get(id) ?? 0; seen.set(id, n + 1);
        if (n) id = `${id}-${n}`;
        items.push({ label, link: `/${slug}#${id}` });
    }
    return { label: get('title'), order, slug, items };
}

function readSections(dir) {
    return fs.readdirSync(dir)
        .filter(f => /\.mdx?$/.test(f) && f !== 'index.mdx' && f !== 'docs-content.mdx')
        .map(f => parseSection(path.join(dir, f)))
        .filter(Boolean)
        .sort((a, b) => a.order - b.order);
}

const sectionGroup = (s) => ({
    label: s.label,
    collapsed: true,
    items: [{ label: 'Overview', link: `/${s.slug}` }, ...s.items],
});

export function docsSidebar() {
    const entries = readSections(DOCS_DIR).map(s => ({ order: s.order, group: sectionGroup(s) }));
    for (const [folder, label] of Object.entries(SUPER_SECTIONS)) {
        const dir = path.join(DOCS_DIR, folder);
        if (!fs.existsSync(dir)) continue;
        const sections = readSections(dir);
        if (!sections.length) continue;
        entries.push({
            order: Math.min(...sections.map(s => s.order)),
            // `collapsed: false` opens it; Sidebar.astro keeps it open and hides the caret (see SUPER_SECTIONS there)
            group: { label, collapsed: false, items: sections.map(sectionGroup) },
        });
    }
    return entries.sort((a, b) => a.order - b.order).map(e => e.group);
}
