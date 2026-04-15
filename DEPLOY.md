# Guida al Deploy - Ready2Agent

## Metadati

- Ultimo aggiornamento: 2026-04-15
- Stato: Pronto per la produzione

Guida step-by-step completa per effettuare il deploy di Ready2Agent da sviluppo locale a produzione.

---

## Panoramica

Questa guida copre:

1. **Sviluppo Locale** - Esecuzione sulla tua macchina
2. **Setup MongoDB Atlas** - Configurazione database cloud
3. **Deployment Vercel** - Hosting produzione
4. **Dominio e Sicurezza** - Checklist completo produzione

---

## Prerequisiti

### Software

| Software | Versione | Installazione |
|----------|----------|---------------|
| Node.js | 18.x LTS o 20.x LTS | [nodejs.org](https://nodejs.org) |
| Git | 2.x | [git-scm.com](https://git-scm.com) |
| MongoDB | Locale o Atlas | Vedi sezioni sotto |

### Account Necessari

| Servizio | Necessario Per | Tier Gratuiti |
|----------|----------------|---------------|
| GitHub | Hosting codice, CI/CD | Sì |
| Vercel | Hosting produzione | Sì |
| MongoDB Atlas | Database cloud | Sì |

---

## Sezione 1: Setup Sviluppo Locale

### 1.1 Clona Repository

```bash
# Fork su GitHub prima (se intendi contribuire)
git clone https://github.com/TUO-USERNAME/ready2agent.git
cd ready2agent
```

### 1.2 Installa Dipendenze

```bash
npm install
```

### 1.3 Configura Ambiente

```bash
cp .env.example .env.local
```

### 1.4 Modifica `.env.local`

```env
# ============================================
# CONFIGURAZIONE RUNTIME
# ============================================

# Opzioni: local | demo | live
# Usa "local" per sviluppo
APP_RUNTIME=local

# ============================================
# URL
# ============================================

# Il tuo URL locale (non modificare per dev locale)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stesso di NEXT_PUBLIC_APP_URL per locale
NEXTAUTH_URL=http://localhost:3000

# ============================================
# SICUREZZA - GENERA VALORI SICURI
# ============================================

# Genera con: openssl rand -base64 32
# Oppure: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
NEXTAUTH_SECRET=il-tuo-secret-generato-almeno-32-caratteri

# Genera con lo stesso metodo sopra
AUTH_TOKEN_PEPPER=il-tuo-pepper-generato-almeno-32-caratteri

# ============================================
# DATABASE
# ============================================

# Opzione A: MongoDB Locale
MONGODB_URI=mongodb://localhost:27017/ready2agent

# Opzione B: MongoDB Atlas (vedi Sezione 2)
# MONGODB_URI=mongodb+srv://...
```

### 1.5 Genera Secrets

```bash
# Linux/macOS
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])

# Node.js (tutte le piattaforme)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 1.6 Setup MongoDB Locale

**Opzione A: MongoDB Community (Locale)**

1. Scarica da [mongodb.com](https://www.mongodb.com/try/download/community)
2. Installa per il tuo SO (Windows/macOS/Linux)
3. Avvia il servizio:

```bash
# Windows (PowerShell come Amministratore)
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

4. Verifica:

```bash
mongosh
> show dbs
```

**Opzione B: MongoDB Atlas (Cloud)**

Vai alla Sezione 2 per il setup Atlas, poi usa la connection string in `.env.local`.

### 1.7 Avvia Server Sviluppo

```bash
npm run dev
```

Apri `http://localhost:3000`. Su database vuoto, sarai reindirizzato a `/setup`.

### 1.8 Crea Primo Account SUPER

1. Vai a `http://localhost:3000/setup`
2. Compila il form:
   - **Email**: La tua email (diventerà SUPER)
   - **Password**: Min 8 caratteri
   - **Nome**: Il tuo nome
   - **Cognome**: Il tuo cognome
3. Clicca "Inizializza"
4. Sarai reindirizzato a `/dashboard` come SUPER

### 1.9 Verifica Installazione

```bash
✅ npm run dev parte senza errori
✅ /setup reindirizza su database vuoto
✅ Login con credenziali SUPER funziona
✅ Dashboard mostra sidebar corretta per ruolo SUPER
✅ Nessun errore in console browser
```

---

## Sezione 2: Setup MongoDB Atlas

### 2.1 Crea Account

1. Vai su [cloud.mongodb.com](https://cloud.mongodb.com)
2. Iscriviti con GitHub o email
3. Crea un account gratuito

### 2.2 Crea Cluster

1. Clicca **Build a Database**
2. Seleziona **M0** (tier gratuito) per sviluppo
3. Scegli un provider e regione più vicina ai tuoi utenti
4. Dai un nome al cluster (es. `ready2agent`)
5. Clicca **Create Cluster**

### 2.3 Crea Utente Database

1. Vai su **Security → Database Access**
2. Clicca **Add New Database User**
3. Configura:
   - **Metodo di autenticazione**: Password
   - **Username**: `ready2agent`
   - **Password**: Genera una password forte
   - **Privilegi Database**: Leggi e scrivi su qualsiasi database
4. Clicca **Add User**

### 2.4 Configura Accesso di Rete

1. Vai su **Security → Network Access**
2. Clicca **Add IP Address**
3. Per sviluppo, aggiungi:
   - **Access List Entry**: `0.0.0.0/0` (permette tutti gli IP)
4. Clicca **Confirm**

> **Nota Sicurezza**: In produzione, limita al tuo IP Vercel o dominio specifico.

### 2.5 Ottieni Connection String

1. Clicca **Database → Connect**
2. Seleziona **Drivers**
3. Copia la connection string:

```env
# Sostituisci <password> con la tua password effettiva
MONGODB_URI=mongodb+srv://ready2agent:<password>@cluster0.xxxxx.mongodb.net/ready2agent?retryWrites=true&w=majority
```

### 2.6 Aggiorna Ambiente

```env
# Sostituisci l'URI locale con l'URI Atlas
MONGODB_URI=mongodb+srv://ready2agent:tua-password@cluster0.xxxxx.mongodb.net/ready2agent?retryWrites=true&w=majority
```

---

## Sezione 3: Deployment Vercel

### 3.1 Crea Account Vercel

1. Vai su [vercel.com](https://vercel.com)
2. Iscriviti con GitHub
3. Verifica la tua email

### 3.2 Importa Repository

1. Clicca **Add New → Project**
2. Seleziona **Import Git Repository**
3. Scegli il tuo repository GitHub
4. Clicca **Import**

### 3.3 Configura Variabili d'Ambiente

Nella dashboard del progetto Vercel:

1. Vai su **Settings → Environment Variables**
2. Aggiungi ogni variabile:

| Variabile | Valore |
|-----------|--------|
| `APP_RUNTIME` | `live` |
| `NEXT_PUBLIC_APP_URL` | `https://il-tuo-progetto.vercel.app` |
| `NEXTAUTH_URL` | `https://il-tuo-progetto.vercel.app` |
| `NEXTAUTH_SECRET` | Genera con `openssl rand -base64 32` |
| `AUTH_TOKEN_PEPPER` | Genera con lo stesso metodo |
| `MONGODB_URI` | La tua connection string Atlas |

3. Imposta **Environments**: Applica a **Production**, **Preview** e **Development**
4. Clicca **Save**

### 3.4 Deploy

Vercel rileva automaticamente Next.js. Verifica queste impostazioni:

| Impostazione | Valore |
|--------------|--------|
| Framework Preset | Next.js |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

Clicca **Deploy**. Attendi 1-2 minuti.

### 3.5 Verifica Deploy Produzione

1. Vai al tuo URL Vercel (es. `https://il-tuo-progetto.vercel.app`)
2. Naviga su `/setup`
3. Crea il primo account SUPER
4. Verifica che il login funzioni

---

## Sezione 4: Dominio Personalizzato (Opzionale)

### 4.1 Aggiungi Dominio

1. In Vercel: **Settings → Domains**
2. Inserisci il tuo dominio (es. `ready2agent.esempio.com`)
3. Clicca **Add**

### 4.2 Configura DNS

Aggiungi record al tuo provider DNS:

```
Tipo: CNAME
Nome: www
Valore: cname.vercel-dns.com

Tipo: A
Nome: @
Valore: 76.76.21.21
```

### 4.3 Aggiorna Variabili d'Ambiente

```env
NEXT_PUBLIC_APP_URL=https://iltuodominio.com
NEXTAUTH_URL=https://iltuodominio.com
```

---

## Sezione 5: Checklist Sicurezza

### Variabili d'Ambiente

- [ ] Genera `NEXTAUTH_SECRET` forte (32+ caratteri random)
- [ ] Genera `AUTH_TOKEN_PEPPER` forte (32+ caratteri random)
- [ ] Non committare mai `.env.local` su git
- [ ] Verifica che `.env.local` sia in `.gitignore`

### Database

- [ ] Usa cluster M10+ per produzione (M0 è per sviluppo)
- [ ] Limita l'accesso IP in Network Access
- [ ] Usa password forte per utente database

### Vercel

- [ ] Abilita 2FA sull'account Vercel
- [ ] Usa password GitHub forte
- [ ] Non condividere l'accesso al deployment

---

## Sezione 6: Troubleshooting

### Errore: "Invalid environment configuration"

1. Il file `.env.local` è presente?
2. Tutte le variabili richieste sono impostate?
3. `MONGODB_URI` è un URI reale (non placeholder come `host1`)?

### Errore: "querySrv ETIMEOUT" (Atlas)

1. Usa connection string non-SRV per test
2. Verifica connessione internet
3. Controlla che il cluster Atlas sia in esecuzione

### Errore: "Database connection failed"

1. Verifica che IP whitelist includa `0.0.0.0/0` (per dev)
2. Verifica credenziali Atlas corrette
3. Testa la connection string localmente prima

### Errore: 500 Internal Server Error

1. Verifica che `NEXTAUTH_SECRET` sia impostato su Vercel
2. Verifica che `MONGODB_URI` sia corretto
3. Controlla i log delle funzioni Vercel

### Sessioni non persistenti

1. Verifica che `NEXTAUTH_URL` corrisponda al dominio esatto
2. Controlla mismatch del dominio cookie

---

## Sezione 7: Comandi Disponibili

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia server sviluppo |
| `npm run build` | Build per produzione |
| `npm start` | Avvia server produzione |
| `npm run lint` | Esegui ESLint |
| `npm run typecheck` | Esegui TypeScript |

---

## Sezione 8: Stima Costi

| Servizio | Tier | Costo Mensile |
|----------|------|---------------|
| Vercel | Free | €0 |
| MongoDB Atlas | M0 (free) | €0 |
| MongoDB Atlas | M10 (dev) | ~€8/mo |
| MongoDB Atlas | M25 (prod) | ~€52/mo |

Per progetti personali: Vercel Free + Atlas M0.

---

## Link Utili

- [Documentazione Next.js](https://nextjs.org/docs)
- [Documentazione MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [Documentazione Vercel](https://vercel.com/docs)
- [Documentazione NextAuth.js](https://next-auth.js.org/)

---

*Per dettagli sull'architettura tecnica, vedere `agent-workspace/README.md`.*
