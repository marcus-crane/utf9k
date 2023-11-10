import { z, defineCollection } from 'astro:content'

// TODO: Move schemas out
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
        ongoing: z.boolean(),
    })
});

const questions = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
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