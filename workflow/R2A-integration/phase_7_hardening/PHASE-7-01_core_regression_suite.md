# [PHASE-7-01] Costruire le regression suite su identity, auth e API contract

Stato: completed

## Obiettivo

Proteggere il core del sistema con test automatici essenziali e stabili.

## Input

- Leggere:
  - `tests/mongo-env-guardrails.test.ts`
  - `src/server/config/env.ts`
  - `src/server/db/mongoose.ts`
- Modificare:
  - test legacy errati
- Creare:
  - 2/3 test di esempio focalizzati su env + connessione DB

## Prompt operativo

```text
Implementa ONLY il task [PHASE-7-01] di Ready2Agent.

Leggi i test esistenti e i documenti sorgente del progetto.

Obiettivo:
- costruire una regression suite minimale, chiara e mantenibile

Implementa SOLO questo:
1. blocca URI Mongo placeholder in validazione env
2. aggiungi test di esempio su URI valida, URI placeholder, errore DNS guidato
3. mantieni i test deterministici e poco tecnici

DO NOT:
- non testare dettagli interni fragili
- non lasciare test legacy che approvano bug storici

Validation:
- copertura guardrail env
- copertura fallback errore connessione
- output test leggibile
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- la suite blocca il bug `ENOTFOUND host1` prima o durante la connessione in modo guidato
