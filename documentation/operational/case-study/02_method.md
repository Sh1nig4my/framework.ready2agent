# Case Study: Metodo

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Status**: attivo

---

## 1. Il Metodo Operativo

### 1.1 Principi Base

```
1. SOURCE OF TRUTH PRIMA DI TUTTO
   → Definisci spec, poi implementa

2. UN TASK ALLA VOLTA
   → Contesto chiaro, rollback semplice

3. VALIDAZIONE PRIMA DI AVANZARE
   → Mai saltare verifiche

4. DOCUMENTAZIONE INSIEME AL CODICE
   → Docs = Codice, sempre allineati

5. TRACCIA LE DECISIONI
   → Decision log per scelte importanti
```

---

## 2. La Sequenza

```
STRATEGIA
    ↓ (spec)
PIANIFICAZIONE
    ↓ (gap analysis)
ESECUZIONE
    ↓ (task by task)
VALIDAZIONE
    ↓ (test, lint, build)
RELEASE
    ↓ (monitoraggio)
ITERAZIONE
```

---

## 3. Source of Truth System

### 3.1 Gerarchia Documentale

```
1. SPEC (operational/spec/)
   → Cosa DEVE fare il sistema

2. ALIGNMENT (operational/alignment/)
   → Cosa MANCA rispetto alla spec

3. EXECUTION (operational/execution/)
   → Come FARLO nel giusto ordine

4. WORKFLOW (workflow/R2A-integration/)
   → Traccia di cosa è stato fatto
```

### 3.2 Regola Aurea

```
SE LA SPEC DICE UNA COSA
E IL CODICE FA UN'ALTRA
IL CODICE È SBAGLIATO.
```

---

## 4. Task Management

### 4.1 Proprietà di un Task

```
TASK VALIDO HA:
✅ Scope chiaro e limitato
✅ Criteri di successo espliciti
✅ Dipendenze documentate
✅ File da modificare identificati
✅ Checklist validazione
```

### 4.2 Task Tracking

```
OGNI TASK HA UN FILE:
workflow/R2A-integration/phase_X/PHASE-X-XX_*.md

OGNI TASK AGGIORNA:
- Tracker (ready2agent_daily_execution_tracker.md)
- Status (phase_X/STATUS.md)
```

---

## 5. Validazione Disciplinata

### 5.1 Checklist Per Task

```
PRIMA DI CHIUDERE UN TASK:
- [ ] Lint passato
- [ ] Test passato
- [ ] Build passato
- [ ] Funzionalità verificata
- [ ] Docs aggiornate
- [ ] Tracker aggiornato
```

### 5.2 Fail Fast

```
SE UN CHECK FALLISCE:
❌ NON IGNORARE
❌ NON DISABILITARE TEST
❌ NON COMMIT CON WARNINGS

✅ FIX IL PROBLEMA
✅ RIVALIDA
✅ POI PROCEDI
```

---

## 6. Ruolo dell'Agente

### 6.1 Cosa Fa l'Agente

```
✅ Implementa task secondo spec
✅ Segue regole architetturali
✅ Valida con checklist
✅ Aggiorna documentazione
✅ Propone quando bloccato
```

### 6.2 Cosa Non Fa l'Agente

```
❌ Non decide scope da solo
❌ Non cambia spec
❌ Non introduce feature fuori scope
❌ Non fa refactor non richiesto
```

---

## 7. Ruolo dell'Umano

### 7.1 Cosa Fa l'Umano

```
✅ Definisce direzione strategica
✅ Approva scelte architetturali
✅ Risolvi blocker
✅ Review codice
✅ Sign-off release
```

### 7.2 Quando Interviene

```
INTERVENTO UMANO:
1. Prima: Specifica e vincoli
2. Durante: Review e approvazioni
3. Dopo: Sign-off finale
```

---

## 8. Perché Funziona

### 8.1 Vantaggi

```
✅ Contesto sempre chiaro
✅ Decisioni tracciate
✅ Rollback semplice
✅ Qualità costante
✅ Riproducibilità
```

### 8.2 Evitati Anti-Pattern

```
❌ No "fammi un favore"
❌ No "tanto funziona"
❌ No "lo fixiamo dopo"
❌ No "era cosi anche prima"
```

---

## 9. Applicabilità

Questo metodo è applicabile a:

```
✅ Progetti con team ibridi (umano + agenti)
✅ Progetti singoli con alto valore
✅ Progetti con requisiti stringenti
✅ Progetti educativi
```

Non è necessario per:

```
❌ Script semplici
❌ Prototipi usa e getta
❌ Progetti con scadenze impossibili
```

---

## 10. Estensibilità

Il metodo può essere adattato:

```
ELEMENTI DA MANTENERE:
- Source of truth chiara
- Task limitati e tracciati
- Validazione disciplinata
- Docs allineate

ELEMENTI DA ADATTARE:
- Struttura folder
- Tool specifici
- Terminologia
- Scale del progetto
```

---

*Questo documento descrive il metodo. Per adozione, vedere `04_adoption_playbook.md`.*
