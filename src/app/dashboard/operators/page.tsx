import { OperatorsPageClient } from "@/components/dashboard/operators-page-client";
import type { OperatorPermissions } from "@/shared/auth/permissions.catalog";
import type { StaffDirectoryResult } from "@/shared/staff/types";
import { requireSessionActor } from "@/server/lib/auth/session";
import { fetchInternalApi } from "@/server/api/internal-rest-client";

type OperatorDirectoryPayload = StaffDirectoryResult & {
  entries: Array<StaffDirectoryResult["entries"][number] & { operatorPermissions?: OperatorPermissions | null }>;
};

export default async function OperatorsPage() {
  const actor = await requireSessionActor();
  let directory: OperatorDirectoryPayload | null = null;
  let accessDeniedMessage: string | undefined;

  try {
    directory = await fetchInternalApi<OperatorDirectoryPayload>("/api/operators");
  } catch (error) {
    accessDeniedMessage = error instanceof Error ? error.message : "Unable to load operators directory.";
  }

  return (
    <OperatorsPageClient
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
      initialOperators={directory?.entries.map((operator) => ({
        id: operator.id,
        name: operator.name,
        email: operator.email,
        firstName: operator.firstName,
        lastName: operator.lastName,
        role: operator.role,
        status: operator.status,
        adminPermissions: null,
        operatorPermissions: operator.operatorPermissions ?? null,
      })) ?? []}
    />
  );
}
