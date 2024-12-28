// Lume
import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
// import esbuild from "lume/plugins/esbuild.ts";
import metas from "lume/plugins/metas.ts";
import jsx_preact from "lume/plugins/jsx_preact.ts";
import feed from "lume/plugins/feed.ts";
import reading_info from "lume/plugins/reading_info.ts";
import vento from "lume/plugins/vento.ts";
import nunjucks from "lume/plugins/nunjucks.ts"
import remark from "lume-src/plugins/remark.ts";
import postcss from "lume/plugins/postcss.ts";
import robots from "lume/plugins/robots.ts";
import sitemap from "lume/plugins/sitemap.ts";

// Experimental Plugins
import redirect from "./_plugins/redirect.ts"

// NPM
import rehypePrettyCode from "rehype-pretty-code";
import remarkCallout from "remark-callout";
import prettier from "prettier"

// Deno / ESM
import { fromHtmlIsomorphic } from 'https://esm.sh/hast-util-from-html-isomorphic@2.0.0'
import remarkToc from 'https://esm.sh/remark-toc@9.0.0'
import rehypeSlug from 'https://esm.sh/rehype-slug@6.0.0'
import rehypeAutolinkHeadings from 'https://esm.sh/rehype-autolink-headings@7.0.0'

// Local
import cache_busting from "./_plugins/cache_busting.ts"
import rehypePostImageWrapper from "./_hooks/rehypePostImageWrapper.ts"
import { fnv_1a } from "./_utils/fnv_1a.ts"

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
    output: ["/rss.xml", "/index.xml", "/rss.json", "/blog/rss.xml"],
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
site.use(jsx_preact());
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
site.use(robots())
site.use(sitemap())

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

export default site;
