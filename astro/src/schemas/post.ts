import { z } from 'astro:content'

export const post = z
    .object({
        title: z.string(),
        date: z.string(),
    })

export type Post = z.infer<typeof post>