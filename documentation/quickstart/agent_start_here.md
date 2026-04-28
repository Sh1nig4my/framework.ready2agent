# Agent Start Here

## Metadata

- Ultimo aggiornamento: 2026-04-28
- Pubblico: coding agent
- Status: attivo

## Read Order Obbligatorio

1. `README.md`
2. `documentation/README.md`
3. `documentation/core/README.md`
4. `documentation/method/README.md`
5. `workflow/README.md`
6. `prompts/README.md`
7. prompt specifico da usare

## Contesto Esteso (Opzionale)

Leggi `documentation/R2A_full-ai-context.md` quando serve contesto completo per analisi estese o handoff verso altre chat LLM.

## Prompt da Usare

- riallineamento globale: `prompts/maintenance-global-realignment.md`
- implementazione standard: `prompts/standard-implementation-start.md`

## Guida Rapida per Scope

- `documentation/core/` serve per capire cosa non rompere nel runtime.
- `documentation/method/` serve per capire come lavorare nel repository.
- `workflow/` contiene le istanze operative concrete.
- `prompts/` contiene l'interfaccia operativa per agenti.
- `extensions/` va letto solo se il task riguarda plugin opzionali.

## Regole Non Negoziabili

- codice applicativo dentro `src/`
- pattern Controller/Service/Repository rispettato
- un task alla volta se si segue workflow sequenziale
- docs aggiornate nello stesso change set del codice
- validazione finale: `npm run lint`, `npm test`, `npm run build`
