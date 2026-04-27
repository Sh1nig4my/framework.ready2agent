# Documentation - Hub Documentale

## Metadata

- Ultimo aggiornamento: 2026-04-27
- Pubblico: agenti di coding e manutentori
- Status: attivo

## Scopo

`documentation/` (cartella Documentation) contiene tutta la documentazione ufficiale del progetto.

## Struttura

- `documentation/project-docs/` -> documentazione progetto orientata agli umani
- `documentation/operational/` -> vincoli e regole operative per agenti
- `documentation/project-meta/` -> governance, naming policy, decisioni
- `documentation/quickstart/` -> onboarding rapido
- `documentation/reviews/` -> report di manutenzione
- `documentation/R2A_full-ai-context.md` -> contesto narrativo completo

## Ordine di Lettura Consigliato

Per agenti:

1. `README.md`
2. `documentation/quickstart/agent_start_here.md`
3. `documentation/README.md`
4. `documentation/operational/README.md`
5. `documentation/operational/spec/README.md`
6. `documentation/operational/alignment/README.md`
7. `documentation/operational/execution/README.md`
8. `workflow/README.md`
9. `prompts/README.md`

Per contributor umani:

1. `README.md`
2. `documentation/quickstart/human_start_here.md`
3. `documentation/project-docs/README.md`

Uso di `documentation/R2A_full-ai-context.md`:

- file di contesto completo per analisi estese e chat LLM esterne;
- non e obbligatorio per ogni avvio operativo dell'agente.

## Source of Truth Hierarchy

1. Comportamento runtime nel codice (`src/`)
2. Vincoli e architettura in `documentation/operational/spec/`
3. Esecuzione operativa in `workflow/R2A-integration/`
4. Decision log in `documentation/project-meta/decision_log.md`
