const fs = require("fs")
const path = require("path")
const yaml = require("yaml")

const { DateTime } = require('luxon')
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require('markdown-it-footnote');
const markdownItAttrs = require('markdown-it-attrs')
const markdownItEleventyImg = require('markdown-it-eleventy-img')

const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const pluginESbuild = require("@jamshop/eleventy-plugin-esbuild");

const prettier = require('prettier');

async function videoShortcode(src) {
  if (!fs.existsSync(src)) {
    console.error(`Tried to load video at ${src} which does not exist`)
    return
  }
  return `<video style="display: inherit; margin: 0 auto;" width="50%" controls>
  <source preload src="${src}" type="video/mp4">
  Ah, sorry! It looks like your browser either hates the h264 codec or it just doesn't support the video tag.
  </video>`
}

async function youtubeShortcode(id) {
  return `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
}

async function noticeShortcode(content, title) {
  return `<div><h5>${title}</h5><p>${content}</p></div>`
}

// https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-oembed
// https://publish.twitter.com/oembed?url=https://twitter.com/bepsays/status/1408348824083615745&hide_thread=true&dnt=true
async function twitterShortcode(user, id) {
  return `<p>Tweet here</p>`
}

module.exports = function (eleventyConfig) {
  // Silence file writes in order to see my own warnings
  // eg; when an image is referenced that does not exist
  eleventyConfig.setQuietMode(true)

  // Passthroughs
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy({ "static": "." })
  eleventyConfig.addPassthroughCopy("video")

  // Shortcodes
  eleventyConfig.addNunjucksAsyncShortcode("video", videoShortcode)
  eleventyConfig.addNunjucksAsyncShortcode("tweet", twitterShortcode)
  eleventyConfig.addNunjucksAsyncShortcode("youtube", youtubeShortcode)

  eleventyConfig.addPairedShortcode("notice", noticeShortcode)
  eleventyConfig.addPairedShortcode("javascript", pluginESbuild.esBuildShortcode)

  // Custom file formats
  eleventyConfig.addDataExtension("yml", contents => yaml.parse(contents))

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginESbuild, {
    entryPoints: {
      "footnotes": "js/footnotes.js",
      "live-player": "js/live-player.js",
      "question-search": "js/question-search.js"
    },
    output: "_site/js"
  })

  const markdownItAnchorConfig = {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "direct-link",
      symbol: "#"
    }),
    level: [1,2,3,4],
    slugify: eleventyConfig.getFilter("slugify")
  }

  const markdownItEleventyImgConfig = {
    imgOptions: {
      widths: [800, 500, 300],
      outputDir: path.join("_site", "img")
    },
    globalAttributes: {
      class: "markdown-image",
      decoding: "async",
      loading: "lazy",
      sizes: "100vw"
    },
    renderImage(image, attributes) {
      const [ Image, options ] = image;
      const [ src, attrs ] = attributes;

      Image(src, options)

      // const fileTypes = Object.keys(img)
      // const firstType = fileTypes[0]
      // const largestImage = img[firstType].length - 1
      // const { height, width } = img[firstType][largestImage]

      if (!Image.Util.isRemoteUrl(src)) {
        metadata = Image.statsSync(src, options)

        const imageMarkup = Image.generateHTML(metadata, attrs, {
          whitespaceMode: "inline"
        })

        return imageMarkup
      }
      return `<img src="${src}" alt="${attrs.alt}">`;
    }
  }

  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  })
  .use(markdownItAnchor, markdownItAnchorConfig)
  .use(markdownItFootnote)
  .use(markdownItEleventyImg, markdownItEleventyImgConfig)
  .use(markdownItAttrs)

  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addFilter("dateFmt", function(date, formatting = 'DDD') {
    return DateTime.fromJSDate(date).toFormat(formatting)
  })

  // Taken from https://github.com/11ty/eleventy/issues/1284#issuecomment-1026679407
  eleventyConfig.addCollection("blogPostsByYear", (collectionApi) => {
    const posts = collectionApi.getFilteredByTag('post');
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

  eleventyConfig.addCollection("projectsByStatus", collectionApi => ({
    'Ongoing': collectionApi.getFilteredByTag('project').filter(p => p.data.ongoing),
    'Archived': collectionApi.getFilteredByTag('project').filter(p => !p.data.ongoing)
  }))

  // Transforms

  // Shoutouts to @pdehaan: https://github.com/11ty/eleventy/issues/1314#issuecomment-657999759
  // Not only does this prettify HTML and JSON, it has the added side effect of choking
  // if anything is not semantically correct HTML ie; tags are not closed properly
  // eleventyConfig.addTransform("prettier", function (content, outputPath) {
  //   const extname = path.extname(outputPath);
  //   switch (extname) {
  //     case ".html":
  //     case ".json":
  //       // Strip leading period from extension and use as the Prettier parser.
  //       const parser = extname.replace(/^./, "");
  //       return prettier.format(content, { parser });

  //     default:
  //       return content;
  //   }
  // });

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
