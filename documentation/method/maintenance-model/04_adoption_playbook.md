# Case Study: Adoption Playbook

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Status**: attivo

---

## Scopo

Guida pratica per **adottare e adattare** il metodo Ready2Agent su altri progetti.

---

## 1. Prerequisites

### 1.1 Cosa Serve

```
✅ Progetto con requisiti chiari
✅ Team disposto a documentare
✅ Committment a validazione
✅ Disponibilità a seguire metodo
```

### 1.2 Cosa Non Serve

```
❌ Progetto perfettamente definito
❌ Tutto lo stack già scelto
❌ Zero ambiguity
❌ Metodo dogmatico
```

---

## 2. Setup Iniziale

### Step 1: Crea Struttura

```
LA TUA CARTELLA/
├── README.md
├── SPEC.md
├── operational/
│   ├── spec/
│   ├── alignment/
│   ├── execution/
│   └── setup/
├── project-meta/
│   ├── decision_log.md
│   └── naming_policy.md
└── workflow/
    ├── prompts/
    └── daily_tracker.md
```

### Step 2: Definisci SPEC

```
Crea SPEC.md con:
- Visione progetto
- Architettura
- Stack tecnologico
- Ruoli e permessi
- Contratti principali
```

### Step 3: Setup Folder Operativi

```
documentation/core/:
- 01_vision.md
- 02_architecture.md
- 03_identity.md
- etc.

documentation/method/alignment-model/:
- 01_current_state.md
- 02_gaps.md
- etc.
```

---

## 3. Regole Fondamentali

### 3.1 Una Versione Tua

```
ADATTA, NON COPIARE.
Le regole di Ready2Agent sono pensate per il suo contesto.
Il TUO progetto ha esigenze diverse.
```

### 3.2 Regole Non Negoziabili

```
✅ SPEC aggiornata quando codice cambia
✅ TASK piccoli e tracciati
✅ VALIDAZIONE prima di avanzare
✅ DOCS allineate al codice
✅ DECISION LOG per scelte importanti
```

---

## 4. Processo di Adozione

### Fase 1: Setup (Settimana 1)

```
GIORNO 1-2: Crea struttura cartelle
GIORNO 3-4: Definisci SPEC iniziale
GIORNO 5: Setup workflow folder
```

### Fase 2: Primi Task (Settimana 2-3)

```
SCEGLI 2-3 TASK PICCOLI
- Implementali con metodo
- Valida ogni volta
- Aggiusta il metodo se needed
```

### Fase 3: Refinement (Settimana 4)

```
RACCOGLI FEEDBACK:
- Cosa funziona?
- Cosa non funziona?
- Cosa aggiungere/togliere?
ADATTA DI CONSEGUENZA
```

### Fase 4: Routine (Settimana 5+)

```
IL METODO È NATURALE.
CONTINUA CON CICLI:
Pianifica → Esegui → Valida → Doc → Ripeti
```

---

## 5. Checklist Adozione

### Setup

- [ ] Struttura cartelle creata
- [ ] SPEC.md definita
- [ ] READMEs operativi scritti
- [ ] Prompt hub creato

### Primi Task

- [ ] Primo task documentato
- [ ] Validazione completata
- [ ] Secondo task documentato
- [ ] Metodo testato

### Maturità

- [ ] Decision log in uso
- [ ] Workflow allineato
- [ ] Team conforms
- [ ] Processo ripetibile

---

## 6. Adattamenti Comuni

### 6.1 Progetti Piccoli

```
SE IL PROGETTO È PICCOLO (< 1 mese):
- Niente setup troppo pesante
- SPEC.md ridotta
- TASK più grandi OK
- Decision log facoltativo
```

### 6.2 Progetti Medi

```
SE IL PROGETTO È MEDIO (1-3 mesi):
- Struttura completa
- TASK piccoli
- Review regolari
- Workflow tracciato
```

### 6.3 Progetti Grandi

```
SE IL PROGETTO È GRANDE (3+ mesi):
- Sotto-progetti con SPEC proprie
- Milestone definite
- Multiple team se needed
- CI/CD integrato
```

---

## 7. Tool Recommendations

### 7.1 Per Lavoro Locale

```
AGENT CODING:
- OpenCode (come Ready2Agent)
- Continue.dev
- Cursor

DOCUMENTATION:
- Notion
- Obsidian
- Git-based (Markdown)
```

### 7.2 Per Collaboration

```
VERSION CONTROL:
- GitHub (come Ready2Agent)
- GitLab
- Bitbucket

PROJECT MANAGEMENT:
- Linear
- Asana
- GitHub Projects
```

### 7.3 Per Documentation

```
STATIC SITE:
- VitePress
- Docsify
- GitBook

AI CONTEXT:
- Agno (come Sh1nig4my-MCP)
- Custom GPTs
```

---

## 8. Anti-Pattern

### Da Evitare

```
❌ NON creare 50 documenti e non usarli
❌ NON fare task enormi chiamati "sprint"
❌ NON saltare validazione per "velocità"
❌ NON ignorare decision log
❌ NON trattare SPEC come "suggerimenti"
```

### Warning Signs

```
⚠️ "La documentazione è outdated"
⚠️ "Facciamo questo e poi documentiamo"
⚠️ "Il task era più grande del previsto"
⚠️ "Chi ha deciso questo?"
```

---

## 9. Misurare Successo

### Metriche

```
VELOCITÀ:
- Task completati / settimana
- Tempo medio per task

QUALITÀ:
- Bug in produzione
- Tech debt rate
- Code review cycle time

ADOPTION:
- % team che usa metodo
- Compliance con workflow
```

### Feedback

```
CHIEDI REGOLARMENTE:
- Cosa funziona?
- Cosa non funziona?
- Cosa migliorare?
```

---

## 10. Continua a Migliorare

```
IL METODO NON È FINITO.
Adatta, sperimenta, migliora.
LASCIA CHE EVOLVA CON IL TUO PROGETTO.
```

### Principi da Mantenere

```
✅ chiarezza
✅ tracciabilità
✅ validazione
✅ documentazione allineata
✅ collaborazione umano-agente
```

---

## 11. Risorse

### Template

```
Usa Ready2Agent come template:
1. Fork il repository
2. Adatta SPEC al tuo progetto
3. Mantieni struttura che funziona
4. Rimuovi quello che non serve
```

### Supporto

```
PER DOMANDE:
- GitHub Issues su Ready2Agent
- Documentazione estesa
- Community di pratica
```

---

*Questo playbook è il punto di partenza. Adatta al tuo contesto.*
