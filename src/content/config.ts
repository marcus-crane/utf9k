import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const commonFields = {
  title: z.string(),
  description: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
};

const books = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/books" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    authors: z.array(z.string()),
    length: z.number(),
    publisher: z.string(),
    published: z.date(),
    isbn: z.number(),
    link: z.string(),
    status: z.string(),
    cover: z.string(),
    cover_height: z.number(),
    cover_width: z.number(),
    date_finished: z.date(),
    recommended: z.boolean(),
    progress: z.number()
  }),
});

// TODO: Consider moving schemas out: Using CollectionEntry type makes this a bit redundant at present
// https://docs.astro.build/en/guides/content-collections/#defining-multiple-collections
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/blog" }),
  schema: z.object({
    date: z.date(),
    draft: z.boolean().optional(),
    ...commonFields,
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/projects" }),
  schema: z.object({
    ongoing: z.boolean(),
    ...commonFields,
  }),
});

const questions = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/questions" }),
  schema: z.object({
    ...commonFields,
  }),
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/data/reviews" }),
  schema: z.object({
    date: z.date(),
    ...commonFields,
  }),
});

export const collections = {
  books,
  blog,
  projects,
  questions,
  reviews,
};
