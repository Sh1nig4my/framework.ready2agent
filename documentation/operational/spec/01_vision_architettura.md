# Visione e Architettura - Vincoli Non Negoziabili

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: agenti di coding
- **Status**: attivo

---

## Scopo

Questo documento definisce i **vincoli architetturali non negoziabili** per Ready2Agent.

Ogni implementazione deve rispettare questi vincoli. Qualsiasi deviazione richiede:
1. Approvazione esplicita
2. Aggiornamento della spec
3. Decision log in `project-meta/decision_log.md`

---

## 1. Visione del Progetto

Ready2Agent è un **framework fullstack plug-and-play** con:

- impostazione enterprise
- complessità controllata
- orientamento didattico
- estendibilità senza rompere il core

### Cosa Ready2Agent È

✅ Framework completo con auth, IAM, dashboard
✅ Casistica didattica di sviluppo AI-native
✅ Pattern architetturali espliciti e documentati
✅ Manutenzione e evoluzione tracciabili

### Cosa Ready2Agent NON È

❌ Starter kit con feature disconnected
❌ Progetto demo senza governance
❌ Template senza metodo operativo
❌ Benchmark per pattern speculativi

---

## 2. Architettura Obbligatoria

### 2.1 Stack Tecnologico

| Componente | Obbligo |
|------------|---------|
| Runtime | Next.js App Router monolith |
| Tipo | TypeScript strict mode |
| Database | MongoDB + Mongoose |
| Auth | NextAuth + JWT + Credentials |
| Validazione | Zod |

### 2.2 Pattern Architetturale

**Controller / Service / Repository**

```
Controller (src/app/api/*)
    ↓ chiama solo
Service (src/server/service/*.service.ts)
    ↓ chiama solo
Repository (src/server/repository/*.repository.ts)
```

### 2.3 Regola Aurea

> **La business logic vive SOLO nei service.**

Qualsiasi violazione di questo principio è debito tecnico.

---

## 3. Struttura Directory Obbligatoria

### 3.1 Layer Controller

```
src/app/api/*
```

**Responsabilità**:
- Request parsing
- Validazione Zod
- Response envelope
- Actor loading

**NON DEVE** contenere business logic.

### 3.2 Layer Service

```
src/server/service/*.service.ts
```

**Responsabilità**:
- Logica di business
- Controlli autorizzazione
- Policy enforcement
- Validation

### 3.3 Layer Repository

```
src/server/repository/*.repository.ts
```

**Responsabilità**:
- Accesso persistence
- Query MongoDB
- Data mapping

### 3.4 Config Server

```
src/server/config/*
```

Configurazione runtime del server.

### 3.5 Modelli Persistence

```
src/server/models/*
```

Schemi Mongoose per MongoDB.

### 3.6 Shared Contracts

```
src/shared/*
```

Tipi e DTO condivisi tra frontend e backend.

---

## 4. Convenzioni Import Canoniche

Per nuovo codice, **OBBLIGATORIE** le seguenti import:

```typescript
// Business logic
import { usersService } from "@/server/service/users.service";

// Data access
import { usersRepository } from "@/server/repository/users.repository";

// Shared types
import type { User } from "@/shared/types/user";
import type { ApiResponse } from "@/shared/types/api";

// Config
import { env } from "@/server/config/env";
```

### Path Alias Configurati

| Alias | Percorso |
|-------|----------|
| `@/server/service/*` | `src/server/service/*` |
| `@/server/repository/*` | `src/server/repository/*` |
| `@/server/config/*` | `src/server/config/*` |
| `@/server/*` | `src/server/*` |
| `@/shared/*` | `src/shared/*` |
| `@/components/*` | `src/components/*` |

---

## 5. REST Come Contratto Core

### 5.1 Quando Usare REST

Tutte le operazioni di business devono passare per API REST in `src/app/api/*`.

### 5.2 Quando Usare Server Actions

Le Server Actions sono accettate solo per:
- UI composition locale
- Form submissions semplici che non richiedono logica complessa

### 5.3 Quando Usare Direct Service Calls

Le chiamate dirette ai service sono accettate solo in:
- Server Components che fanno UI composition
- Server-side data fetching

---

## 6. Server-Only vs Shared

### 6.1 Server-Only (mai in client components)

```
src/server/*
src/app/api/*
```

### 6.2 Shared (sicuri per client e server)

```
src/shared/*
src/components/ui/*
```

### 6.3 Frontend Safety Rule

> **Nessun componente client può importare codice da `src/server/*`.**

Se un type è necessario sia in frontend che backend, mettilo in `src/shared/*`.

---

## 7. Regole Operative

### 7.1 Anti-Circular Dependency

```
Controller → Service → Repository → Model
     ↑            ↓
     └────────────┘ (NO)
```

Non sono ammessi cicli di dipendenza.

### 7.2 No Business Logic in Controller

❌ **VIETATO**:
```typescript
// src/app/api/users/route.ts
export async function GET() {
  const users = await UserModel.find(); // NO! Direct DB access
  return json(users);
}
```

✅ **CORRETTO**:
```typescript
// src/app/api/users/route.ts
export async function GET() {
  const users = await usersService.getAllUsers();
  return jsonSuccess(users);
}
```

### 7.3 No Direct Model Access in Service

❌ **VIETATO**:
```typescript
// src/server/service/users.service.ts
export async function getAllUsers() {
  return UserModel.find(); // NO! Direct model in service
}
```

✅ **CORRETTO**:
```typescript
// src/server/service/users.service.ts
export async function getAllUsers() {
  return usersRepository.findAll();
}
```

---

## 8. Eccezioni Documentate

Le eccezioni a queste regole devono essere:

1. Documentate inline con commento `// ECCEZIONE: ...`
2. Registrate in `project-meta/decision_log.md`
3. Limitate nel scope

### Eccezioni Attuali

- **UI composition diretta**: Server pages che chiamano service per fetch semplice sono accettate per UI composition.

---

## 9. Enforcement

### 9.1 Linting

ESLint è configurato per:
- No default exports in service/repository
- Naming conventions obbligatorie
- No `any` type

### 9.2 TypeScript

TypeScript strict mode è obbligatorio:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### 9.3 Review

Ogni PR deve rispettare queste regole architetturali.

---

## 10. Aggiornamento Spec

Quando serve modificare questi vincoli:

1. Proponi modifica in `project-meta/decision_log.md`
2. Aggiorna questo documento
3. Aggiorna `workflow/requirements/ready2agent_master_spec_v2_1.md` (sezione storica, se necessario)
4. Notifica nell'issue/PR

---

## Checklist Conformità

Prima di ogni commit, verifica:

- [ ] Controller non chiama direttamente Model/Repository
- [ ] Service contiene solo business logic
- [ ] Repository contiene solo persistence logic
- [ ] Path canonici usati (`@/server/service/*`, etc.)
- [ ] Nessun `any` non documentato
- [ ] Nessuna circular dependency
- [ ] Codice commentato per didattica

---

*Questo documento è la source of truth architetturale. In caso di conflitto, questo ha priorità su altri documenti.*
