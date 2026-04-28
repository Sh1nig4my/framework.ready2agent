# Agent Start Here

## Metadata

- Ultimo aggiornamento: 2026-04-29
- Pubblico: coding agent
- Status: attivo

## Read Order Obbligatorio

1. `README.md`
2. `documentation/README.md`
3. `documentation/operational/README.md`
4. `documentation/operational/spec/README.md`
5. `documentation/operational/alignment/README.md`
6. `documentation/operational/execution/README.md`
7. `workflow/README.md`
8. `workflow/<FLOW_NAME>/README.md` (se il flow esiste) oppure `workflow/maintenance-workflow/README.md` (se devi iniziare un nuovo flow)
9. `workflow/requirements/README.md`
10. `workflow/ready2agent_daily_execution_tracker.md`
11. `prompts/README.md`

## Contesto Esteso (Opzionale)

Leggi `documentation/R2A_full-ai-context.md` solo quando serve un contesto completo per analisi estese o passaggio verso altre chat LLM.

## Prompt da Usare

- riallineamento globale: `prompts/maintenance-global-realignment.md`
- implementazione standard: `prompts/standard-implementation-start.md`

## Regole Non Negoziabili

- codice applicativo dentro `src/`
- pattern Controller/Service/Repository rispettato
- un task alla volta se si segue workflow sequenziale
- docs aggiornate nello stesso change set del codice
- validazione finale: `npm run lint`, `npm test`, `npm run build`
