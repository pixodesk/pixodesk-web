import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import yaml from "@modyfi/vite-plugin-yaml";
import mdx from '@astrojs/mdx';
import starlight from "@astrojs/starlight";
import { remarkSvgaDocLinks } from "./src/plugins/remark-svga-doc-links.mjs";
import { docsSidebar } from "./src/plugins/docs-sidebar.mjs";

export default defineConfig({
    markdown: {
        remarkPlugins: [remarkSvgaDocLinks],
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
                Sidebar: './src/components/starlight/Sidebar.astro',   // default sidebar + scroll-spy for the hash-link items
                // Header: './src/components/starlight/Header.astro',
                // Footer: './src/components/starlight/Footer.astro',
            },
            sidebar: docsSidebar(),
        }),
        mdx()
    ]
});