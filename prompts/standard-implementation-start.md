# Prompt: Standard Implementation Start

## Scopo

Avviare una modifica standard (feature, bugfix, refactor mirato) con percorso operativo coerente e aggiornamento documentale contestuale.

## Ordine di Lettura Obbligatorio

1. `README.md`
2. `documentation/quickstart/agent_start_here.md`
3. `documentation/operational/README.md`
4. `documentation/operational/spec/README.md`
5. `documentation/operational/alignment/README.md`
6. `documentation/operational/execution/README.md`
7. `workflow/README.md`
8. `prompts/README.md`

Nota: `documentation/R2A_full-ai-context.md` e un contesto completo per analisi estese/chat LLM esterne; non e necessario leggerlo a ogni task operativo.

## Regole di Esecuzione

- Mantieni codice applicativo dentro `src/`.
- Rispetta i boundary Controller/Service/Repository.
- Aggiorna la documentazione impattata nello stesso ciclo della modifica.
- Evita scorciatoie architetturali e riferimenti a path legacy.

## Procedura

1. Definisci scope tecnico della modifica.
2. Individua file interessati (codice + docs).
3. Implementa il cambiamento minimo coerente.
4. Aggiorna link, riferimenti e note operative correlate.
5. Valida con `npm run lint`, `npm test`, `npm run build`.

## Output Atteso

- breve descrizione di cosa e cambiato e perche;
- file toccati;
- verifica eseguita;
- eventuali next step.
