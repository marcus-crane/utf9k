import lume from "lume/mod.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import esbuild from "lume/plugins/esbuild.ts";
import feed from "lume/plugins/feed.ts";
import metas from "lume/plugins/metas.ts";
import sitemap from "lume/plugins/sitemap.ts";
import vento from "lume/plugins/vento.ts";

const site = lume();

site.copy("css");

site.use(code_highlight());
site.use(esbuild());
site.use(feed());
site.use(metas());
site.use(sitemap());
site.use(vento());

export default site;
