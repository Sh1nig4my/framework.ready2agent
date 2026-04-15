import { AdministratorsPageClient } from "@/components/dashboard/administrators-page-client";
import type { AdminPermission } from "@/shared/auth/admin-permissions.catalog";
import type { StaffDirectoryResult } from "@/shared/staff/types";
import { requireSessionActor } from "@/server/lib/auth/session";
import { fetchInternalApi } from "@/server/api/internal-rest-client";

type AdministratorDirectoryPayload = StaffDirectoryResult & {
  entries: Array<StaffDirectoryResult["entries"][number] & { adminPermissions?: AdminPermission[] | null }>;
};

export default async function AdministratorsPage() {
  const actor = await requireSessionActor();
  let directory: AdministratorDirectoryPayload | null = null;
  let accessDeniedMessage: string | undefined;

  try {
    directory = await fetchInternalApi<AdministratorDirectoryPayload>("/api/administrators");
  } catch (error) {
    accessDeniedMessage = error instanceof Error ? error.message : "Unable to load administrators directory.";
  }

  return (
    <AdministratorsPageClient
      accessDeniedMessage={accessDeniedMessage}
      capabilities={directory?.capabilities ?? {
        canViewAll: false,
        canInvite: false,
        canUpdate: false,
        canDelete: false,
        canManagePermissions: false,
        canUpdateSelf: false,
        canDeleteSelf: false,
        selfOnly: false,
      }}
      currentUserId={actor.userId}
      initialAdministrators={directory?.entries.map((administrator) => ({
        id: administrator.id,
        name: administrator.name,
        email: administrator.email,
        firstName: administrator.firstName,
        lastName: administrator.lastName,
        role: administrator.role,
        status: administrator.status,
        adminPermissions: administrator.adminPermissions ?? [],
        operatorPermissions: null,
      })) ?? []}
    />
  );
}
