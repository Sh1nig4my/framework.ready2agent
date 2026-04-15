"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const inviteAcceptEndpoints = {
  administrator: "/api/administrators/invite/accept",
  operator: "/api/operators/invite/accept",
} as const;

type InviteRole = keyof typeof inviteAcceptEndpoints;

interface InviteAcceptApiResponse {
  success?: boolean;
  data?: {
    email?: string;
  };
  error?: {
    code?: string;
    message?: string;
  };
}

function getInviteAcceptEndpoints(role: InviteRole | null): string[] {
  if (role) {
    return [inviteAcceptEndpoints[role]];
  }

  return [inviteAcceptEndpoints.administrator, inviteAcceptEndpoints.operator];
}

export function InviteAcceptForm({ role, token }: { role: InviteRole | null; token: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      token,
      firstName: String(formData.get("firstName")),
      lastName: String(formData.get("lastName")),
      password: String(formData.get("password")),
      acceptTerms: formData.get("acceptTerms") === "on",
      acceptPrivacy: formData.get("acceptPrivacy") === "on",
    };

    let result: InviteAcceptApiResponse | null = null;
    let finalErrorMessage = "Invito non valido o scaduto.";

    for (const endpoint of getInviteAcceptEndpoints(role)) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const attempt = (await response.json()) as InviteAcceptApiResponse;

      if (response.ok && attempt.success) {
        result = attempt;
        break;
      }

      finalErrorMessage = attempt.error?.message ?? finalErrorMessage;

      if (attempt.error?.code && attempt.error.code !== "TOKEN_INVALID_OR_EXPIRED") {
        break;
      }
    }

    setLoading(false);

    if (!result?.success) {
      setError(finalErrorMessage);
      return;
    }

    if (!result.data?.email) {
      setError("Risposta inattesa dal server durante l'attivazione invito.");
      return;
    }

    const signInResult = await signIn("credentials", {
      email: result.data.email,
      password: payload.password,
      remember: "true",
      redirect: false,
    });

    if (!signInResult?.error) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    router.push("/login");
  };

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[var(--color-primary-strong)]">Nome</label>
        <input autoComplete="given-name" className="field" name="firstName" required />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[var(--color-primary-strong)]">Cognome</label>
        <input autoComplete="family-name" className="field" name="lastName" required />
      </div>
      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-semibold text-[var(--color-primary-strong)]">Password</label>
        <input autoComplete="new-password" className="field" minLength={8} name="password" required type="password" />
      </div>
      <label className="md:col-span-2 flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-primary-soft)] px-4 py-3 text-sm text-[var(--color-foreground)]">
        <input name="acceptTerms" required type="checkbox" />
        Accetto i termini d&apos;uso
      </label>
      <label className="md:col-span-2 flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-primary-soft)] px-4 py-3 text-sm text-[var(--color-foreground)]">
        <input name="acceptPrivacy" required type="checkbox" />
        Accetto l&apos;informativa privacy
      </label>
      {error ? <p className="md:col-span-2 text-sm text-[var(--color-pink)]">{error}</p> : null}
      <div className="md:col-span-2">
        <Button disabled={loading} size="lg" type="submit">
          {loading ? "Attivazione account..." : "Attiva account invitato"}
        </Button>
      </div>
    </form>
  );
}
