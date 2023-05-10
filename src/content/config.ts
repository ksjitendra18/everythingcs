import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    isFeatured: z.boolean(),
    draft: z.boolean(),
    featuredImage: z.string().optional(),
    publishedDate: z.date().transform((str) => new Date(str)),
    updatedDate: z.date().transform((str) => new Date(str)),
    category: z.string(),
  }),
});
// publishedDate: z.date(),
// category: z.array(z.string()),
// updatedDate: z.date(),

export const collections = {
  blog: blogCollection,
};
