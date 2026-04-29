# Prompts Hub

## Metadata

- Last Updated: 2026-04-29
- Scope: prompt operativi ufficiali per sviluppo, maintenance, workflow generation, tema UI ed extensions

## Filosofia

La cartella `prompts/` e l'entrypoint unico per avviare il lavoro agentico nel repository.

Obiettivi:

- standardizzare l'avvio delle modifiche;
- ridurre drift tra codice, documentazione, workflow e governance;
- fornire prompt specializzati per casi operativi diversi.

## Prompt Disponibili

| File | Cosa fa | Quando usarlo |
|------|---------|---------------|
| `standard-implementation-start.md` | Avvio standard per implementazioni mirate con regole e checklist | Nuove feature, bugfix, refactor circoscritti |
| `maintenance-global-realignment.md` | Audit completo repository con riallineamento strutturale/documentale | Dopo refactor estesi, prima di release, quando il repo ha accumulato drift |
| `unplanned-change-start.md` | Gestione modifica non pianificata/non schedulata nei flow di `workflow/` | Hotfix o richieste urgenti fuori backlog workflow |
| `theme-system-design-start.md` | Studio grafico approfondito e proposta tema con modifica in `src/config/r2a-theme.ts` | Rebranding, allineamento palette aziendale, redesign cromatico controllato |
| `extension-generation-start.md` | Traduzione di una richiesta tecnica in extension concreta dentro `extensions/` | Quando uno sviluppatore vuole creare una nuova extension dev-side |
| `maintenance-workflow/prompt-01-generate-integration-chapters.md` | Genera/aggiorna capitoli macro di un flow senza task | Inizio nuovo flow da `workflow/requirements/<branch>/` |
| `maintenance-workflow/prompt-02-generate-integration-tasks.md` | Genera task eseguibili per capitolo in un flow esistente | Dopo conferma capitoli del flow |

## Nota su `maintenance-workflow/`

I prompt in `prompts/maintenance-workflow/` hanno un comportamento diverso dai prompt implementativi standard:

- non implementano codice applicativo;
- generano artefatti di flusso in `workflow/<FLOW_NAME>/`;
- operano su capitoli/task/tracker per orchestrare l'esecuzione futura.

## Scelta Rapida Prompt

| Scenario | Prompt consigliato | Output atteso |
|----------|--------------------|---------------|
| Modifica funzionale specifica | `standard-implementation-start.md` | Implementazione + validazione + docs aggiornate |
| Refactor ampio e rischio link rotti | `maintenance-global-realignment.md` | Report allineamento + fix completi |
| Cambio urgente non schedulato in workflow | `unplanned-change-start.md` | Modifica rapida controllata + tracciamento decisionale |
| Revisione tema cromatico professionale | `theme-system-design-start.md` | Studio palette + aggiornamento `src/config/r2a-theme.ts` + docs |
| Nuova extension tecnica | `extension-generation-start.md` | Scaffold extension + registry + documentazione extension |
| Creazione struttura flow da requirements | `maintenance-workflow/prompt-01-generate-integration-chapters.md` | Capitoli + status + tracker flow |
| Generazione task per flow | `maintenance-workflow/prompt-02-generate-integration-tasks.md` | Task atomici + tracker aggiornati |

## Ordine di Lettura Operativo (Agente)

1. `README.md`
2. `documentation/quickstart/agent_start_here.md`
3. `documentation/README.md`
4. `documentation/core/README.md`
5. `documentation/method/README.md`
6. `workflow/README.md`
7. `prompts/README.md`
8. file prompt scelto in `prompts/`

Nota: `documentation/R2A_full-ai-context.md` resta contesto esteso per analisi complesse e handoff LLM esterni.

## Sezione Copia e Incolla (Universale)

Sostituisci `{{PROMPT_FILE}}` con il prompt che vuoi usare.

```text
Prima di modificare qualsiasi file, leggi in ordine:
1) README.md
2) documentation/quickstart/agent_start_here.md
3) documentation/README.md
4) documentation/core/README.md
5) documentation/method/README.md
6) workflow/README.md
7) prompts/README.md
8) prompts/{{PROMPT_FILE}}

Esegui poi il lavoro richiesto rispettando:
- struttura standard con codice applicativo dentro src/
- aggiornamento contestuale di documentazione e link interni
- validazione finale (lint, test, build)
- report sintetico con file toccati, motivazione e verifiche effettuate
```
