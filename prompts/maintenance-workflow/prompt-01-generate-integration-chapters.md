# Prompt 01 - Generate Integration Chapters

## Scopo

Generare o riallineare la struttura macro di integrazione a capitoli, senza creare task dettagliati.

## Istruzioni operative per l'agente

1. Leggi integralmente:
   - `README.md`
   - `documentation/`
   - `workflow/requirements/<branch>/`
   - `prompts/maintenance-workflow/README.md`
2. Deduce il nome del flusso dai requirement file e crea/aggiorna:
   - `workflow/<FLOW_NAME>/`
   - `workflow/<project-name>_daily_execution_tracker.md` come tracker globale del repository
3. Crea o aggiorna il README generale:
   - `workflow/<FLOW_NAME>/README.md`
4. Identifica macroaree/capitoli in ordine logico e crea per ciascuno solo:
   - `workflow/<FLOW_NAME>/<nn>-<nome-capitolo>/README.md`
   - `workflow/<FLOW_NAME>/<nn>-<nome-capitolo>/status.md`
   - `workflow/<FLOW_NAME>/flow-execution-tracker.md` (inizializzazione tracker locale)
5. Gestisci il tracker globale del repository:
   - se `workflow/<project-name>_daily_execution_tracker.md` non esiste, crealo;
   - se esiste, aggiorna il registro flussi aggiungendo/aggiornando la riga del nuovo flusso.
6. Aggiorna lo stato della specifica in `workflow/requirements/<branch>/README.md`:
   - assicurati che esista il badge in testa: `Stato specifica: [completed|in-progress|not-started]`;
   - se il flow viene creato in questo passaggio, imposta stato `in-progress`;
   - se il flow non viene creato, mantieni `not-started`;
   - se il flow risulta gia completato, imposta `completed`.
7. Aggiorna `prompts/maintenance-workflow/README.md` solo se servono riallineamenti di link/struttura.

## Vincoli obbligatori

- Non creare file `task-*.md` in questo prompt.
- Non implementare codice applicativo.
- Non cambiare scope dei requirement.
- Non lasciare README di branch requirements senza badge stato.
- Rispettare spec e regole in `documentation/core/` e `documentation/method/execution-rules/`.
- Mantenere naming in kebab-case e numerazione capitoli a due cifre (`01-`, `02-`, ...).
- Non creare capitoli dentro `prompts/maintenance-workflow/`.
- Il tracker globale deve chiamarsi `workflow/<project-name>_daily_execution_tracker.md`.
- Non creare file fuori dai capitoli, salvo questi file root del flow: `README.md`, `flow-execution-tracker.md`.
- Il tracker globale e l'unico file ammesso fuori dal flow: `workflow/<project-name>_daily_execution_tracker.md`.

Nota implementativa per questo repository: usa `workflow/ready2agent_daily_execution_tracker.md`.

## Contenuto minimo dei file capitolo

### README.md di capitolo

Deve includere:

- obiettivo della macroarea;
- requisiti correlati (con riferimenti a file/section dei requirement);
- regole di documentation da rispettare;
- risultato finale atteso del capitolo;
- esplicita sezione "Non trasformare ancora in task" con elementi da non dettagliare.

### status.md di capitolo

Deve includere:

- stato: `not-started | in-progress | blocked | completed`;
- avanzamento percentuale;
- elementi completati;
- elementi mancanti;
- blocker/rischi;
- note operative per agenti successivi;
- prossimo step raccomandato.

## Contenuto minimo del README integrazione

Il file `workflow/<FLOW_NAME>/README.md` deve spiegare:

- scopo integrazione;
- struttura capitoli;
- ordine consigliato di esecuzione;
- relazione con `workflow/requirements/<branch>/`;
- relazione con `documentation/`;
- regole operative (task sequenziale, validazione, aggiornamento tracker/status).

## Output atteso

1. Elenco file creati/aggiornati.
2. Motivazione della suddivisione in capitoli.
3. Checklist verifica:
   - [ ] nessun task creato
   - [ ] capitoli con README+status
   - [ ] flusso creato in `workflow/<FLOW_NAME>/`
   - [ ] badge stato aggiornato in `workflow/requirements/<branch>/README.md`
   - [ ] link interni validi
   - [ ] allineamento a documentation/requirements
