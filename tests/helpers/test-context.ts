import assert from "node:assert/strict";
import { hashSync } from "bcrypt";
import mongoose, { Types } from "mongoose";
import { connectToDatabase } from "@/server/db/mongoose";
import { createSampleUserDefinitions } from "@/server/lib/bootstrap/sample-users";
import { UserModel } from "@/server/models/User";
import { AuditLogModel } from "@/server/models/AuditLog";
import { AuthTokenModel } from "@/server/models/AuthToken";
import { AuthRateLimitModel } from "@/server/models/AuthRateLimit";
import { SupportMessageModel } from "@/server/models/SupportMessage";
import type { AppUser } from "@/server/lib/users/types";
import type { SessionActor } from "@/shared/users/types";

async function seedTestUsers() {
  const definitions = createSampleUserDefinitions();
  const now = new Date();
  const ids = new Map(definitions.map((definition) => [definition.key, new Types.ObjectId()]));

  const documents = definitions.map((definition) => ({
    _id: ids.get(definition.key) ?? new Types.ObjectId(),
    email: definition.email,
    firstName: definition.firstName,
    lastName: definition.lastName,
    passwordHash: hashSync(definition.password, 10),
    status: definition.status,
    deletedAt: null,
    role: definition.role,
    adminPermissions: definition.role === "ADMIN" ? definition.adminPermissions ?? [] : null,
    operatorPermissions: definition.role === "OPERATOR" ? definition.operatorPermissions : null,
    emailVerifiedAt: definition.emailVerified ? now : null,
    termsAcceptedAt: definition.acceptTerms ? now : null,
    privacyAcceptedAt: definition.acceptPrivacy ? now : null,
    lastLoginAt: definition.status === "ACTIVE" ? now : null,
    invitationSentAt: definition.status === "INVITED" || definition.role !== "USER" ? now : null,
    invitedByUserId: definition.invitedByKey ? (ids.get(definition.invitedByKey) ?? null) : null,
    createdAt: now,
    updatedAt: now,
  }));

  await UserModel.insertMany(documents);
}

export async function resetDemoStore(): Promise<void> {
  await connectToDatabase();
  await Promise.all([
    UserModel.deleteMany({}),
    AuditLogModel.deleteMany({}),
    AuthTokenModel.deleteMany({}),
    AuthRateLimitModel.deleteMany({}),
    SupportMessageModel.deleteMany({}),
  ]);

  await seedTestUsers();
}

export async function closeTestDatabase(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
}

export function actorFromUser(user: AppUser): SessionActor {
  return {
    userId: user.id,
    email: user.email,
    name: `${user.firstName} ${user.lastName}`.trim(),
    role: user.role,
    permissions: {
      admin: user.adminPermissions ?? [],
      operator: user.operatorPermissions ?? null,
    },
    remember: true,
    signedInAt: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    reauthAt: null,
  };
}

export async function requireDemoUser(email: string): Promise<AppUser> {
  await connectToDatabase();
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();
  assert.ok(user, `Missing demo user: ${email}`);
  return {
    id: String(user._id),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    passwordHash: user.passwordHash,
    status: user.status,
    deletedAt: user.deletedAt ?? null,
    role: user.role,
    adminPermissions: user.adminPermissions ?? null,
    operatorPermissions: user.operatorPermissions ?? null,
    emailVerifiedAt: user.emailVerifiedAt ?? null,
    termsAcceptedAt: user.termsAcceptedAt ?? null,
    privacyAcceptedAt: user.privacyAcceptedAt ?? null,
    lastLoginAt: user.lastLoginAt ?? null,
    invitationSentAt: user.invitationSentAt ?? null,
    invitedByUserId: user.invitedByUserId ? String(user.invitedByUserId) : null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function extractTextContent(node: unknown): string {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map((item) => extractTextContent(item)).join(" ");
  }

  if (typeof node === "object" && "props" in node) {
    const withProps = node as { props?: { children?: unknown } };
    return extractTextContent(withProps.props?.children);
  }

  return "";
}
