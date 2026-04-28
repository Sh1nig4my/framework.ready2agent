# [PHASE-7-03] Eseguire validazione finale contro spec, pulizia codice obsoleto e report di completamento

## Metadata

- Last Updated: 2026-04-10

Stato: completed

## Obiettivo

Dimostrare la conformita alla spec e lasciare il repository privo di residui legacy pericolosi.

## Input

- Leggere:
  - `documentation/core/README.md`
  - `documentation/method/alignment-model/README.md`
  - `documentation/method/execution-rules/README.md`
  - repository completo nelle aree toccate
- Modificare:
  - file obsoleti residui
- Creare:
  - report finale di conformita in `workflow/R2A-integration/`

## Prompt operativo

```text
Implementa ONLY il task [PHASE-7-03] di Ready2Agent.

Leggi la spec modulare, gli indici di alignment/execution e il repository completo nelle aree toccate.

Obiettivo:
- validare Ready2Agent punto-per-punto contro la spec
- rimuovere codice legacy residuale
- produrre un report finale di completamento

Implementa SOLO questo:
1. costruisci una checklist spec/DoD completa
2. verifica ogni punto con evidenza concreta
3. elimina route/helper/script legacy residui
4. genera un report finale di conformita

DO NOT:
- non dichiarare done senza evidenza
- non lasciare percorsi legacy attivi per comodita

Validation:
- suite completa verde
- nessun fallback insicuro residuo
- report finale con evidenze per ogni punto della spec
```

## Validation

- eseguire la checklist indicata nel prompt operativo
- verificare che i file in input siano stati letti e che lo scope sia stato rispettato
- confermare che non siano state introdotte modifiche fuori task

## Done quando

- esiste un report finale verificabile e il repository non contiene piu residui legacy critici
