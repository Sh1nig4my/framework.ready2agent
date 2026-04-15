# Constraints & Definition of Done

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: agenti di coding
- **Status**: attivo

---

## Scopo

Questo documento esplicita:
- Vincoli non funzionali
- Criteri di esclusione
- Condizioni minime di completamento

---

## 1. Vincoli Espliciti (NO)

Questi elementi sono **esplicitamente esclusi** dal progetto:

### 1.1 Multi-Tenant

```
❌ NO multi-tenant architecture
❌ NO organization-level isolation
❌ NO tenant-specific configuration
```

**Motivazione**: Complessità non necessaria per demo.

### 1.2 Organization

```
❌ NO organization entity
❌ NO organization hierarchy
❌ NO org-level permissions
```

**Motivazione**: Single-tenant, user-centric.

### 1.3 MFA (Multi-Factor Authentication)

```
❌ NO MFA requirement
❌ NO TOTP
❌ NO SMS verification
❌ NO hardware keys
```

**Motivazione**: Out of scope per Basepack.

### 1.4 Overengineering

```
❌ NO premature abstraction
❌ NO speculative generality
❌ NO pattern overengineering
❌ NO YAGNI violations
```

**Motivazione**: Mantenere complessità controllata.

---

## 2. Vincoli Positivi (YES)

Questi elementi sono **obbligatori**:

### 2.1 Single Tenant

```
✅ Single application instance
✅ Single user database
✅ User-centric model
```

### 2.2 Role Hierarchy

```
✅ SUPER > ADMIN > OPERATOR > USER
✅ Delegation top-down
✅ Self-only default
```

### 2.3 Clean Architecture

```
✅ Controller/Service/Repository
✅ REST as core contract
✅ Fail-fast validation
```

---

## 3. Definition of Done (DoD)

### 3.1 Criteri di Completamento

Il sistema Ready2Agent è **completo** quando sono verificati **TUTTI** i seguenti criteri:

#### Autenticazione

- [ ] Login funzionante
- [ ] Logout funzionante
- [ ] Sessione persistente (remember me)
- [ ] Password hashing corretto

#### Ruoli

- [ ] SUPER può accedere a tutto
- [ ] ADMIN vede solo se stesso (default)
- [ ] OPERATOR vede solo se stesso
- [ ] USER vede solo se stesso

#### Inviti

- [ ] SUPER può invitare ADMIN
- [ ] ADMIN può invitare OPERATOR
- [ ] Invito link funziona
- [ ] Operatori invitati da lui visibili

#### Permission Map

- [ ] OPERATOR ha permission map obbligatoria
- [ ] Permission map persistita
- [ ] Capability verificate server-side

#### Visibilità

- [ ] Self-only enforced ovunque
- [ ] Nessun bypass UI
- [ ] URL direct access rispetta regole

#### USER

- [ ] Registrazione pubblica funziona
- [ ] Login USER funziona
- [ ] Accesso limitato a propri dati

#### API

- [ ] REST come contratto
- [ ] Envelope standard (success/data/error)
- [ ] Error taxonomy rispettata
- [ ] Request ID propagato

#### Storage (fuori scope demo)

```
[N/A per demo Basepack]
```

#### Audit

- [ ] Login audit registrato
- [ ] Operazioni core audit registrato
- [ ] Timestamp accurati

#### Documentazione

- [ ] SPEC allineata al codice
- [ ] Setup guide funzionante
- [ ] Tutti i path documentati esistono

---

## 4. Criteri Non-Funzionali

### 4.1 Performance

| Metrica | Target |
|---------|--------|
| Page load | < 2s |
| API response | < 500ms |
| Build time | < 3min |

### 4.2 Security

| Requisito | Livello |
|-----------|---------|
| Password hashing | bcrypt 12+ rounds |
| Cookie | httpOnly + secure |
| Rate limiting | 5 tentativi/15min |

### 4.3 Reliability

| Requisito | Livello |
|-----------|---------|
| TypeScript | Strict mode |
| Lint | Zero errors |
| Tests | Core paths covered |

---

## 5. Anti-Pattern da Evitare

### 5.1 Code Smells

```
❌ God Object (service/repository troppo grande)
❌ Shotgun Surgery (change richiede modifica molti file)
❌ Magic Numbers (usa costanti nominate)
❌ Hardcoded Strings (usa costanti/tipi)
```

### 5.2 Design Smells

```
❌ Anemic Domain Model (entity senza behavior)
❌ Feature Envy (service che fa troppo con dati altrui)
❌ Primitive Obsession (usa tipi invece di primitives)
```

### 5.3 Documentation Smells

```
❌ Empty Documentation
❌ Outdated Documentation
❌ Contradictory Documentation
```

---

## 6. Regole Pratiche

### 6.1 Task Completamento

> **Un task può essere "completato" solo se TUTTI i criteri DoD pertinenti sono verificati.**

Se un criterio DoD manca:
- Il task è **parziale**, non **chiuso**
- Documenta cosa manca
- Crea follow-up task

### 6.2 Quality Gate

Prima di chiudere un task:

1. ✅ Code compilabile
2. ✅ Lint passing
3. ✅ Typecheck passing
4. ✅ Tests passing
5. ✅ Docs updated
6. ✅ Feature working

### 6.3 Regression Prevention

Dopo ogni modifica:

1. Testa scenari esistenti
2. Verifica no breaking changes
3. Check UI non rompere

---

## 7. Scope Creep Detection

### 7.1 Come Riconoscere

```
Segnali di scope creep:
- "Mentre ci siamo..."
- "Sarebbe carino se..."
- "L'utente potrebbe volere..."
- Feature fuori dalla SPEC
```

### 7.2 Come Gestire

```
1. Rifiuta educatamente
2. Documenta in backlog
3. Crea follow-up task
4. Rimani nello scope
```

---

## 8. Exit Criteria Checklist

Per ogni fase workflow:

### Fase 1 - Foundation

```
✅ Env validation fail-fast
✅ Fallback insicuri rimossi
✅ Runtime demo/live separati
✅ Bootstrap SUPER corretto
```

### Fase 2 - Identity

```
✅ Self-only policy globale
✅ Ruoli rispettati
✅ Permessi delegati funzionanti
```

### Fase 3 - Auth

```
✅ Session JWT corretta
✅ Remember me funzionante
✅ Cookie secure
```

### Fase 4 - API

```
✅ REST contract universale
✅ Envelope standard
✅ Error taxonomy uniforme
```

### Fase 5 - Data

```
✅ Schema spec-compliant
✅ Validation centralizzata
✅ Nessun campo fuori spec
```

### Fase 6 - UI

```
✅ Navigazione role-aware
✅ Form coerenti con API
✅ Nessun claim errato
```

### Fase 7 - Hardening

```
✅ Tutti i test passano
✅ Lint clean
✅ Build successful
✅ Documentazione allineata
```

---

## 9. Sign-Off Requirements

Prima di release:

| Fase | Approvazione |
|------|--------------|
| Foundation | Self-review + lint |
| Identity | Self-review + test |
| Auth | Security review |
| API | Contract review |
| Data | Schema review |
| UI | Visual check |
| Hardening | Full validation |

---

## 10. Glossary

| Termine | Definizione |
|---------|-------------|
| DoD | Definition of Done |
| MVP | Minimum Viable Product |
| Basepack | Prima release funzionante |
| Scope | Cosa è incluso |
| Out of scope | Cosa è escluso |

---

*Questo documento definisce quando il lavoro è completo. In caso di dubbio, consulta questo documento prima di chiudere un task.*
