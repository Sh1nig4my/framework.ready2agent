# Setup Locale

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: developer, contributor
- **Status**: attivo

---

## Prerequisiti

### Software Necessario

| Software | Versione | Note |
|----------|----------|------|
| Node.js | 18.x o 20.x LTS | Consigliato nvm/fnm |
| Git | 2.x | Per version control |
| MongoDB | Locale o Atlas | Vedi sezione database |

### Account Opzionali

- GitHub account (per fork e collaboration)
- MongoDB Atlas (per cloud database)

---

## 1. Clonazione Repository

```bash
# Fork prima su GitHub, poi:
git clone https://github.com/YOUR-USERNAME/ready2agent.git
cd ready2agent
```

---

## 2. Installazione Dipendenze

```bash
npm install
```

Questo installerà tutte le dipendenze dal `package.json`.

---

## 3. Configurazione Environment

### 3.1 Crea file environment

```bash
cp .env.example .env.local
```

### 3.2 Configura variabili minime

Apri `.env.local` e configura:

```env
# Runtime: local|demo|live
APP_RUNTIME=local

# URL pubblico (locale)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera-un-secret-lungo-almeno-32-char
AUTH_TOKEN_PEPPER=genera-un-pepper-lungo-almeno-32-char

# Database - USA URI REALE
MONGODB_URI=mongodb://localhost:27017/ready2agent
```

### 3.3 Come generare secrets

```bash
# NEXTAUTH_SECRET
openssl rand -base64 32

# AUTH_TOKEN_PEPPER
openssl rand -base64 32
```

---

## 4. Setup Database Locale

### Opzione A: MongoDB Locale

1. Installa MongoDB Community Server da [mongodb.com](https://www.mongodb.com/try/download/community)
2. Avvia il servizio:

```bash
# Windows (PowerShell come admin)
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

3. Verifica con:
```bash
mongosh
```

### Opzione B: MongoDB Atlas (Cloud)

1. Vai su [cloud.mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Crea cluster M0 gratuito
3. Crea database user
4. Whitelist IP `0.0.0.0/0` (per sviluppo locale)
5. Copia connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ready2agent?retryWrites=true&w=majority
```

**⚠️ Importante**: Non usare placeholder come `host1`, `username`, `password`! L'app li blocca in validazione.

---

## 5. Avvio Development Server

```bash
npm run dev
```

Apre automaticamente `http://localhost:3000`.

---

## 6. Primo Accesso (Bootstrap)

Quando il database è vuoto:

1. L'app reindirizza automaticamente a `/setup`
2. Compila il form con email e password per il primo SUPER
3. Clicca "Inizializza"
4. Verrai loggato automaticamente come SUPER

**Regole bootstrap**:
- Solo un account SUPER può esistere
- Nessun seed automatico
- Nessun account demo

---

## 7. Verifica Installazione

### Checklist post-setup:

- [ ] `npm run dev` avvia senza errori
- [ ] `/setup` reindirizza correttamente su database vuoto
- [ ] Login con credenziali SUPER funziona
- [ ] Dashboard mostra sidebar corretta per SUPER
- [ ] Nessun errore in console

---

## 8. Comandi Disponibili

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia dev server con hot reload |
| `npm run build` | Build produzione |
| `npm start` | Avvia server produzione |
| `npm run lint` | ESLint check |
| `npm test` | Run test suite |
| `npm run typecheck` | TypeScript check |

---

## 9. Struttura Directory Locale

Dopo clone:

```
ready2agent/
├── .env.local          # ← TUO (non committare!)
├── .env.example        # Template
├── src/
│   ├── app/           # Pagine e API
│   ├── components/    # UI components
│   ├── server/        # Backend logic
│   └── shared/        # Contracts condivisi
├── documentation/     # Documentazione completa progetto
├── workflow/          # Artefatti workflow
├── prompts/           # Prompt operativi
└── public/            # Asset statici
```

---

## 10. Risoluzione Problemi Comuni

### `Invalid environment configuration`

- Verifica `.env.local` esiste
- Verifica tutte le variabili minime sono presenti
- Verifica `MONGODB_URI` è reale (non placeholder)

### `querySrv ETIMEOUT`

- Prova URI non-SRV
- Verifica connessione internet
- Prova DNS pubblici

### `getaddrinfo ENOTFOUND host1`

- `MONGODB_URI` contiene placeholder
- Sostituisci con URI MongoDB locale o Atlas

### `/setup` non appare

- Verifica database raggiungibile
- Verifica database è vuoto (nessuna collection)

---

## 11. Sviluppo con Agenti (OpenCode)

Per usare OpenCode come coding agent:

```bash
# Installa OpenCode
npm install -g opencode

# Avvia con contesto progetto
opencode --context "Ready2Agent development"

# Oppure avvia in directory
cd ready2agent
opencode
```

OpenCode leggera automaticamente (in base al prompt usato):
- `README.md`
- `documentation/README.md`
- `prompts/README.md`
- Configurazione TypeScript

---

## 12. Reset Ambiente Locale

Per resettare database locale:

```bash
# Entra in mongosh
mongosh

# Seleziona database
use ready2agent

# Drop database
db.dropDatabase()

# Esci
exit
```

Poi riavvia l'app: `/setup` apparirà di nuovo.

---

## 13. Links Utili

- [Documentazione Next.js](https://nextjs.org/docs)
- [Documentazione MongoDB](https://docs.mongodb.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Mongoose](https://mongoosejs.com/docs/)

---

*Per deployment in produzione, vedere `04_deploy_produzione.md`.*
