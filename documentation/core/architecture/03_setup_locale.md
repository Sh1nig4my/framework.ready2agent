# Setup Locale - Guida Step-by-Step

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: developer, contributor
- **Status**: attivo

---

## Prerequisiti

### Software Necessario

| Software | Versione | Installazione |
|----------|----------|---------------|
| Node.js | 18.x o 20.x LTS | [nodejs.org](https://nodejs.org) |
| Git | 2.x | [git-scm.com](https://git-scm.com) |
| MongoDB | Locale o Atlas | Vedi sezione DB |

### Consigliato

- **nvm/fnm**: gestione versioni Node
- **VS Code o WebStorm**: IDE con TypeScript support

---

## 1. Clonazione Repository

```bash
# Fork su GitHub prima (se vuoi contribuire)
git clone https://github.com/YOUR-USERNAME/ready2agent.git
cd ready2agent
```

---

## 2. Installazione Dipendenze

```bash
npm install
```

Questo installa tutto dal `package.json`.

---

## 3. Configurazione Environment

### 3.1 Crea file da template

```bash
cp .env.example .env.local
```

### 3.2 Configura `.env.local`

```env
# Runtime: local|demo|live
APP_RUNTIME=local

# URL pubblico
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera-un-secret-min-32-char
AUTH_TOKEN_PEPPER=genera-un-pepper-min-32-char

# Database
MONGODB_URI=mongodb://localhost:27017/ready2agent
```

### 3.3 Generare Secrets

```bash
# Linux/macOS
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])

# Oppure usa un UUID-like string
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 4. Setup Database

### Opzione A: MongoDB Locale

1. Installa MongoDB Community:
   - [Windows](https://www.mongodb.com/try/download/community)
   - [macOS](https://www.mongodb.com/try/download/community)
   - [Linux](https://www.mongodb.com/try/download/community)

2. Avvia servizio:

```bash
# Windows PowerShell (Admin)
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

3. Verifica:

```bash
mongosh
> show dbs
```

### Opzione B: MongoDB Atlas (Cloud)

Vedi `03_mongo_atlas.md` per guida completa.

---

## 5. Avvio Development Server

```bash
npm run dev
```

Apre automaticamente `http://localhost:3000`.

Se il database è vuoto, reindirizza a `/setup`.

---

## 6. Primo Accesso (Bootstrap)

### 6.1 Flow Automatico

```
Database vuoto → Redirect /setup
```

### 6.2 Completa Form

1. Vai a `http://localhost:3000/setup`
2. Inserisci:
   - Email (diventerà SUPER)
   - Password (min 8 caratteri)
3. Clicca "Inizializza"

### 6.3 Verifica

- ✅ Redirect a `/dashboard`
- ✅ Logged in come SUPER
- ✅ Sidebar mostra tutti i moduli

---

## 7. Comandi Disponibili

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Dev server con hot reload |
| `npm run build` | Build produzione |
| `npm start` | Server produzione |
| `npm run lint` | ESLint check |
| `npm test` | Test suite |
| `npm run typecheck` | TypeScript check |

---

## 8. Struttura Directory Locale

```
ready2agent/
├── .env.local          # TUO - NON committare
├── .env.example        # Template
├── src/
│   ├── app/           # Pagine e API
│   ├── components/    # UI components
│   ├── server/        # Backend logic
│   └── shared/        # Contracts
├── documentation/     # Documentazione completa progetto
├── workflow/          # Artefatti workflow
├── prompts/           # Prompt operativi
└── public/            # Asset statici
```

---

## 9. Verifica Installazione

### Checklist

- [ ] `npm run dev` avvia senza errori
- [ ] `/setup` reindirizza su database vuoto
- [ ] Login SUPER funziona
- [ ] Dashboard mostra sidebar corretta
- [ ] Nessun errore in console browser
- [ ] `npm test` passa

---

## 10. Reset Locale

### Per resettare database:

```bash
mongosh
use ready2agent
db.dropDatabase()
exit
```

Poi riavvia l'app: `/setup` riapparirà.

### Per reset completo:

```bash
# Stop server
# Rimuovi .env.local
# Ricrea da .env.example
# Reset database
# npm run dev
```

---

## 11. Sviluppo con Agenti

### OpenCode Setup

```bash
# Installa
npm install -g opencode

# Avvia
opencode

# O con contesto
opencode --context "Ready2Agent development"
```

### Context Caricato Automaticamente

OpenCode leggera:
- `README.md`
- `documentation/README.md`
- `prompts/README.md`

---

## 12. Troubleshooting Rapido

### Errore `Invalid environment configuration`

1. `.env.local` esiste?
2. Tutte le variabili valorizzate?
3. `MONGODB_URI` è reale?

### Errore `querySrv ETIMEOUT`

1. Prova URI non-SRV
2. Verifica connessione internet
3. Atlas cluster attivo?

### `/setup` non appare

1. Database raggiungibile?
2. Database vuoto?
3. `MONGODB_URI` corretto?

---

*Per problemi avanzati, vedere `documentation/core/storage-security/13_troubleshooting.md`.*
