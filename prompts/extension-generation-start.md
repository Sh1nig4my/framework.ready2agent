# Prompt: Extension Generation Start

## Scopo

Tradurre una richiesta tecnica dello sviluppatore in una extension concreta dentro `extensions/`, senza introdurre alcun comportamento runtime modificabile da utenti finali.

## Ordine di Lettura Obbligatorio

1. `README.md`
2. `documentation/quickstart/agent_start_here.md`
3. `documentation/README.md`
4. `documentation/core/README.md`
5. `documentation/method/README.md`
6. `workflow/README.md`
7. `prompts/README.md`
8. `extensions/README.md`
9. `extensions/registry.md`

## Principio Fondante

Le extensions in R2A sono dev-side scaffolding:

- nessun caricamento runtime nel Core;
- nessuna UI per abilitazione/disabilitazione da utenti;
- nessuna mutazione comportamento sistema da pannelli applicativi.

## Input Richiesto

- richiesta tecnica formale in testo oppure file allegato (spec, brief, ADR, note);
- dominio funzionale e obiettivo tecnico;
- eventuali vincoli su schema, permessi, API/UI surface;
- criteri di accettazione richiesti dal tecnico.

## Procedura

1. Converti la richiesta in `extension-id` in kebab-case.
2. Crea `extensions/<extension-id>/` da template ufficiale.
3. Compila file minimi: `extension.config.ts`, `schema.ts`, `permissions.ts`, `docs.md`, `README.md`.
4. Aggiorna `extensions/registry.md` con la nuova entry.
5. Verifica che l'extension resti standalone e non-runtime.
6. Aggiorna documentazione correlata se cambiano regole o convenzioni.
7. Esegui validazione finale: `npm run lint`, `npm test`, `npm run build`.

## Definition Of Done Operativa

- extension creata in `extensions/<extension-id>/` da template ufficiale;
- metadati coerenti tra `README.md`, `extension.config.ts` e `registry.md`;
- dichiarazioni `declares` congruenti con l'input tecnico;
- nessuna dipendenza runtime introdotta verso `extensions/`;
- documentazione extension compilata con rischi e verifiche;
- esito validazioni disponibile (`lint`, `test`, `build`).

## Vincoli Obbligatori

- niente dipendenze runtime da `src/` verso `extensions/`;
- niente bypass di `src/server/lib/auth/access.ts`;
- dichiarare in config se l'extension prevede route/service/repository/UI/permissions/persistence;
- documentare scopo, rischi e criteri di verifica.

## Output Atteso

1. Nuova extension generata in `extensions/<extension-id>/`.
2. Registry aggiornato.
3. Documentazione extension compilata.
4. Esito validazioni (`lint`, `test`, `build`).
