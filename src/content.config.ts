import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.string(),
    order: z.number().default(100),
    link: z.string().url().optional(),
    linkLabel: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
