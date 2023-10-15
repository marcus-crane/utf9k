import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string(),
		category: z.string(),
		tags: z.array(z.string())
	}),
});

export const collections = { blog };
