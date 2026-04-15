"use client";

import { StaffManagementPageClient, type StaffManagementRow } from "@/components/dashboard/staff-management-page-client";
import type { StaffDirectoryCapabilities } from "@/shared/staff/types";

export type AdministratorRow = StaffManagementRow;

export function AdministratorsPageClient({
  accessDeniedMessage,
  capabilities,
  currentUserId,
  initialAdministrators,
}: {
  accessDeniedMessage?: string;
  capabilities: StaffDirectoryCapabilities;
  currentUserId: string;
  initialAdministrators: AdministratorRow[];
}) {
  return (
    <StaffManagementPageClient
      accessDeniedMessage={accessDeniedMessage}
      capabilities={capabilities}
      collectionDescription="Generate admin invite links, review delegated scope, and keep admin-to-admin delegation explicit through permissions."
      collectionTitle="Administrators"
      currentUserId={currentUserId}
      emptySelectionMessage="Select an administrator from the left column to inspect the account and permissions."
      entityEndpointBase="/api/administrators"
      entityLabel="administrator"
      initialRows={initialAdministrators}
      inviteEndpoint="/api/administrators/invite"
      inviteResultLabel="Admin registration link"
      inviteTitle="Generate a new administrator registration link"
      permissionMode="admin-list"
      permissionResources={[]}
      permissionsEndpointBase="/api/administrators"
      readonlyMessage="You can open only your own administrator account until SUPER grants visibility over other admins."
      searchPlaceholder="Search administrators..."
      subtitle="SUPER can always invite administrators. ADMIN can invite additional administrators only when delegated with explicit permissions."
      title="Administrators Management"
      tone="administrators"
    />
  );
}
