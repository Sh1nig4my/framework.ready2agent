import { hasSystemPermission } from "@/server/lib/auth/access";
import { type OperatorPermissionAction, type OperatorPermissionResource } from "@/shared/auth/permissions.catalog";
import { canStandardUserAccess } from "@/server/lib/auth/user-defaults";
import { REAUTH_WINDOW_MS } from "@/server/lib/auth/session-config";
import { AppError } from "@/server/errors/AppError";
import type { SessionActor, StandardUserSection } from "@/shared/users/types";

export function isSessionExpired(actor: SessionActor): boolean {
  return Date.now() > actor.expiresAt;
}

export function assertAdminOrSuper(actor: SessionActor): void {
  if (actor.role === "SUPER" || actor.role === "ADMIN") {
    return;
  }

  throw new AppError("FORBIDDEN", "Admin or Super access required.");
}

export function assertOperatorPermission(
  actor: SessionActor,
  resource: OperatorPermissionResource,
  action: OperatorPermissionAction,
): void {
  if (hasSystemPermission(actor, resource, action)) {
    return;
  }

  throw new AppError("FORBIDDEN", "Operator permission required.");
}

export function assertStandardUserAccess(actor: SessionActor, section: StandardUserSection): void {
  if (actor.role !== "USER") {
    return;
  }

  if (!canStandardUserAccess(section)) {
    throw new AppError("FORBIDDEN", "This section is not available for your profile.");
  }
}

export function assertSelfAccess(actor: SessionActor, targetUserId: string): void {
  if (actor.userId !== targetUserId) {
    throw new AppError("FORBIDDEN", "You can access only your own resources.");
  }
}

export function assertRecentReauth(actor: SessionActor, maxAgeMs = REAUTH_WINDOW_MS): void {
  if (actor.reauthAt && Date.now() - actor.reauthAt <= maxAgeMs) {
    return;
  }

  throw new AppError("REAUTH_REQUIRED", "Please reauthenticate to continue.");
}
