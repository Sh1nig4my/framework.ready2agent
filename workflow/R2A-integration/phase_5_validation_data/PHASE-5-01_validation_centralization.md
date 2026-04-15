# [PHASE-5-01] Centralizzare tutti gli schemi di validazione core

Stato: completed

## Obiettivo

Concentrare gli schemi di validazione in moduli condivisi e senza duplicazioni rilevanti.

## Input

- Leggere:
  - `src/server/dto/auth.ts`
  - `src/server/lib/users/validation.ts`
  - `src/server/lib/operators/validation.ts`
  - `src/server/lib/administrators/validation.ts`
- Modificare:
  - i moduli di validazione esistenti

## Prompt operativo

```text
Implementa ONLY il task [PHASE-5-01] di Ready2Agent.

Leggi tutti i moduli di validazione e le route con schema inline elencati nel task file.

Obiettivo:
- centralizzare la validation del core

Implementa SOLO questo:
1. inventaria gli schemi esistenti
2. sposta quelli inline in moduli condivisi
3. applica una convenzione coerente di naming e collocazione

DO NOT:
- non mischiare validation di boundary e business logic
- non lasciare copie duplicate degli schemi

Validation:
- niente schema inline rilevante residuo
- naming coerente
- boundary validator centralizzati
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- i validator del core sono riordinati e riusabili
