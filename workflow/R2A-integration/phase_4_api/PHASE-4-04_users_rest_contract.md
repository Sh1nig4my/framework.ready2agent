# [PHASE-4-04] Standardizzare il contratto REST delle API users

Stato: completed

## Obiettivo

Limitare le API users alle operazioni consentite dal dominio finale.

## Input

- Leggere:
  - `src/app/api/users/route.ts`
  - `src/app/api/users/[id]/route.ts`
  - `src/server/service/users.service.ts`
  - `src/server/lib/users/validation.ts`
- Modificare:
  - gli stessi file se necessario

## Prompt operativo

```text
Implementa ONLY il task [PHASE-4-04] di Ready2Agent.

Leggi i file elencati nel task file `workflow/R2A-integration/phase_4_api/PHASE-4-04_users_rest_contract.md`.

Obiettivo:
- fare delle API users un contratto REST coerente e non privilegiato

Implementa SOLO questo:
1. allinea GET/PATCH/DELETE users alla policy finale
2. rimuovi mutation privilegiate dalla route generica
3. mantieni envelope ed errori uniformi

DO NOT:
- non introdurre nuove route inutili
- non lasciare ruolo/permessi nel patch users

Validation:
- users API non consente escalation
- self-only rispettato
- contract uniforme
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- le API users espongono solo cio che il dominio consente
