"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      remember: String(remember),
      redirect: false,
    });

    setSubmitting(false);

    if (!result || result.error) {
      setError("Credenziali non valide o account non attivo.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[var(--color-primary-strong)]" htmlFor="email">
          Email
        </label>
        <input
          autoComplete="email"
          className="field"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          type="email"
          value={email}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-[var(--color-primary-strong)]" htmlFor="password">
          Password
        </label>
        <input
          autoComplete="current-password"
          className="field"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          value={password}
        />
      </div>

      <label className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-primary-soft)] px-4 py-3 text-sm text-[var(--color-foreground)]">
        <input checked={remember} onChange={(event) => setRemember(event.target.checked)} type="checkbox" />
        Mantieni l&apos;accesso esteso su questo dispositivo
      </label>

      {error ? (
        <div className="rounded-2xl border border-[rgba(236,72,153,0.3)] bg-[var(--color-pink-soft)] px-4 py-3 text-sm text-[var(--color-pink)]">
          {error}
        </div>
      ) : null}

      <Button className="w-full" disabled={submitting} size="lg" type="submit">
        {submitting ? "Accesso in corso..." : "Accedi"}
      </Button>
    </form>
  );
}
