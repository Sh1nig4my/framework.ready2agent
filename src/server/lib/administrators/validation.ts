import { z } from "zod";
import { ADMIN_PERMISSION_CATALOG } from "@/shared/auth/admin-permissions.catalog";
import {
  firstNameSchema,
  lastNameSchema,
  normalizedEmailSchema,
  userStatusSchema,
} from "@/server/dto/core";

export const inviteAdministratorSchema = z.object({
  email: normalizedEmailSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
});

export const updateAdministratorSchema = z.object({
  firstName: firstNameSchema.optional(),
  lastName: lastNameSchema.optional(),
  status: userStatusSchema.optional(),
});

export const updateAdministratorPermissionsSchema = z.object({
  permissions: z.array(z.enum(ADMIN_PERMISSION_CATALOG)),
});
