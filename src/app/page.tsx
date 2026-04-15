import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/layout/public-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ActivityIcon, DashboardIcon, DownloadIcon, OperatorsIcon, UsersIcon } from "@/components/ui/icons";
import { isFirstRunSetupRequired } from "@/server/service/bootstrap.service";

export const dynamic = "force-dynamic";

const highlights = [
  {
    title: "Framework plug-and-play",
    description: "Autenticazione, IAM, gestione staff e dashboard privata ready-to-use senza costruire da zero.",
    icon: UsersIcon,
  },
  {
    title: "Governance ruoli",
    description: "Modello SUPER > ADMIN > OPERATOR > USER con permessi granulari e validazione server-side.",
    icon: OperatorsIcon,
  },
  {
    title: "Metodologia caso studio",
    description: "Workflow task-by-task, prompt strutturati e tracking operativo per sviluppo assistito da agenti.",
    icon: ActivityIcon,
  },
  {
    title: "Architettura pulita",
    description: "API boundary, service e repository separati con contratti espliciti e confini rispettati.",
    icon: DashboardIcon,
  },
];

export default async function HomePage() {
  if (await isFirstRunSetupRequired()) {
    redirect("/setup" as never);
  }

  return (
    <PublicShell>
      <header className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Image
            alt="Ready2Agent Logo"
            className="h-12 w-12"
            height={48}
            src="/ready2agent-logo-nobg.png"
            width={48}
          />
          <div>
            <p className="font-bold text-[var(--color-primary-strong)]">Ready2Agent</p>
            <p className="text-xs text-[var(--color-foreground-muted)]">AI-native Next.js framework</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="secondary">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </div>
      </header>

      <main className="grid flex-1 gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <section className="space-y-6">
          <Badge>Plug-and-play + Agent methodology</Badge>
          <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] text-[var(--color-foreground)] md:text-6xl">
              Il framework che costruisce se stesso.
              </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--color-foreground-muted)]">
              Ready2Agent e un framework Next.js che funziona out-of-the-box con auth, IAM e dashboard,
              ma anche un caso studio pubblico di metodologia AI-native: prompt strutturati, workflow tracciato e decisioni documentate.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/login">
              <Button size="lg">Accedi alla dashboard</Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="secondary">
                Registrati come USER
              </Button>
            </Link>
            <a href="/ready2agent-manifesto.md" download="ready2agent-manifesto.md">
              <Button size="lg" variant="ghost">
                <DownloadIcon size={18} />
                Scarica Manifesto
              </Button>
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="surface-panel p-4">
              <p className="text-3xl font-bold text-[var(--color-primary-strong)]">4</p>
              <p className="text-sm text-[var(--color-foreground-muted)]">Ruoli supportati</p>
            </div>
            <div className="surface-panel p-4">
              <p className="text-3xl font-bold text-[var(--color-success)]">5</p>
              <p className="text-sm text-[var(--color-foreground-muted)]">Aree capability OPERATOR</p>
            </div>
            <div className="surface-panel p-4">
              <p className="text-3xl font-bold text-[var(--color-warning-strong)]">1</p>
              <p className="text-sm text-[var(--color-foreground-muted)]">Workflow operativo ufficiale</p>
            </div>
          </div>
        </section>

        <section className="surface-card grid gap-4 p-5">
          {highlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <article className="surface-panel flex items-start gap-4 p-5" key={highlight.title}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <Icon size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--color-foreground)]">{highlight.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-foreground-muted)]">
                    {highlight.description}
                  </p>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </PublicShell>
  );
}
