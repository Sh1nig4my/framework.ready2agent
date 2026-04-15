# [PHASE-5-03] Rimuovere i campi core fuori specifica e i relativi consumer

Stato: completed

## Obiettivo

Eliminare dal core campi non ammessi dalla spec e aggiornare tutti i consumer dipendenti.

## Input

- Leggere:
  - `src/server/models/User.ts`
  - `src/server/lib/users/types.ts`
  - `src/server/service/auth.service.ts`
  - `src/server/dto/auth.ts`
  - `src/server/lib/operators/validation.ts`
  - `src/server/lib/administrators/validation.ts`
  - `src/components/auth/register-form.tsx`
  - `src/components/auth/invite-accept-form.tsx`
  - `src/server/lib/demo/store.ts`
- Modificare:
  - tutti i file che usano i campi fuori spec nel core

## Prompt operativo

```text
Implementa ONLY il task [PHASE-5-03] di Ready2Agent.

Leggi i file elencati nel task file `workflow/R2A-integration/phase_5_validation_data/PHASE-5-03_remove_out_of_spec_fields.md`.

Obiettivo:
- rimuovere dal core i campi fuori specifica e correggere i consumer

Implementa SOLO questo:
1. elimina i campi non ammessi dal model e dai tipi core
2. aggiorna DTO, form, seed e service dipendenti
3. lascia eventuali dati demo solo nel perimetro demo

DO NOT:
- non introdurre campi sostitutivi inventati
- non lasciare i campi rimossi in API o form del core

Validation:
- campi fuori spec rimossi
- form/DTO allineati
- seed e flow core non dipendono piu da quei campi
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- il core model e minimale e aderente alla spec
