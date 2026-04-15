import { hasAdminPermission } from "@/shared/auth/admin-permissions.catalog";
import {
  hasOperatorPermission,
  type OperatorPermissionAction,
  type OperatorPermissionResource,
} from "@/shared/auth/permissions.catalog";
import { canStandardUserAccess } from "@/server/lib/auth/user-defaults";
import type { SessionActor, StandardUserSection } from "@/shared/users/types";

function adminPermissionsOf(actor: SessionActor) {
  return actor.permissions.admin;
}

function operatorPermissionsOf(actor: SessionActor) {
  return actor.permissions.operator;
}

export function isSuper(actor: Pick<SessionActor, "role">): boolean {
  return actor.role === "SUPER";
}

export function isAdmin(actor: Pick<SessionActor, "role">): boolean {
  return actor.role === "ADMIN";
}

export function isOperator(actor: Pick<SessionActor, "role">): boolean {
  return actor.role === "OPERATOR";
}

export function isStandardUser(actor: Pick<SessionActor, "role">): boolean {
  return actor.role === "USER";
}

export function hasSystemPermission(
  actor: SessionActor,
  resource: OperatorPermissionResource,
  action: OperatorPermissionAction,
): boolean {
  if (isSuper(actor)) {
    return true;
  }

  if (isAdmin(actor)) {
    switch (resource) {
      case "dashboard":
      case "users":
      case "operators":
      case "reports":
        return true;
      default:
        return false;
    }
  }

  if (isOperator(actor)) {
    return hasOperatorPermission(operatorPermissionsOf(actor), resource, action);
  }

  return false;
}

export function canAccessStandardSection(actor: SessionActor, section: StandardUserSection): boolean {
  return isStandardUser(actor) && canStandardUserAccess(section);
}

function hasAnyAdminManagementPermission(actor: SessionActor): boolean {
  if (!isAdmin(actor)) {
    return false;
  }

  return (
    hasAdminPermission(adminPermissionsOf(actor), "administrators.viewOthers") ||
    hasAdminPermission(adminPermissionsOf(actor), "administrators.invite") ||
    hasAdminPermission(adminPermissionsOf(actor), "administrators.edit") ||
    hasAdminPermission(adminPermissionsOf(actor), "administrators.delete")
  );
}

export function canViewOtherAdministrators(actor: SessionActor): boolean {
  return isSuper(actor) || hasAnyAdminManagementPermission(actor);
}

export function canInviteAdministrators(actor: SessionActor): boolean {
  return isSuper(actor) || (isAdmin(actor) && hasAdminPermission(adminPermissionsOf(actor), "administrators.invite"));
}

export function canManageAdministratorPermissions(actor: SessionActor): boolean {
  return isSuper(actor);
}

export function canEditAdministrator(actor: SessionActor, administratorId: string): boolean {
  if (isSuper(actor)) {
    return true;
  }

  if (!isAdmin(actor)) {
    return false;
  }

  if (actor.userId === administratorId) {
    return true;
  }

  return (
    canViewOtherAdministrators(actor) &&
    hasAdminPermission(adminPermissionsOf(actor), "administrators.edit")
  );
}

export function canDeleteAdministrator(actor: SessionActor, administratorId: string): boolean {
  if (isSuper(actor)) {
    return true;
  }

  if (!isAdmin(actor) || actor.userId === administratorId) {
    return false;
  }

  return (
    canViewOtherAdministrators(actor) &&
    hasAdminPermission(adminPermissionsOf(actor), "administrators.delete")
  );
}

export function canViewOperatorsDirectory(actor: SessionActor): boolean {
  if (isSuper(actor) || isAdmin(actor)) {
    return true;
  }

  return isOperator(actor) && hasOperatorPermission(operatorPermissionsOf(actor), "operators", "view");
}

export function canInviteOperators(actor: SessionActor): boolean {
  if (isSuper(actor)) {
    return true;
  }

  if (isAdmin(actor)) {
    return hasAdminPermission(adminPermissionsOf(actor), "operators.invite");
  }

  return canViewOperatorsDirectory(actor) && hasOperatorPermission(operatorPermissionsOf(actor), "operators", "invite");
}

export function canUpdateOperators(actor: SessionActor): boolean {
  if (isSuper(actor) || isAdmin(actor)) {
    return true;
  }

  return canViewOperatorsDirectory(actor) && hasOperatorPermission(operatorPermissionsOf(actor), "operators", "update");
}

export function canDeleteOperators(actor: SessionActor): boolean {
  if (isSuper(actor) || isAdmin(actor)) {
    return true;
  }

  return canViewOperatorsDirectory(actor) && hasOperatorPermission(operatorPermissionsOf(actor), "operators", "delete");
}

export function canManageOperatorPermissions(actor: SessionActor): boolean {
  if (isSuper(actor) || isAdmin(actor)) {
    return true;
  }

  return (
    canViewOperatorsDirectory(actor) &&
    hasOperatorPermission(operatorPermissionsOf(actor), "operators", "managePermissions")
  );
}

export function canViewUsersDirectory(actor: SessionActor): boolean {
  if (isSuper(actor) || isAdmin(actor)) {
    return true;
  }

  if (isOperator(actor)) {
    return hasOperatorPermission(operatorPermissionsOf(actor), "users", "view");
  }

  return false;
}

export function canUpdateUsersDirectory(actor: SessionActor): boolean {
  if (isSuper(actor) || isAdmin(actor)) {
    return true;
  }

  return canViewUsersDirectory(actor) && hasOperatorPermission(operatorPermissionsOf(actor), "users", "update");
}

export function canDeleteUsersDirectory(actor: SessionActor): boolean {
  if (isSuper(actor) || isAdmin(actor)) {
    return true;
  }

  return canViewUsersDirectory(actor) && hasOperatorPermission(operatorPermissionsOf(actor), "users", "delete");
}
