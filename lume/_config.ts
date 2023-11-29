import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import esbuild from "lume/plugins/esbuild.ts";
import jsx_preact from "lume/plugins/jsx_preact.ts";
import feed from "lume/plugins/feed.ts";
import reading_info from "lume/plugins/reading_info.ts";
import vento from "lume/plugins/vento.ts";

import rehypePrettyCode from "npm:rehype-pretty-code";

import prettier from "npm:prettier"

import remark from "./remark.ts";
import { fnv_1a } from "./utils.ts"

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

// TODO: data https://lume.land/plugins/search/#returnpagedata
site.use(date());
site.use(feed({
    output: ["/rss.xml", "/index.xml", "/rss.json", "/blog/rss.xml"],
    query: "category=blog",
    info: {
        title: "utf9k",
        description: "You are online and logged on to my personal ",
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
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOpts]],
    remarkRehype: {
        footnoteLabelProperties: {
            className: ['sr-only', 'littlefoot--print']
        }
    }
}));
site.use(vento());
site.use(esbuild());

// TODO: ESBuild + content hashing
site.copy("css");
site.copy("static", ".");

// site.process(
//     [".html"],
//     async (page) => page.content = await prettier.format(page.content, { parser: "html", printWidth: 120 })
// )

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
