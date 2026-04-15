import { PublicShell } from "@/components/layout/public-shell";

export default function TermsPage() {
  return (
    <PublicShell>
      <div className="page-shell py-12">
        <div className="surface-card p-8 md:p-10">
          <h1 className="page-heading">Terms of Service</h1>
          <div className="mt-6 space-y-5 text-sm leading-7 text-[var(--color-foreground-muted)]">
            <p>Ready2Agent e pensato come monolite Next.js per learning operations e CRM formativo. L&apos;accesso e personale e non cedibile.</p>
            <p>Gli account USER seguono registrazione pubblica e verifica email; gli account OPERATOR derivano da un flusso di invito dedicato.</p>
            <p>Le autorizzazioni sono sempre verificate lato server. La visibilità della sidebar migliora l’esperienza, ma non sostituisce mai i guard API.</p>
            <p>Le eventuali integrazioni file, streaming ed email devono rispettare limiti di tipo, size e policy definite nel backend.</p>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
