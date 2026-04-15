# Operational Execution Index

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: agenti di coding
- **Status**: attivo

## Scopo

Questa sezione definisce le **regole esecutive** e la **sequenza task** per il workflow di Ready2Agent.

È progettata per:
- Garantire ordinamento corretto
- Prevenire dipendenze rotte
- Facilitare task atomici

## File

| File | Contenuto |
|------|-----------|
| `00_rules_and_ordering.md` | Regole esecutive base |
| Workflow | `workflow/R2A-integration/00_ready2agent_master_execution_index.md` |

## Regole Base

1. **Un task alla volta**
2. **Non anticipare task dipendenti**
3. **Validare prima del successivo**
4. **Non introdurre refactor laterali**

## Sequenza Fasi

```
1. Foundation & Config
2. Identity & Access
3. Authentication & Session
4. API Standardization
5. Validation & Data Model
6. UI & Visibility
7. Final Hardening
```

## Per Dettaglio Task

Consultare `workflow/R2A-integration/00_ready2agent_master_execution_index.md`

## Uso

1. Prima di ogni task, leggi questo file
2. Verifica dipendenze con index master
3. Esegui solo il task in scope
4. Valida con checklist
5. Aggiorna tracker/status
