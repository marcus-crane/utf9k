import { z, defineCollection } from "astro:content";

const commonFields = {
  title: z.string(),
  description: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
};

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
  blog,
  projects,
  questions,
  reviews,
};
