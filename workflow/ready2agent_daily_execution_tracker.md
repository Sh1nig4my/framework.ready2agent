# ready2agent Daily Execution Tracker

## Metadata

- Last Updated: 2026-04-28
- Scope: global tracker multi-flow

## Scopo

Tracker operativo globale dei flussi attivi sotto `workflow/`.

Ogni flusso deve avere anche il suo tracker locale in:

- `workflow/<FLOW_NAME>/flow-execution-tracker.md`

Naming convention:

- file globale: `workflow/<project-name>_daily_execution_tracker.md`
- in questo repository: `workflow/ready2agent_daily_execution_tracker.md`

## Stato globale

- Data: 2026-04-28
- Owner: OpenCode
- Modalita: maintenance + execution
- Flussi aperti: 0
- Flussi completati: 1
- Blocker globali: none

## Registro flussi

| Flow | Requirements Branch | Stato | Ultimo Task | Prossimo Task |
|---|---|---|---|---|
| `workflow/R2A-integration/` | `workflow/requirements/r2a-core/` | completed | PHASE-7-03 | none |
| `planned:R2A-enterprise-integration` | `workflow/requirements/r2a-enterprise-userdetail/` | not-started | none | creare flusso con prompt-01 |

## Regole d'uso

- aggiornare questo file ogni giorno di lavoro;
- mantenere allineato stato tra tracker globale e tracker locale del flusso;
- un solo task `in_progress` per flusso;
- non avanzare di capitolo senza validazioni richieste.

## Log giornaliero

### 2026-04-28

- Rifattorizzato workflow in modello multi-flusso.
- `maintenance-workflow` reso agnostico.
- requirements migrati in sottocartelle per branch.
- rimosso pre-workflow specifico enterprise generato in anticipo.

## Check aggiornamento per task completato

1. Aggiorna `workflow/<FLOW_NAME>/<chapter>/task-*.md`
2. Aggiorna `workflow/<FLOW_NAME>/<chapter>/status.md`
3. Aggiorna `workflow/<FLOW_NAME>/flow-execution-tracker.md`
4. Aggiorna questo file (`workflow/ready2agent_daily_execution_tracker.md`)
