"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("email")),
      firstName: String(formData.get("firstName")),
      lastName: String(formData.get("lastName")),
      password: String(formData.get("password")),
      acceptTerms: formData.get("acceptTerms") === "on",
      acceptPrivacy: formData.get("acceptPrivacy") === "on",
    };

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok || !result.success) {
      setError(result.error?.message ?? "Registrazione non riuscita.");
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
        <label className="text-sm font-semibold text-[var(--color-primary-strong)]">Email</label>
        <input autoComplete="email" className="field" name="email" required type="email" />
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
          {loading ? "Creazione account..." : "Crea account"}
        </Button>
      </div>
    </form>
  );
}
