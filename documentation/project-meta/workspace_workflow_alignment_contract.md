# Workspace-Workflow Alignment Contract

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: agenti di coding
- **Status**: attivo

---

## Scopo

Definire il **confine tra**:
- `documentation/` - contesto e vincoli
- `workflow/R2A-integration/` - esecuzione operativa

---

## 1. Source of Truth Map

### 1.1 documentation/

```
project-docs/
  → Documentazione umani (visione, setup, troubleshooting)

operational/spec/
  → Source of truth prodotto e architettura

operational/alignment/
  → Stato reale e gap analysis

operational/setup/
  → Setup, deploy, troubleshooting

operational/case-study/
  → Metodo e principi AI-native

project-meta/
  → Decision log, governance, naming policy

quickstart/
  → Onboarding rapido

reviews/
  → Report manutenzione
```

### 1.2 workflow/R2A-integration/

```
README.md
  → Indice task-by-task completo

flow-execution-tracker.md
  → Tracker avanzamento del singolo flow

phase_*/
  → Artefatti per fase:
    - README.md
    - PHASE-*-*.md (task files)
    - STATUS.md
    - Exit gate criteria

prompts/
  → Guida selezione e uso mode

workflow/ready2agent_daily_execution_tracker.md
  → Tracker avanzamento globale multi-flow
```

---

## 2. Confini Definiti

### 2.1 documentation/ = CONTESTO

```
COSA CONTIENE:
✅ Vincoli architetturali
✅ Regole implementative
✅ Stato repository
✅ Setup e guide
✅ Metodologia

COSA NON CONTIENE:
❌ Esecuzione task-by-task
❌ Status operativo
❌ Artefatti esecutivi
❌ Tracker avanzamento
```

### 2.2 workflow/R2A-integration/ = ESECUZIONE

```
COSA CONTIENE:
✅ Task-by-task eseguiti
✅ Status fase
✅ Tracker avanzamento
✅ Artefatti esecutivi
✅ Decisioni operative

COSA NON CONTIENE:
❌ Vincoli architetturali nuovi
❌ Regole non ancora validate
❌ Spec non approvata
```

---

## 3. Regole Anti-Drift

### 3.1 Se Scope Task Cambia

```
1. Aggiorna workflow/R2A-integration/phase_*/PHASE-*.md
2. Aggiorna documentation/operational/execution/
3. Entrambi riflettono la stessa realtà
```

### 3.2 Se Direzione Prodotto Cambia

```
1. Aggiorna operational/spec/ (source of truth)
2. Valuta impatto su workflow attivi
3. Aggiorna workflow/R2A-integration/ se necessario
```

### 3.3 Cross-Folder Updates

```
✅ OGNI CORREZIONE PATH CROSS-FOLDER
   DEVE ESSERE APPLICATA IN ENTRAMBI I LATI
```

---

## 4. Precedenza in Caso di Conflitto

### 4.1 Ordine di Priorità

```
1. SPEC (operational/spec/ e file master)
2. TASK OPERATIVO CORRENTE (workflow/R2A-integration/phase_*/PHASE-*.md)
3. TRACKER E STATUS (workflow/R2A-integration/*.md)
4. documentation/ (per contesto non operativo)
```

### 4.2 Esempio Conflitto

```
Scenario: SPEC dice una cosa, TASK dice un'altra

Soluzione:
1. SPEC ha priorità
2. TASK viene aggiornato per allinearsi
3. Decision log registra la discrepanza
```

---

## 5. Integration Points

### 5.1 documentation -> workflow

```
Quando si lavora a un task:
1. Leggi operational/spec/ per vincoli
2. Leggi operational/alignment/ per gap
3. Esegui task in workflow/R2A-integration/
4. Aggiorna status in workflow/
```

### 5.2 workflow -> documentation

```
Quando un task rivela nuovo gap:
1. Documenta in workflow task file
2. Aggiorna operational/alignment/
3. Se impatta spec, proponi update
```

---

## 6. Read Order Ufficiale

```
PER LAVORO OPERATIVO (task execution):
1. operational/spec/ (vincoli)
2. operational/alignment/ (stato)
3. workflow/R2A-integration/00_..._index.md (piano)
4. workflow/R2A-integration/phase_*/PHASE-*.md (task)
5. ready2agent_daily_execution_tracker.md (progresso)

PER CONTESTO GENERALE (onboarding, review):
1. README.md
2. documentation/README.md
3. operational/spec/README.md
4. operational/case-study/
```

---

## 7. Maintenance

### 7.1 Quando Riallineare

```
RIALLINEA QUANDO:
- Nuova fase viene aggiunta
- Struttura cartelle cambia
- Policy documentale evolve
- Gap analysis rivela drift
```

### 7.2 Chi Riallinea

```
MANTENUTORE PRINCIPALE:
- Responsabile di allineamento
- Può delegare a agenti per task specifici
- Review finale è umana
```

---

## 8. Summary

```
documentation/ = SAPERE
   → Cosa deve essere fatto
   → Quali sono i vincoli
   → Come è strutturato il sistema

workflow/R2A-integration/ = FARE
   → Cosa è stato fatto
   → Come procedere
   → Quanto manca

INSIEME:
   → SAPERE + FARE = LAVORO COMPLETO
```

---

*Questo contract definisce i confini. Rispettarlo garantisce coerenza.*
