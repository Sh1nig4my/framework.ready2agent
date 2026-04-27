# Workflow - Metodologia Operativa

## Metadati

- Ultimo aggiornamento: 2026-04-27
- Stato: attivo

## Scopo

La cartella `workflow/` contiene la metodologia esecutiva usata per sviluppare Ready2Agent in modo progressivo, tracciabile e verificabile.

Questa metodologia non e limitata a R2A: puo essere riusata in altri progetti per gestire evoluzioni, implementazioni importanti e refactor estesi con task piccoli e sequenziali.

## Struttura

```text
workflow/
├── README.md
├── sh1nig4my_daily_execution_tracker.md
├── requirements/
│   └── ready2agent_master_spec_v2_1.md
└── R2A-integration/
    ├── README.md
    └── phase_*/
```

## Ruolo di `workflow/requirements/`

`workflow/requirements/` contiene i materiali di input che avviano un workflow:

- file testuali di requisito;
- eventuali PDF;
- artefatti iniziali di analisi.

Nel caso di Ready2Agent, `workflow/R2A-integration/` e stato costruito partendo dal requisito iniziale ora archiviato in `workflow/requirements/ready2agent_master_spec_v2_1.md`.

## Ruolo di `workflow/R2A-integration/`

`workflow/R2A-integration/` documenta la realizzazione effettiva task-by-task:

- indice esecutivo;
- task per fase;
- stato avanzamento;
- report di hardening.

## Regole di utilizzo

- un task alla volta;
- rispetto delle dipendenze tra fasi;
- aggiornamento stato e tracker nello stesso ciclo;
- riallineamento documentale contestuale.

## Collegamenti

- contesto documentale: `documentation/README.md`
- prompt operativi: `prompts/README.md`
- indice operativo R2A: `workflow/R2A-integration/README.md`
