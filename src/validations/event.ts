import { z } from "zod";

export const EventSchema = z.object({
  type: z.enum(["load", "scroll", "end", "exit", "10s", "30s", "60s"], {
    required_error: "Type is required",
    invalid_type_error: "Invalid type",
  }),
  slug: z.string(),
  referrer: z.string(),
});
