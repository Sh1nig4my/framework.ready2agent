# [PHASE-3-01] Allineare durata sessione e remember me

Stato: completed

## Obiettivo

Portare la sessione al modello `24h default + remember me esteso`.

## Input

- Leggere:
  - `src/server/lib/auth/nextauth.ts`
  - `src/server/lib/auth/guards.ts`
  - `src/components/auth/login-form.tsx`
- Modificare:
  - `src/server/lib/auth/nextauth.ts`
  - `src/server/lib/auth/guards.ts`
  - `src/components/auth/login-form.tsx`

## Prompt operativo

```text
Implementa ONLY il task [PHASE-3-01] di Ready2Agent.

Leggi i file elencati nel task file `workflow/R2A-integration/phase_3_auth/PHASE-3-01_session_duration_remember_me.md`.

Obiettivo:
- allineare la sessione standard a 24h e il remember me a una durata estesa

Implementa SOLO questo:
1. centralizza le durate auth
2. rimuovi il vecchio modello 7d/2h
3. riallinea la copy della UI login

DO NOT:
- non cambiare ancora il payload auth
- non introdurre durate hardcoded sparse

Validation:
- standard 24h
- remember > standard
- UI coerente con runtime
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- la session semantics e conforme alla spec
