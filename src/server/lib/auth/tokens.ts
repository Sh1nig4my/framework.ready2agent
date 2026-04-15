import { createHash, randomBytes } from "crypto";
import { env } from "@/server/config/env";
import { connectToDatabase } from "@/server/db/mongoose";
import { AuthTokenModel } from "@/server/models/AuthToken";

export type AuthTokenType = "EMAIL_VERIFY" | "PASSWORD_RESET" | "OPERATOR_INVITE" | "ADMIN_INVITE";

function getTokenPepper(): string {
  if (!env.auth.tokenPepper) {
    throw new Error("AUTH_TOKEN_PEPPER is required to hash auth tokens.");
  }

  return env.auth.tokenPepper;
}

function hashToken(rawToken: string): string {
  return createHash("sha256").update(`${rawToken}${getTokenPepper()}`).digest("hex");
}

export async function createOneTimeToken(input: {
  email: string;
  userId?: string | null;
  type: AuthTokenType;
  payload?: Record<string, unknown> | null;
  expiresAt: Date;
}): Promise<{ rawToken: string; expiresAt: Date }> {
  const rawToken = randomBytes(24).toString("hex");
  const tokenHash = hashToken(rawToken);

  await connectToDatabase();
  await AuthTokenModel.create({
    userId: input.userId ?? null,
    email: input.email,
    type: input.type,
    tokenHash,
    payload: input.payload ?? null,
    expiresAt: input.expiresAt,
    createdAt: new Date(),
  });

  return { rawToken, expiresAt: input.expiresAt };
}

export async function consumeOneTimeToken(rawToken: string, type: AuthTokenType) {
  const tokenHash = hashToken(rawToken);

  await connectToDatabase();
  const token = await AuthTokenModel.findOne({
    tokenHash,
    type,
    usedAt: null,
    expiresAt: { $gt: new Date() },
  }).lean();

  if (!token) {
    return null;
  }

  await AuthTokenModel.updateOne({ _id: token._id }, { usedAt: new Date() });

  return {
    id: String(token._id),
    userId: token.userId ? String(token.userId) : null,
    email: token.email,
    payload: (token.payload as Record<string, unknown> | null) ?? null,
  };
}
