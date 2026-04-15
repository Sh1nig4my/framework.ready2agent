# [PHASE-5-02] Riallineare schema e tipi User alla terminologia della specifica

Stato: completed

## Obiettivo

Fare convergere il dominio utente su `role` e `status` in modo coerente tra model, repository, auth e tipi.

## Input

- Leggere:
  - `src/server/models/User.ts`
  - `src/server/lib/users/types.ts`
  - `src/server/repository/users.repository.ts`
  - `src/server/lib/auth/nextauth.ts`
  - `src/server/lib/auth/session.ts`
  - `src/shared/types/next-auth.d.ts`
- Modificare:
  - gli stessi file secondo necessita

## Prompt operativo

```text
Implementa ONLY il task [PHASE-5-02] di Ready2Agent.

Leggi i file elencati nel task file `workflow/R2A-integration/phase_5_validation_data/PHASE-5-02_user_schema_role_alignment.md`.

Obiettivo:
- riallineare il dominio utente alla terminologia finale della spec

Implementa SOLO questo:
1. convergi su `role` e `status`
2. aggiorna schema, tipi e mapping repository
3. riallinea session/auth types se impattati

DO NOT:
- non lasciare due termini canonici concorrenti
- non introdurre nuovi campi non previsti

Validation:
- `role` e termine dominante
- schema/repository/auth coerenti
- mapping non ambiguo
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- il dominio utente parla un unico linguaggio coerente con la spec
