# Operational - Base di Conoscenza Agenti

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: agenti di coding
- **Status**: attivo

## Scopo

Questa sezione è la **base di conoscenza operativa** per coding agent che devono implementare modifiche su Ready2Agent.

È progettata per:
- Essere letta da IA prima di ogni implementazione
- Fornire vincoli espliciti e non ambigui
- Facilitare decisioni autonome dell'agente

## Struttura

| Sezione | Contenuto | File |
|---------|-----------|------|
| `spec/` | Source of truth prodotto e architettura | Vincoli non negoziabili |
| `alignment/` | Stato corrente e gap analysis | Cosa manca rispetto alla spec |
| `execution/` | Regole esecutive e sequenza task | Come procedere |
| `setup/` | Setup, bootstrap, deploy | Guide operative |
| `case-study/` | Metodologia AI-native | Principi di lavoro |

## Regole di Lettura

1. **Prima di ogni task**: leggi `spec/` per vincoli
2. **Durante implementazione**: verifica con `alignment/` per gap
3. **Per workflow**: consulta `execution/` per regole
4. **Per setup**: riferiti a `setup/`

## Convenzioni

- Tutti i path sono relativi alla root del repository
- I vincoli in `spec/` sono **vincolanti**
- Le raccomandazioni in `alignment/` sono **da risolvere**
- Le regole in `execution/` sono **obbligatorie**

## Accesso Rapido

```
operational/spec/01_vision_architettura.md     → Vincoli architetturali
operational/spec/02_identity_access.md          → Modello ruoli
operational/spec/03_auth_api_validation.md     → Auth e API
operational/alignment/01_executive_summary.md  → Stato sintetico
operational/execution/00_rules_and_ordering.md → Regole task
```
