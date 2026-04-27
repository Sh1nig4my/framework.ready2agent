# Prompts Hub

## Metadata

- Last Updated: 2026-04-27
- Scope: prompt operativi ufficiali per sviluppo e maintenance

## Filosofia

La cartella `prompts/` e il punto unico per i prompt operativi del progetto.

Obiettivi:

- standardizzare l'avvio delle modifiche;
- ridurre drift tra codice, documentazione e workflow;
- mantenere una procedura operativa breve e ripetibile.

## File Disponibili

| File | Cosa fa | Quando usarlo |
|------|---------|---------------|
| `maintenance-global-realignment.md` | Audit completo repository: sicurezza, route, test, riallineamento documentale/applicativo | Dopo refactor estesi, prima di release, quando il repo ha accumulato molti cambi |
| `standard-implementation-start.md` | Avvio standard per implementazioni mirate con regole e checklist | Nuove feature, bugfix, refactor circoscritti |

## Tabella Comparativa Rapida

| Scenario | Prompt consigliato | Output atteso |
|----------|--------------------|---------------|
| Molti rename/spostamenti e rischio link rotti | `maintenance-global-realignment.md` | Report di allineamento + fix completi |
| Modifica funzionale specifica | `standard-implementation-start.md` | Implementazione + validazione + docs aggiornate |
| Onboarding rapido su prompt disponibili | `README.md` (questo file) | Scelta del prompt corretto |

## Ordine di Lettura Operativo (Agente)

Lettura minima consigliata per avviare modifiche, senza caricare contesto eccessivo.

1. `README.md`
2. `documentation/quickstart/agent_start_here.md`
3. `documentation/operational/README.md`
4. `documentation/operational/spec/README.md`
5. `documentation/operational/alignment/README.md`
6. `documentation/operational/execution/README.md`
7. `workflow/README.md`
8. file prompt scelto in `prompts/`

Nota: `documentation/R2A_full-ai-context.md` resta un contesto completo per analisi estese/chat LLM esterne, non e richiesto in ogni avvio operativo.

## Sezione Copia e Incolla (Universale)

Sostituisci `{{PROMPT_FILE}}` con il prompt che vuoi usare.

```text
Prima di modificare qualsiasi file, leggi in ordine:
1) README.md
2) documentation/quickstart/agent_start_here.md
3) documentation/operational/README.md
4) documentation/operational/spec/README.md
5) documentation/operational/alignment/README.md
6) documentation/operational/execution/README.md
7) workflow/README.md
8) prompts/{{PROMPT_FILE}}

Esegui poi il lavoro richiesto rispettando:
- struttura standard con codice applicativo dentro src/
- aggiornamento contestuale di documentazione e link interni
- validazione finale (lint, test, build)
- report sintetico con file toccati, motivazione e verifiche effettuate
```

## Avvio Generico

Se non e chiaro quale prompt usare:

1. parti da `standard-implementation-start.md`;
2. se emerge drift strutturale o documentale ampio, passa a `maintenance-global-realignment.md`.
