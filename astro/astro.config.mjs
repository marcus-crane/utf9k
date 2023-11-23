import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import yaml from "@rollup/plugin-yaml";

// https://astro.build/config
export default defineConfig({
  site: "https://utf9k.net",
  server: {
    port: 1313,
  },
  // image: {
  //   remotePatterns: [{
  //     protocol: 'https',
  //     hostname: 'cdn.utf9k.net'
  //   }],
  // },
  vite: {
    plugins: [yaml()],
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
    '/index.xml': '/rss.xml'
  }
});
