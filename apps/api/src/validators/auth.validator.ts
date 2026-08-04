import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),

  ownerName: z.string().min(2),

  email: z.string().email(),

  phone: z.string().min(10).max(15),

  password: z.string().min(8),

  address: z.string().min(3),

  locality: z.string().min(2),

  city: z.string().min(2),

  state: z.string().min(2),

  pincode: z.string().length(6),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginInput = z.infer<typeof loginSchema>;