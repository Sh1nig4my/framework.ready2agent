# Dependencies & Risks

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: agenti di coding
- **Status**: attivo

---

## Scopo

Questo documento elenca:
- Dipendenze tra fasi/task
- Rischi identificati
- Strategie di mitigazione

---

## 1. Dipendenze Tra Fasi

### 1.1 Catena Dipendenze

```
Phase 1: Foundation
    ↓ dipende da: -
    ↓ abilita: Phase 2

Phase 2: Identity & Access
    ↓ dipende da: Phase 1 completo
    ↓ abilita: Phase 3, Phase 4

Phase 3: Auth & Session
    ↓ dipende da: Phase 2 completo
    ↓ abilita: Phase 4

Phase 4: API Standardization
    ↓ dipende da: Phase 2, Phase 3
    ↓ abilita: Phase 5

Phase 5: Validation & Data
    ↓ dipende da: Phase 4
    ↓ abilita: Phase 6

Phase 6: UI & Visibility
    ↓ dipende da: Phase 5
    ↓ abilita: Phase 7

Phase 7: Hardening
    ↓ dipende da: tutte le precedenti
    ↓ abilita: release
```

### 1.2 Regole Anti-Anticipo

```
❌ NON iniziare Phase 2 prima di Phase 1 completato
❌ NON iniziare Phase 3 prima di Phase 2 completato
❌ NON saltare fasi
❌ NON fare refactor laterali fuori scope
```

```
✅ Puoi fare task paralleli dentro la stessa fase
✅ Puoi fare fix minori contingenti
✅ Devi documentare se blocchi per dipendenza
```

---

## 2. Dipendenze Specifiche

### 2.1 Env/Security prima di Auth

**Perché**: Auth dipende da configurazione sicura.

```
Env validation (Phase 1)
    ↓ necessario per
Auth implementation (Phase 3)
```

**Impatto se ignorato**: Credenziali esposte, sessioni insicure.

### 2.2 Identity prima di UI

**Perché**: UI dipende da ruoli e permessi definiti.

```
Identity model (Phase 2)
    ↓ necessario per
Navigation role-aware (Phase 6)
```

**Impatto se ignorato**: UI non corrisponde a permessi reali.

### 2.3 Session prima di Guard UX

**Perché**: UI guards dipendono da sessione.

```
Session implementation (Phase 3)
    ↓ necessario per
Protected routes (Phase 6)
```

**Impatto se ignorato**: Bypass di autenticazione in UI.

### 2.4 Data Model prima di Permissions

**Perché**: Permission map persiste su schema.

```
Data model (Phase 5)
    ↓ necessario per
Operator permissions persistence (Phase 5 task 4)
```

**Impatto se ignorato**: Permessi non salvati correttamente.

---

## 3. Rischi Identificati

### 3.1 Policy Accesso Non Stabile

| Rischio | Probabilità | Impatto |
|---------|-------------|---------|
| Policy centrale cambia durante implementazione | Media | Alto |

**Mitigazione**:
- Non modificare `access.ts` senza approvazione
- Documentare ogni cambiamento in decision_log.md
- Testare impatto su tutti gli endpoint

### 3.2 Contratti API Duplicati

| Rischio | Probabilità | Impatto |
|---------|-------------|---------|
| Endpoint duplicati o inconsistenti | Media | Medio |

**Mitigazione**:
- Envelope standard per tutti
- No endpoint fuori da `src/app/api/`
- Review contratti prima di implementare

### 3.3 Ambiguita Runtime Demo/Live

| Rischio | Probabilità | Impatto |
|---------|-------------|---------|
| Feature demo in produzione o viceversa | Bassa | Alto |

**Mitigazione**:
- `APP_RUNTIME` validation
- Feature flag documentati
- No hardcoded runtime checks

### 3.4 Regressioni UI Durante Refactor Auth

| Rischio | Probabilità | Impatto |
|---------|-------------|---------|
| UI si rompe dopo modifica auth | Media | Medio |

**Mitigazione**:
- Test end-to-end
- Preview deployment
- Manual check post-refactor

### 3.5 Dati Legacy Non Allineati

| Rischio | Probabilità | Impatto |
|---------|-------------|---------|
| Vecchi dati non rispettano nuovo schema | Bassa | Alto |

**Mitigazione**:
- Migration scripts
- Soft delete per dati legacy
- Backward compatibility dove possibile

### 3.6 Drift Documentazione

| Rischio | Probabilità | Impatto |
|---------|-------------|---------|
| Docs non allineate al codice | Alta | Medio |

**Mitigazione**:
- Docs update nello stesso ciclo del code
- Task non chiuso se docs obsolete
- Review periodica alignment

---

## 4. Blocker Tipici

### 4.1 Come Riconoscere

```
Blocco tipo 1: Dipendenza non risolta
  - Attendi file/task da altra fase
  - Soluzione: comunica, procedi con altro

Blocco tipo 2: Spec ambiguo
  - Non capisci requisito
  - Soluzione: chiedi chiarimento, non inventare

Blocco tipo 3: Technical debt blocking
  - Struttura esistente impedisce task
  - Soluzione: proponi fix in decision_log

Blocco tipo 4: Test fallendo
  - Test impedisce avanzamento
  - Soluzione: fix test o codice, non disabilitare
```

### 4.2 Come Gestire

```
Quando bloccato:
1. Documenta il blocco
2. Identifica tipo
3. Comunica (issue/comment)
4. Se puoi fare altra cosa utile, procedi
5. Se totalmente bloccato, aspetta
```

---

## 5. Strategie di Mitigazione Generali

### 5.1 Task Atomici

```
✅ Task piccoli e focalizzati
✅ Un cambiamento per task
✅ rollback semplice
```

### 5.2 Validation Checklist

```
✅ Checklist per ogni task
✅ Verify prima di chiudere
✅ Documentare evidenze
```

### 5.3 Update Docs Contestuale

```
✅ Docs aggiornate quando codice cambia
✅ Stesso commit quando possibile
✅ Nessun task chiuso con docs obsolete
```

### 5.4 Communication

```
✅ Issue per blocker
✅ Comment in PR per dubbi
✅ Decision log per scelte importanti
```

---

## 6. Matrice Rischio

| Rischio | Prob | Imp | Mitigato |
|---------|------|-----|----------|
| Policy instabile | M | A | Si |
| API duplicati | M | M | Si |
| Runtime ambiguity | B | A | Si |
| UI regression | M | M | Si |
| Dati legacy | B | A | Parziale |
| Drift docs | A | M | In corso |

**Legenda**: Prob = Probabilità (A=Alta, M=Media, B=Bassa), Imp = Impatto

---

## 7. Contingency Plans

### 7.1 Se Policy Cambia Durante Phase

```
1. Stoppa implementazione corrente
2. Valuta impatto
3. Propone adjust al piano
4. Approva con stakeholder
5. Riprendi con updated spec
```

### 7.2 Se Test Coverage Insufficiente

```
1. Identifica gap
2. Aggiungi test migliorativi
3. Non rilasciare senza coverage minimo
```

### 7.3 Se Docs Drift Troppo

```
1. Stop new features
2. Allinea docs al codice
3. Verifica alignment
4. Riprendi
```

---

## 8. Exit Gate Criteria

Per ogni fase, exit gate richiede:

- [ ] Tutti i task completati
- [ ] Tutti i test passano
- [ ] Lint clean
- [ ] Build successful
- [ ] Docs aligned
- [ ] Nessun blocker aperto
- [ ] Sign-off implicito (nessuna objection)

---

*Questo documento aiuta a gestire dipendenze e rischi. Aggiornare quando nuovi rischi vengono identificati.*
