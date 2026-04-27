# Case Study: Human in the Loop

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Status**: attivo

---

## 1. L'Umano Non È Replaceabile

```
L'AUTOMAZIONE NON ELIMINA IL RUOLO UMANO.
L'AGENTE ACCELERA, MA L'UOMO GUIDA.
```

---

## 2. Responsabilità Distinte

### 2.1 Cosa Fa Meglio l'Umano

```
DIREZIONE STRATEGICA
→ Cosa deve fare il prodotto
→ Quali trade-off accettare
→ Priorità di business

SCELTE ARCHITETTURALI PROFONDE
→ Pattern strutturali
→ Technology stack
→ Debt accettabile

SIGN-OFF FINALE
→ Approvazione release
→ Responsabilità decisionale
```

### 2.2 Cosa Fa Meglio l'Agente

```
IMPLEMENTAZIONE MECCANICA
→ Scrivere codice ripetitivo
→ Refactor di codice esistente
→ Validazione test/lint

RICERCA E DOCUMENTAZIONE
→ Leggere codice esistente
→ Generare bozze documenti
→ Analisi di gap

ESECUZIONE DISCIPLINATA
→ Seguire regole esattamente
→ Non perdere contesto
→ Mantenere traccia
```

---

## 3. I MomentI Decisivi

### 3.1 Prima del Lavoro

```
HUMAN:
✅ Definisce obiettivo
✅ Fornisce spec
✅ Identifica vincoli
✅ Comunica priorità

AGENT:
→ Riceve contesto
→ Verifica comprensione
→ Chiede chiarimenti se needed
```

### 3.2 Durante il Lavoro

```
HUMAN:
✅ Review periodiche
✅ Feedback su direzione
✅ Approvazioni intermediate
✅ Sblocchi quando necessario

AGENT:
→ Implementa secondo spec
→ Chiede aiuto se bloccato
→ Propone alternative
→ Rispetta vincoli
```

### 3.3 Dopo il Lavoro

```
HUMAN:
✅ Review finale
✅ Sign-off
✅ Decisioni su follow-up
✅ Approval per merge

AGENT:
→ Documenta cosa fatto
→ Segnala eventuali issue
→ Passa a prossimo task
```

---

## 4. Come Collaborare

### 4.1 Effective Prompting

```
✅ SII SPECIFICO
❌ "Fai qualcosa di figo"
✅ "Implementa auth JWT con refresh token"

✅ FORNISCI CONTESTO
❌ "Fai il login"
✅ "Il login usa NextAuth con credentials provider"

✅ DEFINISCI VINCOLI
❌ "usa quello che preferisci"
✅ "usa Zod per validation, bcrypt per password"
```

### 4.2 Feedback Loop

```
1. Agente propone / implementa
2. Umano review
3. Se ok → approva
4. Se no → feedback specifico
5. Agente adjust
6. Ripeti
```

---

## 5. Quando l'Umano Deve Intervenire

### 5.1 Segnali di Allarme

```
⚠️ Agente chiede chiarimenti ripetuti
⚠️ Output molto fuori dallo scope
⚠️ Decisioni architetturali implicite
⚠️ Codice che "funziona ma non so perché"
```

### 5.2 Azioni

```
SEGNALE → AZIONE
Domande ripetute → Rivedi prompt/specifica
Scope creep → Reinderizza con vincoli
Architettura ambigua → Definisci pattern
Incertezza → Fornisci esempio
```

---

## 6. Limiti dell'Agente

### 6.1 Cosa Non Sa Fare

```
❌ Valutare trade-off di business
❌ Comprendere contesto utente reale
❌ Prendere responsabilità legali
❌ Giudicare UX "soggettivamente"
❌ Anticipare requisiti non espressi
```

### 6.2 Cosa Non Dovrebbe Fare

```
❌ Modificare spec senza approvazione
❌ Introdurre dependencies pesanti
❌ Bypassare security per convenienza
❌承诺 tempi irrealistici
```

---

## 7. Governance del Sistema

### 7.1 Chi Decide Cosa

```
SPEC: Human
IMPLEMENTAZIONE: Agente (con review umana)
VALIDAZIONE: Agente + Umano
RELEASE: Umano
```

### 7.2 Checkpoint

```
CHECKPOINT 1: Spec approvata
CHECKPOINT 2: Architettura validata
CHECKPOINT 3: Implementazione reviewata
CHECKPOINT 4: Test approvati
CHECKPOINT 5: Release firmata
```

---

## 8. Comunicazione Effettiva

### 8.1 Per l'Umano

```
✅ Spiega il "perché", non solo il "cosa"
✅ Fornisci esempi concreti
✅ Feedback specifico, non generico
✅ Accetta che l'agente impari
```

### 8.2 Per l'Agente

```
✅ Chiedi chiarimenti se ambiguo
✅ Segnala quando bloccato
✅ Proponi alternative
✅ Documenta assunzioni
```

---

## 9. Responsabilità

```
L'UMANO È RESPONSABILE PER:
- Decisioni finali
- Qualità accettata
- Rilasci in produzione
- Conformità legale

L'AGENTE È RESPONSABILE PER:
- Esecuzione secondo spec
- Rispetto vincoli
- Documentazione accurate
- Segnalazione problemi
```

---

## 10. Conclusione

```
HUMAN + AGENT = COLLABORAZIONE EFFICACE

L'AGENTE NON SOSTITUISCE L'UMANO.
L'UMANO NON IGNORA L'AGENTE.

INSIEME POSSONO FARE
DI PIÙ, MEGLIO, PIÙ VELOCEMENTE.
```

---

*Questo documento clarisce i ruoli. Per adozione pratica, vedere `04_adoption_playbook.md`.*
