import { PublicShell } from "@/components/layout/public-shell";

export default function PrivacyPage() {
  return (
    <PublicShell>
      <div className="page-shell py-12">
        <div className="surface-card p-8 md:p-10">
          <h1 className="page-heading">Privacy Policy</h1>
          <div className="mt-6 space-y-5 text-sm leading-7 text-[var(--color-foreground-muted)]">
            <p>Ready2Agent tratta i dati di accesso, profilo e attivita applicative per erogare l&apos;esperienza di formazione e backoffice.</p>
            <p>I dati sensibili non vengono mai inseriti in audit o log applicativi. Password, token raw e cookie restano esclusi per design.</p>
            <p>Le raccolte principali includono User, AuthToken, AuthRateLimit, AuditLog e SupportMessage.</p>
            <p>In ambiente demo le integrazioni esterne possono essere emulate; il runtime basepack resta focalizzato su MongoDB Atlas.</p>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
