# [PHASE-2-01] Definire il modello canonico ruoli e permessi da specifica

Stato: completed

## Obiettivo

Ridurre il sistema permessi ai soli elementi ammessi dalla spec.

## Input

- Leggere:
  - `src/server/lib/users/types.ts`
  - `src/shared/auth/admin-permissions.catalog.ts`
  - `src/shared/auth/permissions.catalog.ts`
  - `src/shared/staff/types.ts`
- Modificare:
  - `src/server/lib/users/types.ts`
  - `src/shared/auth/admin-permissions.catalog.ts`
  - `src/shared/auth/permissions.catalog.ts`
  - `src/shared/staff/types.ts`

## Prompt operativo

```text
Implementa ONLY il task [PHASE-2-01] di Ready2Agent.

Leggi i file elencati nel task file `workflow/R2A-integration/phase_2_identity/PHASE-2-01_roles_permissions_model.md` e la sezione Identity & Access della spec.

Obiettivo:
- riallineare il catalogo ADMIN alle deleghe CRUD canonicali governate da SUPER
- rendere OPERATOR deny-all di default

Implementa SOLO questo:
1. correggi il catalogo ADMIN
2. correggi il catalogo/default OPERATOR
3. aggiorna i tipi condivisi

DO NOT:
- non toccare ancora `access.ts`
- non introdurre permessi nuovi

Validation:
- catalogo ADMIN limitato a `administrators.viewOthers`, `administrators.invite`, `administrators.edit`, `administrators.delete`
- default OPERATOR senza broad access
- tipi coerenti coi cataloghi
```

## Validation

- catalogo ADMIN coerente con deleghe CRUD canonicali
- default OPERATOR minimo

## Errori comuni

- lasciare permessi legacy per comodita

## Done quando

- i cataloghi riflettono esattamente il modello della spec

## Nota stato corrente

- Dal 2026-04-12 e attivo un riallineamento Mode B che estende il catalogo ADMIN alle deleghe CRUD (`administrators.viewOthers`, `administrators.invite`, `administrators.edit`, `administrators.delete`) con ownership enforcement su `invitedByUserId`.
