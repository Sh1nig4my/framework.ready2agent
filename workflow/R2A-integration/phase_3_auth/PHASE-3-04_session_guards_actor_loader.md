# [PHASE-3-04] Riallineare guard di sessione e loader dell'attore autenticato

Stato: completed

## Obiettivo

Rendere coerenti expiry, reauth e caricamento dell'attore autenticato.

## Input

- Leggere:
  - `src/server/lib/auth/guards.ts`
  - `src/server/lib/auth/session.ts`
  - `src/server/service/auth.service.ts`
  - `src/server/lib/auth/nextauth.ts`
- Modificare:
  - `src/server/lib/auth/guards.ts`
  - `src/server/lib/auth/session.ts`
  - `src/server/service/auth.service.ts`

## Prompt operativo

```text
Implementa ONLY il task [PHASE-3-04] di Ready2Agent.

Leggi i file elencati nel task file `workflow/R2A-integration/phase_3_auth/PHASE-3-04_session_guards_actor_loader.md`.

Obiettivo:
- riallineare guard e actor loader al nuovo modello auth

Implementa SOLO questo:
1. rimuovi assunzioni del vecchio timeout 2h
2. distingui sessione scaduta da reauth richiesta
3. mantieni `requireSessionActor()` come entrypoint coerente

DO NOT:
- non spostare business logic nei controller
- non confondere reauth con rinnovo sessione

Validation:
- scadenza sessione produce `UNAUTHENTICATED`
- reauth usata solo per azioni sensibili
- actor loader coerente col payload nuovo
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- guard e loader non dipendono piu dal modello auth legacy
