# Prompt: Unplanned Change Start

## Scopo

Gestire una modifica non pianificata o non schedulata nei flussi presenti in `workflow/`, mantenendo controllo tecnico, tracciabilita e allineamento documentale.

## Ordine di Lettura Obbligatorio

1. `README.md`
2. `documentation/quickstart/agent_start_here.md`
3. `documentation/README.md`
4. `documentation/core/README.md`
5. `documentation/method/README.md`
6. `workflow/README.md`
7. `prompts/README.md`

## Quando usarlo

- richiesta urgente fuori pianificazione workflow;
- hotfix o correzione critica non ancora presente nei task del flow;
- riallineamento puntuale richiesto da maintainer/stakeholder.

## Regole Operative

- mantieni codice applicativo solo in `src/`;
- non introdurre scorciatoie architetturali;
- aggiorna docs e link interni nello stesso ciclo della modifica;
- documenta chiaramente che la modifica e fuori schedulazione workflow;
- se necessario, aggiorna tracker/flow per rendere visibile la deviazione.

## Procedura

1. Definisci il perimetro minimo della modifica urgente.
2. Mappa i file da toccare (`src/` + docs correlate).
3. Implementa con impatto minimo e verificabile.
4. Aggiorna documentazione e riferimenti interni.
5. Esegui validazione finale: `npm run lint`, `npm test`, `npm run build`.
6. Produci report sintetico con motivazione della deviazione.

## Output Atteso

1. Modifica completata con scope minimo.
2. Evidenza di allineamento docs/workflow.
3. Esito validazioni (`lint`, `test`, `build`).
4. Nota operativa su eventuale follow-up da reinserire nel workflow standard.
