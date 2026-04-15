"use client";

import { StaffManagementPageClient, type StaffManagementRow } from "@/components/dashboard/staff-management-page-client";
import type { StaffDirectoryCapabilities } from "@/shared/staff/types";

export type OperatorRow = StaffManagementRow;

export function OperatorsPageClient({
  accessDeniedMessage,
  capabilities,
  currentUserId,
  initialOperators,
}: {
  accessDeniedMessage?: string;
  capabilities: StaffDirectoryCapabilities;
  currentUserId: string;
  initialOperators: OperatorRow[];
}) {
  return (
    <StaffManagementPageClient
      accessDeniedMessage={accessDeniedMessage}
      capabilities={capabilities}
      collectionDescription="Generate operator invite links, review profiles, and fine-tune the feature-by-feature permission map."
      collectionTitle="Operators"
      currentUserId={currentUserId}
      emptySelectionMessage="Select an operator from the left column to inspect the account and permissions."
      entityEndpointBase="/api/operators"
      entityLabel="operator"
      initialRows={initialOperators}
      inviteEndpoint="/api/operators/invite"
      inviteResultLabel="Operator registration link"
      inviteTitle="Generate a new operator registration link"
      permissionMode="operator-map"
      permissionResources={["dashboard", "operators", "users", "reports"]}
      permissionsEndpointBase="/api/operators"
      readonlyMessage="You can open only your own operator account until broader operator visibility is granted to you."
      searchPlaceholder="Search operators..."
      subtitle="SUPER can always invite operators. ADMIN and OPERATOR can invite operators only when their delegated permissions allow it."
      title="Operators Management"
      tone="operators"
    />
  );
}
