# [PHASE-2-02] Riscrivere la policy centrale di accesso con self-only di default

Stato: completed

## Obiettivo

Fare di `src/server/lib/auth/access.ts` la fonte unica delle decisioni di accesso.

## Input

- Leggere:
  - `src/server/lib/auth/access.ts`
  - `src/shared/auth/admin-permissions.catalog.ts`
  - `src/shared/auth/permissions.catalog.ts`
  - `src/server/lib/auth/user-defaults.ts`
  - `src/server/lib/users/types.ts`
- Modificare:
  - `src/server/lib/auth/access.ts`
  - `src/server/lib/auth/user-defaults.ts` solo se necessario

## Prompt operativo

```text
Implementa ONLY il task [PHASE-2-02] di Ready2Agent.

Leggi i file elencati nel task file `workflow/R2A-integration/phase_2_identity/PHASE-2-02_access_policy_self_only.md`.

Obiettivo:
- imporre self-only by default
- eliminare l'equivalenza ADMIN == SUPER

Implementa SOLO questo:
1. correggi `hasSystemPermission`
2. correggi self access e directory visibility
3. lascia helper chiari e coerenti con la spec

DO NOT:
- non spostare logica in UI
- non lasciare shortcut di ruolo troppo permissive

Validation:
- ADMIN senza permessi vede solo se stesso
- OPERATOR senza permessi vede solo se stesso
- USER vede solo se stesso
```

## Validation

- self-only globale corretto
- no ADMIN full access implicito

## Errori comuni

- correggere solo un helper e non il modello complessivo

## Done quando

- `access.ts` e coerente e centralizzato
