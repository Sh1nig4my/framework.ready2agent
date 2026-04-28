# Daily Execution Tracker Template

## Scopo

Template agnostico per tracker locale di un singolo flusso `workflow/<FLOW_NAME>/`.

Non usare questo file come tracker runtime globale del repository.

Uso corretto: copia questo template in `workflow/<FLOW_NAME>/flow-execution-tracker.md` e personalizzalo per il flusso.

## Identita flusso

- Flow name: `<FLOW_NAME>`
- Requirements branch: `workflow/requirements/<branch>/`
- Stato flusso: `not-started | in-progress | blocked | completed`

## Stato corrente

- Ultimo task completato: `<task-id o none>`
- Prossimo task: `<task-id o none>`
- Capitolo attivo: `<chapter-id>`
- Blocker: `<none o descrizione>`

## Capitoli

| Capitolo | Stato | Avanzamento |
|---|---|---|
| `01-...` | not-started | 0% |

## Log giornaliero

### YYYY-MM-DD

- Attivita completate:
- File toccati:
- Validazioni: lint/test/build
- Note:

## Regole di aggiornamento

Aggiorna dopo ogni task:

1. file task (`task-*.md`)
2. `status.md` del capitolo
3. tracker locale del flusso (`workflow/<FLOW_NAME>/flow-execution-tracker.md`)
4. tracker globale (`workflow/<project-name>_daily_execution_tracker.md`)

Nota per questo repository: `workflow/ready2agent_daily_execution_tracker.md`.
