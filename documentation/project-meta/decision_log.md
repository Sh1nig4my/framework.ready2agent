# Decision Log - Registro Decisioni Ad Alto Impatto

## Metadata

- **Ultimo aggiornamento**: 2026-04-29
- **Pubblico**: agenti di coding, stakeholder
- **Status**: attivo

---

## Scopo

Registro sintetico delle **decisioni implementative e documentali ad alto impatto**.

## Formato Entry

```markdown
### YYYY-MM-DD - Titolo

- **Area**: area della decisione
- **Decisione**: cosa è stato deciso
- **Motivazione**: perché
- **Impatto**: cosa è cambiato
- **Documenti aggiornati**: file modificati
```

---

## Entries

### 2026-04-29 - Extensions agnostiche e flusso generazione formalizzato

- **Area**: Extensions governance, prompt model, repository alignment
- **Decisione**: Rimossa qualunque extension di esempio dal repository e formalizzato il modello agnostico di generazione extension a partire da richiesta tecnica testuale o file formale.
- **Motivazione**: Evitare bias implementativi nel ramo `extensions/` e mantenere il sistema neutro, riusabile e coerente con il principio dev-side non-runtime.
- **Impatto**: Eliminata la cartella `extensions/customer-profile/`, reso il `registry.md` strutturale con placeholder, rafforzati `extensions/README.md` e `prompts/extension-generation-start.md` con DoD e flusso operativo.
- **Documenti aggiornati**: `extensions/README.md`, `extensions/registry.md`, `extensions/_template/extension.config.ts`, `prompts/extension-generation-start.md`, `documentation/project-meta/decision_log.md`

---

### 2026-04-29 - Prompt hub esteso e completamento area extensions dev-side

- **Area**: Prompt operations, workflow/prompt path alignment, estensioni tecniche
- **Decisione**: Consolidato `prompts/` come hub unico con nuovi prompt operativi (unplanned change, theme design, extension generation), riallineati i path post-refactor verso `prompts/maintenance-workflow/` e completata l'area `extensions/` con registry strutturato, template rinforzato ed extension esempio non-runtime.
- **Motivazione**: Eliminare riferimenti legacy, coprire casi operativi mancanti e rendere realmente utilizzabile il flusso di generazione extension per sviluppatori.
- **Impatto**: Aggiornati README e documenti chiave, introdotti tre nuovi prompt ufficiali, chiarito ovunque che le extensions non agiscono a runtime e non sono modificabili da utenti.
- **Documenti aggiornati**: `prompts/README.md`, `prompts/unplanned-change-start.md`, `prompts/theme-system-design-start.md`, `prompts/extension-generation-start.md`, `prompts/maintenance-workflow/*`, `workflow/README.md`, `workflow/requirements/README.md`, `extensions/*`, `README.md`, `documentation/quickstart/agent_start_here.md`, `documentation/quickstart/human_start_here.md`, `documentation/core/README.md`, `documentation/R2A_full-ai-context.md`, `documentation/project-meta/decision_log.md`

---

### 2026-04-28 - Content and Learning Realignment baseline

- **Area**: Documentazione, learning path, workflow requirements governance
- **Decisione**: Avviato il riallineamento Content & Learning con audit globale link/percorsi; formalizzato `workflow/requirements/r2a-core/` come spec didattica viva da mantenere allineata riga-per-riga allo stato corrente.
- **Motivazione**: Preservare valore didattico del metodo agentico reale evitando drift tra documentazione corrente e requirement branch Core.
- **Impatto**: Corretti path incoerenti (`documentation/documentation/*`), uniformati riferimenti in workflow requirements/maintenance, introdotto README dedicato per `r2a-core` e chiarito il contratto di manutenzione continua.
- **Documenti aggiornati**: `workflow/requirements/README.md`, `workflow/requirements/r2a-core/README.md`, `workflow/requirements/r2a-core/ready2agent_master_spec_v2_1.md`, `prompts/maintenance-workflow/prompt-01-generate-integration-chapters.md`, `documentation/R2A_full-ai-context.md`, `documentation/core/user-detail-blueprint.md`

---

### 2026-04-28 - Tassonomia ufficiale R2A Core / Method / Extensions

- **Area**: Architettura documentale, governance repository, prompt/workflow alignment
- **Decisione**: Formalizzata la tassonomia `R2A = Core + Method + Extensions`; `src/` resta runtime Core, `documentation/` viene separata in `core/` e `method/`, `workflow/` resta layer execution instances, `prompts/` resta interfaccia operativa agenti, `extensions/` viene introdotta come area opzionale futura.
- **Motivazione**: Rendere il repository pubblicabile, pulito e coerente senza deprecazioni, bridge o doppie strutture valide.
- **Impatto**: Migrazione contenuti dalla struttura precedente a `documentation/core/` e `documentation/method/`, creazione `extensions/_template/`, rimozione delle aree documentali precedenti e aggiornamento ordine di lettura e riferimenti interni.
- **Documenti aggiornati**: `README.md`, `documentation/README.md`, `documentation/core/*`, `documentation/method/*`, `documentation/quickstart/*`, `prompts/*`, `workflow/README.md`, `documentation/R2A_full-ai-context.md`, `documentation/project-meta/*`, `extensions/*`

---

### 2026-04-27 - Post-refactor alignment completo (docs + prompt + path canonici)

- **Area**: Documentazione, workflow, prompt operativi, coerenza applicativo
- **Decisione**: Consolidati i path canonici post-refactor (`documentation/`, `workflow/`, `prompts/`, `src/`) e introdotti prompt iniziali standard per maintenance globale e avvio implementazione.
- **Motivazione**: Eliminare drift tra rename/spostamenti repository e riferimenti interni, riducendo errori operativi in contesti agent-driven.
- **Impatto**: Aggiornati entrypoint, quickstart, governance, workflow hub, tracker, index e copy applicativo; aggiunta sezione copy/paste universale nel prompt hub.
- **Documenti aggiornati**: `README.md`, `documentation/README.md`, `prompts/README.md`, `prompts/maintenance-global-realignment.md`, `prompts/standard-implementation-start.md`, `workflow/README.md`, `workflow/requirements/r2a-core/ready2agent_master_spec_v2_1.md`

---

### 2026-04-15 - Nuova struttura documentale (ora `documentation/`)

- **Area**: Documentazione, architettura documentale
- **Decisione**: Ristrutturazione completa del workspace documentale (oggi `documentation/`) seguendo architettura 19.1/19.2/19.3 con nuova separazione tra aree documentali operative e governance (`project-meta/`).
- **Motivazione**: Migliorare organizzazione documentale per lettura IA, separare documentazione umani da quella operativa agenti, facilitare navigazione e manutenzione
- **Impatto**: Nuova struttura documentale con 3 sezioni principali e riposizionamento completo dei file documentali.
- **Documenti aggiornati**: documentation/README.md, documentation/core/*, documentation/method/*, documentation/project-meta/*

---

### 2026-04-14 - Rimozione macro-task storage

- **Area**: Workflow execution, storage scope, documentation alignment
- **Decisione**: Eliminato il macro-task storage (ex phase 6) e rimossa l'integrazione allegati via Cloudflare R2 dal runtime Basepack demo
- **Motivazione**: Ridurre scope e complessità per la prima demo, concentrando la delivery su auth, identity, API, data model, UI e hardening
- **Impatto**: Rimossi endpoint/dashboard/moduli/test del dominio files, rimosse env e dipendenze R2, rinumerate le fasi successive (phase_7_ui_visibility → phase_6_ui_visibility, phase_8_hardening → phase_7_hardening)
- **Documenti aggiornati**: workflow/R2A-integration/README.md, workflow/ready2agent_daily_execution_tracker.md, documentation/method/execution-rules/README.md, documentation/core/storage-security/04_storage_security_compliance.md, documentation/method/alignment-model/*.md

---

### 2026-04-13 - Semplificazione basepack (rimozione email)

- **Area**: Auth lifecycle and documentation governance
- **Decisione**: Rimossi i capitoli workflow originari Phase 4 (user lifecycle) e Phase 8 (email logging audit), eliminata la logica di invio email dal runtime basepack e riallineati i flussi staff/user alla condivisione manuale dei link di iscrizione
- **Motivazione**: Pubblicare una demo funzionante senza dipendenza da dominio o provider email esterno
- **Impatto**: Inviti ADMIN/OPERATOR basati su link generato in dashboard e copiabile; registrazione USER senza verifica email; sessioni mantenute su JWT; documentazione storica/operativa riallineata al nuovo scope; rinumerazione workflow in sequenza continua (Phase 4..8)
- **Documenti aggiornati**: workflow/R2A-integration/README.md, workflow/ready2agent_daily_execution_tracker.md, documentation/method/execution-rules/README.md, documentation/core/storage-security/04_storage_security_compliance.md, documentation/project-meta/decision_log.md

---

## Regole Aggiornamento

Questo log deve essere aggiornato quando:

1. Una decisione cambia direzione architetturale
2. Uno scope viene rimosso/aggiunto
3. Una tecnologia viene cambiata
4. Un pattern viene introdotto o rimosso
5. Una configurazione critica viene modificata

## Formato Consigliato

```markdown
### YYYY-MM-DD - Breve titolo descrittivo

- **Area**: area/tema della decisione
- **Decisione**: descrizione chiara di cosa è stato deciso
- **Motivazione**: ragioni dietro la decisione
- **Impatto**: conseguenze della decisione (cosa è cambiato)
- **Documenti aggiornati**: lista dei file modificati
```

---

*Questo log è la memoria delle decisioni importanti. Consultalo per capire il "perché" dietro le scelte.*
