# Agent Start Here - Guida Agenti

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: coding agent
- **Status**: attivo

---

## Benvenuto Agente

Questa è la guida rapida per iniziare a lavorare su **Ready2Agent**.

---

## 1. Leggi Prima di Tutto

In questo ordine **obbligatorio**:

```
1. README.md                              → Entrypoint progetto
2. R2A_full-ai-context.md                → Contesto narrativo completo
3. PROMPT.md                             → Mode operativi (A, B, C)
4. agent-workspace/README.md              → Hub documentale agenti
5. agent-workspace/operational/README.md  → Base conoscenza operativa
6. agent-workspace/operational/spec/      → Source of truth vincoli
7. agent-workspace/operational/alignment/ → Stato gap analysis
8. agent-workspace/operational/execution/ → Regole esecutive
9. agent-workspace/operational/setup/     → Setup locale/deploy
10. workflow/R2A-integration/README.md    → Workflow operativo
11. workflow/prompts/README.md → Guida mode prompt
12. workflow/R2A-integration/sh1nig4my_daily_execution_tracker.md → Tracker
```

---

## 2. Scegli il Prompt Mode

### Mode A - Full Maintenance Review

```
QUANDO USARLO:
- Dopo molti aggiornamenti
- Per audit completo
- Per allineamento deep

LEGGO:
- PROMPT.md → Mode A section
- Eseguo revisione completa
- Genero report in agent-workspace/reviews/
```

### Mode B - Targeted Change

```
QUANDO USARLO:
- Una modifica mirata richiesta
- Fuori dalla sequenza workflow storica
- Ma con rispetto rigido architettura

LEGGO:
- PROMPT.md → Mode B section
- Eseguo solo la modifica richiesta
- Rispetto tutti i vincoli architetturali
```

### Mode C - Workflow Progress

```
QUANDO USARLO:
- Per continuare/eseguire workflow task-by-task
- Dipendenze ordine devono essere rispettate
- Tracker/status devono essere aggiornati

LEGGO:
- PROMPT.md → Mode C section
- workflow/R2A-integration/00_ready2agent_master_execution_index.md
- sh1nig4my_daily_execution_tracker.md
- Eseguo solo il task corrente
```

---

## 3. Regole Esecutive

### 3.1 Vincoli Non Negoziabili

```
✅ RISPETTA ARCHITETTURA
   Controller/Service/Repository pattern
   Layer boundaries inviolabili

✅ UN TASK ALLA VOLTA
   Non anticipare task dipendenti

✅ VALIDARE PRIMA DI AVANZARE
   lint → test → build → proceed

✅ AGGIORNARE DOCS
   Docs = parte dell'implementazione

✅ NESSUN SHORTCUT ARCHITETTURALI
   Non violare design rules
```

### 3.2 Anti-Pattern

```
❌ NON fare refactor laterali non richiesti
❌ NON introdurre debito tecnico
❌ NON bypassare validazione
❌ NON ignorare dipendenze
```

---

## 4. Source of Truth

### 4.1 Gerarchia

```
1. SPEC (operational/spec/)
   → Vincoli non negoziabili

2. TASK OPERATIVO (workflow/R2A-integration/phase_*/PHASE-*.md)
   → Scope del task corrente

3. TRACKER (sh1nig4my_daily_execution_tracker.md)
   → Stato avanzamento
```

### 4.2 Se Incertezza

```
1. Consulta SPEC per vincoli
2. Consulta operational/alignment/ per gap noti
3. Consulta decision_log per decisioni passate
4. Se ancora incerto, CHIEDI chiarimenti
```

---

## 5. Output Atteso

### 5.1 Per Ogni Task

```
## Task Completato: [TASK-ID]

### File ToccatI
- lista file

### Motivazione
breve spiegazione

### Validazione
- [x] lint
- [x] test
- [x] build
- [x] funzionalità

### Blocker
Nessuno / descrizione

### Prossimo Task
[TASK-ID-NEXT]
```

### 5.2 Conformità

```
✅ Ho rispettato architettura?
✅ Ho rispettato design system?
✅ Ho rispettato regole decisionali?
✅ Ho aggiornato documentazione?
```

---

## 6. Struttura Progetto

```
ready2agent/
├── src/
│   ├── app/           # Controller (API routes)
│   ├── components/    # UI
│   ├── server/        # Backend (service/repository)
│   └── shared/       # Contracts condivisi
├── agent-workspace/   # Documentazione operativa
├── workflow/          # Artefatti workflow
├── tests/            # Test suite
└── public/           # Asset statici
```

---

## 7. Path Canonici

```typescript
// Business logic
import { usersService } from "@/server/service/users.service";

// Data access
import { usersRepository } from "@/server/repository/users.repository";

// Shared types
import type { User } from "@/shared/types/user";
```

---

## 8. Comandi Validazione

```bash
# Lint
npm run lint

# Type check
npm run typecheck

# Test
npm test

# Build
npm run build

# Tutti insieme
npm run lint && npm test && npm run build
```

---

## 9. Links Rapidi

| Risorse | Percorso |
|---------|----------|
| Spec | `agent-workspace/operational/spec/` |
| Gap | `agent-workspace/operational/alignment/` |
| Workflow | `workflow/R2A-integration/` |
| Tracker | `workflow/R2A-integration/sh1nig4my_daily_execution_tracker.md` |

---

## 10. Nota Finale

```
SEI UN AGENTE COMPETENTE.
MA SEGUI LE REGOLE.
RISPETTA L'ARCHITETTURA.
VALIDA SEMPRE.
DOCUMENTA SEMPRE.

QUESTO PROGETTO È STATO COSTRUITO
CON ATTENZIONE AI DETTAGLI.
TRATTALO CON LO STESSO RISPETTO.
```

---

*Benvenuto nel team Ready2Agent.*
