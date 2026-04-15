# [PHASE-3-03] Rafforzare cookie e security config di NextAuth

Stato: completed

## Obiettivo

Applicare cookie security esplicita e usare solo config validata.

## Input

- Leggere:
  - `src/server/lib/auth/nextauth.ts`
  - `src/server/config/env.ts`
- Modificare:
  - `src/server/lib/auth/nextauth.ts`

## Prompt operativo

```text
Implementa ONLY il task [PHASE-3-03] di Ready2Agent.

Leggi i file elencati nel task file `workflow/R2A-integration/phase_3_auth/PHASE-3-03_nextauth_cookie_security.md`.

Obiettivo:
- rendere esplicita e sicura la config cookie/session di NextAuth

Implementa SOLO questo:
1. configura cookie `secure`, `httpOnly`, `sameSite`
2. usa solo secret da `env`
3. distingui localhost da live senza indebolire live

DO NOT:
- non introdurre workaround client-side
- non lasciare cookie auth non protetti in runtime non locali

Validation:
- cookie security esplicita
- compatibilita locale preservata
- nessun secret fuori `env`
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- la config NextAuth usa cookie espliciti e sicuri
