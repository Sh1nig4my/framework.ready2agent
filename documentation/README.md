# Documentation - Hub Documentale

## Metadata

- Ultimo aggiornamento: 2026-04-28
- Pubblico: agenti di coding e manutentori
- Status: attivo

## Scopo

`documentation/` contiene la documentazione ufficiale di Ready2Agent, organizzata secondo la tassonomia:

`R2A = Core + Method + Extensions`

## Struttura

- `documentation/core/` -> regole e specifiche del Core runtime
- `documentation/method/` -> regole e metodo agent-native
- `documentation/project-meta/` -> governance, naming policy, decisioni
- `documentation/quickstart/` -> onboarding rapido
- `documentation/reviews/` -> report di manutenzione
- `documentation/R2A_full-ai-context.md` -> contesto narrativo completo

## Ordine di Lettura Consigliato

Per agenti:

1. `README.md`
2. `documentation/quickstart/agent_start_here.md`
3. `documentation/README.md`
4. `documentation/core/README.md`
5. `documentation/method/README.md`
6. `workflow/README.md`
7. `prompts/README.md`

Per contributor umani:

1. `README.md`
2. `documentation/quickstart/human_start_here.md`
3. `documentation/core/README.md`
4. `documentation/method/README.md`

Uso di `documentation/R2A_full-ai-context.md`:

- file di contesto completo per analisi estese e chat LLM esterne;
- non e obbligatorio per ogni avvio operativo dell'agente.

## Source of Truth Hierarchy

1. Comportamento runtime nel codice (`src/`)
2. Vincoli Core in `documentation/core/`
3. Vincoli Method in `documentation/method/`
4. Istanze esecutive in `workflow/`
5. Decisioni di governance in `documentation/project-meta/decision_log.md`
