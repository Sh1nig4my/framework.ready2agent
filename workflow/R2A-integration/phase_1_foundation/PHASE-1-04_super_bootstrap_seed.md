# [PHASE-1-04] Introdurre first-run setup SUPER senza utenti demo bootstrapati

Stato: completed

## Obiettivo

Consentire bootstrap reale solo tramite first-run setup del SUPER senza bootstrapare utenti demo o account extra.

## Input

- Leggere:
  - `package.json`
  - `src/server/config/env.ts`
  - `src/server/service/bootstrap.service.ts`
  - `src/app/setup/page.tsx`
- Modificare:
  - `package.json`
  - `.env.example`
  - `src/server/config/env.ts`
  - `src/app/setup/page.tsx`
- Creare:
  - eventuale helper bootstrap/validation solo se strettamente necessario

## Prompt operativo

```text
Implementa ONLY il task [PHASE-1-04] di Ready2Agent.

Leggi prima i file elencati nel task file `workflow/R2A-integration/phase_1_foundation/PHASE-1-04_super_bootstrap_seed.md`.

Obiettivo:
- mantenere solo il bootstrap reale del SUPER tramite first-run setup
- eliminare ogni seed ADMIN come percorso di dominio
- evitare che il bootstrap iniziale esponga o generi utenti demo/addizionali

Implementa SOLO questo:
1. sostituisci i seed di bootstrap con un first-run setup applicativo su DB vuoto
2. rimuovi `seed-admin` e i relativi riferimenti di configurazione
3. non mostrare o generare account demo nel flusso base
4. documenta il flusso locale e Vercel coerentemente

DO NOT:
- non introdurre nuove scorciatoie di ruolo
- non eseguire seed automatici in build o deploy
- non sporcare il runtime live con account demo o sample accounts

Validation:
- first-run setup crea solo il SUPER iniziale
- nessun seed ADMIN residuo
- nessun account demo viene suggerito nella login pubblica
- nessuna utenza campione viene creata automaticamente in production
```

## Passi atomici

1. Introdurre il first-run setup sul DB vuoto.
2. Rimuovere seed ADMIN e riferimenti correlati.
3. Rimuovere hint e bootstrap di account demo dal flusso base.
4. Bloccare bootstrap extra nel runtime live.
5. Aggiornare la documentazione operativa e di deploy.

## Vincoli

- bootstrap reale solo via first-run setup
- niente seed automatici in build/deploy
- niente contaminazione demo nel dominio reale

## Validation

- first-run setup SUPER valido
- seed ADMIN rimosso
- nessun account demo bootstrapato nel flusso base

## Errori comuni

- lasciare seed ADMIN o bootstrap script legacy accessibili
- mescolare bootstrap reale e account demo di supporto
- eseguire bootstrap extra in `live`

## Done quando

- il bootstrap reale passa dal first-run setup e non espone account demo nel flusso base
