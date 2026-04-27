import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/layout/public-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ActivityIcon,
  DownloadIcon,
  CheckIcon,
  ArrowRightIcon,
  CodeIcon,
  DatabaseIcon,
  GlobeIcon,
  LayersIcon,
  BookOpenIcon,
  RocketIcon,
  ShieldIcon,
  ServerIcon,
} from "@/components/ui/icons";
import { isFirstRunSetupRequired } from "@/server/service/bootstrap.service";

export const dynamic = "force-dynamic";

const techStack = [
  { name: "Next.js", icon: GlobeIcon, color: "bg-black" },
  { name: "TypeScript", icon: CodeIcon, color: "bg-blue-600" },
  { name: "MongoDB", icon: DatabaseIcon, color: "bg-green-600" },
  { name: "Vercel", icon: ServerIcon, color: "bg-black" },
];

const pillars = [
  {
    title: "Il Pensiero Strutturato",
    description:
      "Ogni sistema complesso richiede architetture chiare. Ready2Agent implementa una separazione netta: API Boundary Service Repository. Non è dogma. È pragmatismo ingegneristico.",
    icon: LayersIcon,
    accent: "azure",
    details: [
      { label: "API Boundary", sub: "Contratti espliciti" },
      { label: "Service", sub: "Business logic" },
      { label: "Repository", sub: "Accesso dati" },
    ],
  },
  {
    title: "La Governance Visibile",
    description:
      "I ruoli non sono classifiche. Sono deleghe concrete. SUPER ADMIN OPERATOR USER con permessi granulari e validazione server-side. La UI è una scorciatoia, la policy è server-side.",
    icon: ShieldIcon,
    accent: "violet",
    details: [
      { label: "SUPER", sub: "Autorità globale" },
      { label: "ADMIN", sub: "Governance delegata" },
      { label: "OPERATOR", sub: "Operatore scoped" },
    ],
  },
  {
    title: "Il Metodo Agent-Native",
    description:
      "Gli agenti AI non sono dipendenti: sono collaboratori con contesto. documentation/ contiene regole, workflow/ documenta ogni task, ogni cambiamento ha traccia.",
    icon: ActivityIcon,
    accent: "blue",
    details: [
      { label: "Contesto", sub: "Regole e vincoli" },
      { label: "Tracking", sub: "Task documentati" },
      { label: "Validazione", sub: "Cambiamenti tracciati" },
    ],
  },
];

const features = [
  { label: "Auth con sessioni JWT + rate limiting", included: true },
  { label: "Bootstrap flow per primo account SUPER", included: true },
  { label: "Dashboard privata con navigazione filtrata per ruolo", included: true },
  { label: "Gestione staff con permessi granulari", included: true },
  { label: "5 capability OPERATOR", included: true },
  { label: "API REST conforme con contratti espliciti", included: true },
];

const methodologies = [
  {
    mode: "Mode A",
    title: "Manutenzione Completa",
    description:
      "Revisione full del progetto: audit, allineamento, cleanup, report di consistenza.",
    when: "Review periodiche, before release",
  },
  {
    mode: "Mode B",
    title: "Cambiamenti Mirati",
    description:
      "Modifiche scoped che rispettano l'architettura esistente. Nessun shortcut silenzioso.",
    when: "Feature incremental, bug fix",
  },
  {
    mode: "Mode C",
    title: "Workflow Sequenziale",
    description:
      "Progressione task-by-task con dipendenze rigide. Un task alla volta, niente parallelismi.",
    when: "Nuove aree, refactor strutturali",
  },
];

const quickStart = [
  { step: "01", title: "Clone", command: "git clone https://github.com/Sh1nig4my/framework.ready2agent.git" },
  { step: "02", title: "Install", command: "npm install && npm run dev" },
  { step: "03", title: "Setup", command: "Vai su /setup per creare il primo account SUPER" },
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
            <p className="text-xs text-[var(--color-foreground-muted)]">
              AI-native Next.js framework
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#perche"
            className="text-sm font-medium text-[var(--color-foreground-muted)] transition-colors hover:text-[var(--color-foreground)]"
          >
            Perché
          </Link>
          <Link
            href="#metodologia"
            className="text-sm font-medium text-[var(--color-foreground-muted)] transition-colors hover:text-[var(--color-foreground)]"
          >
            Metodologia
          </Link>
          <Link
            href="#inizia"
            className="text-sm font-medium text-[var(--color-foreground-muted)] transition-colors hover:text-[var(--color-foreground)]"
          >
            Inizia
          </Link>
        </nav>
        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="secondary">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </div>
      </header>

      <main className="flex flex-col gap-24 pb-24">
        {/* HERO SECTION */}
        <section className="flex min-h-[70vh] flex-col justify-center lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-8">
            <Badge className="animate-fade-in-up">Plug-and-play + Agent methodology</Badge>
            <div className="space-y-6">
              <h1 className="animate-fade-in-up text-5xl font-bold leading-[1.05] text-[var(--color-foreground)] md:text-6xl lg:text-7xl tracking-tight" style={{ animationDelay: "100ms" }}>
                Il framework che <span className="bg-gradient-to-r from-[var(--color-blue)] via-[var(--color-azure)] to-[var(--color-violet)] bg-clip-text text-transparent">costruisce se stesso.</span>{" "}
                E tu impari a farlo.
              </h1>
              <p className="animate-fade-in-up max-w-2xl text-lg leading-relaxed text-[var(--color-foreground-muted)] md:text-xl" style={{ animationDelay: "200ms" }}>
                Ready2Agent non è solo un framework Next.js con auth, IAM e dashboard ready-to-use. È un{" "}
                <strong>caso studio pubblico</strong> di metodologia AI-native: ogni prompt è strutturato, ogni task tracciato, ogni decisione documentata.{" "}
                <Link href="#perche" className="text-[var(--color-primary)] underline underline-offset-4 hover:text-[var(--color-primary-strong)]">
                  Studia il processo
                </Link>
                , usalo per il tuo progetto, o contribuisci al movimento.
              </p>
            </div>
            <div className="animate-fade-in-up flex flex-wrap gap-4" style={{ animationDelay: "300ms" }}>
              <Link href="/setup">
                <Button size="lg" className="gap-2">
                  <RocketIcon size={18} />
                  Inizia il tuo progetto
                  <ArrowRightIcon size={18} />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="secondary">
                  Registrati come USER
                </Button>
              </Link>
              <a href="/ready2agent-manifesto.md" download="ready2agent-manifesto.md">
                <Button size="lg" variant="ghost" className="gap-2">
                  <DownloadIcon size={18} />
                  Scarica Manifesto
                </Button>
              </a>
            </div>
            <div className="animate-fade-in-up flex items-center gap-4 pt-4" style={{ animationDelay: "400ms" }}>
              <span className="text-sm text-[var(--color-foreground-muted)]">
                Powered by
              </span>
              <div className="flex gap-2">
                {techStack.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white/80 px-3 py-1.5 text-xs font-medium text-[var(--color-foreground)] backdrop-blur-sm"
                    >
                      <Icon size={14} />
                      {tech.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="surface-card mt-12 hidden p-8 lg:mt-0 lg:block lg:w-[480px]">
            <div className="grid grid-cols-3 gap-4">
              <div className="surface-panel flex flex-col items-center justify-center p-6 text-center">
                <p className="text-4xl font-bold text-[var(--color-primary-strong)]">4</p>
                <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">Ruoli</p>
              </div>
              <div className="surface-panel flex flex-col items-center justify-center p-6 text-center">
                <p className="text-4xl font-bold text-[var(--color-success)]">5</p>
                <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">Capability</p>
              </div>
              <div className="surface-panel flex flex-col items-center justify-center p-6 text-center">
                <p className="text-4xl font-bold text-[var(--color-warning-strong)]">7</p>
                <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">Fasi workflow</p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {features.slice(0, 4).map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-3 rounded-xl bg-[var(--color-surface-soft)] p-3"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-success-soft)] text-[var(--color-success)]">
                    <CheckIcon size={14} />
                  </div>
                  <span className="text-sm font-medium text-[var(--color-foreground)]">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTRO TEXT */}
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-xl leading-relaxed text-[var(--color-foreground-muted)] md:text-2xl">
            Ready2Agent è la risposta a una trasformazione concreta: gli agenti AI sono diventati partner di sviluppo reali, la metodologia conta quanto il codice, la documentazione non è un optional ma è infrastruttura.
          </p>
        </section>

        {/* THREE PILLARS */}
        <section className="space-y-8">
          <div className="text-center">
            <Badge className="border-2 border-[var(--color-foreground-muted)] bg-transparent text-[var(--color-foreground-muted)]">I Tre Pilastri</Badge>
            <h2 className="mt-4 text-3xl font-bold text-[var(--color-foreground)] md:text-4xl">
              La filosofia che guida ogni decisione
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card
                  key={pillar.title}
                  className={`theme-${pillar.accent} group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-card-enter`}
                >
                  <CardHeader className="space-y-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary-soft)] text-[var(--color-primary)] transition-transform group-hover:scale-110">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-foreground)]">
                      {pillar.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-relaxed text-[var(--color-foreground-muted)]">
                      {pillar.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pillar.details.map((detail) => (
                        <div
                          key={detail.label}
                          className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs font-medium text-[var(--color-foreground-muted)]"
                        >
                          {detail.label}
                          <span className="ml-1 text-[var(--color-foreground)]/60">
                            {detail.sub}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* PERCHÉ READY2AGENT */}
        <section id="perche" className="scroll-mt-20 space-y-12">
          <div className="text-center">
            <Badge className="border-2 border-[var(--color-foreground-muted)] bg-transparent text-[var(--color-foreground-muted)]">Perché Ready2Agent</Badge>
            <h2 className="mt-4 text-3xl font-bold text-[var(--color-foreground)] md:text-4xl">
              Plug-and-play. Caso studio. Stack accessibile.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-foreground-muted)]">
              Tre ragioni per scegliere Ready2Agent come punto di partenza.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* PLUG-AND-PLAY */}
            <Card className="theme-azure surface-card p-6 lg:p-8">
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-success-soft)] text-[var(--color-success)]">
                  <RocketIcon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-foreground)]">
                  Plug-and-Play
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-[var(--color-foreground-muted)]">
                  Parti in minuti, non in settimane. Ready2Agent include tutto ciò che serve per far decollare il tuo progetto.
                </p>
                <ul className="space-y-3">
                  {features.map((feature) => (
                    <li
                      key={feature.label}
                      className="flex items-start gap-3 text-sm"
                    >
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-success-soft)] text-[var(--color-success)]">
                        <CheckIcon size={12} />
                      </div>
                      <span className="text-[var(--color-foreground-muted)]">
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* CASO STUDIO */}
            <Card className="theme-administrators surface-card p-6 lg:p-8">
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-violet-soft)] text-[var(--color-violet)]">
                  <BookOpenIcon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-foreground)]">
                  Caso Studio Operativo
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-[var(--color-foreground-muted)]">
                  Ready2Agent è trasparenza metodologica. Se vuoi capire come lavorare con agenti AI in modo serio, studia questo progetto.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[var(--color-violet-soft)] p-4 text-center">
                    <p className="text-2xl font-bold text-[var(--color-violet-strong)]">
                      100+
                    </p>
                    <p className="text-xs text-[var(--color-violet)]">Prompt tracciati</p>
                  </div>
                  <div className="rounded-xl bg-[var(--color-violet-soft)] p-4 text-center">
                    <p className="text-2xl font-bold text-[var(--color-violet-strong)]">
                      50+
                    </p>
                    <p className="text-xs text-[var(--color-violet)]">Task documentati</p>
                  </div>
                  <div className="rounded-xl bg-[var(--color-violet-soft)] p-4 text-center">
                    <p className="text-2xl font-bold text-[var(--color-violet-strong)]">
                      7
                    </p>
                    <p className="text-xs text-[var(--color-violet)]">Fasi workflow</p>
                  </div>
                  <div className="rounded-xl bg-[var(--color-violet-soft)] p-4 text-center">
                    <p className="text-2xl font-bold text-[var(--color-violet-strong)]">
                      100%
                    </p>
                    <p className="text-xs text-[var(--color-violet)]">Tracciabilità</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* STACK ACCESSIBILE */}
            <Card className="theme-users surface-card p-6 lg:p-8">
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <LayersIcon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-foreground)]">
                  Stack Accessibile
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-[var(--color-foreground-muted)]">
                  Zero scuse per non iniziare. Tutto è accessibile e gratuito.
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Framework", value: "Next.js + TypeScript" },
                    { label: "Database", value: "MongoDB Atlas (free tier)" },
                    { label: "Hosting", value: "Vercel (free tier)" },
                    { label: "IDE (umano)", value: "WebStorm" },
                    { label: "IDE (agente)", value: "OpenCode" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-lg bg-[var(--color-surface-soft)] px-3 py-2 text-sm"
                    >
                      <span className="text-[var(--color-foreground-muted)]">
                        {item.label}
                      </span>
                      <span className="font-medium text-[var(--color-foreground)]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* LA METODOLOGIA IN PRATICA */}
        <section id="metodologia" className="scroll-mt-20 space-y-12">
          <div className="text-center">
            <Badge className="border-2 border-[var(--color-foreground-muted)] bg-transparent text-[var(--color-foreground-muted)]">La Metodologia in Pratica</Badge>
            <h2 className="mt-4 text-3xl font-bold text-[var(--color-foreground)] md:text-4xl">
              Tre modi di lavorare con gli agenti AI
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-foreground-muted)]">
              Scegli il mode più adatto al tuo contesto e al tuo livello di esperienza.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {methodologies.map((method, index) => (
              <Card
                key={method.mode}
                className={`group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  index === 1 ? "theme-administrators" : "theme-azure"
                }`}
              >
                <CardHeader className="space-y-2">
                  <Badge className="w-fit">{method.mode}</Badge>
                  <h3 className="text-xl font-bold text-[var(--color-foreground)]">
                    {method.title}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed text-[var(--color-foreground-muted)]">
                    {method.description}
                  </p>
                  <div className="rounded-xl bg-[var(--color-surface-soft)] p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-foreground-muted)]">
                      Quando usarlo
                    </p>
                    <p className="mt-1 text-sm font-medium text-[var(--color-foreground)]">
                      {method.when}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* INIZIA ORA */}
        <section id="inizia" className="scroll-mt-20">
          <Card className="theme-azure surface-card overflow-hidden">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <Badge className="border-2 border-[var(--color-foreground-muted)] bg-transparent text-[var(--color-foreground-muted)]">Inizia Ora</Badge>
                <h2 className="mt-4 text-3xl font-bold text-[var(--color-foreground)] md:text-4xl">
                  Pronto per il tuo primo progetto?
                </h2>
                <p className="mt-4 text-lg text-[var(--color-foreground-muted)]">
                  Ready2Agent è progettato per essere esteso, non bloccato. L&apos;architettura è pensata per evolvere con le tue esigenze.
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <Link href="/setup">
                    <Button size="lg" className="gap-2">
                      <RocketIcon size={18} />
                      Crea il tuo account SUPER
                      <ArrowRightIcon size={18} />
                    </Button>
                  </Link>
                  <a
                    href="https://github.com/Sh1nig4my/framework.ready2agent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" variant="secondary" className="gap-2">
                      <CodeIcon size={18} />
                      Visualizza su GitHub
                    </Button>
                  </a>
                </div>
              </div>
              <div className="surface-panel border-l border-t-0 border-[var(--color-border)] p-8 lg:p-12">
                <div className="space-y-6">
                  {quickStart.map((item) => (
                    <div
                      key={item.step}
                      className="flex items-start gap-4"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-sm font-bold text-[var(--color-primary-strong)]">
                        {item.step}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-[var(--color-foreground)]">
                          {item.title}
                        </p>
                        <code className="block rounded-lg bg-[var(--color-surface)] px-3 py-2 text-sm font-mono text-[var(--color-foreground-muted)]">
                          {item.command}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* FOOTER SECTION */}
        <section className="border-t border-[var(--color-border)] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <Image
                alt="Ready2Agent Logo"
                className="h-8 w-8"
                height={32}
                src="/ready2agent-logo-nobg.png"
                width={32}
              />
              <div>
                <p className="text-sm font-bold text-[var(--color-foreground)]">
                  Ready2Agent
                </p>
                <p className="text-xs text-[var(--color-foreground-muted)]">
                  v2026 alfa — Il framework che costruisce se stesso
                </p>
                <p className="text-[10px] text-[var(--color-foreground-muted)]">
                  Versione in alfa test. Potrebbe subire modifiche.
                </p>
              </div>
            </div>
            <nav className="flex items-center gap-6 text-sm">
              <Link
                href="/login"
                className="text-[var(--color-foreground-muted)] transition-colors hover:text-[var(--color-foreground)]"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-[var(--color-foreground-muted)] transition-colors hover:text-[var(--color-foreground)]"
              >
                Register
              </Link>
              <Link
                href="/terms"
                className="text-[var(--color-foreground-muted)] transition-colors hover:text-[var(--color-foreground)]"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-[var(--color-foreground-muted)] transition-colors hover:text-[var(--color-foreground)]"
              >
                Privacy
              </Link>
            </nav>
          </div>
          <p className="mt-8 text-center text-sm text-[var(--color-foreground-muted)]">
            Il software complesso non si costruisce con grandi visioni. Si costruisce con{" "}
            <strong>piccoli passi decisi, documentati e validati</strong>. Ready2Agent è la prova che questa filosofia funziona.
          </p>
        </section>
      </main>
    </PublicShell>
  );
}
