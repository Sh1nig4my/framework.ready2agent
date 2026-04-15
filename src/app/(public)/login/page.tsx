import { redirect } from "next/navigation";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { PublicShell } from "@/components/layout/public-shell";
import { isFirstRunSetupRequired } from "@/server/service/bootstrap.service";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isFirstRunSetupRequired()) {
    redirect("/setup" as never);
  }

  return (
    <PublicShell>
      <div className="flex flex-1 items-center justify-center py-10">
        <div className="surface-card grid w-full max-w-5xl overflow-hidden lg:grid-cols-[0.95fr_1.05fr]">
          <section className="bg-[linear-gradient(160deg,#6d28d9,#8b5cf6,#ec4899)] p-8 text-white md:p-10">
            <p className="text-sm uppercase tracking-[0.22em] text-white/70">Ready2Agent Access</p>
            <h1 className="mt-6 text-4xl font-bold leading-tight">Entra nel framework e riprendi da dove eri rimasto.</h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/80">
              Dashboard differenziate per ruolo, permessi granulari e validazione server-side: stessa logica ovunque, nessuna eccezione.
            </p>
            <div className="mt-10 space-y-4 rounded-[28px] bg-white/10 p-5 backdrop-blur">
              <p className="font-semibold">Cosa costruisce questo framework</p>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Auth con NextAuth, rate limit e sessioni controllate.</li>
                <li>Ruoli SUPER, ADMIN, OPERATOR, USER con policy esplicite.</li>
                <li>Workflow operativo documentato e tracciabile.</li>
              </ul>
            </div>
          </section>
          <section className="p-8 md:p-10">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-primary)]">Bentornato</p>
              <h2 className="mt-3 text-3xl font-bold text-[var(--color-foreground)]">Accedi a Ready2Agent</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-foreground-muted)]">
                Se non hai un account USER puoi crearlo dal form pubblico.
              </p>
            </div>
            <LoginForm />
            <p className="mt-6 text-sm text-[var(--color-foreground-muted)]">
              Nuovo su Ready2Agent? <Link className="font-semibold text-[var(--color-primary-strong)]" href="/register">Crea un account USER</Link>
            </p>
          </section>
        </div>
      </div>
    </PublicShell>
  );
}
