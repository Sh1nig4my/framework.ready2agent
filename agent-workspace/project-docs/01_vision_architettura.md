# Visione e Architettura di Ready2Agent

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: lettori, developer, stakeholder
- **Status**: attivo

---

## 1. Cos'è Ready2Agent

Ready2Agent è un **framework fullstack plug-and-play** costruito con Next.js e TypeScript.

Non è un semplice starter kit: è un sistema pensato per due obiettivi paralleli:

### 1.1 Profilo Prodotto

Come **framework applicativo**, Ready2Agent offre:

- Autenticazione sicura con NextAuth + JWT
- Governance ruoli a piramide (SUPER > ADMIN > OPERATOR > USER)
- Permessi granulari per OPERATOR, validati sempre server-side
- Setup bootstrap per creare il primo account SUPER
- Dashboard privata con moduli differenziati per ruolo
- API REST standardizzate con envelope coerente
- Sistema di audit e logging

### 1.2 Profilo Metodologico

Come **caso studio di sviluppo AI-native**, Ready2Agent dimostra:

- Come organizzare contesto progetto per agenti di coding
- Come eseguire task in sequenza deterministica
- Come tracciare decisioni e stato in documentazione
- Come mantenere architettura e documentazione sincronizzate

Gli artefatti workflow sono parte del valore del prodotto, non sottoprodotti.

---

## 2. Architettura Tecnica

### 2.1 Stack

| Componente | Tecnologia |
|------------|------------|
| Runtime | Next.js App Router (monolite) |
| Tipo | TypeScript strict |
| Database | MongoDB + Mongoose |
| Auth | NextAuth.js con JWT e Credentials |
| Styling | CSS Custom Properties + Tailwind-like utilities |
| Validazione | Zod |

### 2.2 Pattern Architetturale

**Controller / Service / Repository**

```
┌─────────────────────────────────────────────────────────┐
│                    Controller Layer                      │
│                    (src/app/api/*)                      │
│  - Request parsing                                       │
│  - Validazione Zod                                       │
│  - Response envelope                                     │
│  - Actor loading                                        │
└────────────────────────┬────────────────────────────────┘
                         │ chiama solo
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    Service Layer                        │
│                (src/server/service/*)                   │
│  - Logica di business                                    │
│  - Controlli autorizzazione                             │
│  - Policy enforcement                                   │
│  - Validation                                           │
└────────────────────────┬────────────────────────────────┘
                         │ chiama solo
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   Repository Layer                      │
│              (src/server/repository/*)                  │
│  - Accesso persistence                                  │
│  - Query MongoDB                                        │
│  - Data mapping                                         │
└─────────────────────────────────────────────────────────┘
```

### 2.3 Struttura Directory

```
src/
├── app/
│   ├── api/                    # Controller REST
│   ├── (public)/              # Pagine pubbliche (login, register, invite)
│   ├── dashboard/             # Dashboard protetta
│   ├── setup/                 # Bootstrap primo SUPER
│   └── layout.tsx             # Root layout
├── components/
│   ├── ui/                    # Primitive visive
│   ├── layout/                # Shell pubblico/dashboard
│   ├── navigation/            # Sidebar role-aware
│   └── auth/                  # Componenti auth
├── server/
│   ├── service/              # Business logic
│   ├── repository/           # Data access
│   ├── models/               # Schemi Mongoose
│   ├── lib/                  # Utilities server-only
│   │   └── auth/             # Session, access policy
│   └── config/               # Configurazione runtime
└── shared/
    ├── types/                 # Tipi condivisi
    ├── navigation/            # Config navigazione role-aware
    └── users/                 # Tipi utente/ruoli
```

### 2.4 Convenzioni Import

Per nuovo codice, usare path canonici:

```typescript
// Business logic
import { usersService } from "@/server/service/users.service";

// Data access
import { usersRepository } from "@/server/repository/users.repository";

// Shared contracts
import type { User } from "@/shared/types/user";
```

---

## 3. Modello Identità e Accessi

### 3.1 Gerarchia Ruoli

```
SUPER (1 solo, bootstrap)
  └── ADMIN (invitati da SUPER)
        └── OPERATOR (invitati da ADMIN o SUPER)
              └── USER (registrazione pubblica)
```

### 3.2 Principio Globale

> **Ogni utente vede solo se stesso, salvo permessi espliciti.**

Questo non è un'opzione UI: è un vincolo enforcement a livello server.

### 3.3 SUPER

- Accesso totale al sistema
- Unico account creato via `/setup` su database vuoto
- Può invitare ADMIN
- Non usa permission map (ha tutto)

### 3.4 ADMIN

- Creato da SUPER via invito (link copiabile da dashboard)
- Default: vede solo se stesso
- Può avere permessi delegati:
  - `administrators.viewOthers`
  - `administrators.invite`
  - `administrators.edit`
  - `operators.invite`
- Può operare solo su ADMIN invitati da lui (`invitedByUserId`)

### 3.5 OPERATOR

- Creato da ADMIN o SUPER via invito
- **Permission map obbligatoria**, tipizzata e persistita
- Default deny-by-default reale
- Esempio capability:
  ```typescript
  {
    operators: { read: true, update: false },
    documents: { read: true, upload: true, delete: false }
  }
  ```

### 3.6 USER

- Registrazione pubblica
- Nessuna permission map
- Accesso limitato a propri dati e settings

---

## 4. Autenticazione e Sessione

### 4.1 Stack Auth

- NextAuth.js con provider Credentials
- JWT come session token
- Payload: `userId`, `role`, `permissions` (per OPERATOR)

### 4.2 Durata Sessione

| Modalità | Durata |
|----------|--------|
| Default | 24 ore |
| Remember me | 30 giorni |

### 4.3 Sicurezza Cookie

- `httpOnly: true`
- `secure: true` in produzione
- `sameSite: "lax"`
- Pepper lato server per hash password

---

## 5. Contratto API

### 5.1 Envelope Standard

Tutte le API restituiscono:

```typescript
{
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  requestId?: string;
}
```

### 5.2 Tassonomia Errori

| Tipo | Codice | Esempio |
|------|--------|---------|
| `validation` | VALIDATION_ERROR | Campo mancante |
| `auth` | AUTH_ERROR | Credenziali invalide |
| `business` | BUSINESS_ERROR | Operazione non permessa |
| `system` | SYSTEM_ERROR | Database non raggiungibile |

### 5.3 Boundary Regole

- Controller (API routes) gestiscono solo request/response
- Business logic solo nei Service
- Errori nascono nei Service, vengono mappati nei Controller

---

## 6. Design System UI

### 6.1 Principi

- **Chiarezza prima di decorazione**
- Leggibilità tecnica
- Gerarchia informativa esplicita
- Role-awareness senza caos visivo
- Terminologia stabile tra UI e documentazione

### 6.2 Palette CSS

```css
--color-primary: #3b82f6;
--color-primary-strong: #1d4ed8;
--color-primary-soft: #dbeafe;
--color-success: #22c55e;
--color-warning: #eab308;
--color-error: #ef4444;
--color-background: #fafafa;
--color-foreground: #18181b;
--color-foreground-muted: #71717a;
```

### 6.3 Tipografia

- Font body: Plus Jakarta Sans
- Font heading: Space Grotesk

---

## 7. Deployment

### 7.1 Ambienti

| Ambiente | Runtime | Database | Seed |
|----------|---------|----------|------|
| `local` | development | MongoDB locale | No |
| `demo` | demo | MongoDB Atlas | No |
| `live` | production | MongoDB Atlas | No |

### 7.2 Variabili Obbligatorie

```env
APP_RUNTIME=live|demo|local
NEXT_PUBLIC_APP_URL=https://...
NEXTAUTH_URL=https://...
NEXTAUTH_SECRET=...
AUTH_TOKEN_PEPPER=...
MONGODB_URI=mongodb+srv://...
```

### 7.3 Hosting Consigliato

- **Frontend**: Vercel (tier gratuito)
- **Database**: MongoDB Atlas (tier gratuito M0)
- **Versioning**: GitHub con fork-first workflow

---

## 8. Stack Consigliato (Free Tier)

| Componente | Raccomandazione |
|------------|-----------------|
| Framework | Next.js + TypeScript |
| IDE umani | WebStorm |
| IDE agenti | OpenCode |
| Hosting | Vercel |
| Database | MongoDB Atlas |
| VCS | GitHub |

Lo stack è intenzionalmente accessibile a developer singoli e team piccoli con budget limitato.

---

## 9. Non-Obiettivi (Guardrails)

Ready2Agent **NON** è:

- ❌ Starter kit casuale con feature disconnected
- ❌ Role masking solo frontend
- ❌ Documentazione come afterthought
- ❌ Progetto benchmark per pattern speculativi senza governance

---

## 10. Definition of Done

Il sistema è completo quando sono verificati:

- ✅ Login funzionante
- ✅ Ruoli funzionanti (SUPER/ADMIN/OPERATOR/USER)
- ✅ Inviti funzionanti (ADMIN→OPERATOR, SUPER→ADMIN)
- ✅ Permission map OPERATOR funzionante
- ✅ Visibilità controllata (self-only di default)
- ✅ USER registrabile pubblicamente
- ✅ API REST coerenti con envelope standard
- ✅ Audit login/operazioni presente
- ✅ Documentazione allineata al codice

---

*Questo documento è parte della documentazione umana di Ready2Agent.
Per vincoli tecnici esecutivi, consultare `operational/spec/`.*
