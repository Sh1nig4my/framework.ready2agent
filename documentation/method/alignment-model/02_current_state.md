# Current State - Stato Dettagliato Repository

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: agenti di coding
- **Status**: attivo

---

## 1. Architettura

### 1.1 Layer Pattern

| Layer | Percorso | Stato |
|-------|----------|-------|
| Controller | `src/app/api/*` | ✅ Presente |
| Service | `src/server/service/*.service.ts` | ✅ Presente |
| Repository | `src/server/repository/*.repository.ts` | ✅ Presente |
| Models | `src/server/models/*` | ✅ Presente |

### 1.2 Convenzioni Import

| Pattern | Stato |
|---------|-------|
| `@/server/service/*` | ✅ Consolidato |
| `@/server/repository/*` | ✅ Consolidato |
| `@/shared/*` | ✅ Presente |

### 1.3 Gap Architetturali

| Gap | Impatto | Priorità |
|-----|---------|----------|
| Alcune pagine server chiamano service direttamente | Accettabile per UI composition, ma da monitorare | P2 |
| Repository adapter ridondanti rimossi | Completato in fase P1.5 | - |

---

## 2. Identity & Access

### 2.1 Ruoli

| Ruolo | Implementato | Note |
|-------|-------------|------|
| SUPER | ✅ | Bootstrap da /setup |
| ADMIN | ✅ | Con invitedByUserId |
| OPERATOR | ✅ | Con permission map |
| USER | ✅ | Registrazione pubblica |

### 2.2 Policy Self-Only

| Aspetto | Stato | Note |
|---------|-------|------|
| ADMIN default self-only | ⚠️ Parziale | Alcuni endpoint ancora troppo permissivi |
| OPERATOR self-only | ⚠️ Parziale | Da completare enforcement |
| USER self-only | ✅ | Implementato |

### 2.3 Permission Map

| Aspetto | Stato | Note |
|---------|-------|------|
| ADMIN permessi delegati | ⚠️ Parziale | Lista implementata |
| OPERATOR capability map | ⚠️ Parziale | Struttura presente, enforcement da completare |

### 2.4 Gap Identity

| Gap | Priorità | File da modificare |
|-----|----------|-------------------|
| Self-only non globale | P1 | Service files |
| Equivalenze ADMIN=SUPER implicite | P1 | access.ts |
| OPERATOR deny-by-default | P2 | Service files |

---

## 3. Auth & Session

### 3.1 Stack Auth

| Componente | Implementato | Note |
|------------|-------------|------|
| NextAuth | ✅ | v4 |
| JWT | ✅ | Strategy |
| Credentials | ✅ | Email/password |
| bcrypt | ✅ | 12 salt rounds |

### 3.2 Session

| Aspetto | Stato | Note |
|---------|-------|------|
| JWT payload | ⚠️ Parziale | Da riallineare a spec |
| Remember me | ⚠️ Parziale | Da completare |
| Cookie secure | ✅ | Configurato |

### 3.3 Gap Auth

| Gap | Priorità | Note |
|-----|----------|------|
| TTL sessione non allineato | P2 | 24h vs extended |
| Payload JWT incompleto | P2 | Mancano alcuni campi |

---

## 4. API Contract

### 4.1 Endpoint Pattern

| Pattern | Stato | Note |
|---------|-------|------|
| REST in api/* | ✅ | Presente |
| Envelope jsonSuccess/jsonError | ✅ | Presente |
| Request ID | ✅ | Propagato |

### 4.2 Error Taxonomy

| Aspetto | Stato | Note |
|---------|-------|------|
| Codici VALIDATION_* | ⚠️ Parziale | Non tutti uniformi |
| Codici AUTH_* | ⚠️ Parziale | Non tutti uniformi |
| Codici BUSINESS_* | ⚠️ Parziale | Non tutti uniformi |

### 4.3 Gap API

| Gap | Priorità | Note |
|-----|----------|------|
| Error taxonomy uniforme | P3 | Da completare |
| Documentazione endpoint | P3 | Da aggiungere |

---

## 5. Data Model

### 5.1 Schemi

| Schema | Percorso | Stato |
|--------|----------|-------|
| User | `src/server/models/User.ts` | ✅ |
| AuditLog | `src/server/models/AuditLog.ts` | ✅ |

### 5.2 Campi User

| Campo | Stato | Note |
|-------|-------|------|
| email | ✅ | Unique, indexed |
| firstName | ✅ | |
| lastName | ✅ | |
| passwordHash | ✅ | bcrypt |
| role | ✅ | Enum |
| status | ✅ | active/inactive |
| permissions | ✅ | JSON/Object |
| invitedByUserId | ✅ | Nullable |
| createdAt | ✅ | |
| updatedAt | ✅ | |
| lastLoginAt | ⚠️ | Da aggiungere se mancante |
| termsAcceptedAt | ✅ | |
| privacyAcceptedAt | ✅ | |

### 5.3 Gap Data Model

| Gap | Priorità | Note |
|-----|----------|------|
| Terminologia spec-first | P2 | Alcuni campi legacy |
| Campo lastLoginAt | P3 | Utility, non critico |

---

## 6. UI & Navigation

### 6.1 Componenti

| Componente | Percorso | Stato |
|-----------|----------|-------|
| DashboardShell | `src/components/layout/` | ✅ |
| PublicShell | `src/components/layout/` | ✅ |
| AppSidebar | `src/components/navigation/` | ✅ |
| PageHeader | `src/components/layout/` | ✅ |

### 6.2 Navigation Role-Aware

| Ruolo | Visibility | Note |
|-------|------------|------|
| SUPER | Tutto | ✅ |
| ADMIN | Dipende da permessi | ⚠️ |
| OPERATOR | Dipende da permessi | ⚠️ |
| USER | Limitato | ✅ |

### 6.3 Gap UI

| Gap | Priorità | Note |
|-----|----------|------|
| Claim non allineati | P2 | Da verificare |
| Operatori invitati da ADMIN | P2 | Da completare |

---

## 7. Security

### 7.1 Misure

| Misura | Stato |
|--------|-------|
| bcrypt | ✅ |
| httpOnly cookies | ✅ |
| secure cookies prod | ✅ |
| Rate limiting | ✅ |
| ENV validation | ✅ |

### 7.2 Gap Security

| Gap | Priorità | Note |
|-----|----------|------|
| - | - | Baseline buona |

---

## 8. Storage

### 8.1 Scope

**Storage allegati è OUT OF SCOPE per demo Basepack.**

| Aspetto | Stato |
|---------|-------|
| Upload file | ❌ Out of scope |
| Download file | ❌ Out of scope |
| Cloudflare R2 | ❌ Out of scope |

---

## 9. Documentation

### 9.1 Documentazione

| Area | Stato | Note |
|------|-------|------|
| SPEC | ✅ | In allineamento |
| Setup | ✅ | Completo |
| Workflow | ✅ | In allineamento |
| Code comments | ⚠️ | Da migliorare |

### 9.2 Gap Docs

| Gap | Priorità | Note |
|-----|----------|------|
| Commenti codice | P3 | Dettagliare file principali |
| Italian localization | ✅ | In corso |

---

## 10. Testing

### 10.1 Test Coverage

| Area | Coverage |
|------|----------|
| Auth | ✅ |
| Services | ⚠️ |
| API | ⚠️ |

### 10.2 Gap Testing

| Gap | Priorità | Note |
|-----|----------|------|
| Coverage più ampio | P3 | Future enhancement |

---

## Riepilogo Gap Prioritari

| # | Gap | Priorità | Fase |
|---|-----|----------|------|
| 1 | Self-only non globale | P1 | Identity |
| 2 | ADMIN=SUPER implicito | P1 | Identity |
| 3 | OPERATOR deny-by-default | P2 | Identity |
| 4 | Error taxonomy | P3 | API |
| 5 | Commenti codice | P3 | Docs |

---

*Questo documento riflette lo stato attuale del repository.*
