import type { AdminPermission } from "@/shared/auth/admin-permissions.catalog";
import type { OperatorPermissions } from "@/shared/auth/permissions.catalog";

export const roles = ["SUPER", "ADMIN", "OPERATOR", "USER"] as const;
export const userStatuses = ["ACTIVE", "INACTIVE", "INVITED"] as const;
export const standardUserSections = ["dashboard", "settings"] as const;

export type Role = (typeof roles)[number];
export type UserStatus = (typeof userStatuses)[number];
export type StandardUserSection = (typeof standardUserSections)[number];

export interface SessionPermissions {
  admin: AdminPermission[];
  operator: OperatorPermissions | null;
}

export interface SafeUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
  deletedAt?: Date | null;
  role: Role;
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

export interface UsersDirectoryCapabilities {
  canViewAll: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  selfOnly: boolean;
}

export interface UsersDirectoryEntry extends SafeUser {
  name: string;
}

export interface UsersDirectoryResult {
  entries: UsersDirectoryEntry[];
  capabilities: UsersDirectoryCapabilities;
}

export interface SessionActor {
  userId: string;
  email: string;
  name: string;
  role: Role;
  permissions: SessionPermissions;
  remember: boolean;
  signedInAt: number;
  expiresAt: number;
  reauthAt?: number | null;
}
