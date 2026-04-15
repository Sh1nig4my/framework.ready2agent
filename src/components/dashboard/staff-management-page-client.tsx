"use client";

import { useMemo, useState } from "react";
import { signOut } from "next-auth/react";
import {
  ADMIN_PERMISSION_CATALOG,
  type AdminPermission,
} from "@/shared/auth/admin-permissions.catalog";
import {
  OPERATOR_PERMISSION_CATALOG,
  flattenEnabledOperatorPermissions,
  type OperatorPermissionResource,
  type OperatorPermissions,
} from "@/shared/auth/permissions.catalog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import { SearchIcon, TrashIcon } from "@/components/ui/icons";
import type { StaffDirectoryCapabilities } from "@/shared/staff/types";

export interface StaffManagementRow {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  role: string;
  adminPermissions: AdminPermission[] | null;
  operatorPermissions: OperatorPermissions | null;
}

export interface StaffManagementPageClientProps {
  title: string;
  subtitle: string;
  accessDeniedMessage?: string;
  tone: "operators" | "administrators";
  permissionMode: "operator-map" | "admin-list";
  collectionTitle: string;
  collectionDescription: string;
  emptySelectionMessage: string;
  inviteTitle: string;
  inviteEndpoint: string;
  permissionsEndpointBase: string;
  entityEndpointBase: string;
  searchPlaceholder: string;
  entityLabel: string;
  inviteResultLabel: string;
  permissionResources: OperatorPermissionResource[];
  initialRows: StaffManagementRow[];
  capabilities: StaffDirectoryCapabilities;
  currentUserId: string;
  readonlyMessage?: string;
}

// The shared page supports both permission models, so the UI can switch between the admin list and operator map without duplicating layout code.
const adminPermissionDescriptions: Record<AdminPermission, { label: string; description: string }> = {
  "administrators.viewOthers": {
    label: "View delegated admins",
    description: "Lets this admin browse delegated administrator accounts they can operate on.",
  },
  "administrators.invite": {
    label: "Invite admins",
    description: "Lets this admin invite new administrator accounts.",
  },
  "administrators.edit": {
    label: "Edit delegated admins",
    description: "Lets this admin edit delegated administrator accounts in addition to their own profile.",
  },
  "administrators.delete": {
    label: "Delete delegated admins",
    description: "Lets this admin delete delegated administrator accounts, never their own account.",
  },
  "operators.invite": {
    label: "Invite operators",
    description: "Lets this admin generate operator invite links from the operators module.",
  },
};

function roleTone(role: string) {
  if (role === "USER") {
    return "green" as const;
  }

  if (role === "ADMIN") {
    return "violet" as const;
  }

  if (role === "SUPER") {
    return "blue" as const;
  }

  return "azure" as const;
}

function getThemeClass(tone: StaffManagementPageClientProps["tone"]) {
  return tone === "administrators" ? "theme-administrators" : "theme-operators";
}

function getPermissionCount(
  mode: StaffManagementPageClientProps["permissionMode"],
  entry: StaffManagementRow,
) {
  return mode === "admin-list"
    ? entry.adminPermissions?.length ?? 0
    : flattenEnabledOperatorPermissions(entry.operatorPermissions).length;
}

function getEnabledPermissionLabels(
  mode: StaffManagementPageClientProps["permissionMode"],
  entry: StaffManagementRow,
) {
  if (mode === "admin-list") {
    return entry.adminPermissions ?? [];
  }

  return flattenEnabledOperatorPermissions(entry.operatorPermissions);
}

export function StaffManagementPageClient({
  title,
  subtitle,
  accessDeniedMessage,
  tone,
  permissionMode,
  collectionTitle,
  collectionDescription,
  emptySelectionMessage,
  inviteTitle,
  inviteEndpoint,
  permissionsEndpointBase,
  entityEndpointBase,
  searchPlaceholder,
  entityLabel,
  inviteResultLabel,
  permissionResources,
  initialRows,
  capabilities,
  currentUserId,
  readonlyMessage,
}: StaffManagementPageClientProps) {
  const [rows, setRows] = useState(initialRows);
  const [selectedId, setSelectedId] = useState(initialRows[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteFirstName, setInviteFirstName] = useState("");
  const [inviteLastName, setInviteLastName] = useState("");
  const [inviteResult, setInviteResult] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<"account" | "permissions" | "invite" | "delete" | null>(null);

  const filtered = useMemo(
    () => rows.filter((entry) => `${entry.name} ${entry.email}`.toLowerCase().includes(search.toLowerCase())),
    [rows, search],
  );

  const selectedEntry = filtered.find((entry) => entry.id === selectedId) ?? filtered[0] ?? null;
  const selectedIsSelf = selectedEntry?.id === currentUserId;
  const canEditSelectedAccount = Boolean(
    selectedEntry && (selectedIsSelf ? capabilities.canUpdateSelf : capabilities.canUpdate),
  );
  const canDeleteSelectedAccount = Boolean(
    selectedEntry && (selectedIsSelf ? capabilities.canDeleteSelf : capabilities.canDelete),
  );
  const canEditSelectedPermissions = Boolean(
    selectedEntry && capabilities.canManagePermissions && !selectedIsSelf,
  );

  if (accessDeniedMessage) {
    return (
      <div className={`page-shell theme-section ${getThemeClass(tone)}`}>
        <PageHeader subtitle={subtitle} title={title} />
        <div className="rounded-3xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.88)] px-5 py-4 text-sm text-[var(--color-foreground)] shadow-[0_14px_34px_var(--color-shadow)]">
          {accessDeniedMessage}
        </div>
      </div>
    );
  }

  const patchSelectedEntry = (patch: Partial<StaffManagementRow>) => {
    if (!selectedEntry) {
      return;
    }

    setRows((current) =>
      current.map((entry) => {
        if (entry.id !== selectedEntry.id) {
          return entry;
        }

        const next = { ...entry, ...patch };
        next.name = `${next.firstName} ${next.lastName}`.trim();
        return next;
      }),
    );
  };

  const toggleOperatorPermission = (resource: OperatorPermissionResource, action: string) => {
    if (!canEditSelectedPermissions || !selectedEntry || !selectedEntry.operatorPermissions) {
      return;
    }

    const resourcePermissions = selectedEntry.operatorPermissions[resource] as Record<string, boolean>;

    patchSelectedEntry({
      operatorPermissions: {
        ...selectedEntry.operatorPermissions,
        [resource]: {
          ...resourcePermissions,
          [action]: !resourcePermissions[action],
        },
      },
    });
  };

  const toggleAdminPermission = (permission: AdminPermission) => {
    if (!canEditSelectedPermissions || !selectedEntry) {
      return;
    }

    const currentPermissions = new Set(selectedEntry.adminPermissions ?? []);

    if (currentPermissions.has(permission)) {
      currentPermissions.delete(permission);
    } else {
      currentPermissions.add(permission);
    }

    patchSelectedEntry({ adminPermissions: [...currentPermissions] });
  };

  const saveAccount = async () => {
    if (!selectedEntry || !canEditSelectedAccount) {
      return;
    }

    setBusyAction("account");
    setStatusMessage(null);

    const response = await fetch(`${entityEndpointBase}/${selectedEntry.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: selectedEntry.firstName,
        lastName: selectedEntry.lastName,
        status: selectedEntry.status,
      }),
    });

    setBusyAction(null);
    setStatusMessage(response.ok ? `${entityLabel} account updated.` : `Unable to update this ${entityLabel}.`);
  };

  const savePermissions = async () => {
    if (!canEditSelectedPermissions || !selectedEntry) {
      return;
    }

    setBusyAction("permissions");
    setStatusMessage(null);

    const payload = permissionMode === "admin-list"
      ? { permissions: selectedEntry.adminPermissions ?? [] }
      : { permissions: selectedEntry.operatorPermissions };

    const response = await fetch(`${permissionsEndpointBase}/${selectedEntry.id}/permissions`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setBusyAction(null);
    setStatusMessage(response.ok ? "Permissions updated." : "Unable to update permissions.");
  };

  const inviteEntry = async () => {
    if (!capabilities.canInvite) {
      return;
    }

    setBusyAction("invite");
    setInviteResult(null);
    setStatusMessage(null);

    const response = await fetch(inviteEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: inviteEmail,
        firstName: inviteFirstName,
        lastName: inviteLastName,
      }),
    });

    const result = await response.json();
    setBusyAction(null);

    if (response.ok && result.success) {
      setInviteResult(result.data.inviteUrl);
      setStatusMessage(`${entityLabel} invite link generated.`);
      setInviteEmail("");
      setInviteFirstName("");
      setInviteLastName("");
    } else {
      setStatusMessage(`Unable to generate a new ${entityLabel} invite link.`);
    }
  };

  const deleteEntry = async () => {
    if (!selectedEntry || !canDeleteSelectedAccount) {
      return;
    }

    if (!window.confirm(`Delete ${selectedEntry.name}?`)) {
      return;
    }

    setBusyAction("delete");
    setStatusMessage(null);

    const response = await fetch(`${entityEndpointBase}/${selectedEntry.id}`, { method: "DELETE" });

    setBusyAction(null);

    if (!response.ok) {
      setStatusMessage(`Unable to delete this ${entityLabel}.`);
      return;
    }

    if (selectedEntry.id === currentUserId) {
      await signOut({ callbackUrl: "/login" });
      return;
    }

    setRows((current) => current.filter((entry) => entry.id !== selectedEntry.id));
    setSelectedId("");
    setStatusMessage(`${entityLabel} account deleted.`);
  };

  return (
    <div className={`page-shell theme-section ${getThemeClass(tone)}`}>
      <PageHeader
        actions={
          canEditSelectedPermissions ? (
            <Button onClick={savePermissions} type="button">
              {busyAction === "permissions" ? "Saving..." : "Save Permissions"}
            </Button>
          ) : undefined
        }
        subtitle={subtitle}
        title={title}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="surface-panel border-[var(--color-border)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-strong)]">Directory</p>
          <p className="mt-3 text-3xl font-bold text-[var(--color-foreground)]">{rows.length}</p>
          <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">Visible {entityLabel} accounts</p>
        </div>
        <div className="surface-panel border-[var(--color-border)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-strong)]">Permissions</p>
          <p className="mt-3 text-3xl font-bold text-[var(--color-foreground)]">
            {selectedEntry ? getPermissionCount(permissionMode, selectedEntry) : 0}
          </p>
          <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">Enabled for selected account</p>
        </div>
        <div className="surface-panel border-[var(--color-border)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-strong)]">Mode</p>
          <p className="mt-3 text-lg font-semibold text-[var(--color-foreground)]">
            {permissionMode === "admin-list" ? "Admin permission list" : "Operator permission map"}
          </p>
          <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">Clean separation between admin-only and operator-only delegation.</p>
        </div>
      </section>

      {capabilities.selfOnly && readonlyMessage ? (
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-primary-soft)] px-5 py-4 text-sm text-[var(--color-foreground)]">
          {readonlyMessage}
        </div>
      ) : null}

      {statusMessage ? (
        <div className="rounded-3xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.9)] px-5 py-4 text-sm text-[var(--color-foreground)] shadow-[0_14px_34px_var(--color-shadow)]">
          {statusMessage}
        </div>
      ) : null}

      <section className="grid gap-5 xl:grid-cols-[0.84fr_1.16fr]">
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-primary-soft),rgba(255,255,255,0.72))]">
            <CardTitle>{collectionTitle}</CardTitle>
            <CardDescription>{collectionDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-5">
            <label className="relative block">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-foreground-muted)]" size={18} />
              <input className="field pl-12" onChange={(event) => setSearch(event.target.value)} placeholder={searchPlaceholder} value={search} />
            </label>
            <div className="space-y-3">
              {filtered.map((entry) => (
                <button
                  className={`w-full rounded-3xl border p-4 text-left transition ${selectedEntry?.id === entry.id ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)] shadow-[0_14px_34px_var(--color-shadow)]" : "border-[var(--color-border)] bg-[rgba(255,255,255,0.78)] hover:border-[var(--color-primary)] hover:bg-[rgba(255,255,255,0.94)]"}`}
                  key={entry.id}
                  onClick={() => setSelectedId(entry.id)}
                  type="button"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[var(--color-foreground)]">{entry.name}</p>
                      <p className="text-sm text-[var(--color-foreground-muted)]">{entry.email}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge tone={roleTone(entry.role)}>{entry.role}</Badge>
                      <Badge tone={entry.status === "ACTIVE" ? "green" : "neutral"}>{entry.status}</Badge>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-foreground-muted)]">
                    <span>{getPermissionCount(permissionMode, entry)} delegated permissions</span>
                    {entry.id === currentUserId ? <span>My account</span> : <span>Managed account</span>}
                  </div>
                </button>
              ))}
            </div>
            {capabilities.canInvite ? (
              <div className="rounded-3xl border border-dashed border-[var(--color-border)] bg-[rgba(255,255,255,0.72)] p-4">
                <p className="font-semibold text-[var(--color-foreground)]">{inviteTitle}</p>
                <div className="mt-4 grid gap-3">
                  <input className="field" onChange={(event) => setInviteFirstName(event.target.value)} placeholder="First name" value={inviteFirstName} />
                  <input className="field" onChange={(event) => setInviteLastName(event.target.value)} placeholder="Last name" value={inviteLastName} />
                  <input className="field" onChange={(event) => setInviteEmail(event.target.value)} placeholder="Email" value={inviteEmail} />
                  <Button onClick={inviteEntry} type="button">{busyAction === "invite" ? "Generating..." : "Generate invite link"}</Button>
                  {inviteResult ? <p className="break-all text-xs text-[var(--color-success-strong)]">{inviteResultLabel}: {inviteResult}</p> : null}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <div className="grid gap-5">
          <Card className="overflow-hidden">
            <CardHeader className="border-b border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-primary-soft),rgba(255,255,255,0.72))]">
              <CardTitle>{selectedEntry ? `${selectedEntry.name}` : entityLabel}</CardTitle>
              <CardDescription>
                {selectedEntry
                  ? `Review the ${entityLabel} account profile and status details.`
                  : emptySelectionMessage}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-5">
              {selectedEntry ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-[var(--color-foreground-muted)]">
                    <span>First name</span>
                    <input
                      className="field"
                      disabled={!canEditSelectedAccount}
                      onChange={(event) => patchSelectedEntry({ firstName: event.target.value })}
                      value={selectedEntry.firstName}
                    />
                  </label>
                  <label className="space-y-2 text-sm text-[var(--color-foreground-muted)]">
                    <span>Last name</span>
                    <input
                      className="field"
                      disabled={!canEditSelectedAccount}
                      onChange={(event) => patchSelectedEntry({ lastName: event.target.value })}
                      value={selectedEntry.lastName}
                    />
                  </label>
                  <label className="space-y-2 text-sm text-[var(--color-foreground-muted)] md:col-span-2">
                    <span>Email</span>
                    <input className="field bg-[var(--color-surface-soft)]" disabled value={selectedEntry.email} />
                  </label>
                  <label className="space-y-2 text-sm text-[var(--color-foreground-muted)]">
                    <span>Status</span>
                    <select
                      className="field"
                      disabled={!canEditSelectedAccount}
                      onChange={(event) => patchSelectedEntry({ status: event.target.value })}
                      value={selectedEntry.status}
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                      <option value="INVITED">INVITED</option>
                    </select>
                  </label>
                  <div className="flex flex-wrap items-end gap-3 md:col-span-2">
                    <Button disabled={!canEditSelectedAccount} onClick={saveAccount} type="button">
                      {busyAction === "account" ? "Saving..." : "Save account"}
                    </Button>
                    {canDeleteSelectedAccount ? (
                      <button
                        className="inline-flex items-center gap-2 rounded-2xl border border-[var(--color-border)] px-4 py-3 text-sm font-semibold text-[var(--color-primary-strong)] transition hover:bg-[var(--color-primary-soft)]"
                        onClick={deleteEntry}
                        type="button"
                      >
                        <TrashIcon size={16} />
                        {busyAction === "delete" ? "Deleting..." : `Delete ${entityLabel}`}
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-[var(--color-foreground-muted)]">{emptySelectionMessage}</p>
              )}
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="border-b border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-primary-soft),rgba(255,255,255,0.72))]">
              <CardTitle>{selectedEntry ? `${selectedEntry.name}'s permissions` : `${entityLabel} permissions`}</CardTitle>
              <CardDescription>
                {canEditSelectedPermissions
                  ? "Toggle the delegated permissions for the selected account and save the new access shape."
                  : "Permissions are visible in read-only mode for this profile."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-5">
              {selectedEntry ? (
                <>
                  {permissionMode === "operator-map" ? (
                    permissionResources.map((resource) => (
                      <div key={resource}>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary-strong)]">{resource}</h3>
                        <div className="space-y-3">
                          {OPERATOR_PERMISSION_CATALOG[resource].map((action) => (
                            <div className="flex items-center justify-between rounded-3xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.76)] px-4 py-3" key={`${resource}-${action}`}>
                              <div>
                                <p className="font-medium text-[var(--color-foreground)]">{action}</p>
                                <p className="text-sm text-[var(--color-foreground-muted)]">{resource}.{action}</p>
                              </div>
                              <ToggleSwitch
                                checked={Boolean((selectedEntry.operatorPermissions?.[resource] as Record<string, boolean> | undefined)?.[action])}
                                disabled={!canEditSelectedPermissions}
                                onChange={() => toggleOperatorPermission(resource, action)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-3">
                      {ADMIN_PERMISSION_CATALOG.map((permission) => (
                        <div className="flex items-center justify-between rounded-3xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.76)] px-4 py-3" key={permission}>
                          <div>
                            <p className="font-medium text-[var(--color-foreground)]">{adminPermissionDescriptions[permission].label}</p>
                            <p className="text-sm text-[var(--color-foreground-muted)]">{adminPermissionDescriptions[permission].description}</p>
                          </div>
                          <ToggleSwitch
                            checked={selectedEntry.adminPermissions?.includes(permission) === true}
                            disabled={!canEditSelectedPermissions}
                            onChange={() => toggleAdminPermission(permission)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-primary-soft)] p-4">
                    <p className="font-semibold text-[var(--color-foreground)]">Active permissions</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {getEnabledPermissionLabels(permissionMode, selectedEntry).length ? (
                        getEnabledPermissionLabels(permissionMode, selectedEntry).map((permission) => (
                          <Badge key={permission} tone={tone === "administrators" ? "violet" : "blue"}>{permission}</Badge>
                        ))
                      ) : (
                        <p className="text-sm text-[var(--color-foreground-muted)]">No delegated permissions enabled.</p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-[var(--color-foreground-muted)]">{emptySelectionMessage}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
