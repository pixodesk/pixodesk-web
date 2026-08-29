import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema()
  }),

  // Synced from github.com/pixodesk/pixodesk-svg-animator via `yarn sync:svga-docs`.
  // Ids are kept as the exact filename (e.g. `07-player--react`) so URLs match the source.
  svgaDocs: defineCollection({
    loader: glob({
      pattern: '*.md',
      base: './public/app/svga/docs',
      generateId: ({ entry }) => entry.replace(/\.md$/, ''),
    }),
  }),
};
