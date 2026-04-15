import { z } from "zod";
import { normalizedEmailSchema } from "@/server/dto/core";

export const supportContactRequestSchema = z.object({
  email: normalizedEmailSchema,
  subject: z.string().min(3).max(160),
  message: z.string().min(10).max(5000),
});
