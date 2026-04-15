# [PHASE-2-03] Riallineare servizi administrators e operators alla nuova policy

Stato: completed

## Obiettivo

Fare in modo che capabilities e directory staff usino correttamente la nuova policy centrale.

## Input

- Leggere:
  - `src/server/service/administrators.service.ts`
  - `src/server/service/operators.service.ts`
  - `src/shared/staff/types.ts`
  - `src/server/lib/auth/access.ts`
- Modificare:
  - `src/server/service/administrators.service.ts`
  - `src/server/service/operators.service.ts`
  - `src/shared/staff/types.ts`

## Prompt operativo

```text
Implementa ONLY il task [PHASE-2-03] di Ready2Agent.

Leggi i file elencati nel task file `workflow/R2A-integration/phase_2_identity/PHASE-2-03_staff_services_alignment.md`.

Obiettivo:
- riallineare capabilities e directory staff al nuovo access model

Implementa SOLO questo:
1. correggi `StaffDirectoryCapabilities`
2. rendi ADMIN self-only nella directory administrators salvo permesso specifico
3. rendi OPERATOR self-only nella directory operators salvo permessi specifici

DO NOT:
- non toccare UI o route
- non introdurre capability non previste

Validation:
- capabilities coerenti
- self-only mode corretta
- nessun broad access implicito
```

## Validation

- ADMIN self-only senza viewOthers
- OPERATOR self-only senza permessi directory

## Errori comuni

- lasciare `canViewAll` troppo permissivo

## Done quando

- i service staff sono coerenti con la policy centrale

## Esecuzione

- Data completamento: 2026-04-12
- Risultato:
  - `StaffDirectoryCapabilities` riallineate nel servizio administrators: `canViewAll` dipende solo da `administrators.viewOthers` per profilo `ADMIN`.
  - Directory administrators in self-only reale senza `administrators.viewOthers`; con permesso abilitato resta il vincolo delegated (`invitedByUserId`).
  - Directory operators confermata self-only di default per `OPERATOR` senza permessi directory.
  - Aggiunto test di regressione per evitare broad access implicito con solo `administrators.invite`.

### File toccati

- `src/server/service/administrators.service.ts`
- suite test identity (storica, poi semplificata)

### Validazione

- `npm run lint` -> pass
- `npm run test` -> pass
- `npm run build` -> pass
