# Ready2Agent (R2A)

<p align="center">
  <img src="public/ready2agent-logo-nobg.png" alt="Ready2Agent Logo" width="120" />
</p>

## Metadati

- Ultimo aggiornamento: 2026-04-27
- Stato: Pronto per la produzione

Ready2Agent è un framework AI-native costruito con Next.js + TypeScript con due livelli di lettura complementari: livello divulgativo sul metodo e livello implementativo plug-and-play.

Questo `README.md` e il primo file da leggere sempre, sia per agenti sia per esseri umani.

## Quick Start

```bash
git clone https://github.com/Sh1nig4my/framework.ready2agent.git
cd ready2agent
npm install
cp .env.example .env.local
npm run dev
```

Su database vuoto vai su `/setup` per creare il primo account `SUPER`.

## Struttura Standard

La struttura de facto del repository e:

```text
ready2agent/
├── src/                # Tutto il codice applicativo
│   ├── app/            # Frontend + route API (App Router)
│   ├── components/     # Componenti UI
│   ├── server/         # Backend runtime
│   ├── shared/         # Contratti condivisi
│   ├── tests/          # Test applicativi
│   └── scripts/        # Script di avvio/utilita
├── documentation/      # Documentazione completa progetto (Documentation)
├── workflow/           # Workflow operativo e caso studio
│   └── requirements/   # Requisiti iniziali (input workflow)
├── prompts/            # Prompt operativi per agenti
└── public/             # Asset statici
```

## Pattern Architetturale

Controller (`src/app/api/*`) -> Service (`src/server/service/*`) -> Repository (`src/server/repository/*`) -> MongoDB.

## Due Livelli di Lettura

1. Divulgativo/metodologico: mostra il metodo di lavoro agent-assisted, il workflow e la tracciabilita.
2. Implementativo/plug-and-play: fornisce una base applicativa pronta da usare e adattare nei progetti personali.

## Documentazione e Prompt

Ordine di lettura consigliato prima di qualunque modifica:

1. `README.md`
2. `documentation/quickstart/agent_start_here.md` (agenti) o `documentation/quickstart/human_start_here.md` (umani)
3. `documentation/README.md`
4. `workflow/README.md`
5. `prompts/README.md`

Entry point onboarding rapido:

- `documentation/quickstart/`

Contesto completo per analisi estese/chat LLM esterne:

- `documentation/R2A_full-ai-context.md`

## Validazione

```bash
npm run lint
npm test
npm run build
```

## Note di Governance

- Nessuna credenziale reale nei file `.env*`
- Codice e documentazione vanno aggiornati nello stesso ciclo
- Ogni refactor di path deve includere riallineamento link interni

## Link

- GitHub: https://github.com/Sh1nig4my/framework.ready2agent
- Licenza: `LICENSE.md`
- Deploy: `DEPLOY.md`
