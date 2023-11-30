import loader from "lume/core/loaders/text.ts";
import { merge } from "lume/core/utils.ts";
import {
  rehypeRaw,
  rehypeSanitize,
  rehypeStringify,
  remarkGfm,
  remarkParse,
  remarkRehype,
  unified,
} from "lume/deps/remark.ts";

import type { Data, Engine, Helper, Site } from "lume/core.ts";

export interface Options {
  /** List of extensions this plugin applies to */
  extensions: string[];

  /**
   * List of remark plugins to use
   * @default `[remarkGfm]`
   */
  remarkPlugins?: unknown[];

  /** List of rehype plugins to use */
  rehypePlugins?: unknown[];

  /** Configuration for remarkRehype */
  remarkRehype?: object;

  /** Flag to turn on HTML sanitization to prevent XSS */
  sanitize?: boolean;

  /** Flag to override the default plugins */
  overrideDefaultPlugins?: boolean;
}

// Default options
export const defaults: Options = {
  extensions: [".md"],
  // By default, GitHub-flavored markdown is enabled
  remarkPlugins: [remarkGfm],
  remarkRehype: { allowDangerousHtml: true },
  sanitize: false,
};

/** Template engine to render Markdown files with Remark */
export class MarkdownEngine implements Engine {
  engine: unified.Processor;

  constructor(engine: unified.Processor) {
    this.engine = engine;
  }

  deleteCache() {}

  async render(
    content: string,
    data?: Data,
    filename?: string,
  ): Promise<string> {
    return (await this.engine.process({
      value: content,
      data: data?.page?.data,
      path: filename,
    })).toString();
  }

  renderSync(content: string, data?: Data, filename?: string): string {
    return this.engine.processSync({
      value: content,
      data: data?.page?.data,
      path: filename,
    }).toString();
  }

  addHelper() {}
}

/** Register the plugin to support Markdown */
export default function (userOptions?: Partial<Options>) {
  const options = merge(defaults, userOptions);

  return function (site: Site) {
    // @ts-ignore: This expression is not callable
    const engine = unified.unified();

    const plugins = [];

    // Add remark-parse to generate MDAST
    plugins.push(remarkParse);

    if (!options.overrideDefaultPlugins) {
      // Add default remark plugins
      defaults.remarkPlugins?.forEach((defaultPlugin) =>
        plugins.push(defaultPlugin)
      );
    }

    // Add remark plugins
    options.remarkPlugins?.forEach((plugin) => plugins.push(plugin));

    const remarkRehypeOpts = {...defaults.remarkRehype, ...options.remarkRehype}

    // Add remark-rehype to generate HAST
    plugins.push([remarkRehype, remarkRehypeOpts]);

    if (options.sanitize) {
      // Add rehype-raw to convert raw HTML to HAST
      plugins.push(rehypeRaw);
    }

    // Add rehype plugins
    options.rehypePlugins?.forEach((plugin) => plugins.push(plugin));

    if (options.sanitize) {
      // Add rehype-sanitize to make sure HTML is safe
      plugins.push(rehypeSanitize);
      // Add rehype-stringify to output HTML ignoring raw HTML nodes
      plugins.push(rehypeStringify);
    } else {
      // Add rehype-stringify to output HTML
      plugins.push([rehypeStringify, { allowDangerousHtml: true }]);
    }

    // Register all plugins
    // @ts-ignore: let unified take care of loading all the plugins
    engine.use(plugins);

    // Load the pages
    const remarkEngine = new MarkdownEngine(engine);
    site.loadPages(options.extensions, loader, remarkEngine);

    // Register the filter
    site.filter("md", filter as Helper);

    function filter(content: string): string {
      return remarkEngine.renderSync(content).trim();
    }
  };
}