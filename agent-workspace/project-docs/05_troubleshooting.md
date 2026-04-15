# Troubleshooting

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: developer, support
- **Status**: attivo

---

## Errori Comuni e Soluzioni

### 1. Invalid Environment Configuration

**Sintomo**: App non si avvia o mostra errore configurazione.

**Possibili cause e soluzioni**:

#### `.env.local` non trovato

```bash
# Verifica esistenza
ls -la .env.local

# Se manca, crea da template
cp .env.example .env.local
```

#### Variabili mancanti

Verifica che tutte le variabili siano presenti:

```env
APP_RUNTIME=local
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<secret>
AUTH_TOKEN_PEPPER=<pepper>
MONGODB_URI=mongodb://localhost:27017/ready2agent
```

#### URL non validi

```bash
# Verifica formato
# OK: http://localhost:3000
# OK: https://yourdomain.com
# ERRORE: localhost:3000 (manca http://)
# ERRORE: localhost (manca porta)
```

#### Placeholder in MONGODB_URI

L'app blocca placeholder comuni. Verifica che `MONGODB_URI`:
- Non contenga `host1`, `host2`, ecc.
- Non contenga `username`, `password`
- Non contenga `your-replicaset`
- Sia un URI MongoDB reale

---

### 2. Setup (/setup) non appare

**Sintomo**: Redirige a `/login` invece che `/setup` su database vuoto.

**Diagnosi e soluzioni**:

#### Database non vuoto

```bash
# Verifica con mongosh
mongosh
use ready2agent
show collections
# Se ci sono collections, il DB non è vuoto
```

#### Database non raggiungibile

```bash
# Testa connessione
mongosh "<your-mongodb-uri>"

# Verifica network
curl -v mongodb://localhost:27017
```

#### MONGODB_URI invalido

- Verifica URI corretto (SRV o standard)
- Verifica credenziali
- Verifica cluster Atlas attivo

---

### 3. querySrv ETIMEOUT

**Sintomo**: Errore DNS lookup per URI SRV.

**Soluzioni**:

#### Prova URI non-SRV

```env
# Invece di:
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db

# Prova:
MONGODB_URI=mongodb://user:pass@cluster.mongodb.net:27017/db
```

#### Verifica DNS

```bash
# Testa risoluzione
nslookup cluster.mongodb.net

# Prova DNS alternativi
# 8.8.8.8 (Google)
# 1.1.1.1 (Cloudflare)
```

#### Atlas cluster sleeping

Grandi cluster (M10+) vanno in sleep dopo inattività.
Attivali dalla dashboard Atlas.

---

### 4. getaddrinfo ENOTFOUND host1

**Sintomo**: DNS cerca `host1` come hostname.

**Causa**: `MONGODB_URI` contiene placeholder.

**Soluzione**:

```env
# Sostituisci con URI reale
# Locale:
MONGODB_URI=mongodb://localhost:27017/ready2agent

# Atlas:
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
```

---

### 5. Login non funziona

**Sintomo**: Credenziali corrette ma login fallisce.

**Diagnosi**:

#### Credenziali SUPER errate

```bash
# Reset: drops DB, rigenera setup
mongosh
use ready2agent
db.dropDatabase()
# Riavvia app, /setup apparirà
```

#### NextAuth Secret non configurato

```env
# Genera nuovo secret
NEXTAUTH_SECRET=nuovo-secret-casuale-min-32-char
```

#### Cookie bloccati

- Verifica browser accetti cookie
- Disabilita tracker blockers temporaneamente
- Verifica `httpOnly` cookie settings in devtools

---

### 6. Sessione non persistente

**Sintomo**: Devo riloggararmi ad ogni refresh.

**Possibili cause**:

#### NEXTAUTH_URL mismatch

```env
# MUST match exactly
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Non usare trailing slash
# ERRORE: http://localhost:3000/
# OK: http://localhost:3000
```

#### Production cookie issues

In produzione verifica:
- Dominio match esatto
- HTTPS correctly configured
- `secure: true` in production

---

### 7. Next.js Build Error

**Sintomo**: `npm run build` fallisce.

**Soluzioni**:

#### TypeScript errors

```bash
# Check type errors
npm run typecheck

# Fix reported errors
```

#### Missing dependencies

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

#### Outdated Node.js

```bash
# Check version
node --version

# Update if < 18
nvm install 20
nvm use 20
```

---

### 8. MongoDB Connection Error

**Sintomo**: `MongoServerSelectionError` o `ECONNREFUSED`.

**Diagnosi stepwise**:

#### Locale MongoDB non avviato

```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### Credenziali Atlas errate

```bash
# Testa connection string
mongosh "<your-uri>"
```

#### IP whitelist Atlas

```bash
# Aggiungi IP in Atlas:
# Network Access → Add IP Address
# Per development: 0.0.0.0/0
```

---

### 9. API Returns 401 Unauthorized

**Sintomo**: Chiamate API restituiscono 401.

**Possibili cause**:

#### Non autenticato

- Effettua login prima di chiamare API
- Verifica sessione attiva

#### Sessione scaduta

- Riloggati
- Verifica durata sessione configurata

#### CSRF Token mismatch

In NextAuth 4.x, alcune mutation richiedono CSRF token.
Verifica di usare `fetch` correttamente o form submissions.

---

### 10. React Hydration Error

**Sintomo**: Errori hydration in console browser.

**Soluzioni**:

#### Date/Time rendering

```tsx
// ❌ Causa hydration mismatch
const now = new Date();

// ✅ Soluzione: client-only
"use client";
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <Loading />;
```

#### Random values in render

```tsx
// ❌ Causa hydration mismatch
const id = Math.random();

// ✅ Soluzione: stable ID
const id = useId();
```

---

## Checklist Diagnostica

Quando incontri un errore:

1. **Console browser**: cerca errori rossi
2. **Network tab**: verifica request/response API
3. **Terminal server**: guarda logs dev
4. **Environment**: verifica `.env.local` configurato
5. **Database**: verifica MongoDB raggiungibile
6. **Credenziali**: verifica secrets non placeholder

---

## Ottenere Aiuto

### Logs Applicazione

```bash
# Dev server logs
npm run dev
# Guarda output terminale

# Vercel logs
vercel logs your-project
```

### Test API Manualmente

```bash
# Login
curl -X POST http://localhost:3000/api/auth/callback/credentials \
  -H "Content-Type: application/json" \
  -d '{"email":"super@example.com","password":"password"}'
```

### Reset Completo

```bash
# 1. Stop server
# 2. Drop database
mongosh --eval "db.getSiblingDB('ready2agent').dropDatabase()"
# 3. Rimuovi .env.local
# 4. Ricrea da .env.example
# 5. Riavvia
```

---

## Links Documentazione

- [Next.js Troubleshooting](https://nextjs.org/docs/pages/building-your-application/configuring/debugging)
- [MongoDB Connection Issues](https://docs.mongodb.com/manual/reference/connection-string/)
- [NextAuth Debugging](https://next-auth.js.org/getting-started/rest-api)

---

*Per issue non coperti, consulta le GitHub Issues del progetto o apri una nuova segnalazione.*
