"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function FirstRunSetupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const response = await fetch("/api/bootstrap/initialize-super", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-request-id": crypto.randomUUID(),
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        password,
        acceptTerms,
        acceptPrivacy,
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setSubmitting(false);
      setError(payload?.error?.message ?? "Impossibile completare il setup iniziale.");
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      remember: "true",
      redirect: false,
    });

    setSubmitting(false);

    if (!result || result.error) {
      router.push("/login");
      router.refresh();
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--color-primary-strong)]" htmlFor="firstName">
            Nome
          </label>
          <input
            className="field"
            id="firstName"
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Sofia"
            required
            type="text"
            value={firstName}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[var(--color-primary-strong)]" htmlFor="lastName">
            Cognome
          </label>
          <input
            className="field"
            id="lastName"
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Founder"
            required
            type="text"
            value={lastName}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-[var(--color-primary-strong)]" htmlFor="email">
          Email SUPER
        </label>
        <input
          className="field"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          value={email}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-[var(--color-primary-strong)]" htmlFor="password">
          Password
        </label>
        <input
          className="field"
          id="password"
          minLength={8}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Minimo 8 caratteri"
          required
          type="password"
          value={password}
        />
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-foreground)]">
        <input
          checked={acceptTerms}
          className="mt-1"
          onChange={(event) => setAcceptTerms(event.target.checked)}
          required
          type="checkbox"
        />
        <span>Confermo di accettare i termini della piattaforma per il primo account SUPER.</span>
      </label>

      <label className="flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-foreground)]">
        <input
          checked={acceptPrivacy}
          className="mt-1"
          onChange={(event) => setAcceptPrivacy(event.target.checked)}
          required
          type="checkbox"
        />
        <span>Confermo di aver letto l&apos;informativa privacy per l&apos;inizializzazione del sistema.</span>
      </label>

      {error ? (
        <div className="rounded-2xl border border-[rgba(185,28,28,0.18)] bg-[rgba(254,242,242,0.95)] px-4 py-3 text-sm text-[var(--color-danger)]">
          {error}
        </div>
      ) : null}

      <Button className="w-full" disabled={submitting} size="lg" type="submit">
        {submitting ? "Configurazione in corso..." : "Crea il primo SUPER"}
      </Button>
    </form>
  );
}
