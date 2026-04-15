import { z } from "zod";
import { userStatuses } from "@/shared/users/types";

export const normalizedEmailSchema = z.email().transform((value) => value.toLowerCase());
export const firstNameSchema = z.string().min(2).max(40);
export const lastNameSchema = z.string().min(2).max(40);
export const passwordSchema = z.string().min(8).max(64);
export const acceptTermsSchema = z.literal(true);
export const acceptPrivacySchema = z.literal(true);
export const userStatusSchema = z.enum(userStatuses);
