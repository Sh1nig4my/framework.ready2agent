import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ActivityIcon,
  DashboardIcon,
  DocumentIcon,
  DownloadIcon,
  OperatorsIcon,
  SettingsIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { getVisibleNavigation } from "@/shared/navigation/config";
import { requireSessionActor } from "@/server/lib/auth/session";

const architecturePillars = [
  {
    id: "boundary",
    title: "Controller / Service / Repository",
    description:
      "Le route REST restano nel boundary API, la logica di business vive nei service e l'accesso dati e confinato nei repository.",
    icon: DashboardIcon,
  },
  {
    id: "identity",
    title: "Governance a piramide",
    description:
      "Il modello SUPER > ADMIN > OPERATOR > USER applica deleghe progressive e scope espliciti, senza affidarsi alla sola UI.",
    icon: UsersIcon,
  },
  {
    id: "permissions",
    title: "Capability model verificabile",
    description:
      "I permessi OPERATOR sono granulari per resource/action e vengono validati sempre lato server, anche in accesso URL diretto.",
    icon: OperatorsIcon,
  },
  {
    id: "workflow",
    title: "Metodo agent-native",
    description:
      "La documentazione e divisa tra contesto strutturale (agent-workspace) e caso studio operativo (workflow/R2A-integration).",
    icon: ActivityIcon,
  },
] as const;

const usageTracks = [
  {
    title: "Plug-and-play",
    description:
      "Usa Ready2Agent come base applicativa: autenticazione, gestione utenti/staff, permessi granulari e dashboard privata ready-to-use.",
  },
  {
    title: "Caso studio",
    description:
      "Usa Ready2Agent come riferimento metodologico: prompt strutturati, task sequenziali, tracking operativo e validazione visibile.",
  },
] as const;

export default async function DashboardHomePage() {
  const actor = await requireSessionActor();
  const availableNavigation = getVisibleNavigation(actor).filter((item) => item.href !== "/dashboard");

  return (
    <div className="page-shell">
      <PageHeader
        subtitle="Landing tecnica ufficiale di Ready2Agent: framework plug-and-play + caso studio di metodologia AI-native."
        title="Ready2Agent / Dashboard"
      />

      <Card>
        <CardHeader>
          <CardTitle>Che cos&apos;e Ready2Agent</CardTitle>
          <CardDescription>
            Framework Next.js con doppia natura: (1) base applicativa plug-and-play per autenticazione, IAM e gestione staff;
            (2) caso studio pubblico di metodologia AI-native per sviluppo assistito da coding agent.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          <div className="surface-panel p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-foreground-muted)]">Profilo attivo</p>
            <p className="mt-2 text-lg font-bold text-[var(--color-foreground)]">{actor.name}</p>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-primary-strong)]">{actor.role}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-foreground-muted)]">
              L&apos;accesso effettivo viene deciso da ruolo + permessi server-side. La sidebar e solo una proiezione della policy reale.
            </p>
          </div>
          <div className="surface-panel p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-foreground-muted)]">Stack consigliato (free/open-source)</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-foreground-muted)]">
              Next.js + TypeScript, MongoDB Atlas, Vercel, GitHub con strategia fork-first.
              Per il lavoro quotidiano: WebStorm come IDE principale e OpenCode come IDE/CLI agent-native.
            </p>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-5 lg:grid-cols-2">
        {architecturePillars.map((pillar) => {
          const Icon = pillar.icon;

          return (
            <Card key={pillar.id}>
              <CardContent className="space-y-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-primary-soft)]">
                  <Icon className="text-[var(--color-primary)]" size={20} />
                </div>
                <h2 className="text-xl font-bold text-[var(--color-foreground)]">{pillar.title}</h2>
                <p className="text-sm leading-7 text-[var(--color-foreground-muted)]">{pillar.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {usageTracks.map((track) => (
          <Card key={track.title}>
            <CardHeader>
              <CardTitle>{track.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-[var(--color-foreground-muted)]">{track.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Ordine di lettura operativo</CardTitle>
          <CardDescription>
            `README.md` e l&apos;entrypoint. Da li si passa a `R2A_full-ai-context.md`, poi alla knowledge base in `agent-workspace/` e al caso studio in `workflow/R2A-integration/`.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          <div className="surface-panel p-5">
            <div className="mb-3 flex items-center gap-2">
              <DocumentIcon className="text-[var(--color-primary)]" size={18} />
              <p className="text-sm font-semibold text-[var(--color-foreground)]">Contesto per agenti</p>
            </div>
            <p className="text-sm leading-7 text-[var(--color-foreground-muted)]">
              `agent-workspace/` contiene regole, vincoli, decisioni, setup, copy e linee guida per sviluppo coerente anche tra team e agenti diversi.
            </p>
          </div>
          <div className="surface-panel p-5">
            <div className="mb-3 flex items-center gap-2">
              <SettingsIcon className="text-[var(--color-primary)]" size={18} />
              <p className="text-sm font-semibold text-[var(--color-foreground)]">Metodologia replicabile</p>
            </div>
            <p className="text-sm leading-7 text-[var(--color-foreground-muted)]">
              `workflow/R2A-integration/` mostra la traccia task-by-task per lavorare in modo verificabile, auditabile e riusabile in altri progetti.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manifesto Ready2Agent</CardTitle>
          <CardDescription>
            La filosofia, la metodologia e i principi che guidano il framework e il lavoro con agenti AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <a href="/ready2agent-manifesto.md" download="ready2agent-manifesto.md">
            <Button variant="secondary">
              <DownloadIcon size={18} />
              Scarica il Manifesto (.md)
            </Button>
          </a>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Moduli disponibili per il tuo profilo</CardTitle>
          <CardDescription>La disponibilita sotto riflette la policy runtime effettiva.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {availableNavigation.length ? (
            availableNavigation.map((item) => (
              <Link className="surface-panel p-4 transition hover:-translate-y-0.5" href={item.href} key={item.href}>
                <p className="font-semibold text-[var(--color-foreground)]">{item.label}</p>
                <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">Apri il modulo con i vincoli del tuo ruolo.</p>
              </Link>
            ))
          ) : (
            <p className="text-sm text-[var(--color-foreground-muted)]">Nessun modulo aggiuntivo disponibile oltre all&apos;overview.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
