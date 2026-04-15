import { z } from "zod";
import {
  acceptPrivacySchema,
  acceptTermsSchema,
  firstNameSchema,
  lastNameSchema,
  normalizedEmailSchema,
  passwordSchema,
} from "@/server/dto/core";

export const loginCredentialsSchema = z.object({
  email: normalizedEmailSchema,
  password: z.string().min(8),
  remember: z.union([z.literal("true"), z.literal("false"), z.boolean()]).optional(),
});

export const registerUserSchema = z.object({
  email: normalizedEmailSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  password: passwordSchema,
  acceptTerms: acceptTermsSchema,
  acceptPrivacy: acceptPrivacySchema,
});

export const reauthSchema = z.object({
  password: passwordSchema,
});

export const acceptInviteSchema = z.object({
  token: z.string().min(16),
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  password: passwordSchema,
  acceptTerms: acceptTermsSchema,
  acceptPrivacy: acceptPrivacySchema,
});
