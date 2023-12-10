import binaryLoader from "lume/core/loaders/binary.ts";
import { merge } from "lume/core/utils/object.ts";
import { getPathAndExtension } from "lume/core/utils/path.ts";
import { encode } from "lume/deps/hex.ts";
import { posix } from "lume/deps/path.ts";
import modifyUrls from "lume/plugins/modify_urls.ts";

import { extname } from "https://deno.land/std@0.109.0/path/mod.ts";

import type { Plugin } from "lume/core/site.ts";
import { Page } from "lume/core/file.ts";
import Site from "lume/core/site.ts";
import type { Element } from "lume/deps/dom.ts";

export interface Options {
  /** Node types that this plugin applies to */
  nodeTypes: Array<string>;

  /** File types that this plugin applies to */
  fileExtensions: Array<string>;

  /** The length of file hashes to generate */
  hashLength: number;
}

// Default options
export const defaults: Options = {
  nodeTypes: ["SCRIPT", "LINK"],
  fileExtensions: [".css", ".js"],
  hashLength: 16,
};

const cache = new Map<string, Promise<string>>();

/** A plugin to add cache busting hashes to local CSS and JS scripts. */
export default function (userOptions?: Partial<Options>): Plugin {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    site.use(modifyUrls({ fn: replace }));

    async function replace(url: string | null, page: Page, element: Element) {
      if (url) {
        const extension = extname(url)
        if (options.nodeTypes.includes(element.nodeName) && url.startsWith('/') && options.fileExtensions.includes(extension)) {
          return await addHash(url, page);
        }
      }

      return url;
    }

    async function addHash(url: string, page: Page) {
      // Resolve relative URLs
      if (page.data.url && url.startsWith(".")) {
        url = posix.join(page.data.url, url);
      }

      // Ensure the path starts with "/"
      url = posix.join("/", url);

      if (!cache.has(url)) {
        cache.set(url, getHash(url));
      }

      const hash = await cache.get(url)!;

      const [path, ext] = getPathAndExtension(url);

      return `${path}.${hash}${ext}`;
    }

    async function getHash(url: string) {
      const content = await getFileContent(url);

      const contentHash = await getContentHash(content);

      renameFile(url, contentHash);

      return contentHash;
    }

    async function getFileContent(url: string): Promise<Uint8Array> {
      const content = await site.getContent(url, binaryLoader);

      if (!content) {
        throw new Error(`Unable to find the file "${url}"`);
      }
      
      // TODO: Some content like JS scripts can be string so should all be
      // resolved to Uint8Array here instead of down the track
      return content as Uint8Array;
    }

    function renameFile(url: string, hash: string) {
      // It's a page
      const page = site.pages.find((page) => page.data.url === url);

      if (page) {
        const [path, ext] = getPathAndExtension(url);
        page.data.url = `${path}.${hash}${ext}`;
        return;
      }

      // It's a static file
      const staticFile = site.files.find((file) => file.outputPath === url);

      if (staticFile) {
        const [path, ext] = getPathAndExtension(url);
        staticFile.outputPath = `${path}.${hash}${ext}`;
        return;
      }

      throw new Error(`Unable to find the file "${url}"`);
    }

    async function getContentHash(content: Uint8Array): Promise<string> {
      // TODO: See above when retrieving file content
      const buffer = new Uint8Array(content);
      const hashBuffer = await crypto.subtle.digest("SHA-1", buffer);
      const hex = encode(new Uint8Array(hashBuffer));
      const hash = new TextDecoder().decode(hex);
      return hash.substring(0, options.hashLength);
    }
  };
}