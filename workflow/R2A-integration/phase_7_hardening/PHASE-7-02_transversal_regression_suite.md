# [PHASE-7-02] Costruire le regression suite su audit e compliance

Stato: completed

## Obiettivo

Proteggere con test automatici le aree trasversali piu sensibili.

## Input

- Leggere:
  - test esistenti su audit/compliance
  - service e route toccati nelle fasi 6 e 7
- Modificare:
  - test esistenti correlati
- Creare:
  - test mancanti su audit e compliance

## Prompt operativo

```text
Implementa ONLY il task [PHASE-7-02] di Ready2Agent.

Leggi gli altri test trasversali esistenti e i moduli toccati nelle fasi 6 e 7.

Obiettivo:
- costruire regression suite su audit e compliance

Implementa SOLO questo:
1. aggiungi test su audit obbligatori e access control
2. aggiungi test su pagine compliance e route pubbliche correlate

DO NOT:
- non limitarti agli happy path
- non usare provider esterni reali

Validation:
- casi negativi coperti
- audit verificato
- compliance routes testate
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- la suite trasversale copre i rischi principali non-core
