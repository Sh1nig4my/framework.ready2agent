# [PHASE-1-02] Rimuovere fallback insicuri e migrare i consumer al modulo env

## Metadata

- Last Updated: 2026-04-10

Stato: completed

## Obiettivo

Sostituire nei moduli core le letture sensibili di `process.env` con il modulo `env` validato.

## Input

- Leggere:
  - `src/server/config/env.ts`
  - `src/server/lib/auth/nextauth.ts`
  - `src/server/lib/auth/tokens.ts`
  - `src/server/db/mongoose.ts`
  - `src/server/config/feature-flags.ts`
- Modificare:
  - `src/server/lib/auth/nextauth.ts`
  - `src/server/lib/auth/tokens.ts`
  - `src/server/db/mongoose.ts`
  - `src/server/config/feature-flags.ts`

## Prompt operativo

```text
Implementa ONLY il task [PHASE-1-02] di Ready2Agent.

Leggi prima tutti i file elencati nel task file `workflow/R2A-integration/phase_1_foundation/PHASE-1-02_secure_env_consumers.md`.

Obiettivo:
- migrare i consumer core al modulo `env`
- eliminare fallback insicuri

Implementa SOLO questo:
1. sostituisci le letture dirette sensibili con `env`
2. elimina fallback di secret, pepper, credenziali e configurazioni sensibili
3. mantieni solo eventuali default innocui e giustificati

DO NOT:
- non cambiare ancora la semantica demo/live
- non alterare il dominio auth

Validation:
- nessun fallback sensibile rimasto
- moduli core leggono `env`
- nomi env coerenti con `.env.example`
```

## Passi atomici

1. Trovare i fallback sensibili.
2. Sostituire con `env`.
3. Eliminare stringhe hardcoded.
4. Verificare i branch di configurazione rimasti.

## Vincoli

- niente secret con default
- niente business logic modificata

## Validation

- grep non trova piu secret fallback noti
- moduli core leggono la config centralizzata

## Errori comuni

- lasciare un `process.env` sensibile in un modulo secondario
- sostituire con stringhe vuote invece che con validazione corretta

## Done quando

- i consumer core non dipendono piu da fallback insicuri

## Execution Notes (2026-04-11)

- Completata la migrazione dei consumer sensibili residui a `env` in area auth/invite/support/audit.
- Rimossi fallback runtime su `NEXT_PUBLIC_APP_URL` nei link auth/invite e uso centralizzato `env.app.publicUrl`.
- Allineato TTL audit model a `env.audit.ttlSeconds`.

Validation eseguite:
- `npm run lint`
- `npm test`
- `npm run build`
