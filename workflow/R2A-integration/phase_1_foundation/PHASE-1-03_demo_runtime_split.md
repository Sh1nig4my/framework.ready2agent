# [PHASE-1-03] Separare demo mode e runtime reale

Stato: completed

## Obiettivo

Rendere esplicita la differenza tra runtime live e demo/test.

## Input

- Leggere:
  - `src/server/config/env.ts`
  - `src/server/config/feature-flags.ts`
  - `src/server/db/mongoose.ts`
  - `src/server/lib/demo/store.ts`
- Modificare:
  - `src/server/config/feature-flags.ts`
  - `src/server/db/mongoose.ts`
  - `src/server/lib/demo/store.ts`

## Prompt operativo

```text
Implementa ONLY il task [PHASE-1-03] di Ready2Agent.

Leggi prima i file elencati nel task file `workflow/R2A-integration/phase_1_foundation/PHASE-1-03_demo_runtime_split.md`.

Obiettivo:
- rimuovere l'attivazione implicita della demo
- distinguere esplicitamente runtime live e demo/test

Implementa SOLO questo:
1. definisci il criterio esplicito di runtime demo/test
2. aggiorna feature flags e DB bootstrap
3. assicurati che l'assenza DB in live non attivi demo da sola

DO NOT:
- non introdurre ambienti complessi o non richiesti
- non cambiare ancora i flussi di business

Validation:
- live senza DB fallisce
- demo/test funziona solo con opt-in esplicito
- nessun fallback demo implicito rimasto
```

## Passi atomici

1. Identificare dove la demo e implicita.
2. Definire la nuova regola runtime.
3. Aggiornare flags e DB init.
4. Verificare il comportamento demo/test.

## Vincoli

- supporto test locali preservato
- niente dati demo in live

## Validation

- runtime esplicito
- nessun fallback automatico

## Errori comuni

- lasciare un branch implicito di demo
- rompere i test locali

## Done quando

- il runtime demo/test e esplicito e il live non degrada automaticamente
