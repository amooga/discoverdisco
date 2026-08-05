import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5)
    .max(120),

  description: z
    .string()
    .trim()
    .min(20)
    .max(1000),

  category: z
    .string()
    .trim()
    .min(2),

  imageUrl: z
    .string()
    .url()
    .optional(),

  validUntil: z
    .string()
    .datetime()
    .optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;