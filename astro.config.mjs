import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://utf9k.net",
  integrations: [mdx(), sitemap()],
  publicDir: "./static",
  build: {
    assets: "assets",
  },
});
