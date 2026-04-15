"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { EyeIcon, SearchIcon, TrashIcon } from "@/components/ui/icons";
import type { UsersDirectoryCapabilities } from "@/shared/users/types";

export interface UsersPageRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export function UsersPageClient({
  accessDeniedMessage,
  capabilities,
  currentUserId,
  initialUsers,
}: {
  accessDeniedMessage: string | null;
  capabilities: UsersDirectoryCapabilities;
  currentUserId: string;
  initialUsers: UsersPageRow[];
}) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(initialUsers);

  const filtered = useMemo(
    () =>
      users.filter((user) =>
        `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, users],
  );

  const removeUser = async (userId: string) => {
    if (!capabilities.canDelete) {
      return;
    }

    const response = await fetch(`/api/users/${userId}`, { method: "DELETE" });
    if (response.ok) {
      setUsers((current) => current.filter((user) => user.id !== userId));
    }
  };

  if (accessDeniedMessage) {
    return (
      <div className="page-shell theme-section theme-users">
        <PageHeader
          subtitle="Users registry availability depends on your delegated capabilities."
          title="Users Management"
        />
        <div className="rounded-3xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.88)] px-5 py-4 text-sm text-[var(--color-foreground)] shadow-[0_14px_34px_var(--color-shadow)]">
          {accessDeniedMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell theme-section theme-users">
      <PageHeader
        subtitle="Review customer accounts with actions enabled only when your capability set allows them."
        title="Users Management"
      />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="surface-panel border-[var(--color-border)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-strong)]">Users</p>
          <p className="mt-3 text-3xl font-bold text-[var(--color-foreground)]">{users.length}</p>
          <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">Accounts in the registry</p>
        </div>
        <div className="surface-panel border-[var(--color-border)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-strong)]">Visible now</p>
          <p className="mt-3 text-3xl font-bold text-[var(--color-foreground)]">{filtered.length}</p>
          <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">Results matching the current search</p>
        </div>
        <div className="surface-panel border-[var(--color-border)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-strong)]">Access mode</p>
          <p className="mt-3 text-lg font-semibold text-[var(--color-foreground)]">
            {capabilities.selfOnly ? "Self-only" : "Directory"}
          </p>
          <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">
            {capabilities.canDelete
              ? "You can review and remove non-protected accounts."
              : capabilities.canUpdate
                ? "You can review and update allowed account details."
                : "Read-only mode is active for this directory."}
          </p>
        </div>
      </section>

      {capabilities.selfOnly ? (
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-primary-soft)] px-5 py-4 text-sm text-[var(--color-foreground)]">
          Self-only mode is active. You can inspect only your own account.
        </div>
      ) : null}

      <Card className="overflow-hidden">
        <CardHeader className="border-b border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-primary-soft),rgba(255,255,255,0.72))]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Browse customer accounts, their status, and their join date.</CardDescription>
            </div>
            <label className="relative block min-w-[280px]">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-foreground-muted)]" size={18} />
              <input className="field pl-12" onChange={(event) => setSearch(event.target.value)} placeholder="Search users..." value={search} />
            </label>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto pt-5">
          <table className="min-w-full text-left text-sm">
            <thead className="text-[var(--color-foreground-muted)]">
              <tr>
                <th className="border-b border-[var(--color-border)] px-4 py-3 font-medium">User</th>
                <th className="border-b border-[var(--color-border)] px-4 py-3 font-medium">Email</th>
                <th className="border-b border-[var(--color-border)] px-4 py-3 font-medium">Role</th>
                <th className="border-b border-[var(--color-border)] px-4 py-3 font-medium">Status</th>
                <th className="border-b border-[var(--color-border)] px-4 py-3 font-medium">Joined</th>
                <th className="border-b border-[var(--color-border)] px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-sm text-[var(--color-foreground-muted)]" colSpan={6}>
                    No users match your current search.
                  </td>
                </tr>
              ) : null}
              {filtered.map((user) => {
                const protectedRow = ["SUPER", "ADMIN"].includes(user.role);
                const isSelf = user.id === currentUserId;

                return (
                  <tr className="border-b border-[var(--color-border)] last:border-b-0" key={user.id}>
                    <td className="px-4 py-4 font-medium text-[var(--color-foreground)]">{user.name}</td>
                    <td className="px-4 py-4 text-[var(--color-primary-strong)]">{user.email}</td>
                    <td className="px-4 py-4">
                      <Badge tone={user.role === "USER" ? "green" : user.role === "ADMIN" ? "violet" : "blue"}>{user.role}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge tone={user.status === "ACTIVE" ? "green" : "neutral"}>{user.status}</Badge>
                    </td>
                    <td className="px-4 py-4 text-[var(--color-foreground-muted)]">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button className="rounded-xl p-2 text-[var(--color-foreground-muted)] transition hover:bg-[var(--color-primary-soft)]" onClick={() => window.alert(`${user.name}\n${user.email}\n${user.role}`)} type="button"><EyeIcon size={16} /></button>
                        {capabilities.canDelete && !protectedRow && !isSelf ? (
                          <button className="rounded-xl p-2 text-[var(--color-primary-strong)] transition hover:bg-[var(--color-primary-soft)]" onClick={() => removeUser(user.id)} type="button"><TrashIcon size={16} /></button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
