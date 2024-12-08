import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { remarkReadingTime } from './remark-reading-time.mjs';
import remarkCallout from "@r4ai/remark-callout";
import yaml from "@rollup/plugin-yaml";

import rehypePostImageWrapper from "./src/hooks/rehypePostImageWrapper.ts";

import rehypeSlug from 'rehype-slug'

// https://astro.build/config
export default defineConfig({
    site: 'https://utf9k.net',
    server: {
        port: 1313,
    },
    image: {
        domains: [
            "covers.openlibrary.org",
            "s4.anilist.co",
            "howlongtobeat.com",
            "cdn.utf9k.net"
        ]
    },
    integrations: [sitemap()],
    vite: {
        plugins: [yaml()]
    },
    markdown: {
        remarkPlugins: [remarkReadingTime, remarkCallout],
        remarkRehype: {
            footnoteLabelProperties: {
                className: ['sr-only', 'littlefoot--print']
            }
        },
        rehypePlugins: [
            rehypeSlug,
            rehypePostImageWrapper
        ]
    },
    redirects: {
        '/index.xml': '/rss.xml',
        '/blog/rss.xml': '/rss.xml',
        '/blog/when-automation-goes-horribly-right': '/blog/automation-right',
        '/notes': '/questions',
        '/notes/oil-futures': '/questions/finance-oil-futures-negative',
        '/notes/[...id]': '/questions/[...id]'
    }
});
