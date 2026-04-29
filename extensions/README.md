# R2A Extensions

## Metadata

- Ultimo aggiornamento: 2026-04-29
- Scope: scaffolding tecnico agnostico per estensioni dev-side

## Scopo

`extensions/` e l'area ufficiale per estensioni tecniche create da sviluppatori.
Le estensioni non sono runtime plugin: il Core non le carica in esecuzione e gli utenti finali non possono abilitarle/disabilitarle dal sistema.

## Principi

- Extensions dev-side only.
- Nessun extension loader a runtime nel Core.
- Nessuna configurazione extension lato UI utente.
- Il Core non dipende da estensioni specifiche.

## Regole

- Le extensions sono opzionali.
- Il Core non deve dipendere da una extension specifica.
- Una extension puo usare contratti esposti dal Core.
- Ogni extension deve dichiarare configurazione, schema, permissions, API surface, UI surface e documentazione.
- Ogni extension deve rispettare il pattern Controller/Service/Repository.
- Una extension non puo bypassare `src/server/lib/auth/access.ts`.
- Una extension deve dichiarare se introduce route, service, repository, componenti UI, permessi o modelli persistence.
- Ogni extension deve essere validata e documentata.

## Struttura consigliata

```text
extensions/
├── README.md
├── registry.md
├── _template/
└── <extension-id>/
    ├── README.md
    ├── extension.config.ts
    ├── schema.ts
    ├── permissions.ts
    └── docs.md
```

## Come creare una nuova extension

1. Ricevi input tecnico in forma testuale formale o file (`.md`, spec, note progetto).
2. Leggi `prompts/extension-generation-start.md` e definisci `extension-id` in kebab-case.
3. Duplica `_template/` in `extensions/<extension-id>/`.
4. Compila `extension.config.ts`, `schema.ts`, `permissions.ts`, `docs.md` e `README.md` in modo coerente con la richiesta.
5. Registra l'estensione in `extensions/registry.md` con riferimento alla richiesta formale.
6. Verifica che non esistano dipendenze runtime da `src/` verso `extensions/`.
7. Esegui validazione repository: `npm run lint`, `npm test`, `npm run build`.

## Definition Of Done (Extension)

- cartella `extensions/<extension-id>/` creata da template ufficiale;
- `extension.config.ts` compilato con `declares` coerente al perimetro;
- `schema.ts` e `permissions.ts` compilati o motivatamente vuoti;
- `docs.md` con overview, contratti, sicurezza, validazione;
- `README.md` extension con scopo e stato;
- entry registrata in `extensions/registry.md`;
- nessun caricamento runtime nel Core;
- validazione `lint`, `test`, `build` completata.

## Nota

Le estensioni sono pensate per accelerare sviluppo tecnico e standardizzare moduli futuri.
Non costituiscono una capability di customizzazione runtime per utenti del prodotto.
