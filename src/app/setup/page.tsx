import { redirect } from "next/navigation";
import { FirstRunSetupForm } from "@/components/bootstrap/first-run-setup-form";
import { PublicShell } from "@/components/layout/public-shell";
import { getCurrentSessionActor } from "@/server/lib/auth/session";
import { isFirstRunSetupRequired } from "@/server/service/bootstrap.service";

export const dynamic = "force-dynamic";

export default async function SetupPage() {
  if (!(await isFirstRunSetupRequired())) {
    const actor = await getCurrentSessionActor();
    redirect(actor ? "/dashboard" : "/login");
  }

  return (
    <PublicShell>
      <div className="flex flex-1 items-center justify-center py-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[36px] border border-[var(--color-border)] bg-white shadow-[0_24px_90px_rgba(15,23,42,0.08)] lg:grid-cols-[0.92fr_1.08fr]">
          <section className="bg-[linear-gradient(150deg,var(--color-success-strong),var(--color-foreground),var(--color-primary))] p-8 text-white md:p-10">
            <p className="text-sm uppercase tracking-[0.24em] text-white/70">First-run setup</p>
              <h1 className="mt-6 max-w-lg text-4xl font-bold leading-tight">
                Inizializza Ready2Agent creando il primo account SUPER sul database vuoto.
              </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
              Questo e l&apos;unico bootstrap reale supportato. Gli altri account nasceranno dai flussi
              applicativi dedicati, senza seed pubblici o scorciatoie operative.
            </p>
            <div className="mt-10 grid gap-4 rounded-[28px] bg-white/10 p-5 backdrop-blur">
              <div>
                <p className="font-semibold">Cosa succede dopo</p>
                <p className="mt-2 text-sm text-white/80">
                  Dopo la creazione del SUPER verrai autenticato e potrai invitare gli ADMIN dal
                  sistema, senza scorciatoie di seed in produzione.
                </p>
              </div>
              <div>
                <p className="font-semibold">Bootstrap pulito</p>
                <p className="mt-2 text-sm text-white/80">
                  Il bootstrap iniziale prepara solo il SUPER: gli altri utenti verranno creati nei
                  task e nei flussi applicativi dedicati.
                </p>
              </div>
            </div>
          </section>

          <section className="p-8 md:p-10">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-primary)]">
                Bootstrap SUPER
              </p>
              <h2 className="mt-3 text-3xl font-bold text-[var(--color-foreground)]">
                Crea l&apos;account iniziale
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-foreground-muted)]">
                Usa un&apos;email reale e una password robusta: questo account avra controllo completo e
                sblocchera il resto dei flussi staff. Userai le stesse credenziali appena inserite
                anche per il primo accesso da `SUPER`.
              </p>
            </div>

            <FirstRunSetupForm />
          </section>
        </div>
      </div>
    </PublicShell>
  );
}
