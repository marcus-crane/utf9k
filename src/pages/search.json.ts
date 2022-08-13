const postImportResult = import.meta.glob("../pages/questions/**/*.md", {
  eager: true,
});
const posts: Object[] = Object.values(postImportResult);

export async function get() {
  const index = [];
  for (const post of posts) {
    console.log(post.file)
    index.push({
      content: post.rawContent().replaceAll("\n", " ").replace("  ", " ").trim(),
      slug: post.url.replace("/questions/", ""),
      tags: post.frontmatter.tags,
      title: post.frontmatter.title,
    })
  }
  return { body: JSON.stringify(index) };
}