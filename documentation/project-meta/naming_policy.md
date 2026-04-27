# Naming Policy - Convenzioni Naming Repository

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: agenti di coding, contributor
- **Status**: attivo

---

## Scopo

Definire le **convenzioni di naming** per mantenere coerenza nel repository.

---

## 1. File Naming

### 1.1 Markdown Files

```
✅ USA kebab-case
   Esempio: first-run-setup.md

❌ NON USARE:
   - camelCase (firstRun.md)
   - PascalCase (FirstRun.md)
   - snake_case (first_run.md)
   - Spazi (first run.md)
```

### 1.2 File TypeScript

```
✅ USA kebab-case per file
   Esempio: auth-service.ts

✅ USA PascalCase per file che esportano componenti React
   Esempio: DashboardShell.tsx

❌ NON USARE:
   - kebab-case per componenti React
   - camelCase generalmente
```

### 1.3 Directory

```
✅ USA kebab-case
   Esempio: src/app/api/auth

❌ NON USARE:
   - camelCase
   - PascalCase (eccetto per namespace folder Next.js come app/, components/)
```

---

## 2. TypeScript Naming

### 2.1 Variables e Functions

```typescript
// ✅ USA camelCase
const userEmail = "test@example.com";
function getUserById(id: string) {}

// ❌ NON USA:
const user_email = "test@example.com";  // snake_case
const UserEmail = "test@example.com";   // PascalCase
```

### 2.2 Types e Interfaces

```typescript
// ✅ USA PascalCase con prefisso per tipi
type UserRole = "SUPER" | "ADMIN" | "OPERATOR" | "USER";
interface SessionActor {
  userId: string;
  role: UserRole;
}

// ✅ ENUM in PascalCase
enum ApiErrorCode {
  ValidationRequired = "VALIDATION_REQUIRED",
  AuthInvalid = "AUTH_INVALID"
}
```

### 2.3 Constants

```typescript
// ✅ USA UPPER_SNAKE_CASE per costanti
const MAX_LOGIN_ATTEMPTS = 5;
const SALT_ROUNDS = 12;

// ✅ USA camelCase per const di oggetti complessi (ma mai per oggetti exportati come config)
const defaultUserPermissions = { read: true };
```

### 2.4 Classes

```typescript
// ✅ USA PascalCase
class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string
  ) {
    super(message);
  }
}
```

---

## 3. API Naming

### 3.1 Route Paths

```
✅ USA kebab-case per path
   Esempio: /api/administrators/invite

❌ NON USA:
   - camelCase: /api/administrators/inviteToken
   - snake_case: /api/administrators/invite_token
```

### 3.2 HTTP Methods

```
✅ USA metodi HTTP standard
   GET    → Lettura
   POST   → Creazione
   PUT    → Sostituzione completa
   PATCH  → Aggiornamento parziale
   DELETE → Cancellazione
```

### 3.3 Envelope Fields

```typescript
// ✅ USA camelCase per campi envelope
{
  success: boolean,
  data: unknown,
  error: {
    code: string,
    message: string,
    details?: unknown
  },
  requestId?: string
}
```

---

## 4. Database Naming

### 4.1 Collection Names

```
✅ USA PascalCase singolare
   Esempio: User, AuditLog, InviteToken

❌ NON USA:
   - kebab-case: users
   - snake_case: user_logs
```

### 4.2 Field Names

```
✅ USA camelCase
   Esempio: invitedByUserId, lastLoginAt

❌ NON USA:
   - snake_case: invited_by_user_id
   - PascalCase: InvitedByUserId
```

---

## 5. CSS Naming

### 5.1 CSS Variables

```css
/* ✅ USA kebab-case */
:root {
  --color-primary: #3b82f6;
  --color-background: #fafafa;
  --font-size-lg: 1.125rem;
}

/* ✅ USA semantic naming */
--color-success: #22c55e;
--color-error: #ef4444;
```

### 5.2 Component Classes

```tsx
// ✅ USA className descrittivi in camelCase o kebab-case
<div className="surface-panel">
<div className="page-header">
```

---

## 6. Commit Messages

### 6.1 Formato

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### 6.2 Types

```
feat:     Nuova feature
fix:      Bug fix
docs:     Documentazione
style:    Formattazione (no logic change)
refactor: Refactoring
test:     Aggiunta test
chore:    Maintenance
```

### 6.3 Esempi

```
✅ feat(auth): implementare login rate limiting
✅ fix(api): correggere envelope campo requestId mancante
✅ docs(setup): aggiornare guida MongoDB Atlas
✅ refactor(service): estrai validation in helper
```

---

## 7. Git Branch Naming

### 7.1 Formato

```
<type>/<ticket-id>-<short-description>

Esempi:
✅ feature/PHASE-2-self-only-policy
✅ fix/auth-session-expiry
✅ docs/update-setup-guide
✅ refactor/extract-validation-helper
```

### 7.2 Tipi Branch

```
feature/  → Nuove feature
fix/      → Bug fix
docs/     → Documentazione
refactor/ → Refactoring
hotfix/   → Fix urgenti
```

---

## 8. Folder Structure Naming

### 8.1 Struttura Standard

```
src/
├── app/                    # Next.js App Router
├── components/            # Componenti React
│   ├── ui/                # Primitive UI
│   ├── layout/            # Layout components
│   └── navigation/        # Navigation
├── server/                # Backend
│   ├── service/           # Business logic
│   ├── repository/        # Data access
│   ├── models/            # Schemi
│   └── lib/               # Utilities
└── shared/                # Condivisi
    ├── types/             # Tipi
    └── navigation/        # Config nav
```

---

## 9. Linting e Formatting

### 9.1 ESLint

Usa configurazione TypeScript ESLint.

### 9.2 Prettier

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

---

## 10. Eccezioni

### 10.1 Next.js Special Folders

```
✅ USA PascalCase per folder Next.js speciali
   (app/, components/, pages/) → Mantieni come Next.js richiede

✅ USA kebab-case per tutto il resto
```

### 10.2 Legacy Code

```
⚠️ Il codice legacy può non seguire queste regole.
   In caso di refactor, allinea al nuovo standard.
```

---

## 11. Checklist

Prima di ogni commit:

- [ ] File naming corretto (kebab-case per .md)
- [ ] TypeScript naming corretto (camelCase vars, PascalCase types)
- [ ] API paths in kebab-case
- [ ] Commit message nel formato corretto
- [ ] Branch name nel formato corretto

---

*Queste convenzioni garantiscono coerenza leggibile.*
