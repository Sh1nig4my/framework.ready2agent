# Stack Tecnologico

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: developer, contributor
- **Status**: attivo

---

## Panoramica Stack

Ready2Agent utilizza uno stack moderno e accessibile, ottimizzato per:

- Sviluppo rapido con TypeScript strict
- Affidabilità con pattern architetturali chiari
- Compatibilità con workflow agent-native
- Costo zero o minimo per setup iniziale

---

## Stack Core

### Runtime Framework

| Componente | Scelta | Motivazione |
|------------|--------|-------------|
| Framework | **Next.js App Router** | SSR/CSR ibrido, file-based routing, API routes built-in |
| Versione | Next.js 14+ | App Router maturo, Server Components |
| Runtime | Node.js | Standard, ampio supporto hosting |

### Tipo Sistema

| Componente | Scelta | Motivazione |
|------------|--------|-------------|
| Linguaggio | **TypeScript** | Type safety, auto-documentazione, mejor DX |
| Config | strict mode | Catch errori a compile-time |

### Database

| Componente | Scelta | Motivazione |
|------------|--------|-------------|
| Database | **MongoDB** | Schema flessibile, documenti nativi JS |
| ODM | **Mongoose** | Type safety, validation, lifecycle hooks |
| Cloud | MongoDB Atlas | Free tier M0, geo-replication |

### Autenticazione

| Componente | Scelta | Motivazione |
|------------|--------|-------------|
| Auth | **NextAuth.js** |Provider flessibili, JWT built-in, session management |
| Provider | Credentials | Password-based, no OAuth esterno |
| Session | JWT | Stateless, refreshabile, self-contained |

### Validazione

| Componente | Scelta | Motivazione |
|------------|--------|-------------|
| Schema validation | **Zod** | TypeScript-first, inference automatica |
| Placement | API boundary + Service | Fail-fast, type-safe |

---

## Stack UI/UX

### Styling

| Componente | Approccio | Motivazione |
|------------|-----------|-------------|
| CSS | Custom Properties + Utilities | Design system custom, no framework lock-in |
| Fonts | Google Fonts | Plus Jakarta Sans + Space Grotesk |
| Icons | Lucide React | Coerente, tree-shakeable |

### Componenti

| Componente | Tipo | Motivazione |
|------------|------|-------------|
| UI Primitives | Custom | Card, Button, Input, Badge, etc. |
| Layout | Custom | Public shell, Dashboard shell |
| Navigation | Custom | Sidebar role-aware |

---

## Dev Tools Consigliati

### IDE Umani

| IDE | Uso | Note |
|-----|-----|------|
| **WebStorm** | Sviluppo principale | Excellent TypeScript support, refactoring tools |
| VS Code | Alternativa | Con estensioni TypeScript, Tailwind |

### CLI/IDE Agenti

| Tool | Uso | Note |
|------|-----|------|
| **OpenCode** | Coding agent | LLM-native CLI, file editing, bash |

### Version Control

| Tool | Uso | Note |
|------|-----|------|
| **GitHub** | VCS + Collaboration | Fork-first workflow |
| Git | Versioning locale | Standard |

---

## Deployment

### Hosting App

| Provider | Tier | Note |
|----------|------|------|
| **Vercel** | Free | Ottimizzato Next.js, preview deployments |
| Railway | Alternativa | Più flessibile, prezzi pay-per-use |

### Hosting Database

| Provider | Tier | Note |
|----------|------|------|
| **MongoDB Atlas** | M0 Free | 512MB storage, shared RAM |

---

## Dipendenze Package.json

```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^18.x",
    "typescript": "^5.x",
    "mongoose": "^8.x",
    "next-auth": "^4.x",
    "zod": "^3.x",
    "bcryptjs": "^2.x",
    "lucide-react": "^0.x"
  }
}
```

---

## Costi Stimati Start-up

| Servizio | Costo Mensile |
|----------|---------------|
| Vercel | $0 (free tier) |
| MongoDB Atlas | $0 (M0 free) |
| GitHub | $0 (free tier) |
| **Totale** | **$0** |

---

## Requisiti Sistema Locale

### Node.js

- Versione: 18.x o 20.x LTS
- Consigliato: usare `nvm` o `fnm` per gestione versioni

### MongoDB Locale (opzionale)

- Per sviluppo locale senza cloud
- Versione: 6.x o 7.x
-oppure usare Atlas con URI locale

### Git

- Versione: 2.x
- per Windows: Git Bash o WSL2

---

## Ambiente di Test

### Test Unitari

| Tool | Note |
|------|------|
| Jest + React Testing Library | Standard, ben supportato |
| mongodb-memory-server | MongoDB in-memory per test |

### Linting

| Tool | Note |
|------|------|
| ESLint | Con config TypeScript |
| Prettier | Code formatting |

### Type Checking

| Tool | Note |
|------|------|
| TypeScript | `tsc --noEmit` |
| Strict mode | Abilitato |

---

## Docker (Opzionale)

Per containerizzazione:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

---

## Variabili d'Ambiente Riferimento

```env
# App
APP_RUNTIME=local|demo|live
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
AUTH_TOKEN_PEPPER=your-pepper-here

# Database
MONGODB_URI=mongodb://localhost:27017/ready2agent
```

---

## Nota su Dipendenze Esterne

Ready2Agent è progettato per:

- ❌ **Non usare** Firebase/Supabase (MongoDB Atlas)
- ❌ **Non usare** Auth0/Clerk (NextAuth built-in)
- ❌ **Non usare** S3/R2 per storage (out of scope per demo)

Questo approccio riduce dipendenze e vendor lock-in.

---

*Per configurazione locale dettagliata, vedere `operational/setup/01_local_setup.md`.*
