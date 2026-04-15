# Documentation Governance - Regole Documentali

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: agenti di coding, contributor
- **Status**: attivo

---

## Scopo

Definire **regole operative** per mantenere la documentazione coerente durante lo sviluppo.

---

## 1. Scope

Questa governance si applica a:

- Documenti in `agent-workspace/`
- Documenti operativi in `workflow/R2A-integration/`
- `PROMPT.md`
- `README.md` (entrypoint)

---

## 2. Regole Base

### 2.1 Coerenza Codice-Docs

```
✅ UNA MODIFICA AL COMPORTAMENTO CORE
   RICHIEDE UPDATE DOCS NELLO STESSO CICLO
```

```
❌ UN TASK È CONSIDERATO CHIUSO
   SE LA DOCUMENTAZIONE IN SCOPE È OBSOLETA
```

### 2.2 Gerarchia di Lettura

```
SPEC → ALIGNMENT → EXECUTION → SETUP → WORKFLOW → TRACKER
```

Ogni sezione ha il suo ruolo. Non confondere.

### 2.3 Evitare Duplicazioni

```
✅ OGNI CONCETTO HA UN DOCUMENTO PRIMARIO
✅ I DOCUMENTI SECONDARI HANNO SOLO LINK
```

### 2.4 Prompt Ufficiali

```
✅ PROMPT UFFICIALI VIVONO IN PROMPT.md
✅ GUIDA D'USO DEI MODE VIVE IN workflow/prompts/README.md
```

---

## 3. Convenzioni File

### 3.1 Naming

```
✅ USA kebab-case per nuovi file
   Esempio: phase-1-setup.md

❌ NON USARE spazi o caratteri speciali
```

### 3.2 Struttura Documento

Ogni documento dovrebbe avere:

```markdown
# Titolo

## Metadata
- Ultimo aggiornamento: YYYY-MM-DD
- Pubblico: ...
- Status: ...

## Contenuto
...
```

### 3.3 File Grandi

```
✅ SE UN DOCUMENTO È > 500 righe, SPLITTA PER DOMINIO O FASE
```

---

## 4. Policy di Aggiornamento

### 4.1 agent-workspace/README.md

Aggiornare quando:
- Struttura cartelle cambia
- Indice viene modificato

### 4.2 project-meta/decision_log.md

Aggiornare quando:
- Una scelta tecnica impatta direzione o vincoli
- Scope viene modificato
- Pattern viene introdotto o rimosso

### 4.3 workflow/R2A-integration/

Aggiornare quando:
- Tracking operativo cambia
- Allineamento con agent-workspace si sposta

### 4.4 PROMPT.md

Aggiornare quando:
- Modello operativo dei prompt cambia
- Nuovi mode vengono introdotti

---

## 5. Quality Gate Documentale

### 5.1 Prima del Commit

```
✅ LINK INTERNI VALIDI E PATH ESISTENTI
✅ NESSUNA CONTRADDIZIONE CON SOURCE OF TRUTH
✅ TESTO ORIENTATO A UMANI E AGENTI
   - Istruzioni chiare
   - Sequenza esplicita
   - Nessuna ambiguità
```

### 5.2 Checklist Docs

```
- [ ] Link validi?
- [ ] Path esistenti?
- [ ] Contraddizioni con spec?
- [ ] Testo chiaro?
- [ ] Metadata aggiornati?
```

---

## 6. Anti-Pattern Documentali

### 6.1 Da Evitare

```
❌ "Documentazione fatta dopo"
❌ "tanto si capisce dal codice"
❌ "lo scriviamo quando abbiamo tempo"
❌ "non serve, è ovvio"
```

### 6.2 Warning Signs

```
⚠️ Documenti > 6 mesi senza update
⚠️ Code ha feature non documentata
⚠️ Un documento dice una cosa, il codice fa un'altra
⚠️ Link rotti o path obsoleti
```

---

## 7. Responsabilità

### 7.1 Chi Aggiorna Cosa

| Ruolo | Responsabilità |
|-------|---------------|
| Agenti | Update docs contestuali durante implementazione |
| Umani | Review finale, decision log |
| Tutti | Segnalare drift |

### 7.2 Quando Aggiornare

```
✅ DURANTE implementazione
✅ PRIMA di merge
✅ DOPO ogni refactor strutturale
```

---

## 8. Strumenti

### 8.1 Link Checking

```bash
# Verifica link in docs
npm run docs:check
```

### 8.2 Markdown Linting

```bash
# Lint markdown
npx markdownlint-cli2 "**/*.md"
```

---

## 9. Template Standard

### 9.1 README Sezione

```markdown
# Nome Sezione

## Metadata
- Ultimo aggiornamento: YYYY-MM-DD
- Pubblico: ...
- Status: ...

## Scopo
...

## Contenuti
| File | Contenuto |
|------|-----------|
| file.md | descrizione |
```

### 9.2 Task File

```markdown
# Task: [Titolo]

## Metadata
- Task ID: TASK-XX
- Phase: X
- Status: pending|in_progress|completed

## Scope
...

## Criteri di Successo
- [ ] criterio 1
- [ ] criterio 2

## Output
...
```

---

## 10. Review Periodica

```
OGNI 2-4 SETTIMANE:
1. Check link validity
2. Verify docs alignment
3. Update stale documents
4. Remove obsolete content
```

---

*Queste regole garantiscono documentazione mantenibile e allineata al codice.*
