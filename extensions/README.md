# R2A Extensions

## Scopo

`extensions/` e la predisposizione architetturale per moduli opzionali futuri.
Non contiene feature runtime attive e non introduce dipendenze del Core.

## Regole

- Le extensions sono opzionali.
- Il Core non deve dipendere da una extension specifica.
- Una extension puo usare contratti esposti dal Core.
- Ogni extension deve dichiarare configurazione, schema, permissions, API surface, UI surface e documentazione.
- Ogni extension deve rispettare il pattern Controller/Service/Repository.
- Una extension non puo bypassare `src/server/lib/auth/access.ts`.
- Una extension deve dichiarare se introduce route, service, repository, componenti UI, permessi o modelli persistence.
- Ogni extension deve essere validata e documentata.

## Nota

Questa cartella e solo una predisposizione strutturale. Nessuna extension reale e implementata in questa fase.
Un esempio futuro possibile potrebbe essere un modulo anagrafica configurabile via schema/config TypeScript.
