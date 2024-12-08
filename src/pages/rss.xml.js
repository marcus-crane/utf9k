import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: 'utf9k',
    description: 'You are online and logged on to my personal site',
    site: context.site,
    stylesheet: '/rss.xsl',
    trailingSlash: false,
    items: blog.sort(p => p.data.date).reverse().map((post) => ({
      link: `/blog/${post.id}/`,
      content: sanitizeHtml(parser.render(post.body)),
      author: 'marcus@utf9k.net',
      pubDate: post.data.date,
      ...post.data,
    })),
  });
}