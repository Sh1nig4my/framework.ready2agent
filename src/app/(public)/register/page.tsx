import { redirect } from "next/navigation";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { PublicShell } from "@/components/layout/public-shell";
import { isFirstRunSetupRequired } from "@/server/service/bootstrap.service";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  if (await isFirstRunSetupRequired()) {
    redirect("/setup" as never);
  }

  return (
    <PublicShell>
      <div className="flex flex-1 items-center justify-center py-10">
        <div className="surface-card w-full max-w-4xl p-8 md:p-10">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-primary)]">Registrazione USER</p>
              <h1 className="mt-3 text-4xl font-bold text-[var(--color-foreground)]">Crea il tuo account</h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-foreground-muted)]">
                Il profilo USER accede alla dashboard personale con i moduli previsti dalla policy standard.
              </p>
            </div>
            <Link className="text-sm font-semibold text-[var(--color-primary-strong)]" href="/login">
              Hai gia un account? Accedi
            </Link>
          </div>
          <RegisterForm />
        </div>
      </div>
    </PublicShell>
  );
}
