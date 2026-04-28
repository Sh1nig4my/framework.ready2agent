# Gap Matrix - Problemi e Soluzioni

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: agenti di coding
- **Status**: attivo

---

## Scopo

Questa matrice mappa ogni problema identificato con:
- Area di appartenenza
- Priorità
- Soluzione
- File da modificare

---

## Gap Critici (P1)

### G-01: Self-Only Non Globale

| Attributo | Valore |
|-----------|--------|
| **Problema** | La regola self-only non è applicata in tutti i flussi |
| **Area** | Identity & Access |
| **Priorità** | P1 - Critico |
| **Impatto** | Potenziale data leak, privacy violation |
| **Status** | In riallineamento |

#### Soluzione

1. Identificare tutti gli endpoint che mostrano dati di altri utenti
2. Aggiungere filtro `invitedByUserId` per ADMIN/OPERATOR
3. Verificare che SUPER bypassi il filtro
4. Aggiungere test per ogni scenario

#### File da Modificare

```
src/server/service/*.service.ts
src/server/repository/*.repository.ts
```

#### Checklist

- [ ] Service ha check self-only?
- [ ] Repository filtra per invitedByUserId?
- [ ] SUPER bypassa i filtri?
- [ ] Test cover scenario self-only?

---

### G-02: Equivalenza ADMIN=SUPER Implicita

| Attributo | Valore |
|-----------|--------|
| **Problema** | ADMIN ha implicitamente accesso da SUPER in alcuni punti |
| **Area** | Identity & Access |
| **Priorità** | P1 - Critico |
| **Impatto** | Violazione gerarchia ruoli |
| **Status** | Da correggere |

#### Soluzione

1. Cercare riferimenti a ruolo ADMIN che trattano come SUPER
2. Rimuovere equivalenze implicite
3. Implementare permesso esplicito dove necessario

#### Pattern Errato

```typescript
// ❌ ERRATO
if (actor.role === "ADMIN" || actor.role === "SUPER") {
  // ADMIN non dovrebbe avere tutto!
}
```

#### Pattern Corretto

```typescript
// ✅ CORRETTO
if (actor.role === "SUPER") {
  // Solo SUPER ha accesso totale
}

// Per ADMIN con permesso specifico:
if (actor.role === "ADMIN" && actor.permissions.includes("viewAll")) {
  // Solo se ha permesso esplicito
}
```

#### File da Modificare

```
src/server/lib/auth/access.ts
src/server/service/*.service.ts
```

---

### G-03: OPERATOR Deny-by-Default Parziale

| Attributo | Valore |
|-----------|--------|
| **Problema** | OPERATOR potrebbe accedere a risorse senza check capability |
| **Area** | Identity & Access |
| **Priorità** | P1 |
| **Impatto** | Capability non enforcement |
| **Status** | Da completare |

#### Soluzione

1. Identificare tutti gli ambiti OPERATOR
2. Implementare check capability map
3. Default deny se capability non presente o false

#### Pattern

```typescript
// In service
async function getDocuments(actor: SessionActor) {
  // Check capability
  if (actor.role === "OPERATOR") {
    const capabilities = actor.permissions?.documents;
    if (!capabilities?.read) {
      throw new BusinessError("ACCESS_DENIED");
    }
  }

  // ... proceed
}
```

---

## Gap Medi (P2)

### G-04: Error Taxonomy Non Uniforme

| Attributo | Valore |
|-----------|--------|
| **Problema** | Codici errore non consistenti tra endpoint |
| **Area** | API |
| **Priorità** | P2 |
| **Impatto** | DX inconsistency, debugging harder |
| **Status** | Da completare |

#### Soluzione

1. Definire lista codici standard in `src/server/errors/`
2. Usare sempre codici dalla lista
3. Non inventare codici ad-hoc

#### Codici Standard

```typescript
// src/server/errors/codes.ts
export const ErrorCodes = {
  // Validation
  VALIDATION_REQUIRED: "VALIDATION_REQUIRED",
  VALIDATION_FORMAT: "VALIDATION_FORMAT",
  VALIDATION_LENGTH: "VALIDATION_LENGTH",

  // Auth
  AUTH_INVALID_CREDENTIALS: "AUTH_INVALID_CREDENTIALS",
  AUTH_SESSION_EXPIRED: "AUTH_SESSION_EXPIRED",

  // Business
  BUSINESS_ACCESS_DENIED: "BUSINESS_ACCESS_DENIED",
  BUSINESS_NOT_FOUND: "BUSINESS_NOT_FOUND",
  BUSINESS_DUPLICATE: "BUSINESS_DUPLICATE",

  // System
  SYSTEM_ERROR: "SYSTEM_ERROR",
} as const;
```

#### File da Modificare

```
src/server/errors/*.ts
src/server/service/*.service.ts
src/app/api/**/*.ts
```

---

### G-05: Session Semantics Non Allineata

| Attributo | Valore |
|-----------|--------|
| **Problema** | TTL sessione e payload JWT non come spec |
| **Area** | Auth |
| **Priorità** | P2 |
| **Impatto** | UX sessione non ideale |
| **Status** | In fase di riallineamento |

#### Differenze Attuali

| Aspetto | Spec | Attuale |
|---------|------|---------|
| Default TTL | 24h | Da verificare |
| Remember me | 30d | Da implementare |
| Payload JWT | userId, role, permissions | Da completare |

#### File da Modificare

```
src/server/lib/auth/session.ts
src/app/api/auth/[...nextauth]/route.ts
```

---

### G-06: REST Non Universale

| Attributo | Valore |
|-----------|--------|
| **Problema** | Alcuni endpoint non seguono pattern REST |
| **Area** | API |
| **Priorità** | P2 |
| **Impatto** | DX inconsistency |
| **Status** | Da standardizzare |

#### Checklist REST

- [ ] GET per lettura
- [ ] POST per creazione
- [ ] PUT/PATCH per update
- [ ] DELETE per cancellazione
- [ ] Status code appropriati

---

### G-07: Navigazione ADMIN Dipende da Permessi

| Attributo | Valore |
|-----------|--------|
| **Problema** | UI ADMIN non mostra moduli basati su permessi |
| **Area** | UI |
| **Priorità** | P2 |
| **Impatto** | UX confusion |
| **Status** | Da implementare |

#### Soluzione

1. Configurazione navigazione role-aware in `src/shared/navigation/config.ts`
2. Filtrare basato su `actor.permissions`
3. Test con ADMIN con/senza permessi

---

## Gap Minori (P3)

### G-08: Commenti Codice Dettagliati

| Attributo | Valore |
|-----------|--------|
| **Problema** | Commenti codice insufficienti per didattica |
| **Area** | Documentation |
| **Priorità** | P3 |
| **Impatto** | DX per nuovi contributor |
| **Status** | Da migliorare |

#### File Prioritari

```
src/server/service/*.service.ts
src/server/repository/*.repository.ts
src/server/lib/auth/access.ts
src/server/lib/auth/session.ts
src/server/models/User.ts
```

---

### G-09: Terminologia Schema Non Spec-First

| Attributo | Valore |
|-----------|--------|
| **Problema** | Alcuni nomi campo non rispecchiano spec |
| **Area** | Data Model |
| **Priorità** | P3 |
| **Impatto** | Maintenance harder |
| **Status** | Da valutare |

---

## Riepilogo Matrice

| ID | Gap | Area | Priorità | Status |
|----|-----|------|----------|--------|
| G-01 | Self-only non globale | Identity | P1 | In corso |
| G-02 | ADMIN=SUPER implicito | Identity | P1 | Da fare |
| G-03 | OPERATOR deny-by-default | Identity | P1 | Da fare |
| G-04 | Error taxonomy | API | P2 | Da fare |
| G-05 | Session semantics | Auth | P2 | In corso |
| G-06 | REST non universale | API | P2 | Da fare |
| G-07 | Nav ADMIN | UI | P2 | Da fare |
| G-08 | Commenti | Docs | P3 | Da fare |
| G-09 | Terminologia schema | Data | P3 | Valutare |

---

## Action Plan

### Immediato (Questa iterazione)

1. ✅ Self-only enforcement
2. ✅ Rimuovere ADMIN=SUPER implicito
3. ⬜ OPERATOR capability enforcement

### Prossimo (Prossima iterazione)

4. ⬜ Error taxonomy uniforme
5. ⬜ Session semantics
6. ⬜ REST standardization

### Future

7. ⬜ UI navigation fine-grained
8. ⬜ Commenti codice
9. ⬜ Schema naming

---

*Questa matrice è uno strumento operativo. Aggiornare quando gap vengono risolti o nuovi identificati.*
