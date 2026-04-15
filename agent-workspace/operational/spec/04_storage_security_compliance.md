# Storage, Security, Compliance

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: agenti di coding
- **Status**: attivo

---

## Scopo

Questo documento definisce i requisiti trasversali di:
- Storage
- Sicurezza baseline
- Compliance

---

## 1. Storage

### 1.1 Scope Attuale

**Storage allegati/file è OUT OF SCOPE per la demo Basepack.**

```
❌ Niente upload file nel runtime corrente
❌ Niente download file nel runtime corrente
❌ Niente integrazione Cloudflare R2
❌ Nienteintegrazione S3
```

### 1.2 Motivazione

Focus della demo Basepack:
- Authentication
- Identity & Access
- API contracts
- Dashboard UI

Storage allegati è feature per release futura.

### 1.3 Future Consideration

Se in futuro servisse storage:

```
Opzione 1: Cloudflare R2
  - S3-compatible
  - Durable
  - Workers integration

Opzione 2: AWS S3
  - Standard
  - Wide ecosystem
```

Qualsiasi integrazione futura deve:
1. Essere documentata con ADR
2. Avere boundary API espliciti
3. Non toccare auth/identity core

---

## 2. Security Baseline

### 2.1 Password Hashing

```typescript
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

async function verifyPassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}
```

**Requisiti**:
- ✅ SALT_ROUNDS ≥ 12
- ✅ bcrypt come algoritmo
- ✅ Pepper lato server aggiuntivo

### 2.2 Login Rate Limiting

```typescript
// Implementazione semplificata
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

async function checkRateLimit(ip: string): Promise<boolean> {
  const attempt = loginAttempts.get(ip);

  if (!attempt) {
    loginAttempts.set(ip, { count: 1, lastAttempt: Date.now() });
    return true;
  }

  // Reset dopo 15 minuti
  if (Date.now() - attempt.lastAttempt > 15 * 60 * 1000) {
    loginAttempts.set(ip, { count: 1, lastAttempt: Date.now() });
    return true;
  }

  // Max 5 tentativi
  if (attempt.count >= 5) {
    return false;
  }

  attempt.count++;
  attempt.lastAttempt = Date.now();
  return true;
}
```

**Requisiti**:
- ✅ Max 5 tentativi login per IP
- ✅ Lockout 15 minuti dopo tentativi falliti
- ✅ Log tentativi sospetti

### 2.3 Cookie Security

```typescript
// In NextAuth config
cookies: {
  sessionToken: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  }
}
```

**Requisiti**:
- ✅ httpOnly sempre true
- ✅ secure true in produzione
- ✅ sameSite configurato

### 2.4 Environment Validation

```typescript
// Validazione env al boot
import { z } from "zod";

const EnvSchema = z.object({
  APP_RUNTIME: z.enum(["local", "demo", "live"]),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  AUTH_TOKEN_PEPPER: z.string().min(32),
  MONGODB_URI: z.string().regex(/^mongodb/),
});

export const env = EnvSchema.parse(process.env);
```

**Requisiti**:
- ✅ Validazione al boot
- ✅ Fail-fast su config mancante
- ✅ No placeholder (host1, username, etc.)

### 2.5 Bootstrap Controllato

```typescript
// In /setup - primo SUPER
async function bootstrapSuper(email: string, password: string) {
  // 1. Verifica database vuoto
  const userCount = await usersRepository.count();
  if (userCount > 0) {
    throw new Error("Bootstrap già completato");
  }

  // 2. Hash password
  const hashedPassword = await hashPassword(password);

  // 3. Crea SUPER
  const superUser = await usersRepository.create({
    email,
    passwordHash: hashedPassword,
    role: "SUPER",
    status: "active",
    invitedByUserId: null,
    permissions: []
  });

  return superUser;
}
```

**Requisiti**:
- ✅ Un solo SUPER possibile
- ✅ Solo su database vuoto
- ✅ Password hashed

---

## 3. Logging & Audit

### 3.1 Logger Wrapper

```typescript
// src/server/lib/logger.ts
type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  requestId?: string;
  [key: string]: unknown;
}

class Logger {
  private format(entry: LogEntry): string {
    return JSON.stringify({
      ...entry,
      timestamp: entry.timestamp.toISOString()
    });
  }

  info(message: string, meta?: Record<string, unknown>) {
    console.info(this.format({ level: "info", message, timestamp: new Date(), ...meta }));
  }

  error(message: string, error?: Error, meta?: Record<string, unknown>) {
    console.error(this.format({
      level: "error",
      message,
      timestamp: new Date(),
      error: error?.message,
      stack: error?.stack,
      ...meta
    }));
  }
}

export const logger = new Logger();
```

### 3.2 Audit Login

```typescript
// Audit login
await auditLogRepository.create({
  action: "LOGIN",
  userId: user.id,
  email: user.email,
  success: true,
  ip: request.headers["x-forwarded-for"] || "unknown",
  userAgent: request.headers["user-agent"],
  timestamp: new Date()
});
```

### 3.3 Audit Operazioni Core

```typescript
// Audit per operazioni sensibili
const auditActions = [
  "USER_CREATED",
  "USER_UPDATED",
  "USER_DELETED",
  "ROLE_CHANGED",
  "PERMISSIONS_UPDATED",
  "PASSWORD_CHANGED",
  "INVITE_GENERATED",
  "SETUP_COMPLETED"
];

async function audit(action: AuditAction, actor: SessionActor, target?: string) {
  await auditLogRepository.create({
    action,
    actorId: actor.userId,
    actorRole: actor.role,
    targetId: target,
    ip: getClientIP(),
    timestamp: new Date()
  });
}
```

---

## 4. Compliance

### 4.1 Privacy

```typescript
// Accettazione privacy
interface UserCompliance {
  privacyAcceptedAt: Date | null;
  privacyVersion: string | null;  // "1.0", "1.1", etc.
}

// In registrazione/setup
async function acceptPrivacy(userId: string, version: string) {
  await usersRepository.update(userId, {
    privacyAcceptedAt: new Date(),
    privacyVersion: version
  });

  await audit("PRIVACY_ACCEPTED", { userId, version });
}
```

### 4.2 Termini di Servizio

```typescript
// Accettazione termini
interface UserCompliance {
  termsAcceptedAt: Date | null;
  termsVersion: string | null;
}

// In registrazione/setup
async function acceptTerms(userId: string, version: string) {
  await usersRepository.update(userId, {
    termsAcceptedAt: new Date(),
    termsVersion: version
  });

  await audit("TERMS_ACCEPTED", { userId, version });
}
```

### 4.3 Cookie Policy

```typescript
// Cookie banner in UI
// In src/components/compliance/cookie-banner.tsx
const cookieCategories = [
  {
    name: "essential",
    label: "Essenziali",
    description: "Sessione e sicurezza",
    required: true
  },
  {
    name: "analytics",
    label: "Analytics",
    description: "Statistiche anonime",
    required: false
  }
];
```

---

## 5. Security Checklist

Prima di ogni release:

- [ ] Password hashed con bcrypt ≥ 12 salt rounds
- [ ] Rate limiting attivo su login
- [ ] Cookie httpOnly e secure
- [ ] ENV validation fail-fast
- [ ] Audit login attivo
- [ ] Audit operazioni sensibili attivo
- [ ] Privacy/termini acceptance funzionante
- [ ] Nessun secret in codice (solo env)

---

## 6. Out of Scope (Demo)

Per la demo Basepack, **NON** sono richiesti:

- ❌ MFA (Multi-Factor Authentication)
- ❌ SSO/SAML
- ❌ Password complexity UI加强了
- ❌ Session listing (admin view)
- ❌ Audit log dashboard

Questi sono feature per release enterprise.

---

## 7. Vulnerability Reporting

Se trovi una vulnerabilità:

1. NON creare issue pubblico
2. Email a: security@example.com
3. Descrizione dettagliata
4. Steps to reproduce
5. Impact assessment

Timeline target:
- Acknowledge: 24h
- Initial response: 7 days
- Fix target: 30 days

---

*Questo documento definisce i requisiti di sicurezza. Per implementazione, vedere `src/server/lib/security/`.*
