import { hash } from "bcrypt";
import { env } from "@/server/config/env";
import {
  canDeleteOperators,
  canInviteOperators,
  canManageOperatorPermissions,
  canUpdateOperators,
  canViewOperatorsDirectory,
  isAdmin,
  isSuper,
} from "@/server/lib/auth/access";
import {
  createDefaultOperatorPermissions,
  sanitizeOperatorPermissions,
} from "@/shared/auth/permissions.catalog";
import { createOneTimeToken, consumeOneTimeToken } from "@/server/lib/auth/tokens";
import { recordAuditEvent } from "@/server/service/audit.service";
import { AppError } from "@/server/errors/AppError";
import {
  createOperatorRepository,
  findOperatorByIdRepository,
  listOperatorsRepository,
  updateOperatorRepository,
} from "@/server/repository/operators.repository";
import { findUserByEmail, findUserById } from "@/server/repository/users.repository";
import { fullNameOf, toSafeUser, type AppUser, type SessionActor } from "@/server/lib/users/types";
import type { StaffDirectoryCapabilities, StaffDirectoryResult } from "@/shared/staff/types";

// Operators can land on the page even without broad visibility, so the page can fall back to a self-only profile view.
function getOperatorDirectoryCapabilities(actor: SessionActor): StaffDirectoryCapabilities {
  if (!["SUPER", "ADMIN", "OPERATOR"].includes(actor.role)) {
    throw new AppError("FORBIDDEN", "You cannot access operators.");
  }

  if (isSuper(actor) || isAdmin(actor)) {
    return {
      canViewAll: true,
      canInvite: true,
      canUpdate: true,
      canDelete: true,
      canManagePermissions: true,
      canUpdateSelf: false,
      canDeleteSelf: false,
      selfOnly: false,
    };
  }

  const canViewAll = canViewOperatorsDirectory(actor);

  return {
    canViewAll,
    canInvite: canInviteOperators(actor),
    canUpdate: canUpdateOperators(actor),
    canDelete: canDeleteOperators(actor),
    canManagePermissions: canManageOperatorPermissions(actor),
    canUpdateSelf: false,
    canDeleteSelf: false,
    selfOnly: !canViewAll,
  };
}

async function mapStaffDirectoryResult(
  users: Awaited<ReturnType<typeof listOperatorsRepository>> | AppUser[],
  capabilities: StaffDirectoryCapabilities,
): Promise<StaffDirectoryResult> {
  return {
    entries: users.map((operator) => ({
      ...toSafeUser(operator),
      name: fullNameOf(operator),
    })),
    capabilities,
  };
}

export async function getOperatorDirectoryForActor(actor: SessionActor): Promise<StaffDirectoryResult> {
  const capabilities = getOperatorDirectoryCapabilities(actor);

  if (capabilities.canViewAll && (isSuper(actor) || isAdmin(actor))) {
    const operators = await listOperatorsRepository();
    return mapStaffDirectoryResult(operators, capabilities);
  }

  if (capabilities.canViewAll && actor.role === "OPERATOR") {
    const operators = await listOperatorsRepository();
    const scopedOperators = operators.filter(
      (operator) => operator.id === actor.userId || operator.invitedByUserId === actor.userId,
    );
    return mapStaffDirectoryResult(scopedOperators, capabilities);
  }

  const self = await findUserById(actor.userId);
  if (!self || self.role !== "OPERATOR") {
    throw new AppError("FORBIDDEN", "Self-only operator access is not available for this account.");
  }

  return mapStaffDirectoryResult([self], capabilities);
}

export async function listOperatorsForActor(actor: SessionActor) {
  const directory = await getOperatorDirectoryForActor(actor);
  return directory.entries;
}

export async function getOperatorForActor(actor: SessionActor, operatorId: string) {
  const capabilities = getOperatorDirectoryCapabilities(actor);

  const operator = await findOperatorByIdRepository(operatorId);

  if (!operator) {
    throw new AppError("NOT_FOUND", "Operator not found.");
  }

  if (!capabilities.canViewAll && actor.userId !== operatorId) {
    throw new AppError("FORBIDDEN", "You can access only your own operator account.");
  }

  if (
    actor.role === "OPERATOR" &&
    actor.userId !== operatorId &&
    operator.invitedByUserId !== actor.userId
  ) {
    throw new AppError("FORBIDDEN", "You can access only delegated operator accounts.");
  }

  return toSafeUser(operator);
}

export async function inviteOperatorForActor(
  actor: SessionActor,
  input: {
    email: string;
    firstName: string;
    lastName: string;
  },
  requestId: string,
) {
  if (!canInviteOperators(actor)) {
    throw new AppError("FORBIDDEN", "You cannot invite operators.");
  }

  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw new AppError("CONFLICT", "A user with this email already exists.");
  }

  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000);
  const token = await createOneTimeToken({
    email: input.email,
    type: "OPERATOR_INVITE",
    payload: {
      invitedByUserId: actor.userId,
      ...input,
    },
    expiresAt,
  });

  const inviteUrl = `${env.app.publicUrl}/invite/${token.rawToken}?role=operator`;

  await recordAuditEvent({
    requestId,
    actorUserId: actor.userId,
    action: "auth.operator.invite",
    resource: "operators",
    metadata: { email: input.email },
  });

  return {
    inviteUrl,
    expiresAt,
  };
}

export async function acceptOperatorInvite(
  input: {
    token: string;
    firstName: string;
    lastName: string;
    password: string;
  },
  requestId: string,
) {
  const invite = await consumeOneTimeToken(input.token, "OPERATOR_INVITE");

  if (!invite?.payload) {
    throw new AppError("TOKEN_INVALID_OR_EXPIRED", "Invite token is invalid or expired.");
  }

  const existing = await findUserByEmail(invite.email);
  if (existing) {
    throw new AppError("CONFLICT", "Operator account already exists.");
  }

  const invitedByUserId = invite.payload.invitedByUserId
    ? String(invite.payload.invitedByUserId)
    : null;

  const passwordHash = await hash(input.password, 10);
  const created = await createOperatorRepository({
    email: invite.email,
    firstName: input.firstName,
    lastName: input.lastName,
    passwordHash,
    status: "ACTIVE",
    role: "OPERATOR",
    adminPermissions: null,
    operatorPermissions: createDefaultOperatorPermissions(),
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
    action: "operator.create",
    resource: "operators",
    targetUserId: created.id,
    metadata: { email: created.email },
  });

  return {
    email: created.email,
    user: toSafeUser(created),
  };
}

export async function updateOperatorForActor(
  actor: SessionActor,
  operatorId: string,
  patch: Partial<Pick<AppUser, "firstName" | "lastName" | "status">>,
  requestId: string,
) {
  if (!canUpdateOperators(actor)) {
    throw new AppError("FORBIDDEN", "You cannot update operators.");
  }

  const operator = await findOperatorByIdRepository(operatorId);
  if (!operator) {
    throw new AppError("NOT_FOUND", "Operator not found.");
  }

  if (
    actor.role === "OPERATOR" &&
    actor.userId !== operatorId &&
    operator.invitedByUserId !== actor.userId
  ) {
    throw new AppError("FORBIDDEN", "You can update only delegated operator accounts.");
  }

  const updated = await updateOperatorRepository(operatorId, patch);
  if (!updated) {
    throw new AppError("NOT_FOUND", "Operator not found.");
  }

  await recordAuditEvent({
    requestId,
    actorUserId: actor.userId,
    action: "operator.update",
    resource: "operators",
    targetUserId: operatorId,
    metadata: { patch: Object.keys(patch) },
  });

  return toSafeUser(updated);
}

export async function updateOperatorPermissionsForActor(
  actor: SessionActor,
  operatorId: string,
  permissions: unknown,
  requestId: string,
) {
  if (!canManageOperatorPermissions(actor)) {
    throw new AppError("FORBIDDEN", "You cannot update operator permissions.");
  }

  if (actor.role === "OPERATOR" && actor.userId === operatorId) {
    throw new AppError("FORBIDDEN", "Operators cannot update their own permissions from this screen.");
  }

  const operator = await findOperatorByIdRepository(operatorId);
  if (!operator) {
    throw new AppError("NOT_FOUND", "Operator not found.");
  }

  if (
    actor.role === "OPERATOR" &&
    actor.userId !== operatorId &&
    operator.invitedByUserId !== actor.userId
  ) {
    throw new AppError("FORBIDDEN", "You can update permissions only for delegated operator accounts.");
  }

  const updated = await updateOperatorRepository(operatorId, {
    operatorPermissions: sanitizeOperatorPermissions(permissions),
  });

  if (!updated) {
    throw new AppError("NOT_FOUND", "Operator not found.");
  }

  await recordAuditEvent({
    requestId,
    actorUserId: actor.userId,
    action: "operator.update.permissions",
    resource: "operators",
    targetUserId: operatorId,
  });

  return toSafeUser(updated);
}

export async function deleteOperatorForActor(
  actor: SessionActor,
  operatorId: string,
  requestId: string,
) {
  if (!canDeleteOperators(actor)) {
    throw new AppError("FORBIDDEN", "You cannot delete operators.");
  }

  if (actor.role === "OPERATOR" && actor.userId === operatorId) {
    throw new AppError("FORBIDDEN", "You cannot delete your own operator account.");
  }

  const existing = await findOperatorByIdRepository(operatorId);
  if (!existing) {
    throw new AppError("NOT_FOUND", "Operator not found.");
  }

  if (actor.role === "OPERATOR" && existing.invitedByUserId !== actor.userId) {
    throw new AppError("FORBIDDEN", "You can delete only delegated operator accounts.");
  }

  const updated = await updateOperatorRepository(operatorId, {
    status: "INACTIVE",
  });

  await recordAuditEvent({
    requestId,
    actorUserId: actor.userId,
    action: "operator.delete",
    resource: "operators",
    targetUserId: operatorId,
  });

  return updated ? toSafeUser(updated) : null;
}
