import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import MarkdownItFootnote from 'markdown-it-footnote'
const parser = new MarkdownIt()
  .use(MarkdownItFootnote);

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: 'utf9k',
    description: 'Posts from utf9k',
    site: context.site,
    customData: `<language>en</language><author><name>Marcus Crane</name><email>marcus@utf9k.net</email></author>`,
    items: blog
      .sort((a, b) => a.data.date - b.data.date)
      .reverse()
      .map((post) => ({
        pubDate: post.data.date,
        link: `/blog/${post.slug}/`,
        content: sanitizeHtml(parser.render(post.body)),
        customData: `<author><name>Marcus Crane</name><email>marcus@utf9k.net</email></author>`,
        ...post.data,
      })),
  });
}
