# [PHASE-6-02] Rifattorizzare le schermate staff e users per capability e self-only mode

Stato: completed

## Obiettivo

Rendere le schermate staff/users corrette nei casi self-only e capability limitate.

## Input

- Leggere:
  - `src/app/dashboard/administrators/page.tsx`
  - `src/app/dashboard/operators/page.tsx`
  - `src/app/dashboard/users/page.tsx`
  - `src/components/dashboard/administrators-page-client.tsx`
  - `src/components/dashboard/operators-page-client.tsx`
  - `src/components/dashboard/users-page-client.tsx`
- Modificare:
  - i file sopra

## Prompt operativo

```text
Implementa ONLY il task [PHASE-6-02] di Ready2Agent.

Leggi tutte le pagine e i page client elencati nel task file `workflow/R2A-integration/phase_6_ui_visibility/PHASE-6-02_staff_users_ui_capabilities.md`.

Obiettivo:
- rendere le schermate capability-driven e corrette in self-only mode

Implementa SOLO questo:
1. usa solo payload e capability dalle API finali
2. gestisci self-only mode, empty state e access denied
3. nascondi o disabilita azioni non consentite

DO NOT:
- non ricalcolare la business logic di accesso in UI
- non assumere directory complete dove non esistono

Validation:
- self-only mode corretta
- bottoni/action coerenti con capability
- nessuna assunzione UI in conflitto con l'API
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- le schermate staff/users sono affidabili anche con permessi limitati
