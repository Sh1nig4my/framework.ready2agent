# Decision Log - Registro Decisioni Ad Alto Impatto

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
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

### 2026-04-15 - Nuova struttura documentale agent-workspace

- **Area**: Documentazione, architettura documentale
- **Decisione**: Ristrutturazione completa di agent-workspace seguendo architettura 19.1/19.2/19.3 con nuove cartelle project-docs/, operational/, project-meta/
- **Motivazione**: Migliorare organizzazione documentale per lettura IA, separare documentazione umani da quella operativa agenti, facilitare navigazione e manutenzione
- **Impatto**: Nuova struttura agent-workspace con 3 sezioni principali, legacy spec deprecata ma mantenuta per riferimento, tutti i file documentali riposizionati
- **Documenti aggiornati**: agent-workspace/README.md, agent-workspace/project-docs/*, agent-workspace/operational/*, agent-workspace/project-meta/*

---

### 2026-04-14 - Rimozione macro-task storage

- **Area**: Workflow execution, storage scope, documentation alignment
- **Decisione**: Eliminato il macro-task storage (ex phase 6) e rimossa l'integrazione allegati via Cloudflare R2 dal runtime Basepack demo
- **Motivazione**: Ridurre scope e complessità per la prima demo, concentrando la delivery su auth, identity, API, data model, UI e hardening
- **Impatto**: Rimossi endpoint/dashboard/moduli/test del dominio files, rimosse env e dipendenze R2, rinumerate le fasi successive (phase_7_ui_visibility → phase_6_ui_visibility, phase_8_hardening → phase_7_hardening)
- **Documenti aggiornati**: workflow/R2A-integration/00_ready2agent_master_execution_index.md, workflow/R2A-integration/sh1nig4my_daily_execution_tracker.md, agent-workspace/operational/execution/README.md, agent-workspace/operational/setup/README.md, agent-workspace/operational/spec/04_storage_security_compliance.md, agent-workspace/operational/alignment/*.md

---

### 2026-04-13 - Semplificazione basepack (rimozione email)

- **Area**: Auth lifecycle and documentation governance
- **Decisione**: Rimossi i capitoli workflow originari Phase 4 (user lifecycle) e Phase 8 (email logging audit), eliminata la logica di invio email dal runtime basepack e riallineati i flussi staff/user alla condivisione manuale dei link di iscrizione
- **Motivazione**: Pubblicare una demo funzionante senza dipendenza da dominio o provider email esterno
- **Impatto**: Inviti ADMIN/OPERATOR basati su link generato in dashboard e copiabile; registrazione USER senza verifica email; sessioni mantenute su JWT; documentazione storica/operativa riallineata al nuovo scope; rinumerazione workflow in sequenza continua (Phase 4..8)
- **Documenti aggiornati**: workflow/R2A-integration/00_ready2agent_master_execution_index.md, workflow/R2A-integration/sh1nig4my_daily_execution_tracker.md, agent-workspace/operational/execution/README.md, agent-workspace/operational/setup/README.md, agent-workspace/operational/spec/04_storage_security_compliance.md, agent-workspace/project-meta/decision_log.md

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
