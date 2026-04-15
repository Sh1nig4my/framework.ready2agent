# [PHASE-4-05] Introdurre un client REST interno e rimuovere i bypass ai service nelle pagine server

Stato: completed

## Obiettivo

Fare in modo che le pagine server del core usino il contratto REST invece dei service diretti.

## Input

- Leggere:
  - `src/app/dashboard/page.tsx`
  - `src/app/dashboard/administrators/page.tsx`
  - `src/app/dashboard/operators/page.tsx`
  - `src/app/dashboard/users/page.tsx`
  - eventuali altre pagine core che importano service
- Modificare:
  - le pagine server coinvolte
- Creare:
  - client REST server-side condiviso

## Prompt operativo

```text
Implementa ONLY il task [PHASE-4-05] di Ready2Agent.

Leggi tutte le pagine server core che importano service direttamente.

Obiettivo:
- rimuovere i bypass ai service e fare usare alle pagine il contratto REST interno

Implementa SOLO questo:
1. crea un client REST server-side condiviso
2. migra le pagine dashboard core a quel client
3. rimuovi gli import diretti dei service dal core UI

DO NOT:
- non introdurre Server Actions per la business logic
- non duplicare business mapping in pagina

Validation:
- nessuna pagina core importa service di dominio direttamente
- rendering ancora corretto
- payload coerenti con le API
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- REST e il boundary effettivamente usato dalle pagine core
