import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import { remarkReadingTime } from './remark-reading-time.mjs';
import yaml from "@rollup/plugin-yaml";

// https://astro.build/config
export default defineConfig({
    site: 'https://utf9k.net',
    server: {
        port: 1313,
    },
    integrations: [mdx(), sitemap()],
    vite: {
        plugins: [yaml()]
    },
    markdown: {
        remarkPlugins: [remarkReadingTime],
        remarkRehype: {
            footnoteLabelProperties: {
                className: ['sr-only', 'littlefoot--print']
            }
        }
    },
    redirects: {
        '/index.xml': '/rss.xml',
        '/blog/rss.xml': '/rss.xml',
        '/blog/when-automation-goes-horribly-right': '/blog/automation-right',
        '/notes': '/questions',
        '/notes/oil-futures': '/questions/finance-oil-futures-negative',
        '/notes/[...slug]': '/questions/[...slug]'
    }
});
