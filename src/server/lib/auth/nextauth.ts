import { getServerSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/server/config/env";
import { authenticateWithCredentials } from "@/server/service/auth.service";
import { loginCredentialsSchema } from "@/server/dto/auth";
import { logger } from "@/server/lib/logger";
import {
  SESSION_TTL_REMEMBER_SECONDS,
  computeSessionExpiry,
} from "@/server/lib/auth/session-config";
import type { Role, SessionPermissions } from "@/shared/users/types";

function canUseSecureCookies(): boolean {
  const candidate = env.app.nextAuthUrl ?? env.app.publicUrl;

  try {
    const parsed = new URL(candidate);
    return parsed.protocol === "https:" && parsed.hostname !== "localhost";
  } catch {
    return env.isLive;
  }
}

const secureCookies = canUseSecureCookies();
const sessionCookieName = secureCookies ? "__Secure-next-auth.session-token" : "next-auth.session-token";
const csrfCookieName = secureCookies ? "__Host-next-auth.csrf-token" : "next-auth.csrf-token";
const callbackCookieName = secureCookies ? "__Secure-next-auth.callback-url" : "next-auth.callback-url";

type AuthorizedUser = {
  id: string;
  userId: string;
  email: string;
  name: string;
  role: Role;
  permissions: SessionPermissions;
  remember: boolean;
  signedInAt: number;
  expiresAt: number;
  reauthAt: number | null;
};

function isAuthorizedUser(candidate: unknown): candidate is AuthorizedUser {
  return Boolean(
    candidate &&
      typeof candidate === "object" &&
      "id" in candidate &&
      "userId" in candidate &&
      "role" in candidate,
  );
}

export const authOptions: NextAuthOptions = {
  secret: env.auth.nextAuthSecret,
  useSecureCookies: secureCookies,
  session: {
    strategy: "jwt",
    maxAge: SESSION_TTL_REMEMBER_SECONDS,
  },
  cookies: {
    sessionToken: {
      name: sessionCookieName,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: secureCookies,
      },
    },
    csrfToken: {
      name: csrfCookieName,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: secureCookies,
      },
    },
    callbackUrl: {
      name: callbackCookieName,
      options: {
        sameSite: "lax",
        path: "/",
        secure: secureCookies,
      },
    },
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Ready2Agent Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        remember: { label: "Remember", type: "text" },
      },
      async authorize(credentials) {
        const parsed = loginCredentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        try {
          const remember = parsed.data.remember === true || parsed.data.remember === "true";
          const actor = await authenticateWithCredentials(
            parsed.data.email,
            parsed.data.password,
            remember,
          );

          return {
            id: actor.userId,
            userId: actor.userId,
            email: actor.email,
            name: actor.name,
            role: actor.role,
            permissions: actor.permissions,
            remember: actor.remember,
            signedInAt: actor.signedInAt,
            expiresAt: actor.expiresAt,
            reauthAt: actor.reauthAt ?? null,
          } satisfies AuthorizedUser;
        } catch (error) {
          logger("warn", "Credentials authorization failed", {
            message: error instanceof Error ? error.message : "unknown",
          });
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (isAuthorizedUser(user)) {
        token.userId = user.userId;
        token.role = user.role;
        token.permissions = user.permissions;
        token.remember = user.remember;
        token.signedInAt = user.signedInAt;
        token.expiresAt = user.expiresAt;
        token.reauthAt = user.reauthAt;
      }

      if (trigger === "update" && typeof session?.reauthAt === "number") {
        token.reauthAt = session.reauthAt;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.userId = token.userId ?? token.sub ?? "";
        session.user.email = token.email ?? "";
        session.user.name = session.user.name ?? "Ready2Agent User";
        session.user.role = token.role ?? "USER";
        session.user.permissions = token.permissions ?? { admin: [], operator: null };
        session.user.remember = Boolean(token.remember);
        session.user.signedInAt = Number(token.signedInAt ?? Date.now());
        session.user.expiresAt = Number(
          token.expiresAt ?? computeSessionExpiry(session.user.signedInAt, session.user.remember),
        );
        session.user.reauthAt = token.reauthAt ?? null;
      }

      return session;
    },
  },
};

export async function auth() {
  return getServerSession(authOptions);
}
