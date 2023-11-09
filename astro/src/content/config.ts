import { z, defineCollection } from 'astro:content'

// TODO: Move schemas out
// https://docs.astro.build/en/guides/content-collections/#defining-multiple-collections
const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.string(),
    })
});

export const collections = {
    'blog': blogCollection,
};