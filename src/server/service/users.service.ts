import { canDeleteUsersDirectory, canUpdateUsersDirectory, canViewUsersDirectory } from "@/server/lib/auth/access";
import { recordAuditEvent } from "@/server/service/audit.service";
import { AppError } from "@/server/errors/AppError";
import { countUsersByRole, findUserById, listUsers, updateUser } from "@/server/repository/users.repository";
import { fullNameOf, toSafeUser, type AppUser, type SessionActor } from "@/server/lib/users/types";
import type { UsersDirectoryCapabilities, UsersDirectoryResult } from "@/shared/users/types";

function assertCanViewUsers(actor: SessionActor): void {
  if (canViewUsersDirectory(actor)) {
    return;
  }

  throw new AppError("FORBIDDEN", "You cannot view the users registry.");
}

function assertCanManageUsers(actor: SessionActor): void {
  if (canUpdateUsersDirectory(actor)) {
    return;
  }

  throw new AppError("FORBIDDEN", "You cannot manage users.");
}

function assertCanDeleteUsers(actor: SessionActor): void {
  if (canDeleteUsersDirectory(actor)) {
    return;
  }

  throw new AppError("FORBIDDEN", "You cannot delete users.");
}

export async function listUsersForActor(actor: SessionActor) {
  const directory = await getUsersDirectoryForActor(actor);
  return directory.entries;
}

function getUsersDirectoryCapabilities(actor: SessionActor): UsersDirectoryCapabilities {
  return {
    canViewAll: true,
    canUpdate: canUpdateUsersDirectory(actor),
    canDelete: canDeleteUsersDirectory(actor),
    selfOnly: false,
  };
}

export async function getUsersDirectoryForActor(actor: SessionActor): Promise<UsersDirectoryResult> {
  assertCanViewUsers(actor);
  const users = await listUsers({ role: "USER" });
  return {
    entries: users.map((user) => ({
      ...toSafeUser(user),
      name: fullNameOf(user),
    })),
    capabilities: getUsersDirectoryCapabilities(actor),
  };
}

export async function getUserForActor(actor: SessionActor, targetUserId: string) {
  const isSelf = actor.userId === targetUserId;

  if (actor.role === "USER" && !isSelf) {
    throw new AppError("FORBIDDEN", "You can access only your own profile.");
  }

  if (!isSelf && actor.role !== "USER") {
    assertCanViewUsers(actor);
  }

  const user = await findUserById(targetUserId);
  if (!user) {
    throw new AppError("NOT_FOUND", "User not found.");
  }

  return toSafeUser(user);
}

export async function updateUserForActor(
  actor: SessionActor,
  targetUserId: string,
  patch: Partial<AppUser>,
  requestId: string,
) {
  const isSelfUpdate = actor.userId === targetUserId;

  if (isSelfUpdate && (patch.role !== undefined || patch.status !== undefined)) {
    throw new AppError("FORBIDDEN", "You cannot change role or status from your own profile.");
  }

  if (!isSelfUpdate) {
    assertCanManageUsers(actor);
  }

  if (!isSelfUpdate && patch.role && ["SUPER", "ADMIN"].includes(patch.role)) {
    throw new AppError("FORBIDDEN", "Use dedicated bootstrap flows for SUPER or ADMIN changes.");
  }

  if (patch.role === "SUPER") {
    const superCount = await countUsersByRole("SUPER");
    if (superCount >= 1) {
      throw new AppError("SUPER_ALREADY_EXISTS", "There can be only one SUPER user.");
    }
  }

  const updated = await updateUser(targetUserId, patch);
  if (!updated) {
    throw new AppError("NOT_FOUND", "User not found.");
  }

  await recordAuditEvent({
    requestId,
    actorUserId: actor.userId,
    action: "user.update",
    resource: "users",
    targetUserId,
    metadata: { patch: Object.keys(patch) },
  });

  return toSafeUser(updated);
}

export async function softDeleteUserForActor(
  actor: SessionActor,
  targetUserId: string,
  requestId: string,
) {
  if (actor.userId === targetUserId) {
    throw new AppError("FORBIDDEN", "You cannot delete your own account from the users registry.");
  }

  assertCanDeleteUsers(actor);

  const existing = await findUserById(targetUserId);
  if (!existing) {
    throw new AppError("NOT_FOUND", "User not found.");
  }

  if (["SUPER", "ADMIN"].includes(existing.role)) {
    throw new AppError("FORBIDDEN", "Protected users cannot be deleted from the generic registry.");
  }

  const deleted = await updateUser(targetUserId, {
    status: "INACTIVE",
  });

  await recordAuditEvent({
    requestId,
    actorUserId: actor.userId,
    action: "user.delete",
    resource: "users",
    targetUserId,
  });

  return deleted ? toSafeUser(deleted) : null;
}
