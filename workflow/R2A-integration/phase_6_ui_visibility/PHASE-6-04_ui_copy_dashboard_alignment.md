# [PHASE-6-04] Correggere copy, dashboard home e assunzioni UI non conformi

Stato: completed

## Obiettivo

Rimuovere claim e copy non coerenti con il backend e con la spec finale.

## Input

- Leggere:
  - `src/app/page.tsx`
  - `src/app/dashboard/page.tsx`
  - eventuali layout/componenti con copy di prodotto collegata
- Modificare:
  - i file sopra secondo necessita

## Prompt operativo

```text
Implementa ONLY il task [PHASE-6-04] di Ready2Agent.

Leggi i file elencati nel task file `workflow/R2A-integration/phase_6_ui_visibility/PHASE-6-04_ui_copy_dashboard_alignment.md`.

Obiettivo:
- rimuovere claim UI non coerenti con la spec o con il backend finale

Implementa SOLO questo:
1. correggi landing e dashboard home
2. elimina riferimenti a capability o concetti fuori spec
3. mantieni copy accurata e non generica

DO NOT:
- non usare il copy per coprire gap tecnici
- non introdurre nuove feature UI

Validation:
- nessun claim contraddice il sistema reale
- landing/dashboard coerenti col prodotto finale
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- la UI non promette piu comportamenti inesistenti o fuori spec
