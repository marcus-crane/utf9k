import { z } from "astro:content";

export const project = z.object({
  title: z.string(),
  ongoing: z.boolean(),
});

export type Project = z.infer<typeof project>;
