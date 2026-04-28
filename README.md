# Ready2Agent (R2A)

<p align="center">
  <img src="public/ready2agent-logo-nobg.png" alt="Ready2Agent Logo" width="120" />
</p>

## Metadati

- Ultimo aggiornamento: 2026-04-28
- Stato: Pronto per la produzione

Ready2Agent e un framework AI-native con tassonomia ufficiale:

`R2A = Core + Method + Extensions`

Questo `README.md` e il primo file da leggere sempre.

## Quick Start

```bash
git clone https://github.com/Sh1nig4my/framework.ready2agent.git
cd ready2agent
npm install
cp .env.example .env.local
npm run dev
```

Su database vuoto vai su `/setup` per creare il primo account `SUPER`.

## Tassonomia Ufficiale

1. **R2A Core**
   Runtime applicativo stabile e plug-and-play (`src/`, auth/session, ruoli, API, policy server-side, MongoDB/Mongoose).

2. **R2A Method**
   Metodo agent-native per evoluzione software tracciabile (documentazione metodologica, workflow, prompt, tracker, execution/alignment model).

3. **R2A Extensions**
   Ecosistema opzionale futuro per plugin separati dal Core (`extensions/`), senza dipendenze runtime attive in questa fase.

## Struttura Repository

La struttura standard del repository e:

```text
ready2agent/
├── src/                # Tutto il codice applicativo
│   ├── app/            # Frontend + route API (App Router)
│   ├── components/     # Componenti UI
│   ├── server/         # Backend runtime
│   ├── shared/         # Contratti condivisi
│   ├── tests/          # Test applicativi
│   └── scripts/        # Script di avvio/utilita
├── documentation/      # Documentazione Core + Method + Governance
├── workflow/           # Istanze operative concrete del Method
│   └── requirements/   # Requisiti iniziali (input workflow)
├── prompts/            # Interfaccia operativa prompt per agenti
├── extensions/         # Ecosistema opzionale futuro (template plugin)
└── public/             # Asset statici
```

## Pattern Architetturale

Controller (`src/app/api/*`) -> Service (`src/server/service/*`) -> Repository (`src/server/repository/*`) -> MongoDB.

## Configurazione Tema UI (Core)

Ready2Agent espone una configurazione tema minima e statica in `src/config/r2a-theme.ts`.

- scope: token colore superficiali (`brand`, `surface`, `text`, `state`)
- obiettivo: personalizzazione rapida dei colori senza toccare layout o logica
- limiti: non e un sistema plugin, non salva su DB, non supporta tema per utente/ruolo

Le variabili CSS globali in `src/app/globals.css` leggono questi token.

## Ordine di Lettura

Ordine consigliato prima di qualunque modifica:

1. `README.md`
2. `documentation/quickstart/agent_start_here.md`
3. `documentation/README.md`
4. `documentation/core/README.md`
5. `documentation/method/README.md`
6. `workflow/README.md`
7. `prompts/README.md`
8. prompt specifico da usare

Contesto esteso per analisi complete:

- `documentation/R2A_full-ai-context.md`

## Differenze tra le aree

- `documentation/core/` -> cosa non rompere nel runtime Core
- `documentation/method/` -> come lavorare nel repository con metodo agent-native
- `workflow/` -> istanze operative concrete del metodo
- `prompts/` -> interfaccia operativa per avviare lavoro agentico
- `extensions/` -> area opzionale futura per plugin separati dal Core

## Percorsi di apprendimento

- Percorso agenti: `documentation/quickstart/agent_start_here.md` -> `documentation/core/` -> `documentation/method/` -> `workflow/` -> `prompts/`
- Percorso umano tecnico: `documentation/quickstart/human_start_here.md` -> `documentation/core/` -> `documentation/method/` -> `workflow/README.md`
- Spec didattica viva del Core: `workflow/requirements/r2a-core/`

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
