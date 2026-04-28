# Execution Rules & Ordering

## Metadata

- **Ultimo aggiornamento**: 2026-04-27
- **Pubblico**: agenti di coding
- **Status**: attivo

---

## Scopo

Questo documento definisce le **regole operative vincolanti** per l'esecuzione del workflow di Ready2Agent.

---

## 1. Regole Fondamentali

### 1.1 Un Task alla Volta

```
✅ LAVORARE SU UN SOLO TASK PER VOLTA
❌ NON FARE MULTITASKING TRA TASK
```

**Motivazione**: Contesto chiaro, rollback semplice, qualità migliore.

### 1.2 Non Anticipare Task Dipendenti

```
❌ NON INIZIARE PHASE 2 PRIMA DI PHASE 1 COMPLETATO
❌ NON INIZIARE TASK 5 PRIMA DI TASK 4 COMPLETATO
❌ NON SALTARE FASI
```

**Motivazione**: Dipendenze esistono per ragioni architetturali.

### 1.3 Validare Prima del Successivo

```
✅ DOPO OGNI TASK:
   1. Run lint
   2. Run test
   3. Run build
   4. Verifica funzionalità
   5. Solo dopo procedi
```

**Motivazione**: Prevenire regressioni.

### 1.4 No Refactor Laterali Fuori Scope

```
❌ NON CAMBIARE MODULI NON RICHIESTI
❌ NON "MIGLIORARE" CODICE NON IN SCOPE
❌ NON REFACTORARE PER STILE
```

**Motivazione**: Cambi non richiesti introducono rischi.

---

## 2. Anti-Circular Dependency

### 2.1 Regola

```
SE UN PREREQUISITO NON È CHIUSO,
IL TASK SI FERMA:
   ❌ NIENTE WORKAROUND LOCALI PERMANENTI
   ❌ NIENTE BYPASS DELLA POLICY
   ❌ NIENTE "FIX TEMPORANEO"
```

### 2.2 Cosa Fare Invece

```
✅ DOCUMENTA IL BLOCCO
✅ COMUNICA IMPEDIMENTO
✅ PROCEDI CON ALTRO TASK NON DIPENDENTE
✅ NON FINGERE DI AVER FINITO
```

---

## 3. Completion Check

### 3.1 Per Ogni Task, Documentare

```
1. FILE TOCCATI
   - Lista esatta dei file modificati

2. MOTIVAZIONE
   - Perché questa modifica
   - Cosa risolve

3. CHECKLIST VALIDAZIONE
   - [ ] lint passato
   - [ ] test passato
   - [ ] build passato
   - [ ] funzionalità verificata

4. EVENTUALI BLOCKER
   - Ci sono problemi aperti?
   - Cosa blocca il task successivo?
```

### 3.2 Template Output

```markdown
## Task Completato: [TASK-ID]

### File ToccatI
- `src/file1.ts`
- `src/file2.ts`

### Motivazione
[Breve spiegazione]

### Validazione
- [x] lint
- [x] test
- [x] build
- [x] funzionalità

### Blocker
Nessuno / [Descrizione]

### Prossimo Task
[TASK-ID-NEXT]
```

---

## 4. Ordine di Esecuzione

### 4.1 Sequenza Globale

```
PHASE 1: Foundation & Config
  ↓ (completato)
PHASE 2: Identity & Access
  ↓ (completato)
PHASE 3: Authentication & Session
  ↓ (completato)
PHASE 4: API Standardization
  ↓ (completato)
PHASE 5: Validation & Data Model
  ↓ (completato)
PHASE 6: UI & Visibility
  ↓ (completato)
PHASE 7: Final Hardening
  ↓ (completato)
RELEASE
```

### 4.2 Dentro Ogni Phase

```
TASK-1 → TASK-2 → TASK-3 → ... → TASK-N → EXIT GATE
```

**Solo dopo EXIT GATE**: procedere alla phase successiva.

---

## 5. Exit Gate Criteria

### 5.1 Cosa Significa

```
EXIT GATE = Tutti i criteri della fase sono verificati.
```

### 5.2 Phase Exit Gates

| Phase | Exit Gate |
|-------|-----------|
| 1 | Config sicura, env validate, database obbligatorio, setup SUPER corretto |
| 2 | Access model self-only corretto e stabile |
| 3 | Session/auth/cookie allineati alla spec JWT |
| 4 | REST è il contratto reale del core |
| 5 | Model/validation coerenti e puliti |
| 6 | UI coerente con backend e senza claim errati |
| 7 | Suite verde, clean-up completato, report finale |

---

## 6. Regole di Gestione Blocker

### 6.1 Tipi Blocker

| Tipo | Causa | Azione |
|------|-------|--------|
| Esterno | Dipende da fuori repo | Aspetta, documenta |
| Spec | Requisito ambiguo | Chiedi chiarimento |
| Technical | Debt blocca | Proponi fix |
| Test | Test fallisce | Fix test o codice |

### 6.2 Workflow Blocker

```
BLOCCATO?
  ↓
Documenta in issue
  ↓
Tipo blocco?
  ↓
┌─────────────────────────────────────┐
│ Esterno → Aspetta, comunicando     │
│ Spec → Chiedi clarification         │
│ Technical → Proponi workaround doc   │
│ Test → Fix underlying issue         │
└─────────────────────────────────────┘
  ↓
Risolvi blocco o wait
  ↓
Procedi quando sbloccato
```

---

## 7. Regole Anti-Scope Creep

### 7.1 Riconoscere

```
🚩 "Mentre ci siamo..."
🚩 "Sarebbe carino..."
🚩 "L'utente potrebbe volere..."
🚩 "Questo è piccolo fix..."
```

### 7.2 Azione

```
✅ RIFIUTA EDUCATAMENTE
✅ DOCUMENTA IN BACKLOG
✅ RESTA NELLO SCOPE
```

---

## 8. Validazione Checklist

### 8.1 Checklist Pre-Commit

```markdown
## Pre-Commit Checklist

### Codice
- [ ] Nessun console.log/debug rimosso
- [ ] Nessun commento TODO lasciato
- [ ] Tipo any solo se strettamente necessario
- [ ] Path canonici usati

### Test
- [ ] Test per nuova feature
- [ ] Test non rotto
- [ ] Coverage accettabile

### Docs
- [ ] Docs aggiornate se necessario
- [ ] Commenti inline aggiunti se complesso
- [ ] CHANGELOG se richiesto

### Commits
- [ ] Messaggio commit descrittivo
- [ ] Un commit per task
- [ ] No commit WIP
```

### 8.2 Checklist Post-Task

```markdown
## Post-Task Checklist

- [ ] Task file aggiornato
- [ ] Tracker aggiornato
- [ ] Status phase aggiornato
- [ ] Validazione completa passata
- [ ] Output documentato
```

---

## 9. Links Utili

- Master index: `workflow/R2A-integration/README.md`
- Workflow hub: `workflow/R2A-integration/README.md`
- Tracker giornaliero: `workflow/ready2agent_daily_execution_tracker.md`

---

## 10. Nota Finale

```
QUESTE REGOLE NON SONO SUGGERIMENTI.

SONO VINCOLANTI PER GARANTIRE:
- Qualità del codice
- Coerenza architetturale
- Riproducibilità del workflow
- Traceability delle decisioni

IGNORARLE COMPORTA RISCHI.
```

---

*Questo documento è la fonte della verità per le regole esecutive. In caso di conflitto con altri documenti, questo ha priorità.*
