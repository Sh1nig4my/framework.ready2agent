# [PHASE-3-02] Normalizzare payload JWT/session e tipi actor

Stato: completed

## Obiettivo

Fare convergere il payload auth su `userId`, `role`, `permissions`.

## Input

- Leggere:
  - `src/server/lib/auth/nextauth.ts`
  - `src/server/lib/auth/session.ts`
  - `src/shared/types/next-auth.d.ts`
  - `src/server/lib/users/types.ts`
  - `src/server/lib/auth/user-defaults.ts`
- Modificare:
  - `src/server/lib/auth/nextauth.ts`
  - `src/server/lib/auth/session.ts`
  - `src/shared/types/next-auth.d.ts`
  - `src/server/lib/users/types.ts`
  - `src/server/lib/auth/user-defaults.ts` se necessario

## Prompt operativo

```text
Implementa ONLY il task [PHASE-3-02] di Ready2Agent.

Leggi i file elencati nel task file `workflow/R2A-integration/phase_3_auth/PHASE-3-02_jwt_session_payload.md`.

Obiettivo:
- normalizzare payload JWT/session al contratto finale

Implementa SOLO questo:
1. convergi su `userId`, `role`, `permissions`
2. rimuovi `standardAccess` dal contratto auth
3. aggiorna `Session`, `JWT` e `SessionActor`

DO NOT:
- non lasciare due contratti auth concorrenti
- non perdere distinzione tra permission list ADMIN e permission map OPERATOR

Validation:
- payload auth minimale
- tipi coerenti
- nessun campo superfluo residuo nel contratto
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- il contratto auth e piccolo, coerente e allineato alla spec
