# [PHASE-5-04] Tipizzare a DB la permission map OPERATOR e semplificare il soft delete

Stato: completed

## Obiettivo

Portare la persistenza OPERATOR a una struttura tipizzata e rendere `status` la semantica primaria dell'inattivita.

## Input

- Leggere:
  - `src/server/models/User.ts`
  - `src/server/repository/users.repository.ts`
  - `src/shared/auth/permissions.catalog.ts`
- Modificare:
  - `src/server/models/User.ts`
  - `src/server/repository/users.repository.ts`
  - eventuale supporto catalog/schema

## Prompt operativo

```text
Implementa ONLY il task [PHASE-5-04] di Ready2Agent.

Leggi i file elencati nel task file `workflow/R2A-integration/phase_5_validation_data/PHASE-5-04_operator_permissions_db_soft_delete.md`.

Obiettivo:
- tipizzare a DB la permission map OPERATOR
- semplificare il soft delete intorno a `status = inactive`

Implementa SOLO questo:
1. sostituisci `Schema.Types.Mixed` con uno schema coerente col catalogo OPERATOR
2. aggiorna repository e mapping
3. riduci `deletedAt` a ruolo secondario, non criterio primario di attivita

DO NOT:
- non lasciare la permission map come blob arbitrario
- non mantenere due criteri concorrenti per attivo/inattivo

Validation:
- permission map tipizzata e persistita
- repository coerente
- query attivita basate su `status`
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- persistenza OPERATOR e soft delete sono coerenti con la spec
