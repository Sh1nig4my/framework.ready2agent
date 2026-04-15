const administratorPermissionCatalog = [
  "administrators.viewOthers",
  "administrators.invite",
  "administrators.edit",
  "administrators.delete",
  "operators.invite",
] as const;

export type AdminPermission = (typeof administratorPermissionCatalog)[number];

// ADMIN accounts use a compact permission list because only admin-to-admin actions are configurable.
export const ADMIN_PERMISSION_CATALOG = administratorPermissionCatalog;

export function createEmptyAdminPermissions(): AdminPermission[] {
  return [];
}

export function createAllowAllAdminPermissions(): AdminPermission[] {
  return [...administratorPermissionCatalog];
}

export function sanitizeAdminPermissions(candidate: unknown): AdminPermission[] {
  if (!Array.isArray(candidate)) {
    return createEmptyAdminPermissions();
  }

  const enabled = new Set<AdminPermission>();

  for (const permission of candidate) {
    if (
      typeof permission === "string" &&
      (administratorPermissionCatalog as readonly string[]).includes(permission)
    ) {
      enabled.add(permission as AdminPermission);
    }
  }

  return administratorPermissionCatalog.filter((permission) => enabled.has(permission));
}

export function hasAdminPermission(
  permissions: AdminPermission[] | null | undefined,
  permission: AdminPermission,
): boolean {
  return permissions?.includes(permission) === true;
}
