# Prompt: Implement R2A Theme Config

## Scopo

Implementare in Ready2Agent un sistema minimo e stabile di configurazione grafica basato su theme tokens, così che chi clona il framework possa personalizzare alcuni colori superficiali dell’interfaccia senza modificare layout, componenti strutturali o logica applicativa.

Questa modifica deve restare piccola, controllata e coerente con l’identità del progetto:

```text
R2A = Core + Method + Extensions
```

Il lavoro riguarda il Core runtime solo a livello di presentazione visiva superficiale. Non deve introdurre un sistema di theming dinamico, un pannello admin, configurazioni persistite a database o dipendenze da Extensions.

---

## Ordine di Lettura Obbligatorio

Prima di modificare qualsiasi file, leggi in ordine:

1. `README.md`
2. `documentation/quickstart/agent_start_here.md`
3. `documentation/README.md`
4. `documentation/core/README.md`
5. `documentation/method/README.md`
6. `workflow/README.md`
7. `prompts/README.md`
8. `prompts/standard-implementation-start.md`

Se durante l’analisi emergono dubbi architetturali o rischio di drift documentale, leggi anche:

9. `documentation/R2A_full-ai-context.md`

---

## Obiettivo Funzionale

Aggiungere un file di configurazione ufficiale:

```text
src/config/r2a-theme.ts
```

Questo file deve contenere i token grafici minimi modificabili da chi scarica il framework.

Esempio concettuale:

```ts
export const r2aTheme = {
  brand: {
    primary: "#2563eb",
    secondary: "#0f172a",
    accent: "#22c55e",
  },
  surface: {
    background: "#ffffff",
    muted: "#f8fafc",
    border: "#e2e8f0",
  },
  text: {
    primary: "#0f172a",
    muted: "#64748b",
    inverse: "#ffffff",
  },
} as const;
```

L’esempio è indicativo: scegli i token finali dopo aver ispezionato la UI esistente, mantenendo lo scope minimo.

---

## Vincoli Non Negoziabili

- Il file di configurazione deve stare in `src/config/r2a-theme.ts`.
- Non collocare il tema in `src/shared/`.
- Non modificare il layout delle pagine.
- Non introdurre varianti di layout.
- Non introdurre una UI per modificare il tema.
- Non introdurre salvataggio del tema su MongoDB.
- Non introdurre tema per singolo utente.
- Non introdurre tema per ruolo.
- Non introdurre dipendenze runtime verso `extensions/`.
- Non trasformare questa modifica in un plugin system.
- Non rompere il pattern architetturale Controller -> Service -> Repository.
- Non spostare logica applicativa dentro componenti UI.
- Non cambiare auth, ruoli, setup SUPER, API policy o access control.
- Non cambiare naming/tassonomia ufficiale R2A.
- Non usare path legacy o riferimenti documentali obsoleti.

---

## Interpretazione Corretta dello Scope

Questa feature deve essere trattata come:

```text
R2A Visual Theme Tokens
```

Non deve essere trattata come:

```text
R2A UI Customization System
```

La differenza è importante.

Lo scopo è permettere una personalizzazione superficiale e sicura di colori e token visivi, non rendere la UI configurabile o componibile.

---

## Implementazione Tecnica Attesa

### 1. Creare `src/config/r2a-theme.ts`

Definisci un oggetto `r2aTheme` tipizzato e stabile.

Il file deve:

- esportare un oggetto `r2aTheme`;
- usare `as const` o tipizzazione equivalente;
- contenere solo token visivi semplici;
- evitare funzioni complesse;
- evitare side effect;
- essere leggibile da utenti che vogliono cambiare rapidamente colori base.

Token consigliati, da adattare alla UI esistente:

- `brand.primary`
- `brand.secondary`
- `brand.accent`
- `surface.background`
- `surface.muted`
- `surface.card`
- `surface.border`
- `text.primary`
- `text.muted`
- `text.inverse`
- `state.success`
- `state.warning`
- `state.danger`

Mantieni il set piccolo. Non aggiungere token se non vengono realmente usati.

---

### 2. Collegare il tema a CSS variables globali

Individua il file globale degli stili, ad esempio:

```text
src/app/globals.css
```

o equivalente reale nel repository.

Integra i token del tema tramite CSS custom properties, per esempio:

```css
:root {
  --r2a-color-primary: #2563eb;
  --r2a-color-background: #ffffff;
  --r2a-color-text: #0f172a;
}
```

Se il progetto usa Tailwind CSS, verifica il modo più semplice e stabile per far convivere Tailwind e CSS variables senza introdurre complessità inutile.

Obiettivo: i componenti devono poter usare variabili come:

```css
var(--r2a-color-primary)
```

oppure classi Tailwind compatibili con CSS variables, se già presenti nello stile del progetto.

---

### 3. Sostituire hardcoded colors principali

Cerca nella UI colori hardcoded principali, soprattutto:

- colori brand;
- colori background;
- colori card/surface;
- colori border;
- colori testo;
- colori bottoni o azioni principali.

Sostituisci solo quelli che rientrano nello scope del tema.

Non fare refactor estetici estesi.

Non riscrivere componenti.

Non cambiare spacing, layout, gerarchie, copy, navigazione o comportamento.

---

### 4. Mantenere fallback sicuri

Il framework deve continuare a funzionare anche se l’utente cambia i valori del tema.

Usa valori validi e documenta che i token devono essere colori CSS validi, preferibilmente HEX.

Non serve implementare validazione runtime sofisticata.

Se utile, puoi aggiungere commenti brevi in `r2a-theme.ts`, ma evita documentazione eccessiva dentro il codice.

---

### 5. Documentare la personalizzazione

Aggiorna la documentazione minima necessaria.

Documenti probabilmente impattati:

- `README.md`
- `documentation/core/README.md` oppure un file più specifico sotto `documentation/core/architecture/`
- `documentation/quickstart/human_start_here.md`, se esiste ed è pertinente
- `documentation/R2A_full-ai-context.md`, se il contesto esteso deve restare allineato

La documentazione deve spiegare:

- che R2A espone un file minimo di configurazione tema;
- che il file ufficiale è `src/config/r2a-theme.ts`;
- quali categorie di token sono modificabili;
- che il layout non è configurabile;
- che questa feature non è un plugin e non appartiene a Extensions;
- che le modifiche al tema sono statiche e avvengono a livello codice/config del progetto clonato.

---

## Criteri di Accettazione

La modifica è completata solo se:

1. Esiste `src/config/r2a-theme.ts`.
2. I token principali del tema sono definiti in modo chiaro.
3. La UI usa i token per almeno i principali colori superficiali.
4. Il layout resta invariato.
5. Non viene introdotta configurazione runtime via DB.
6. Non viene introdotta configurazione per utente.
7. Non viene introdotta dipendenza da `extensions/`.
8. La documentazione indica come personalizzare i colori.
9. La documentazione chiarisce i limiti della feature.
10. `npm run lint` passa.
11. `npm test` passa.
12. `npm run build` passa.

---

## Procedura Operativa

1. Leggi i file obbligatori.
2. Ispeziona la struttura reale di `src/`, in particolare:
   - `src/app/`
   - `src/components/`
   - eventuali file globali CSS
   - eventuali configurazioni Tailwind/PostCSS
3. Individua dove sono definiti oggi colori e classi visuali principali.
4. Crea `src/config/r2a-theme.ts`.
5. Integra i token nel sistema CSS globale.
6. Sostituisci solo gli hardcoded colors più rilevanti.
7. Aggiorna documentazione e riferimenti.
8. Esegui validazione:
   ```bash
   npm run lint
   npm test
   npm run build
   ```
9. Produci un report finale.

---

## Report Finale Richiesto

Alla fine del task, rispondi con:

```text
## Summary
- Cosa è stato implementato
- Perché la modifica è coerente con R2A

## Files Changed
- Lista dei file modificati
- Breve motivo per ogni file

## Theme Tokens
- Lista sintetica dei token introdotti

## Scope Boundaries
- Conferma che non sono stati modificati layout, auth, DB, ruoli, API o Extensions

## Validation
- npm run lint: esito
- npm test: esito
- npm run build: esito

## Notes / Next Steps
- Eventuali limiti noti
- Eventuali miglioramenti futuri, solo se realmente necessari
```

---

## Nota Finale Importante

Implementa la soluzione minima coerente.

Questa modifica deve aumentare la personalizzabilità superficiale del framework senza aumentare in modo significativo la complessità architetturale.

Se durante l’implementazione emerge la tentazione di introdurre opzioni più avanzate, fermati e mantieni lo scope su theme tokens statici in `src/config/r2a-theme.ts`.
