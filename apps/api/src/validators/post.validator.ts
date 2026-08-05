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

  categoryId: z.string().cuid(),

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