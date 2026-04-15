import { InviteAcceptForm } from "@/components/auth/invite-accept-form";
import { PublicShell } from "@/components/layout/public-shell";

export default async function InvitePage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ role?: string }>;
}) {
  const { token } = await params;
  const { role } = await searchParams;
  const inviteRole = role === "administrator" || role === "operator" ? role : null;

  return (
    <PublicShell>
      <div className="flex flex-1 items-center justify-center py-10">
        <div className="surface-card grid w-full max-w-5xl overflow-hidden lg:grid-cols-[0.95fr_1.05fr]">
          <section className="bg-[linear-gradient(160deg,#2f4cc9,#35a4ff,#7b61ff)] p-8 text-white md:p-10">
            <p className="text-sm uppercase tracking-[0.22em] text-white/70">Ready2Agent Invite</p>
            <h1 className="mt-6 text-4xl font-bold leading-tight">Attiva il tuo accesso e completa l&apos;onboarding.</h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/80">
              Questo flusso supporta sia inviti ADMIN sia inviti OPERATOR. Al termine dell&apos;attivazione puoi accedere subito con le nuove credenziali.
            </p>
            <div className="mt-10 space-y-4 rounded-[28px] bg-white/10 p-5 backdrop-blur">
              <p className="font-semibold">Cosa succede dopo</p>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Il tuo account viene attivato con il ruolo previsto dall&apos;invito.</li>
                <li>I permessi iniziali vengono caricati lato server.</li>
                <li>Al primo accesso atterri direttamente nella tua dashboard.</li>
              </ul>
            </div>
          </section>
          <section className="p-8 md:p-10">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-primary)]">Invito ricevuto</p>
              <h2 className="mt-3 text-3xl font-bold text-[var(--color-foreground)]">Completa la registrazione</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-foreground-muted)]">
                Inserisci i dati richiesti per attivare il tuo profilo e iniziare a lavorare su Ready2Agent.
              </p>
            </div>
            <InviteAcceptForm role={inviteRole} token={token} />
          </section>
        </div>
      </div>
    </PublicShell>
  );
}
