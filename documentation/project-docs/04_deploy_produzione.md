# Deploy in Produzione

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: developer, DevOps
- **Status**: attivo

---

## Panoramica

Questa guida copre il deployment di Ready2Agent su:

- **Vercel** (frontend/hosting)
- **MongoDB Atlas** (database cloud)

---

## 1. Preparazione MongoDB Atlas

### 1.1 Crea Cluster Production

1. Vai su [cloud.mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Crea cluster M10+ per produzione (non M0)
3. Region più vicina ai tuoi utenti

### 1.2 Crea Database User

```bash
# In Atlas UI → Security → Database Access
# Crea utente con ruolo "Read and write to any database"
```

### 1.3 Configura Network Access

```bash
# Per Vercel, aggiungi:
0.0.0.0/0

# Per IP specifico (produzione):
YOUR_SERVER_IP/32
```

### 1.4 Connection String

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ready2agent?retryWrites=true&w=majority&appName=ready2agent
```

---

## 2. Preparazione Vercel

### 2.1 Account e Setup

1. Crea account su [vercel.com](https://vercel.com)
2. Collega repository GitHub

### 2.2 Import Progetto

```bash
# Via UI:
# Dashboard → Add New → Project → Import Git Repository
# Seleziona repository ready2agent
```

### 2.3 Configurazione Build

Vercel rileva automaticamente Next.js. Verifica:

| Setting | Valore |
|---------|--------|
| Framework | Next.js |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

---

## 3. Configurazione Environment Variables

### 3.1 In Vercel Dashboard

Vai su: **Project → Settings → Environment Variables**

### 3.2 Variabili Obbligatorie

```env
# Runtime
APP_RUNTIME=live

# URL produzione
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXTAUTH_URL=https://your-domain.vercel.app

# Auth - USA VALORI FORTI
NEXTAUTH_SECRET=<genera-secret-min-32-char>
AUTH_TOKEN_PEPPER=<genera-pepper-min-32-char>

# Database
MONGODB_URI=mongodb+srv://...
```

### 3.3 Come Generare Secrets

```bash
# Genera secrets crittograficamente sicuri
openssl rand -base64 32
```

### 3.4 Applica a Tutti gli Ambienti

```bash
# Development, Preview, Production → YES a tutte
```

---

## 4. Dominio Custom (Opzionale)

### 4.1 Configura Dominio

```bash
# In Vercel → Project → Settings → Domains
# Aggiungi: yourdomain.com
```

### 4.2 Aggiorna DNS

```bash
# Aggiungi record CNAME:
# Name: www
# Value: cname.vercel-dns.com

# Aggiungi record A (root):
# Name: @
# Value: 76.76.21.21
```

### 4.3 Aggiorna NEXTAUTH_URL

```env
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## 5. Deploy Workflow

### 5.1 Deploy Manuale

```bash
# Via Vercel CLI
npm i -g vercel
vercel login
vercel --prod
```

### 5.2 Deploy Automatico (GitHub)

```bash
# Push su main triggers deploy automatico
git checkout main
git merge your-branch
git push origin main
```

### 5.3 Preview Deployments

Ogni PR genera un URL preview:
```
https://ready2agent-git-your-branch.vercel.app
```

---

## 6. Primo Accesso Production

### 6.1 Bootstrap SUPER

1. Vai a `https://your-domain.com/setup`
2. Crea il primo account SUPER
3. Questo è l'unico SUPER del sistema

### 6.2 Checklist Post-Deploy

- [ ] Login funziona con SUPER
- [ ] Nessun errore in console
- [ ] API calls funzionano
- [ ] Sessioni persistenti (remember me)
- [ ] Redirect corretti

---

## 7. Security Checklist Production

### 7.1 Variabili Environment

- [ ] Secrets generati casualmente (non prevedibili)
- [ ] Secrets non committati in git
- [ ] `.env.local` in `.gitignore`

### 7.2 Database

- [ ] Cluster M10+ (non M0 free tier)
- [ ] IP whitelist configurata
- [ ] Database user con permessi minimi

### 7.3 Vercel

- [ ] Password account Vercel forte
- [ ] 2FA abilitato
- [ ] Non condividere accesso

---

## 8. Monitoring e Logging

### 8.1 Vercel Analytics

```bash
# Abilita in Vercel Dashboard → Analytics
# Mostra: page views, unique visitors, performance
```

### 8.2 Error Tracking (Opzionale)

Considera Sentry per error tracking:

```bash
npm install @sentry/nextjs
```

### 8.3 Logs Vercel

```bash
# Via CLI
vercel logs your-project
```

---

## 9. Variabili per Environment

### Development (.env.local)

```env
APP_RUNTIME=local
MONGODB_URI=mongodb://localhost:27017/ready2agent
NEXTAUTH_SECRET=dev-secret-not-for-prod
```

### Production (.env.production)

```env
APP_RUNTIME=live
MONGODB_URI=mongodb+srv://prod-user:strong-password@cluster.mongodb.net/ready2agent
NEXTAUTH_SECRET=<production-secret>
```

---

## 10. Rollback

### 10.1 Rollback Vercel

```bash
# Lista deployments
vercel ls

# Rollback a deployment specifico
vercel --prod --target production-deployment-id
```

### 10.2 Rollback Database

MongoDB Atlas ha Point-in-Time Recovery per cluster M10+.

---

## 11. Troubleshooting Production

### `500 Internal Server Error`

1. Verifica `NEXTAUTH_SECRET` configurato
2. Verifica `MONGODB_URI` raggiungibile
3. Check logs in Vercel Dashboard

### `Database connection failed`

1. Verifica IP whitelist include Vercel (`0.0.0.0/0`)
2. Verifica credenziali Atlas corrette
3. Testa connection string localmente

### Sessioni non persistenti

1. Verifica `NEXTAUTH_URL` match esatto con dominio
2. Verifica `secure: true` in produzione

---

## 12. Links Utili

- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [NextAuth Deployment](https://next-auth.js.org/deployment)

---

## 13. Costo Stima Production

| Servizio | Tier | Costo Mensile |
|----------|------|---------------|
| Vercel Pro | €20/user | Dipende dal team |
| Vercel Free | Gratis | Limitato |
| MongoDB Atlas M10 | ~$29/mo | Starter production |
| MongoDB Atlas M0 | Gratis | Solo development |

Per small team: Vercel Free + Atlas M10.

---

*Per troubleshooting, vedere `05_troubleshooting.md`.*
