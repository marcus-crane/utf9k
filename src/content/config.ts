import { z, defineCollection } from "astro:content";

const commonFields = {
  title: z.string(),
  description: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
};

const books = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    authors: z.array(z.string()),
    pageCount: z.number(),
    publisher: z.string(),
    published: z.date(),
    isbn10: z.number(),
    // isbn13: z.number(),
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
  type: "content",
  schema: z.object({
    date: z.date(),
    draft: z.boolean().optional(),
    ...commonFields,
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    ongoing: z.boolean(),
    ...commonFields,
  }),
});

const questions = defineCollection({
  type: "content",
  schema: z.object({
    ...commonFields,
  }),
});

const reviews = defineCollection({
  type: "content",
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
