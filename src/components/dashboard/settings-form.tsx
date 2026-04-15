"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SettingsForm({ initialUser }: { initialUser: { id: string; firstName: string; lastName: string; email: string; role: string; } }) {
  const [form, setForm] = useState(initialUser);
  const [message, setMessage] = useState<string | null>(null);

  const onChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const save = async () => {
    const response = await fetch(`/api/users/${form.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
      }),
    });

    if (response.ok) {
      setMessage("Profilo aggiornato con successo.");
    }
  };

  return (
    <div className="page-shell">
      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Profile settings</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--color-primary-strong)]">First name</label>
              <input className="field" onChange={(event) => onChange("firstName", event.target.value)} value={form.firstName} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--color-primary-strong)]">Last name</label>
              <input className="field" onChange={(event) => onChange("lastName", event.target.value)} value={form.lastName} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-[var(--color-primary-strong)]">Email</label>
              <input className="field" disabled value={form.email} />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <Button onClick={save} type="button">Save settings</Button>
              {message ? <span className="text-sm text-[var(--color-success)]">{message}</span> : null}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account summary</CardTitle>
            <CardDescription>Core security and role metadata for your session.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-[var(--color-foreground-muted)]">
            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
              <p className="font-semibold text-[var(--color-foreground)]">Role</p>
              <p className="mt-1">{form.role}</p>
            </div>
            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
              <p className="font-semibold text-[var(--color-foreground)]">Compliance</p>
              <p className="mt-1">Terms and privacy acceptance are stored server-side with audit-ready timestamps.</p>
            </div>
            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
              <p className="font-semibold text-[var(--color-foreground)]">Reauthentication</p>
              <p className="mt-1">Use `/api/auth/reauth` for sensitive actions that require a fresh password challenge.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
