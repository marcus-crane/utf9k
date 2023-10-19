import { defineCollection, z } from 'astro:content';

const common = {
	title: z.string(),
	description: z.string(),
	category: z.string(),
	tags: z.array(z.string())
}

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		...common,
		date: z.coerce.date()
	}),
});

const projects = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		...common,
		ongoing: z.boolean()
	}),
});

export const collections = { blog, projects };
