import { AppError } from "@/server/errors/AppError";
import { authOptions, auth } from "@/server/lib/auth/nextauth";
import { isSessionExpired } from "@/server/lib/auth/guards";
import type { SessionActor } from "@/shared/users/types";

export async function getCurrentSessionActor(): Promise<SessionActor | null> {
  const session = await auth();
  const user = session?.user;

  if (!user?.userId) {
    return null;
  }

  const actor: SessionActor = {
    userId: user.userId,
    email: user.email ?? "",
    name: user.name ?? "Ready2Agent User",
    role: user.role,
    permissions: user.permissions,
    remember: user.remember,
    signedInAt: user.signedInAt,
    expiresAt: user.expiresAt,
    reauthAt: user.reauthAt,
  };

  if (isSessionExpired(actor)) {
    return null;
  }

  return actor;
}

export async function requireSessionActor(): Promise<SessionActor> {
  const actor = await getCurrentSessionActor();

  if (!actor) {
    throw new AppError("UNAUTHENTICATED", "Please sign in to continue.");
  }

  return actor;
}

export { authOptions };
