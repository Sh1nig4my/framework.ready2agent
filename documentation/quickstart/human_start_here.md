# Human Start Here

## Metadata

- Ultimo aggiornamento: 2026-04-28
- Pubblico: sviluppatori umani
- Status: attivo

## Percorso Rapido

1. Leggi `README.md`
2. Leggi `documentation/README.md`
3. Leggi `documentation/core/README.md`
4. Leggi `documentation/method/README.md`
5. Leggi `workflow/README.md` per le esecuzioni concrete
6. Leggi `prompts/README.md` per i prompt operativi

Approfondimento opzionale:

- `documentation/R2A_full-ai-context.md` (contesto completo per analisi estese e passaggio a LLM esterni)

## Struttura Progetto (Essenziale)

```text
src/             codice applicativo (frontend, backend, test, script)
documentation/   documentazione completa progetto
workflow/        esecuzione task-by-task e metodologia
prompts/         prompt operativi
extensions/      area opzionale futura per plugin
public/          asset statici
```

## Comandi Base

```bash
npm install
npm run dev
npm run lint
npm test
npm run build
```

## Personalizzazione Colori UI

Per cambiare i colori base del progetto clonato modifica `src/config/r2a-theme.ts`.

- personalizzabile: token colore superficiali (`brand`, `surface`, `text`, `state`)
- non personalizzabile: layout, gerarchie UI e logica applicativa
- modello: configurazione statica a codice (non plugin, non DB, non per-utente)
