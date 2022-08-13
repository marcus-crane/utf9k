import rss from "@astrojs/rss";

const postImportResult = import.meta.glob("../pages/blog/**/*.md", {
  eager: true,
});
const posts = Object.values(postImportResult);

export const get = () =>
  rss({
    title: "utf9k",
    description: "My personal site",
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      link: post.url,
      title: post.frontmatter.title,
      pubDate: post.frontmatter.pubDate,
    })),
  });
