# Maintenance Workflow

## Metadati

- Ultimo aggiornamento: 2026-04-29
- Stato: attivo
- Scope: toolkit agnostico per workflow di integrazione guidati da requirements

## Scopo

La cartella `workflow/maintenance-workflow/` contiene un toolkit operativo agnostico, riusabile in qualsiasi progetto agentico.

Contiene solo metodologia, prompt e template. Non contiene workflow specifici di un singolo ramo implementativo.

I workflow reali vengono generati fuori da questa cartella, direttamente sotto `workflow/<FLOW_NAME>/`.

## Struttura

```text
workflow/maintenance-workflow/
├── README.md
├── prompt-01-generate-integration-chapters.md
├── prompt-02-generate-integration-tasks.md
└── flow-execution-tracker.md
```

Output runtime atteso (generato dai prompt):

```text
workflow/
├── <FLOW_NAME>/
│   ├── README.md
│   ├── flow-execution-tracker.md
│   ├── 01-<chapter>/
│   │   ├── README.md
│   │   ├── status.md
│   │   └── task-001-<task>.md
│   └── 02-<chapter>/...
└── <project-name>_daily_execution_tracker.md
```

Convenzione tracker globale:

- formato: `workflow/<project-name>_daily_execution_tracker.md`
- esempio in questo repository: `workflow/ready2agent_daily_execution_tracker.md`

## Cosa leggere prima

1. `README.md`
2. `documentation/quickstart/agent_start_here.md`
3. `documentation/operational/README.md`
4. `documentation/operational/spec/README.md`
5. `documentation/operational/alignment/README.md`
6. `documentation/operational/execution/README.md`
7. `workflow/README.md`
8. `workflow/maintenance-workflow/README.md`
9. `workflow/requirements/<branch>/`

## Come usare i prompt

- Usa `prompt-01-generate-integration-chapters.md` quando devi creare o riallineare le macroaree di un nuovo flusso.
- Usa `prompt-02-generate-integration-tasks.md` solo dopo che i capitoli sono confermati.

Regola: Prompt 1 non crea task. Prompt 2 non ridefinisce i capitoli se non necessario.

## Prompt copy/paste

### Esegui Prompt 01 (capitoli)

```markdown
Leggi e segui integralmente `workflow/maintenance-workflow/prompt-01-generate-integration-chapters.md`.

Input requirements branch: `workflow/requirements/<branch>/`.

Obiettivo:
- creare/aggiornare il flusso in `workflow/<FLOW_NAME>/`;
- creare solo capitoli macro con `README.md` e `status.md`;
- inizializzare o aggiornare il tracker locale del flusso;
- creare `workflow/<project-name>_daily_execution_tracker.md` se assente, oppure aggiornarlo se presente.

Non creare task in questa fase.
```

### Esegui Prompt 02 (task)

```markdown
Leggi e segui integralmente `workflow/maintenance-workflow/prompt-02-generate-integration-tasks.md`.

Input:
- requirements branch: `workflow/requirements/<branch>/`
- flusso target: `workflow/<FLOW_NAME>/`

Obiettivo:
- generare `task-*.md` per ogni capitolo;
- aggiornare `status.md` dei capitoli;
- aggiornare il tracker locale del flusso;
- aggiornare tracker globale `workflow/<project-name>_daily_execution_tracker.md`.
```

## Come eseguire Prompt 01

1. Seleziona un branch requisiti in `workflow/requirements/<branch>/`.
2. Esegui il prompt 01 in una sessione dedicata.
3. Verifica che il risultato sia solo strutturale:
   - `workflow/<FLOW_NAME>/README.md`
    - `workflow/<FLOW_NAME>/flow-execution-tracker.md`
   - `workflow/<FLOW_NAME>/<nn>-<chapter>/README.md`
   - `workflow/<FLOW_NAME>/<nn>-<chapter>/status.md`
4. Verifica il tracker globale:
   - se assente, deve essere creato `workflow/<project-name>_daily_execution_tracker.md`;
   - se presente, deve essere aggiornato con il nuovo flusso.
5. Non procedere al prompt 02 finche i capitoli non sono coerenti con requirements e documentation.

## Uso del tracker

Il file `workflow/maintenance-workflow/flow-execution-tracker.md` e un template di tracker.

Tracker operativi reali:

- globale: `workflow/<project-name>_daily_execution_tracker.md`
- per singolo flusso: `workflow/<FLOW_NAME>/flow-execution-tracker.md`

Dopo ogni task completato aggiorna sempre:

1. `workflow/<project-name>_daily_execution_tracker.md`
2. `workflow/<FLOW_NAME>/flow-execution-tracker.md`
3. `workflow/<FLOW_NAME>/<capitolo>/status.md`
4. `workflow/<FLOW_NAME>/<capitolo>/<task>.md`

## Prompt giornaliero di ripresa lavoro

Leggi prima:

1. `documentation/`
2. `workflow/requirements/<branch>/`
3. `workflow/README.md`
4. `workflow/maintenance-workflow/README.md`
5. `workflow/<project-name>_daily_execution_tracker.md`
6. `workflow/<FLOW_NAME>/flow-execution-tracker.md`
7. `workflow/<FLOW_NAME>/README.md`
8. i `status.md` dei capitoli dentro `workflow/<FLOW_NAME>/`

Dopo aver letto questi file:

- identifica l'ultimo task completato;
- identifica il prossimo task da eseguire;
- verifica il capitolo di riferimento;
- prepara una pianificazione operativa per la sessione corrente;
- non modificare file fuori dallo scope richiesto;
- rispetta sempre le regole presenti in `documentation`;
- aggiorna sempre tracker, status e task file dopo ogni attivita completata.

Inizia dalla prossima attivita non completata.
