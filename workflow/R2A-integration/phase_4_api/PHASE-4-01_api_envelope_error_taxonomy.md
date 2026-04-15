# [PHASE-4-01] Standardizzare envelope API e tassonomia errori

Stato: completed

## Obiettivo

Uniformare tutte le API al contratto `success/data/error` con classi errore della spec.

## Input

- Leggere:
  - `src/server/errors/response.ts`
  - `src/server/errors/mapToHttp.ts`
  - `src/server/errors/codes.ts`
  - `src/server/errors/AppError.ts`
- Modificare:
  - gli stessi file

## Prompt operativo

```text
Implementa ONLY il task [PHASE-4-01] di Ready2Agent.

Leggi i file elencati nel task file `workflow/R2A-integration/phase_4_api/PHASE-4-01_api_envelope_error_taxonomy.md`.

Obiettivo:
- standardizzare envelope API e tassonomia errori `validation/auth/business/system`

Implementa SOLO questo:
1. mantieni l'envelope comune
2. aggiungi la classificazione errori nel payload
3. centralizza mapping codici/classi/status HTTP

DO NOT:
- non creare formati response diversi per route diverse

Validation:
- envelope uniforme
- ogni errore classificato
- mapping centralizzato
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- response ed errori API usano un contratto unico e chiaro
