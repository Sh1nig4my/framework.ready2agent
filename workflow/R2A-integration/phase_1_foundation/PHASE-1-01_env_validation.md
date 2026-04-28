# [PHASE-1-01] Creare la validazione centrale delle env e il bootstrap fail-fast

## Metadata

- Last Updated: 2026-04-10

Stato: completed

## Obiettivo

Creare `src/server/config/env.ts` come unico punto di parsing/validazione della configurazione runtime.

## Input

- Leggere:
  - `.env.example`
  - `src/server/config/feature-flags.ts`
  - `src/server/lib/auth/nextauth.ts`
  - `src/server/lib/auth/tokens.ts`
  - `src/server/db/mongoose.ts`
  - `package.json`
- Modificare:
  - `.env.example`
- Creare:
  - `src/server/config/env.ts`

## Prompt operativo

```text
Implementa ONLY il task [PHASE-1-01] di Ready2Agent.

Source of truth:
- documentation/core/README.md
- documentation/method/alignment-model/README.md
- documentation/method/execution-rules/README.md

Leggi prima tutti i file elencati nel task file `workflow/R2A-integration/phase_1_foundation/PHASE-1-01_env_validation.md`.

Obiettivo:
- creare `src/server/config/env.ts` come modulo unico di parsing/validazione delle env
- aggiornare `.env.example` in modo coerente

Implementa SOLO questo:
1. censisci tutte le env usate nei file in scope
2. classificale per dominio: app, auth, database, servizi opzionali, runtime, demo/test
3. rendi esplicite le env obbligatorie per runtime reali e quelle opzionali per demo/test
4. crea `src/server/config/env.ts`
5. aggiorna `.env.example`

DO NOT:
- non cambiare business logic
- non toccare ancora i consumer per usare `env` salvo import indispensabili
- non introdurre nuovi concetti di dominio

Validation:
- elenco completo env censite
- modulo env centrale creato
- `.env.example` coerente
- nessun secret con default nel nuovo modulo

Output richiesto:
1. file letti
2. file creati/modificati
3. env censite per categoria
4. checklist validation
5. blocker eventuali
```

## Passi atomici

1. Censire ogni `process.env` dei file in scope.
2. Distinguere env live da demo/test.
3. Disegnare il contratto finale.
4. Scrivere `src/server/config/env.ts`.
5. Aggiornare `.env.example`.

## Vincoli

- no secret hardcoded
- fail-fast in live
- niente feature flag DB-driven

## Validation

- tutte le env core sono censite
- `src/server/config/env.ts` esiste
- `.env.example` descrive il contratto reale
- onboarding locale verificato con `.env.local`
- bootstrap del primo `SUPER` verificato manualmente su DB vuoto con `MONGODB_URI` reale

## Note di validazione manuale

- Test utente eseguito in locale con `.env.local` reale e MongoDB Atlas configurato
- Redirect corretto a `/setup` su database vuoto
- Creazione corretta del primo account `SUPER` dal form di first-run setup
- Chiusura task confermata dall'utente dopo verifica positiva dell'onboarding locale

## Errori comuni

- dimenticare env usate negli script
- mescolare live e demo nello stesso set obbligatorio
- lasciare default sensibili nel modulo nuovo

## Done quando

- il contratto env e centralizzato e leggibile
- il repository ha una base chiara per migrare i consumer al task successivo
