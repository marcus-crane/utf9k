// Lume
import { Page } from "lume/core/file.ts";
import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
// import esbuild from "lume/plugins/esbuild.ts";
import metas from "lume/plugins/metas.ts";
import feed from "lume/plugins/feed.ts";
import reading_info from "lume/plugins/reading_info.ts";
import vento from "lume/plugins/vento.ts";
import nunjucks from "lume/plugins/nunjucks.ts"
import remark from "lume/plugins/remark.ts";
import postcss from "lume/plugins/postcss.ts";
import sitemap from "lume/plugins/sitemap.ts";
import checkUrls from "lume/plugins/check_urls.ts";

// Experimental Plugins
import redirect from "./_plugins/redirect.ts"

// Third party Lume plugins
import ci from "https://deno.land/x/lume_plugin_ci@v1.0.0/mod.ts";

// NPM
import rehypePrettyCode from "rehype-pretty-code";
import remarkCallout from "remark-callout";
import prettier from "prettier"
import domain from "top-domain"
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehypeAutolinkHeadings'

// Deno
import { crypto } from "jsr:@std/crypto/crypto";
import { join } from "jsr:@std/path";

// Local
import cache_busting from "./_plugins/cache_busting.ts"
import rehypePostImageWrapper from "./_hooks/rehypePostImageWrapper.ts"
import { fnv_1a } from "./_utils/fnv_1a.ts"

const RSS_FILE_NAMES = ["/rss.xml", "/index.xml", "/rss.json", "/blog/rss.xml"];

// Used to toggle on/off certain plugins locally such as cache busting
const mode = Deno.env.get("MODE")

const site = lume({
    location: new URL("https://utf9k.net"),
    server: {
        port: 1313
    },
});

const rehypePrettyCodeOpts = {
    theme: {
        dark: 'rose-pine-moon',
        light: 'rose-pine-dawn'
    }
}

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

site.use(date());
site.use(feed({
    output: RSS_FILE_NAMES,
    query: "category=blog",
    info: {
        title: "utf9k",
        description: "You are online and logged on to my personal site",
        lang: "en",
        generator: true
    },
    items: {
        title: "=title",
        description: "=description",
        published: "=date",
        content: "=children",
        lang: "=lang",
    },
}));
site.use(reading_info());
site.use(remark({
    remarkPlugins: [
        remarkToc,
        remarkCallout,
    ],
    rehypePlugins: [
        [rehypePrettyCode, rehypePrettyCodeOpts],
        rehypeSlug,
        rehypePostImageWrapper,
        [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOpts]
    ],
    rehypeOptions: {
        footnoteLabelProperties: {
            className: ['sr-only', 'littlefoot--print']
        }
    }
}));
site.use(vento());
// site.use(esbuild()); # TODO: Some JS fails to be minified properly
site.use(nunjucks({
    options: {
        autoescape: false,
        tags: {
            blockStart: '<%',
            blockEnd: '%>',
            variableStart: '<$',
            variableEnd: '$>',
            commentStart: '<#',
            commentEnd: '#>'
        }
    }
}))
site.use(metas())
site.use(redirect())
site.use(postcss())
site.use(checkUrls())
site.use(sitemap()) // Finds existing robots.txt and inserts sitemap
site.use(ci());

if (mode === "build") {
    site.use(cache_busting())
}

// TODO: ESBuild + content hashing
site.copy("js");
site.copy("static", ".");

site.ignore(
    "scripts",
    ".github",
    "ci",
    "node_modules",
    ".vale.ini",
    "CITATION.cff",
    "LICENSE",
    "README.md",
    "renovate.json",
    ".DS_Store"
);

// TODO: Try Promise.all(pages.map(fn))
// https://lume.land/docs/advanced/migrate-to-lume2/#change-your-(pre)processors
site.process(
    [".html"],
    async (pages) => {
        for (const page of pages) {
            if (page.content !== undefined) {
                page.content = await prettier.format(page.content.toString(), { parser: "html", printWidth: 120 })
            }
        }
    }
)

site.filter("taghash", tag => {
    const tagColours = [
        "lightpink",
        "blueviolet",
        "fuchsia",
        "indigo",
        "darkviolet",
        "mediumvioletred",
        "salmon",
        "plum",
        "tomato",
        "orange",
        "darkkhaki",
        "royalblue",
        "deepskyblue",
        "lightseagreen",
        "turquoise",
        "chocolate",
        "brown",
        "goldenrod",
        "burlywood",
    ]
    const hash = fnv_1a(tag)
    const i = Number(hash) % tagColours.length
    return tagColours[i]
})

site.filter("getApexDomain", domain)

// Prior versions of the site never used trailing slashes. Functionally, this doesn't matter too much,
// but for RSS readers, the GUID tends to be the URL so having a trailing slash may accidentally
// result in a duplicate feed item appearing if said reader does not trim trailing slashes.
site.addEventListener("afterBuild", (event) => {
    event.pages.forEach(async (page) => {
        if (
            RSS_FILE_NAMES.includes(page.data.url)
        ) {
            const filePath = join("_site", page.data.url);
            let content = await Deno.readTextFile(filePath);

            if (RSS_FILE_NAMES.includes(page.data.url)) {
                content = content.replaceAll(
                    /\/<\/guid>/g,
                    "</guid>"
                );
            }

            await Deno.writeTextFile(filePath, content);
        }
    });
});

if (mode === "build") {
    site.process("*", async (filteredPages, allPages) => {
        let pageContent = ``
        const sortedPages = allPages.sort((a, b) => a.data.url.localeCompare(b.data.url))
        for (const page of sortedPages) {
            if (page.data.url === "/") {
                // Homepage contains some dynamic content so we remove it
                // to ensure digest only changes when content changes
                continue
            }
            const encoder = new TextEncoder()
            const data = encoder.encode(page.content);
            const hashBuffer = await crypto.subtle.digest("SHA-1", data);
            const hashArray = Array.from(new Uint8Array(hashBuffer))
            const hashHex = hashArray
                .map(b => b.toString(16)
                .padStart(2, "0"))
                .join("")
            pageContent += `${hashHex} ${page.data.url}\n`
        }
        const hashPage = Page.create({
            url: `/digest.txt`,
            content: pageContent
        })
        allPages.push(hashPage)
    })
}

export default site;
