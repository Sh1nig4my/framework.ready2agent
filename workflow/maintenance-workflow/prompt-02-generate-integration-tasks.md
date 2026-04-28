# Prompt 02 - Generate Integration Tasks

## Scopo

Generare task dettagliati per ogni capitolo di un flusso in `workflow/<FLOW_NAME>/`, in formato eseguibile da agenti futuri.

## Istruzioni operative per l'agente

1. Leggi integralmente:
   - `README.md`
   - `documentation/`
   - `workflow/requirements/<branch>/`
   - `workflow/maintenance-workflow/README.md`
   - `workflow/<FLOW_NAME>/README.md`
   - tutti i README/status dei capitoli
2. Entra in `workflow/<FLOW_NAME>/`.
3. Per ogni capitolo crea i file task necessari in ordine sequenziale:
   - `task-001-<nome-task>.md`
   - `task-002-<nome-task>.md`
   - `task-003-<nome-task>.md`
4. Aggiorna il `status.md` del capitolo con il piano task generato.
5. Aggiorna i tracker:
   - `workflow/<FLOW_NAME>/flow-execution-tracker.md`
   - `workflow/<project-name>_daily_execution_tracker.md`

Nota implementativa per questo repository: usa `workflow/ready2agent_daily_execution_tracker.md`.

## Vincoli obbligatori

- Ogni task deve essere atomico e verificabile.
- Un task alla volta in esecuzione reale (regola execution).
- Nessuna anticipazione di task dipendenti.
- Nessun refactor laterale fuori scope.
- Ogni task deve referenziare sia requirement sia documentation.
- Non creare file extra fuori dai capitoli, salvo aggiornamento di `README.md`, `flow-execution-tracker.md` e tracker globale.

## Template minimo per ogni task

Ogni file `task-*.md` deve contenere almeno:

1. Titolo task
2. Stato task (`not-started | in-progress | blocked | completed`)
3. Requisito iniziale collegato
4. Riferimenti a `workflow/requirements/*`
5. Riferimenti a `documentation/*`
6. Tecnologie e moduli coinvolti
7. Specifiche tecniche
8. Flusso operativo
9. Passaggi di implementazione
10. Output atteso
11. Criteri di completamento (Definition of Done locale)
12. File da modificare/verificare
13. Rischi/attenzioni
14. Prompt operativo dettagliato pronto da copiare

## Sezione obbligatoria: Prompt operativo interno

Ogni task deve chiudersi con una sezione "Prompt operativo" che includa:

- ordine di lettura file prima di agire;
- scope tecnico preciso;
- vincoli espliciti da rispettare;
- check di validazione finale (`npm run lint`, `npm test`, `npm run build`);
- obbligo di aggiornare tracker + status + task file.

## Regole di qualita task

- Preferire task piccoli e indipendenti per quanto possibile.
- Ogni task deve dichiarare prerequisiti in modo esplicito.
- Evitare task vaghi (es. "migliorare sistema").
- Collegare ogni task ad almeno un criterio verificabile.

## Output atteso

1. Elenco task creati per capitolo.
2. Copertura requisiti (mappa requirement -> task).
3. Aggiornamento stati capitolo/tracker locale/tracker globale.
4. Evidenza coerenza con regole in `documentation/method/execution-rules/00_rules_and_ordering.md`.
