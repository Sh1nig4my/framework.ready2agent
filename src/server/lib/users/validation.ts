import { z } from "zod";
import { firstNameSchema, lastNameSchema } from "@/server/dto/core";

export const updateUserSchema = z.object({
  firstName: firstNameSchema.optional(),
  lastName: lastNameSchema.optional(),
});
