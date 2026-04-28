# Workflow - Metodologia Operativa

## Metadati

- Ultimo aggiornamento: 2026-04-28
- Stato: attivo

## Scopo

La cartella `workflow/` ospita il sistema operativo di esecuzione multi-flusso del repository.

Modello operativo:

- `workflow/maintenance-workflow/` = toolkit agnostico (prompt + template)
- `workflow/requirements/<branch>/` = input per singolo ramo implementativo
- `workflow/<FLOW_NAME>/` = esecuzione concreta del ramo (capitoli/task/status/tracker locale)
- `workflow/<project-name>_daily_execution_tracker.md` = tracker globale di tutti i flussi aperti

Nota didattica: `workflow/requirements/r2a-core/` e una spec didattica viva, mantenuta allineata riga-per-riga allo stato corrente di R2A.

In questo repository il file e `workflow/ready2agent_daily_execution_tracker.md`.

## Struttura consigliata

```text
workflow/
├── README.md
├── <project-name>_daily_execution_tracker.md
├── maintenance-workflow/
│   ├── README.md
│   ├── prompt-01-generate-integration-chapters.md
│   ├── prompt-02-generate-integration-tasks.md
│   └── flow-execution-tracker.md
├── requirements/
│   ├── README.md
│   ├── r2a-core/
│   └── r2a-enterprise-userdetail/
├── R2A-integration/
│   ├── README.md
│   ├── flow-execution-tracker.md
│   └── phase_*/
└── <FLOW_NAME>/
    ├── README.md
    ├── flow-execution-tracker.md
    └── <chapter>/
```

## Regole operative

- un task alla volta nel flusso attivo;
- nessuna anticipazione di task dipendenti;
- aggiornamento contestuale: task file + status capitolo + tracker locale + tracker globale;
- validazione finale per task implementativi: `npm run lint`, `npm test`, `npm run build`.

## Uso rapido

1. Leggi `documentation/README.md`, `documentation/core/README.md` e `documentation/method/README.md`.
2. Scegli il branch requisito in `workflow/requirements/<branch>/`.
3. Usa `workflow/maintenance-workflow/prompt-01-generate-integration-chapters.md`.
4. Poi usa `workflow/maintenance-workflow/prompt-02-generate-integration-tasks.md`.
5. Esegui task nel flow creato sotto `workflow/<FLOW_NAME>/`.

## Collegamenti

- contesto documentale: `documentation/README.md`
- regole esecutive: `documentation/method/execution-rules/00_rules_and_ordering.md`
- contract confini: `documentation/project-meta/workspace_workflow_alignment_contract.md`

`documentation/method/` descrive il metodo.
`workflow/` contiene le istanze operative concrete del metodo.
