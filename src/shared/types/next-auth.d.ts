import "next-auth";
import "next-auth/jwt";
import type { DefaultSession } from "next-auth";
import type { Role, SessionPermissions } from "@/shared/users/types";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      role: Role;
      permissions: SessionPermissions;
      remember: boolean;
      signedInAt: number;
      expiresAt: number;
      reauthAt: number | null;
    } & DefaultSession["user"];
    reauthAt?: number;
  }

  interface User {
    userId: string;
    role: Role;
    permissions: SessionPermissions;
    remember: boolean;
    signedInAt: number;
    expiresAt: number;
    reauthAt: number | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    role?: Role;
    permissions?: SessionPermissions;
    remember?: boolean;
    signedInAt?: number;
    expiresAt?: number;
    reauthAt?: number | null;
  }
}
