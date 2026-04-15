import type { Route } from "next";
import { hasOperatorPermission, type OperatorPermissionAction, type OperatorPermissionResource } from "@/shared/auth/permissions.catalog";
import { standardUserSections } from "@/shared/users/types";
import type { Role, SessionActor, StandardUserSection } from "@/shared/users/types";

export type NavigationIconKey =
  | "dashboard"
  | "administrators"
  | "operators"
  | "users"
  | "settings";

export type NavigationAccent = "blue" | "azure" | "green" | "gold" | "violet";
export type NavigationPlacement = "main" | "secondary";

export interface NavigationItem {
  href: Route;
  label: string;
  icon: NavigationIconKey;
  accent: NavigationAccent;
  placement: NavigationPlacement;
  visibleForRoles: Role[];
  visibleForStandardUser?: StandardUserSection;
  requiresOperatorPermissions?: Array<{
    resource: OperatorPermissionResource;
    action: OperatorPermissionAction;
  }>;
}

export const navigationConfig: NavigationItem[] = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: "dashboard",
    accent: "blue",
    placement: "main",
    visibleForRoles: ["SUPER", "ADMIN", "OPERATOR", "USER"],
    visibleForStandardUser: "dashboard",
  },
  {
    href: "/dashboard/operators",
    label: "Operators",
    icon: "operators",
    accent: "azure",
    placement: "secondary",
    visibleForRoles: ["SUPER", "ADMIN", "OPERATOR"],
  },
  {
    href: "/dashboard/administrators",
    label: "Administrators",
    icon: "administrators",
    accent: "violet",
    placement: "secondary",
    visibleForRoles: ["SUPER", "ADMIN"],
  },
  {
    href: "/dashboard/users",
    label: "Users",
    icon: "users",
    accent: "blue",
    placement: "secondary",
    visibleForRoles: ["SUPER", "ADMIN", "OPERATOR"],
    requiresOperatorPermissions: [{ resource: "users", action: "view" }],
  },
];

export const profileMenuItem = {
  href: "/dashboard/settings",
  label: "Profile settings",
  icon: "settings",
  accent: "blue",
  placement: "secondary",
  visibleForRoles: ["SUPER", "ADMIN", "OPERATOR", "USER"],
  visibleForStandardUser: "settings",
} satisfies NavigationItem;

export function canAccessProfileMenu(actor: SessionActor): boolean {
  return canAccessNavigationItem(actor, profileMenuItem);
}

export function canAccessNavigationItem(actor: SessionActor, item: NavigationItem): boolean {
  if (!item.visibleForRoles.includes(actor.role)) {
    return false;
  }

  if (actor.role === "SUPER" || actor.role === "ADMIN") {
    return true;
  }

  if (actor.role === "USER") {
    return item.visibleForStandardUser ? standardUserSections.includes(item.visibleForStandardUser) : false;
  }

  if (!item.requiresOperatorPermissions?.length) {
    return true;
  }

  return item.requiresOperatorPermissions.every(({ resource, action }) =>
    hasOperatorPermission(actor.permissions.operator, resource, action),
  );
}

export function getVisibleNavigation(actor: SessionActor): NavigationItem[] {
  return navigationConfig.filter((item) => canAccessNavigationItem(actor, item));
}
