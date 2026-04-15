const operatorPermissionCatalog = {
  dashboard: ["view", "analytics"],
  operators: ["view", "invite", "update", "delete", "managePermissions"],
  users: ["view", "create", "update", "delete"],
  reports: ["view", "export"],
} as const;

type PermissionCatalog = typeof operatorPermissionCatalog;

export type OperatorPermissionResource = keyof PermissionCatalog;
export type OperatorPermissionAction<
  TResource extends OperatorPermissionResource = OperatorPermissionResource,
> = PermissionCatalog[TResource][number];

export type OperatorPermissions = {
  [TResource in OperatorPermissionResource]: Record<
    PermissionCatalog[TResource][number],
    boolean
  >;
};

// OPERATOR accounts use a granular permission map because their access can be delegated feature by feature.
export const OPERATOR_PERMISSION_CATALOG = operatorPermissionCatalog;

export function supportsDelegatedPermissions(role: string | null | undefined): boolean {
  return role === "OPERATOR";
}

export function createDenyAllOperatorPermissions(): OperatorPermissions {
  return Object.fromEntries(
    Object.entries(operatorPermissionCatalog).map(([resource, actions]) => [
      resource,
      Object.fromEntries(actions.map((action) => [action, false])),
    ]),
  ) as OperatorPermissions;
}

export function createAllowAllOperatorPermissions(): OperatorPermissions {
  return Object.fromEntries(
    Object.entries(operatorPermissionCatalog).map(([resource, actions]) => [
      resource,
      Object.fromEntries(actions.map((action) => [action, true])),
    ]),
  ) as OperatorPermissions;
}

export function createDefaultOperatorPermissions(): OperatorPermissions {
  return createDenyAllOperatorPermissions();
}

export function sanitizeOperatorPermissions(candidate: unknown): OperatorPermissions {
  const base = createDenyAllOperatorPermissions();

  if (!candidate || typeof candidate !== "object") {
    return base;
  }

  for (const [resource, actions] of Object.entries(operatorPermissionCatalog)) {
    const resourceValue = (candidate as Record<string, unknown>)[resource];

    if (!resourceValue || typeof resourceValue !== "object") {
      continue;
    }

    for (const action of actions) {
      const enabled = (resourceValue as Record<string, unknown>)[action];
      (base as Record<string, Record<string, boolean>>)[resource][action] = enabled === true;
    }
  }

  return base;
}

export function hasOperatorPermission<
  TResource extends OperatorPermissionResource,
  TAction extends OperatorPermissionAction<TResource>,
>(
  permissions: OperatorPermissions | null | undefined,
  resource: TResource,
  action: TAction,
): boolean {
  if (!permissions) {
    return false;
  }

  return permissions[resource]?.[action] === true;
}

export function flattenEnabledOperatorPermissions(
  permissions: OperatorPermissions | null | undefined,
): string[] {
  if (!permissions) {
    return [];
  }

  return Object.entries(permissions).flatMap(([resource, actions]) =>
    Object.entries(actions)
      .filter(([, enabled]) => enabled)
      .map(([action]) => `${resource}.${action}`),
  );
}
