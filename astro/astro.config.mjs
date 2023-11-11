import { defineConfig } from "astro/config";
import yaml from "@rollup/plugin-yaml";

import { execSync } from "child_process";

function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" ${filepath}`);
    file.data.astro.frontmatter.lastModified = result.toString();
  };
}

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
    remarkPlugins: [remarkModifiedTime],
  },
});
