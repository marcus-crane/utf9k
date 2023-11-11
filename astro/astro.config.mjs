import { defineConfig } from "astro/config";
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
});
