# [PHASE-6-01] Riallineare navigation e sidebar alla policy centrale di accesso

Stato: completed

## Obiettivo

Fare in modo che menu e sidebar mostrino solo cio che il backend consente davvero.

## Input

- Leggere:
  - `src/shared/navigation/config.ts`
  - `src/components/navigation/app-sidebar.tsx`
  - `src/server/lib/auth/access.ts`
- Modificare:
  - `src/shared/navigation/config.ts`
  - `src/components/navigation/app-sidebar.tsx`

## Prompt operativo

```text
Implementa ONLY il task [PHASE-6-01] di Ready2Agent.

Leggi i file elencati nel task file `workflow/R2A-integration/phase_6_ui_visibility/PHASE-6-01_navigation_sidebar_alignment.md`.

Obiettivo:
- allineare navigation e sidebar alla policy centrale finale

Implementa SOLO questo:
1. rimuovi scorciatoie di ruolo incoerenti
2. fai derivare la visibilita dei menu da policy/capabilities corrette
3. assicurati che la sidebar non mostri moduli non accessibili

DO NOT:
- non usare la sidebar come unico enforcement
- non duplicare logiche complesse di accesso in UI

Validation:
- menu coerenti per ruolo
- nessuna voce visibile senza accesso reale
- navigation allineata alla policy
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- la shell UI non contraddice piu il modello di accesso reale
