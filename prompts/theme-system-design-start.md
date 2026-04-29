# Prompt: Theme System Design Start

## Scopo

Avviare una modifica grafica professionale del sistema basata su analisi approfondita della UI esistente e aggiornamento dei token in `src/config/r2a-theme.ts`.

## Ordine di Lettura Obbligatorio

1. `README.md`
2. `documentation/quickstart/agent_start_here.md`
3. `documentation/README.md`
4. `documentation/core/README.md`
5. `documentation/method/README.md`
6. `workflow/README.md`
7. `prompts/README.md`

## Input Possibili

- richiesta colori del committente;
- linee guida brand;
- logo aziendale/progetto (se disponibile) per analisi cromatica.

## Regole Non Negoziabili

- modifica tema solo tramite `src/config/r2a-theme.ts`;
- non cambiare layout, flussi o logica runtime;
- non introdurre theming runtime, DB, per-utente o per-ruolo;
- non introdurre dipendenze da `extensions/`;
- mantenere risultato leggibile, accessibile e coerente su desktop/mobile.

## Procedura

1. Analizza i token correnti in `src/config/r2a-theme.ts` e il loro uso nella UI.
2. Studia superficie grafica reale (background, card, border, testo, stati).
3. Se presente un logo, estrai palette primaria/secondaria/accento e verifica contrasti.
4. Proponi una palette professionale con equilibrio tra identita e usabilita.
5. Applica i token nel file tema mantenendo scope minimo e statico.
6. Aggiorna documentazione correlata sui limiti del theming R2A.
7. Esegui validazione finale: `npm run lint`, `npm test`, `npm run build`.

## Criteri Qualitativi

- coerenza palette (primary/secondary/accent) senza disturbi visivi;
- contrasto leggibile per testo principale e secondario;
- uniformita tra superfici (`background`, `muted`, `card`, `border`);
- stati (`success`, `warning`, `danger`) distinti ma armonici.

## Output Atteso

1. Tema aggiornato in `src/config/r2a-theme.ts`.
2. Motivazione sintetica delle scelte cromatiche.
3. Documentazione allineata con limiti e modalita d'uso.
4. Esito validazioni (`lint`, `test`, `build`).
