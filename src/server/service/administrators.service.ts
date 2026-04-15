import { hash } from "bcrypt";
import { env } from "@/server/config/env";
import {
  createEmptyAdminPermissions,
  hasAdminPermission,
  sanitizeAdminPermissions,
} from "@/shared/auth/admin-permissions.catalog";
import {
  canDeleteAdministrator,
  canEditAdministrator,
  canInviteAdministrators,
  canManageAdministratorPermissions,
  isSuper,
} from "@/server/lib/auth/access";
import { createOneTimeToken, consumeOneTimeToken } from "@/server/lib/auth/tokens";
import { recordAuditEvent } from "@/server/service/audit.service";
import { AppError } from "@/server/errors/AppError";
import {
  createAdministratorRepository,
  findAdministratorByIdRepository,
  listAdministratorsRepository,
  updateAdministratorRepository,
} from "@/server/repository/administrators.repository";
import { findUserByEmail, findUserById } from "@/server/repository/users.repository";
import { fullNameOf, toSafeUser, type AppUser, type SessionActor } from "@/server/lib/users/types";
import type { StaffDirectoryCapabilities, StaffDirectoryResult } from "@/shared/staff/types";

// Administrators always reach the page, but non-SUPER accounts can manage only delegated records they created.
function getAdministratorDirectoryCapabilities(actor: SessionActor): StaffDirectoryCapabilities {
  if (!["SUPER", "ADMIN"].includes(actor.role)) {
    throw new AppError("FORBIDDEN", "You cannot access administrators.");
  }

  const canViewAll =
    isSuper(actor) ||
    (actor.role === "ADMIN" && hasAdminPermission(actor.permissions.admin, "administrators.viewOthers"));
  const canUpdateSelf = actor.role === "ADMIN" ? canEditAdministrator(actor, actor.userId) : false;
  const canDeleteSelf = actor.role === "ADMIN" ? canDeleteAdministrator(actor, actor.userId) : false;

  return {
    canViewAll,
    canInvite: canInviteAdministrators(actor),
    canUpdate: isSuper(actor) || (actor.role === "ADMIN" && canViewAll && canEditAdministrator(actor, "other-admin")),
    canDelete: isSuper(actor) || (actor.role === "ADMIN" && canViewAll && canDeleteAdministrator(actor, "other-admin")),
    canManagePermissions: canManageAdministratorPermissions(actor),
    canUpdateSelf,
    canDeleteSelf,
    selfOnly: actor.role === "ADMIN" && !canViewAll,
  };
}

function assertCanInviteAdministrators(actor: SessionActor): void {
  if (canInviteAdministrators(actor)) {
    return;
  }

  throw new AppError("FORBIDDEN", "You cannot invite administrators.");
}

function mapStaffDirectoryResult(
  users: AppUser[],
  capabilities: StaffDirectoryCapabilities,
): StaffDirectoryResult {
  return {
    entries: users.map((administrator) => ({
      ...toSafeUser(administrator),
      name: fullNameOf(administrator),
    })),
    capabilities,
  };
}

export async function getAdministratorDirectoryForActor(actor: SessionActor): Promise<StaffDirectoryResult> {
  const capabilities = getAdministratorDirectoryCapabilities(actor);

  if (actor.role === "SUPER") {
    const administrators = await listAdministratorsRepository();
    return mapStaffDirectoryResult(administrators, capabilities);
  }

  if (capabilities.canViewAll && actor.role === "ADMIN") {
    const administrators = await listAdministratorsRepository();
    const scopedAdministrators = administrators.filter(
      (administrator) => administrator.id === actor.userId || administrator.invitedByUserId === actor.userId,
    );
    return mapStaffDirectoryResult(scopedAdministrators, capabilities);
  }

  const self = await findUserById(actor.userId);
  if (!self || self.role !== "ADMIN") {
    throw new AppError("FORBIDDEN", "Self-only administrator access is not available for this account.");
  }

  return mapStaffDirectoryResult([self], capabilities);
}

export async function listAdministratorsForActor(actor: SessionActor) {
  const directory = await getAdministratorDirectoryForActor(actor);
  return directory.entries;
}

export async function getAdministratorForActor(actor: SessionActor, administratorId: string) {
  const administrator = await findAdministratorByIdRepository(administratorId);

  if (!administrator) {
    throw new AppError("NOT_FOUND", "Administrator not found.");
  }

  if (actor.role === "ADMIN" && actor.userId !== administratorId) {
    const canViewAll = hasAdminPermission(actor.permissions.admin, "administrators.viewOthers");

    if (!canViewAll) {
      throw new AppError("FORBIDDEN", "You can access only your own administrator account.");
    }

    if (administrator.invitedByUserId !== actor.userId) {
      throw new AppError("FORBIDDEN", "You can access only delegated administrator accounts.");
    }
  }

  return toSafeUser(administrator);
}

export async function inviteAdministratorForActor(
  actor: SessionActor,
  input: {
    email: string;
    firstName: string;
    lastName: string;
  },
  requestId: string,
) {
  assertCanInviteAdministrators(actor);

  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw new AppError("CONFLICT", "A user with this email already exists.");
  }

  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000);
  const token = await createOneTimeToken({
    email: input.email,
    type: "ADMIN_INVITE",
    payload: {
      invitedByUserId: actor.userId,
      ...input,
    },
    expiresAt,
  });

  const inviteUrl = `${env.app.publicUrl}/invite/${token.rawToken}?role=administrator`;

  await recordAuditEvent({
    requestId,
    actorUserId: actor.userId,
    action: "auth.administrator.invite",
    resource: "administrators",
    metadata: { email: input.email },
  });

  return {
    inviteUrl,
    expiresAt,
  };
}

export async function acceptAdministratorInvite(
  input: {
    token: string;
    firstName: string;
    lastName: string;
    password: string;
  },
  requestId: string,
) {
  const invite = await consumeOneTimeToken(input.token, "ADMIN_INVITE");

  if (!invite?.payload) {
    throw new AppError("TOKEN_INVALID_OR_EXPIRED", "Invite token is invalid or expired.");
  }

  const existing = await findUserByEmail(invite.email);
  if (existing) {
    throw new AppError("CONFLICT", "Administrator account already exists.");
  }

  const invitedByUserId = invite.payload.invitedByUserId
    ? String(invite.payload.invitedByUserId)
    : null;

  const passwordHash = await hash(input.password, 10);
  const created = await createAdministratorRepository({
    email: invite.email,
    firstName: input.firstName,
    lastName: input.lastName,
    passwordHash,
    status: "ACTIVE",
    role: "ADMIN",
    adminPermissions: createEmptyAdminPermissions(),
    operatorPermissions: null,
    emailVerifiedAt: new Date(),
    termsAcceptedAt: new Date(),
    privacyAcceptedAt: new Date(),
    lastLoginAt: null,
    invitationSentAt: new Date(),
    invitedByUserId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await recordAuditEvent({
    requestId,
    actorUserId: invitedByUserId,
    action: "administrator.create",
    resource: "administrators",
    targetUserId: created.id,
    metadata: { email: created.email },
  });

  return {
    email: created.email,
    user: toSafeUser(created),
  };
}

export async function updateAdministratorForActor(
  actor: SessionActor,
  administratorId: string,
  patch: Partial<Pick<AppUser, "firstName" | "lastName" | "status">>,
  requestId: string,
) {
  if (!canEditAdministrator(actor, administratorId)) {
    throw new AppError("FORBIDDEN", "You cannot update administrators.");
  }

  const administrator = await findAdministratorByIdRepository(administratorId);
  if (!administrator) {
    throw new AppError("NOT_FOUND", "Administrator not found.");
  }

  if (
    actor.role === "ADMIN" &&
    actor.userId !== administratorId &&
    administrator.invitedByUserId !== actor.userId
  ) {
    throw new AppError("FORBIDDEN", "You can update only delegated administrator accounts.");
  }

  const updated = await updateAdministratorRepository(administratorId, patch);
  if (!updated) {
    throw new AppError("NOT_FOUND", "Administrator not found.");
  }

  await recordAuditEvent({
    requestId,
    actorUserId: actor.userId,
    action: "administrator.update",
    resource: "administrators",
    targetUserId: administratorId,
    metadata: { patch: Object.keys(patch) },
  });

  return toSafeUser(updated);
}

export async function updateAdministratorPermissionsForActor(
  actor: SessionActor,
  administratorId: string,
  permissions: unknown,
  requestId: string,
) {
  if (!canManageAdministratorPermissions(actor)) {
    throw new AppError("FORBIDDEN", "You cannot update administrator permissions.");
  }

  const administrator = await findAdministratorByIdRepository(administratorId);
  if (!administrator) {
    throw new AppError("NOT_FOUND", "Administrator not found.");
  }

  const updated = await updateAdministratorRepository(administratorId, {
    adminPermissions: sanitizeAdminPermissions(permissions),
  });

  if (!updated) {
    throw new AppError("NOT_FOUND", "Administrator not found.");
  }

  await recordAuditEvent({
    requestId,
    actorUserId: actor.userId,
    action: "administrator.update.permissions",
    resource: "administrators",
    targetUserId: administratorId,
  });

  return toSafeUser(updated);
}

export async function deleteAdministratorForActor(
  actor: SessionActor,
  administratorId: string,
  requestId: string,
) {
  if (!canDeleteAdministrator(actor, administratorId)) {
    throw new AppError("FORBIDDEN", "You cannot delete administrators.");
  }

  const existing = await findAdministratorByIdRepository(administratorId);
  if (!existing) {
    throw new AppError("NOT_FOUND", "Administrator not found.");
  }

  if (actor.role === "ADMIN" && existing.invitedByUserId !== actor.userId) {
    throw new AppError("FORBIDDEN", "You can delete only delegated administrator accounts.");
  }

  const updated = await updateAdministratorRepository(administratorId, {
    status: "INACTIVE",
  });

  await recordAuditEvent({
    requestId,
    actorUserId: actor.userId,
    action: "administrator.delete",
    resource: "administrators",
    targetUserId: administratorId,
  });

  return updated ? toSafeUser(updated) : null;
}
