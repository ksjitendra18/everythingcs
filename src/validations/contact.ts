import { z } from "zod";

export const ContactValidation = z.object({
  name: z.string({ required_error: "Name is required" }).trim(),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" })
    .trim(),
  type: z.enum(["blog", "dmca", "sponsorship", "privacy", "other"], {
    required_error: "Type is required",
    invalid_type_error: "Invalid type",
  }),
  blogPostLink: z.string().optional().nullable(),
  message: z.string({ required_error: "Message is required" }),
  cfTurnstileRes: z.string({
    message: "Captcha is required. Please refresh the page",
    required_error: "Captcha is required. Please refresh the page",
  }),
});

export type Contact = z.infer<typeof ContactValidation>;
