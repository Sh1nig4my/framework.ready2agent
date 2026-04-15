import type { AdminPermission } from "@/shared/auth/admin-permissions.catalog";
import type { OperatorPermissions } from "@/shared/auth/permissions.catalog";
import {
  roles,
  standardUserSections,
  userStatuses,
  type Role,
  type SafeUser,
  type SessionActor,
  type StandardUserSection,
  type UserStatus,
} from "@/shared/users/types";

export { roles, standardUserSections, userStatuses };
export type { Role, SafeUser, SessionActor, StandardUserSection, UserStatus };

export interface AppUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  status: UserStatus;
  deletedAt?: Date | null;
  role: Role;
  // ADMIN uses a simple permission list, while OPERATOR keeps the granular permission map.
  adminPermissions?: AdminPermission[] | null;
  operatorPermissions?: OperatorPermissions | null;
  emailVerifiedAt?: Date | null;
  termsAcceptedAt?: Date | null;
  privacyAcceptedAt?: Date | null;
  lastLoginAt?: Date | null;
  invitationSentAt?: Date | null;
  invitedByUserId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export function fullNameOf(user: Pick<AppUser, "firstName" | "lastName">): string {
  return `${user.firstName} ${user.lastName}`.trim();
}

export function toSafeUser(user: AppUser): SafeUser {
  const safeUser = { ...user };
  delete (safeUser as Partial<AppUser>).passwordHash;
  return safeUser;
}
