import { z } from "zod";
import {
  firstNameSchema,
  lastNameSchema,
  normalizedEmailSchema,
  userStatusSchema,
} from "@/server/dto/core";

export const inviteOperatorSchema = z.object({
  email: normalizedEmailSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
});

export const updateOperatorSchema = z.object({
  firstName: firstNameSchema.optional(),
  lastName: lastNameSchema.optional(),
  status: userStatusSchema.optional(),
});

export const updateOperatorPermissionsSchema = z.object({
  permissions: z.record(z.string(), z.record(z.string(), z.boolean())),
});
