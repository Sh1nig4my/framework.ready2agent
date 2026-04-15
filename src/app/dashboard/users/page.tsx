import { UsersPageClient } from "@/components/dashboard/users-page-client";
import { fetchInternalApi } from "@/server/api/internal-rest-client";
import { requireSessionActor } from "@/server/lib/auth/session";
import type { UsersDirectoryResult } from "@/shared/users/types";

export default async function UsersPage() {
  const actor = await requireSessionActor();
  let directory: UsersDirectoryResult | null = null;
  let accessDeniedMessage: string | null = null;

  try {
    directory = await fetchInternalApi<UsersDirectoryResult>("/api/users");
  } catch (error) {
    accessDeniedMessage = error instanceof Error ? error.message : "Unable to load users directory.";
  }

  return (
    <UsersPageClient
      accessDeniedMessage={accessDeniedMessage}
      capabilities={directory?.capabilities ?? { canViewAll: false, canUpdate: false, canDelete: false, selfOnly: false }}
      currentUserId={actor.userId}
      initialUsers={directory?.entries.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: String(user.createdAt ?? new Date()),
      })) ?? []}
    />
  );
}
