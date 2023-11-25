import lume from "lume/mod.ts";
import esbuild from "lume/plugins/esbuild.ts";
import jsx_preact from "lume/plugins/jsx_preact.ts";
import feed from "lume/plugins/feed.ts";
import reading_info from "lume/plugins/reading_info.ts";
import remark from "lume/plugins/remark.ts";
import vento from "lume/plugins/vento.ts";

import rehypePrettyCode from "npm:rehype-pretty-code";

import prettier from "npm:prettier"

const site = lume({
    server: {
        port: 1313
    },
});

site.use(feed());
site.use(jsx_preact());
site.use(reading_info());
site.use(remark({
    rehypePlugins: [rehypePrettyCode]
}));
site.use(vento());
site.use(esbuild());

site.copy("css");
site.copy("static", ".");

// site.process(
//     [".html"],
//     async (page) => page.content = await prettier.format(page.content, { parser: "html", printWidth: 120 })
// )

export default site;
