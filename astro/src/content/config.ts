import { z, defineCollection } from 'astro:content'

// TODO: Consider moving schemas out: Using CollectionEntry type makes this a bit redundant at present
// https://docs.astro.build/en/guides/content-collections/#defining-multiple-collections
const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.string(),
    })
});

const projects = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.string(),
    })
});

const questions = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.string(),
    })
});

const reviews = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.string(),
    })
});

export const collections = {
    blog,
    projects,
    questions,
    reviews
};