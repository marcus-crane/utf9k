import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import { remarkReadingTime } from './remark-reading-time.mjs';
import yaml from "@rollup/plugin-yaml";

import rehypePostImageWrapper from "./src/hooks/rehypePostImageWrapper.ts";

import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const rehypeAutolinkHeadingsOpts = {
    properties: {
        ariaHidden: 'true',
        class: 'jumplink',
        tabIndex: -1
    },
    // Fragment is important here so we don't get HTML document tags wrapping our header icon
    // In this case, it's only visible in the RSS feed
    // Also, the whitespace here is important for alignment!
    content: fromHtmlIsomorphic('¶ ', { fragment: true })
}

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
        },
        rehypePlugins: [
            rehypeSlug,
            rehypePostImageWrapper,
            [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOpts]
        ]
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
