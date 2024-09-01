import { z } from "zod";

export const FeedbackSchema = z.object({
  message: z.string().optional(),
  slug: z.string({ message: "Slug is required" }),
  rating: z
    .number({ message: "Rating is required" })
    .min(1, { message: "Rating must be between 1 and 5" })
    .max(5, { message: "Rating must be between 1 and 5" }),
  cfTurnstileRes: z.string({
    message: "Captcha is required. Please refresh the page",
  }),
});

export type Feedback = z.infer<typeof FeedbackSchema>;
