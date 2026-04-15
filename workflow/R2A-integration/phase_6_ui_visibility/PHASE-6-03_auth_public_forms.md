# [PHASE-6-03] Riallineare form auth/pubblici al dominio finale e rimuovere default demo

Stato: completed

## Obiettivo

Pulire login, register e invite accept da residui demo e campi fuori spec.

## Input

- Leggere:
  - `src/components/auth/login-form.tsx`
  - `src/components/auth/register-form.tsx`
  - `src/components/auth/invite-accept-form.tsx`
- Modificare:
  - gli stessi file

## Prompt operativo

```text
Implementa ONLY il task [PHASE-6-03] di Ready2Agent.

Leggi i file elencati nel task file `workflow/R2A-integration/phase_6_ui_visibility/PHASE-6-03_auth_public_forms.md`.

Obiettivo:
- riallineare i form pubblici al dominio finale e rimuovere il comportamento demo non appropriato

Implementa SOLO questo:
1. rimuovi credenziali demo precompilate e hint non adatti
2. allinea i campi dei form ai DTO finali
3. aggiorna la copy coerentemente

DO NOT:
- non lasciare default demo nello state iniziale
- non reintrodurre campi fuori spec

Validation:
- form coerenti coi DTO
- nessun default demo
- copy allineata al runtime reale
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- i form pubblici sono puliti, realistici e coerenti
