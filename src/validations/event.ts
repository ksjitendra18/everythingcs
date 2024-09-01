import { z } from "zod";

export const EventSchema = z.object({
  type: z.enum(["load", "end", "exit", "10s", "30s", "60s"], {
    required_error: "Type is required",
    invalid_type_error: "Invalid type",
  }),
  slug: z.string(),
  referrer: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
  os: z.string().optional(),
  device: z.string().optional(),
  browser: z.string().optional(),
});
