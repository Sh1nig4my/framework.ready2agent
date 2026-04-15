# Agent Workspace - Hub Documentale

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: agenti di coding e manutentori
- **Status**: attivo

## Scopo

`agent-workspace/` è la base di conoscenza operativa per agenti di coding che lavorano su Ready2Agent.
È organizzato seguendo l'architettura documentale a tre livelli:

- **project-docs/**: documentazione progetto orientata agli umani
- **operational/**: contesto esecutivo e vincoli per agenti
- **project-meta/**: metadata e governance repository

## Architettura Documentale

### 19.1 `project-docs/`

Documentazione di progetto più ampia per lettori umani:

- note architetturali
- note di setup
- note di deployment
- narrative di design
- note implementative

### 19.2 `operational/`

Base di conoscenza operativa per coding agent:

- `spec/`: source of truth prodotto e architettura
- `alignment/`: fotografia del gap tra specifica e stato corrente
- `execution/`: regole esecutive e sequenza task
- `setup/`: setup locale, bootstrap, deploy
- `case-study/`: metodologia AI-native documentata

### 19.3 `project-meta/`

Metadata a livello repository e mappe interne:

- decision log
- governance documentale
- alignment contract con workflow
- naming policy

## Ordine di Lettura Obbligatorio

### Per agenti di coding:

1. `agent-workspace/README.md` (questo file)
2. `agent-workspace/operational/README.md`
3. `agent-workspace/operational/spec/README.md`
4. `agent-workspace/operational/alignment/README.md`
5. `agent-workspace/operational/execution/README.md`
6. `agent-workspace/operational/setup/README.md`
7. `agent-workspace/operational/case-study/README.md`
8. `workflow/R2A-integration/README.md`
9. `workflow/prompts/README.md`
10. `workflow/R2A-integration/sh1nig4my_daily_execution_tracker.md`

### Per lettori umani/contributor:

1. `README.md` (root del progetto)
2. `R2A_full-ai-context.md`
3. `agent-workspace/project-docs/README.md`
4. `agent-workspace/quickstart/README.md`

## Regole Operative

- Gli agenti DEVONO costruire il contesto da questa cartella prima di implementare qualsiasi modifica.
- Regole e vincoli qui contenuti sono vincolanti salvo sovrascrittura esplicita approvata.
- Aggiornamenti documentali sono parte dell'implementazione, non un passaggio successivo.
- Le modifiche DEVONO preservare coerenza tra codice, documentazione e artefatti workflow.

## Source of Truth Hierarchy

1. Comportamento runtime nel codice (`src/`)
2. Architettura e vincoli in `operational/spec/`
3. Esecuzione operativa in `workflow/R2A-integration/`
4. Traccia decisioni in `project-meta/decision_log.md`

## Relazione con Full Context

- `R2A_full-ai-context.md` fornisce contesto narrativo completo per chat AI generiche.
- `agent-workspace/` fornisce contesto strutturato e actionable per lavoro implementativo interno al repository.

## Accesso Rapido

| Sezione | Percorso | Contenuto |
|---------|----------|-----------|
| Spec | `operational/spec/` | Vincoli architetturali, ruoli, auth |
| Alignment | `operational/alignment/` | Gap analysis, stato repo |
| Execution | `operational/execution/` | Regole task, ordinamento |
| Setup | `operational/setup/` | Guida locale e deploy |
| Case Study | `operational/case-study/` | Metodologia AI-native |
| Project Docs | `project-docs/` | Docs umani ad alto livello |
| Meta | `project-meta/` | Decision log, governance |

---

*Questa cartella è parte integrante del progetto Ready2Agent e del suo valore didattico come caso studio di sviluppo AI-native.*
