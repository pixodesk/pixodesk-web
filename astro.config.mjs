import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import yaml from "@modyfi/vite-plugin-yaml";
import mdx from '@astrojs/mdx';
import starlight from "@astrojs/starlight";

export default defineConfig({
    markdown: {
        shikiConfig: {
            themes: {
                light: "github-light",
                dark: "github-dark",
            },
        },
    },
    vite: {
        site: 'https://pixodesk.com',
        plugins: [yaml()],
        server: {
            host: true, // Allow access via 127.0.0.1 or custom domains
            allowedHosts: ['pixodesk.com'], // Domain
        }
    },
    integrations: [
        react(),
        tailwind({
            config: { applyBaseStyles: true },
        }),
        starlight({
            title: "Pixodesk",
            disable404Route: true,
            pagefind: false,
            locales: {
                root: {
                    label: 'English',
                    lang: 'en',
                },
            },
            defaultLocale: 'root',
            expressiveCode: {
                themes: ['github-light', 'github-dark'],  //  github-light, min-light, slack-ochin, solarized-light, vitesse-light
                frames: {
                    terminalTitlebarDotsOpacity: '0',      // Hide the dots
                    terminalTitlebarBorderBottomColor: 'transparent',
                    editorTabBarBorderBottomColor: 'transparent',
                },
                styleOverrides: {
                    frames: {
                        showCopyToClipboardButton: true,  // keep copy button
                        frameBoxShadowCssValue: 'none',
                    },
                },

            },
            customCss: ['./src/styles/starlight-custom-style.css'], 
            tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
            components: {
                // Header: './src/components/starlight/Header.astro',
                // Footer: './src/components/starlight/Footer.astro',
            },
            sidebar: [
                
                {
                    label: 'Get Started',
                    autogenerate: { directory: 'docs/010-get-started' },
                },
                {
                    label: 'Workspace',
                    autogenerate: { directory: 'docs/020-workspace' },
                },
                {
                    label: 'Create and Import Files',
                    autogenerate: { directory: 'docs/030-create-and-import-files' },
                },
                {
                    label: 'Canvas',
                    autogenerate: { directory: 'docs/040-canvas' },
                },
                {
                    label: 'Navigation',
                    autogenerate: { directory: 'docs/050-canvas-navigation' },
                },
                {
                    label: 'Draw',
                    autogenerate: { directory: 'docs/060-draw' },
                },
                {
                    label: 'Object Creation Tools',
                    autogenerate: { directory: 'docs/070-object-creation-tools' },
                },
                {
                    label: 'Edit Paths',
                    autogenerate: { directory: 'docs/080-edit-paths' },
                },
                {
                    label: 'Color',
                    autogenerate: { directory: 'docs/090-color' },
                },
                {
                    label: 'Edit Objects',
                    autogenerate: { directory: 'docs/100-edit-objects' },
                },
                {
                    label: 'Symbols',
                    autogenerate: { directory: 'docs/110-symbols' },
                },
                {
                    label: 'Markers',
                    autogenerate: { directory: 'docs/120-markers' },
                },
                {
                    label: 'Patterns',
                    autogenerate: { directory: 'docs/130-patterns' },
                },
                {
                    label: 'Filters',
                    autogenerate: { directory: 'docs/140-filters' },
                },
                {
                    label: 'Masks and Clipping Paths',
                    autogenerate: { directory: 'docs/150-masks-and-clipping-paths' },
                },
                {
                    label: 'Animation Overview',
                    autogenerate: { directory: 'docs/160-animation-overview' },
                },
                {
                    label: 'Keyframes',
                    autogenerate: { directory: 'docs/170-keyframes' },
                },
                {
                    label: 'Loop Animation',
                    autogenerate: { directory: 'docs/180-loop-animation' },
                },
                {
                    label: 'Easing Charts',
                    autogenerate: { directory: 'docs/190-easing-charts' },
                },
                {
                    label: 'Save',
                    autogenerate: { directory: 'docs/200-save' },
                },
                {
                    label: 'Export',
                    autogenerate: { directory: 'docs/210-export' },
                },
                {
                    label: 'Add SVG Animation to Your Project',
                    autogenerate: { directory: 'docs/220-add-svg-animation-to-your-project' },
                },
                {
                    label: 'Add Lottie Animation to Your Project',
                    autogenerate: { directory: 'docs/230-add-lottie-animation-to-your-project' },
                },
                // {
                //     label: 'Add SVG Animation',
                //     autogenerate: { directory: 'docs/add-svg-animation' },
                // },
            ],
        }),
        mdx()
    ]
});