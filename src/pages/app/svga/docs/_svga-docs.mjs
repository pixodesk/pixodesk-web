// Helpers shared between `getStaticPaths` and the page body of [...slug].astro.
// `getStaticPaths` is hoisted into its own module scope, so these cannot live
// in the component frontmatter. The `_` prefix keeps this file out of routing.

export const BASE = "/app/svga/docs";

// Section keys come from the `NN-section--name.md` filenames used upstream.
export const SECTIONS = [
    ["start", "Getting started"],
    ["editor", "Editor"],
    ["player", "Player"],
    ["format", "Format"],
    ["help", "Help"],
];

export function parseId(id) {
    const match = /^(\d+)-([a-z-]+)--/.exec(id);
    return match
        ? { order: Number(match[1]), section: match[2] }
        : { order: -1, section: null };
}

// The docs carry no frontmatter, so the title is the first H1.
export function titleOf(entry) {
    const match = /^#\s+(.+)$/m.exec(entry.body ?? "");
    return match ? match[1].replace(/`/g, "").trim() : entry.id;
}

// "React — @pixodesk/svg-animator-react" reads as just "React" in the sidebar.
export function shortTitleOf(entry) {
    return titleOf(entry).split(" — ")[0].trim();
}

export function hrefOf(entry) {
    return entry.id === "README" ? BASE : `${BASE}/${entry.id}`;
}
