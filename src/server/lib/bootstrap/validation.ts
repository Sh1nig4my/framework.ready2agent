import { z } from "zod";
import {
  acceptPrivacySchema,
  acceptTermsSchema,
  firstNameSchema,
  lastNameSchema,
  normalizedEmailSchema,
  passwordSchema,
} from "@/server/dto/core";

export const initializeSuperSchema = z.object({
  email: normalizedEmailSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  password: passwordSchema,
  acceptTerms: acceptTermsSchema,
  acceptPrivacy: acceptPrivacySchema,
});
