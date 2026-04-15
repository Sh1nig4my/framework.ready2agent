import type { SafeUser } from "@/shared/users/types";

export interface StaffDirectoryCapabilities {
  canViewAll: boolean;
  canInvite: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canManagePermissions: boolean;
  canUpdateSelf: boolean;
  canDeleteSelf: boolean;
  selfOnly: boolean;
}

export interface StaffDirectoryEntry extends SafeUser {
  name: string;
}

export interface StaffDirectoryResult {
  entries: StaffDirectoryEntry[];
  capabilities: StaffDirectoryCapabilities;
}
