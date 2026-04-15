import type { StandardUserSection } from "@/server/lib/users/types";
import { standardUserSections } from "@/server/lib/users/types";

export const STANDARD_USER_ACCESS = [...standardUserSections];

export function createStandardUserAccess(): StandardUserSection[] {
  return [...STANDARD_USER_ACCESS];
}

export function canStandardUserAccess(section: StandardUserSection): boolean {
  return STANDARD_USER_ACCESS.includes(section);
}
