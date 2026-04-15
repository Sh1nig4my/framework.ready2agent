# Auth, API, Validation - Contratti e Requisiti

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: agenti di coding
- **Status**: attivo

---

## Scopo

Questo documento consolida i requisiti core su:
- Autenticazione e sessione
- Contratti API
- Sistema di validazione

---

## 1. Stack di Autenticazione

### 1.1 Componenti

| Componente | Tecnologia |
|------------|------------|
| Auth provider | NextAuth.js v4 |
| Session type | JWT |
| Credential provider | Credentials (email + password) |
| Password hashing | bcrypt |
| Token pepper | AUTH_TOKEN_PEPPER |

### 1.2 Configurazione

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Implementazione in auth.service.ts
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 // 24 ore default
  },
  callbacks: {
    async jwt({ token, user }) {
      // Payload include userId, role, permissions
    },
    async session({ session, token }) {
      // Session include actor info
    }
  }
});
```

---

## 2. Payload Sessione

### 2.1 JWT Token Structure

```typescript
interface JWTToken {
  userId: string;           // ID MongoDB dell'utente
  email: string;            // Email univoca
  role: UserRole;           // SUPER | ADMIN | OPERATOR | USER
  permissions?: string[];   // Solo per OPERATOR e ADMIN con deleghe
  invitedByUserId?: string; // Chi ha invitato questo utente
  iat: number;              // Issued at
  exp: number;              // Expiration
}
```

### 2.2 Session Object

```typescript
interface Session {
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
  expires: string;
  actor: SessionActor;      // Esteso con permissions
}
```

### 2.3 Session Actor

```typescript
interface SessionActor {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: string[];    // Per OPERATOR e ADMIN
  invitedByUserId?: string;
}
```

---

## 3. Durata Sessione

### 3.1 Tempi Standard

| Modalità | Durata |
|----------|--------|
| Default | 24 ore |
| Remember me | 30 giorni |

### 3.2 Implementazione

```typescript
// In login form, campo booleano
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean; // true = 30 giorni
}

// Nel callback NextAuth
if (credentials.rememberMe) {
  token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
}
```

---

## 4. Cookie Security

### 4.1 Configurazione Produzione

```typescript
cookies: {
  sessionToken: {
    name: "__Secure-next-auth.session-token",
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    }
  }
}
```

### 4.2 Requisiti

| Setting | Valore | Note |
|---------|--------|------|
| httpOnly | `true` | Previene XSS access |
| secure | `true` (prod) | HTTPS only |
| sameSite | `"lax"` | CSRF protection bilanciata |
| path | `"/"` | Tutti i path |

---

## 5. Contratto API

### 5.1 Envelope Standard

**Tutte le API DEVONO** restituire questo envelope:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;           // Codice errore mnemonico
    message: string;       // Messaggio leggibile
    details?: unknown;     // Dettagli aggiuntivi (opzionale)
  };
  requestId?: string;      // ID request per tracing
}
```

### 5.2 Esempio Success

```typescript
// GET /api/users/me
{
  "success": true,
  "data": {
    "id": "65f...",
    "email": "user@example.com",
    "role": "USER"
  },
  "requestId": "req_abc123"
}
```

### 5.3 Esempio Error

```typescript
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email non valida",
    "details": {
      "field": "email",
      "constraint": "email format"
    }
  },
  "requestId": "req_abc123"
}
```

---

## 6. Tassonomia Errori

### 6.1 Tipi di Errore

| Tipo | Codice Prefix | Quando Usarlo |
|------|---------------|---------------|
| Validation | `VALIDATION_*` | Input non valido |
| Auth | `AUTH_*` | Credenziali, sessione |
| Business | `BUSINESS_*` | Logica violata |
| System | `SYSTEM_*` | Server, DB |

### 6.2 Codici Specifici

```typescript
// Validation
const VALIDATION_ERRORS = {
  REQUIRED_FIELD: "VALIDATION_REQUIRED_FIELD",
  INVALID_FORMAT: "VALIDATION_INVALID_FORMAT",
  EMAIL_INVALID: "VALIDATION_EMAIL_INVALID",
  PASSWORD_WEAK: "VALIDATION_PASSWORD_WEAK",
} as const;

// Auth
const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "AUTH_INVALID_CREDENTIALS",
  SESSION_EXPIRED: "AUTH_SESSION_EXPIRED",
  ACCOUNT_LOCKED: "AUTH_ACCOUNT_LOCKED",
} as const;

// Business
const BUSINESS_ERRORS = {
  ACCESS_DENIED: "BUSINESS_ACCESS_DENIED",
  DUPLICATE_EMAIL: "BUSINESS_DUPLICATE_EMAIL",
  NOT_FOUND: "BUSINESS_NOT_FOUND",
  OPERATION_NOT_ALLOWED: "BUSINESS_OPERATION_NOT_ALLOWED",
} as const;

// System
const SYSTEM_ERRORS = {
  DB_ERROR: "SYSTEM_DB_ERROR",
  INTERNAL_ERROR: "SYSTEM_INTERNAL_ERROR",
  SERVICE_UNAVAILABLE: "SYSTEM_SERVICE_UNAVAILABLE",
} as const;
```

### 6.3 Error Hierarchy

```
Error (base)
  ↓
NextAuthError
  ↓
ValidationError → BusinessError → SystemError
```

---

## 7. Validazione Centralizzata

### 7.1 Principio

> **Validazione ai boundary, non duplicare in service.**

### 7.2 Layer di Validazione

```
1. API Route (Zod schema)
   ↓ validazione input
2. Service (business rules)
   ↓ validazione dominio
3. Repository (data constraints)
   ↓
Database
```

### 7.3 Zod Schema in API

```typescript
import { z } from "zod";

const CreateUserSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(8, "Minimo 8 caratteri"),
  firstName: z.string().min(1, "Nome richiesto"),
  lastName: z.string().min(1, "Cognome richiesto"),
});

export async function POST(request: Request) {
  const body = await request.json();
  const result = CreateUserSchema.safeParse(body);

  if (!result.success) {
    return jsonError({
      code: "VALIDATION_ERROR",
      message: "Dati non validi",
      details: result.error.flatten()
    });
  }

  // Prosegui con result.data (type-safe)
}
```

### 7.4 Validazione Business in Service

```typescript
// In service, validazione dominio
async function createOperator(data: CreateOperatorInput, actor: SessionActor) {
  // 1. Verifica actor può creare operator
  if (!canInviteOperator(actor)) {
    throw new BusinessError("ACCESS_DENIED");
  }

  // 2. Verifica business rules
  if (await usersRepository.existsByEmail(data.email)) {
    throw new BusinessError("DUPLICATE_EMAIL");
  }

  // 3. Crea con permission map default vuota
  const operator = await usersRepository.create({
    ...data,
    role: "OPERATOR",
    permissions: {}, // Vuota di default
    invitedByUserId: actor.userId
  });

  return operator;
}
```

---

## 8. Request ID Propagation

### 8.1 Generazione

```typescript
// In middleware o API base
import { randomUUID } from "crypto";

export function generateRequestId(): string {
  return `req_${randomUUID().replace(/-/g, "").slice(0, 12)}`;
}
```

### 8.2 Tracing

```typescript
// Propaga in tutti i layer
async function serviceMethod(param: string, requestId: string) {
  logger.info({ requestId, param }, "Service called");
  const result = await repository.find(param, requestId);
  logger.info({ requestId, resultCount: result.length }, "Query completed");
  return result;
}
```

---

## 9. Logging e Audit

### 9.1 Login Audit

```typescript
// In auth service
async function auditLogin(userId: string, success: boolean, ip: string) {
  await auditLogRepository.create({
    action: "LOGIN",
    userId,
    success,
    ip,
    timestamp: new Date()
  });
}
```

### 9.2 Operazioni Core Audit

```typescript
// In ogni service che modifica dati
async function createUser(data: CreateUserInput, actor: SessionActor) {
  const user = await usersRepository.create(data);

  await auditLogRepository.create({
    action: "USER_CREATED",
    actorId: actor.userId,
    targetId: user.id,
    changes: data,
    timestamp: new Date()
  });

  return user;
}
```

---

## 10. Checklist Conformità

Prima di ogni implementazione API/auth:

- [ ] API usa envelope standard `ApiResponse`
- [ ] Codici errore da tassonomia definita
- [ ] Request ID propagato
- [ ] Zod validation in API route
- [ ] Business validation in service
- [ ] Audit log per operazioni sensibili
- [ ] Cookie secure in produzione

---

*Per implementazione, vedere `src/server/service/auth.service.ts` e `src/app/api/auth/`.*
