# Workspace Workflow Alignment Contract

## Metadata

- Ultimo aggiornamento: 2026-04-28
- Pubblico: coding agent e maintainer
- Status: attivo

## Scopo

Definire i confini tra documentazione metodologica e istanze operative.

## Source Of Truth Map

1. `src/` -> comportamento runtime reale
2. `documentation/core/` -> vincoli e specifiche Core
3. `documentation/method/` -> metodo operativo agent-native
4. `workflow/` -> execution instances, tracker e artefatti task
5. `documentation/project-meta/` -> governance e decisioni

## Regole Anti-Drift

- Se cambiano i path, aggiornare nella stessa modifica documentazione, workflow e prompt.
- Se cambia un vincolo runtime, aggiornare prima `documentation/core/` e poi workflow impattati.
- Se cambia il metodo operativo, aggiornare `documentation/method/`, `workflow/README.md` e `prompts/README.md`.

## Read Order Ufficiale

1. `README.md`
2. `documentation/quickstart/agent_start_here.md`
3. `documentation/README.md`
4. `documentation/core/README.md`
5. `documentation/method/README.md`
6. `workflow/README.md`
7. `prompts/README.md`
