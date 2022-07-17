const path = require('path')

const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require('markdown-it-footnote');

const Image = require("@11ty/eleventy-img");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const cacheBuster = require('@mightyplow/eleventy-plugin-cache-buster');

const pluginESbuild = require("@jamshop/eleventy-plugin-esbuild");

const prettier = require('prettier')

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600, 900, 1200],
    formats: ["avif", "jpeg"]
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  // Passthroughs
  eleventyConfig.addPassthroughCopy("css");
  // eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("img")
  eleventyConfig.addPassthroughCopy({ "static": "." })

  const cacheBusterOptions = {};

  // Shortcodes
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  eleventyConfig.addPairedShortcode("javascript", pluginESbuild.esBuildShortcode)

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(cacheBuster(cacheBusterOptions));
  eleventyConfig.addPlugin(pluginESbuild, {
    entryPoints: {
      "footnotes": "js/footnotes.js",
      "live-player": "js/live-player.js"
    },
    output: "_site/js"
  })

  let markdownLibrary = markdownIt({
    html: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "direct-link",
      symbol: "#"
    }),
    level: [1,2,3,4],
    slugify: eleventyConfig.getFilter("slugify")
  }).use(markdownItFootnote);
  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addFilter("dateFmt", function(date, formatting) {
    console.log(date, formatting)
    return 'nice'
  })

  // Taken from https://github.com/11ty/eleventy/issues/1284#issuecomment-1026679407
  eleventyConfig.addCollection("blogPostsByYear", (collection) => {
    const posts = collection.getFilteredByTag('blog').reverse();
    const years = posts.map(post => post.date.getFullYear());
    const uniqueYears = [...new Set(years)];

    const postsByYear = uniqueYears.reduce((prev, year) => {
      const filteredPosts = posts.filter(post => post.date.getFullYear() === year);

      return [
        ...prev,
        [year, filteredPosts]
      ]
    }, []);

    return postsByYear;
  });

  eleventyConfig.addCollection("recentPostsHomepage", (collection) => {
    const posts = collection.getFilteredByTag('blog').reverse()
    return posts.slice(0, 5)
  })

  // Transforms

  // Shoutouts to @pdehaan: https://github.com/11ty/eleventy/issues/1314#issuecomment-657999759
  eleventyConfig.addTransform("prettier", function (content, outputPath) {
    const extname = path.extname(outputPath);
    switch (extname) {
      case ".html":
      case ".json":
        // Strip leading period from extension and use as the Prettier parser.
        const parser = extname.replace(/^./, "");
        return prettier.format(content, { parser });

      default:
        return content;
    }
  });

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ["md", "njk", "html", "liquid"],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: "/",
    // -----------------------------------------------------------------

    // These are all optional (defaults are shown):
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
