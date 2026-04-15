# [PHASE-2-04] Riallineare users service e helper di navigazione alla nuova policy

Stato: completed

## Obiettivo

Chiudere il disallineamento tra users registry e navigation.

## Input

- Leggere:
  - `src/server/service/users.service.ts`
  - `src/shared/navigation/config.ts`
  - `src/server/lib/auth/access.ts`
- Modificare:
  - `src/server/service/users.service.ts`
  - `src/shared/navigation/config.ts`
  - suite test identity disponibile al momento dell'esecuzione (storico)

## Prompt operativo

```text
Implementa ONLY il task [PHASE-2-04] di Ready2Agent.

Leggi i file elencati nel task file `workflow/R2A-integration/phase_2_identity/PHASE-2-04_users_navigation_alignment.md`.

Obiettivo:
- riallineare users service e navigation alla policy corretta

Implementa SOLO questo:
1. correggi list/get/update/delete users rispetto a self-only by default
2. correggi la navigation per riflettere i permessi reali
3. aggiorna i test che oggi approvano il bug

DO NOT:
- non fare enforcement solo in UI
- non introdurre nuove scorciatoie di ruolo

Validation:
- OPERATOR senza permessi non accede alla directory users
- menu coerente con accesso reale
- test permessi aggiornati
```

## Validation

- users service corretto
- navigation allineata
- test aggiornati

## Errori comuni

- nascondere il menu ma lasciare l'API aperta

## Done quando

- users service e navigation non contraddicono piu la policy centrale

## Esecuzione

- Data completamento: 2026-04-12
- Risultato:
  - `users.service` riallineato al principio self-only: accesso self consentito anche senza directory permissions, accesso non-self condizionato alla policy centrale.
  - `updateUserForActor` protegge i profili da self-escalation (`profileLevel` e `status` non modificabili da self update).
  - `softDeleteUserForActor` impedisce il self-delete dal generic users registry.
  - Navigation allineata all'accesso reale: voce `Operators` sempre disponibile per OPERATOR (self-only fallback), voce `Users` visibile solo con `users.view`.

### File toccati

- `src/server/service/users.service.ts`
- `src/shared/navigation/config.ts`
- suite test identity (storica, poi semplificata)

### Validazione

- `npm run lint` -> pass
- `npm run test` -> pass
- `npm run build` -> pass
