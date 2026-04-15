# [PHASE-4-02] Uniformare gli handler API auth a un pattern controller condiviso

Stato: completed

## Obiettivo

Ridurre duplicazione nei controller auth e mantenere business logic nei service.

## Input

- Leggere:
  - route auth sotto `src/app/api/auth/**`
  - `src/server/errors/response.ts`
- Modificare:
  - route auth coinvolte
- Creare:
  - eventuale helper controller condiviso

## Prompt operativo

```text
Implementa ONLY il task [PHASE-4-02] di Ready2Agent.

Leggi tutte le route auth e `src/server/errors/response.ts`.

Obiettivo:
- uniformare i controller auth a un pattern sottile e condiviso

Implementa SOLO questo:
1. estrai il pattern comune minimo
2. mantieni validation di boundary e business logic nei service
3. applica il pattern a tutte le route auth

DO NOT:
- non introdurre Server Actions
- non spostare business logic nei controller

Validation:
- route auth omogenee
- boilerplate ridotto
- error/response handling comune
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- tutti gli handler auth sono uniformi e leggibili
