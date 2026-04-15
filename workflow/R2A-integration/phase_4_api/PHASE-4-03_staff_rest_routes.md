# [PHASE-4-03] Standardizzare le route REST per administrators e operators

Stato: completed

## Obiettivo

Eliminare route duplicate/ambigue e consolidare il contratto REST staff.

## Input

- Leggere:
  - route `src/app/api/administrators/**`
  - route `src/app/api/operators/**`
  - verifica assenza endpoint generico legacy `src/app/api/invites/accept/route.ts`
- Modificare:
  - route staff necessarie
- Eliminare:
  - eventuali residui endpoint generico `src/app/api/invites/accept/route.ts`

## Prompt operativo

```text
Implementa ONLY il task [PHASE-4-03] di Ready2Agent.

Leggi tutte le route staff e conferma che `src/app/api/invites/accept/route.ts` non sia presente.

Obiettivo:
- standardizzare le API staff in chiave REST
- rimuovere duplicazioni di accept invite

Implementa SOLO questo:
1. definisci il set finale di route staff
2. elimina la route aggregata duplicata
3. allinea i controller ai service corretti

DO NOT:
- non lasciare due endpoint validi per la stessa operazione
- non reintrodurre naming ambiguo

Validation:
- route staff univoche
- accept invite non duplicato
- contract uniforme
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- administrators e operators hanno route coerenti e senza sovrapposizioni
