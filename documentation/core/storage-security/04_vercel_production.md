# Vercel Production - Deploy

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: developer, DevOps
- **Status**: attivo

---

## Scopo

Guida al deployment di Ready2Agent su Vercel.

---

## 1. Preparazione

### 1.1 Account Vercel

1. Vai su [vercel.com](https://vercel.com)
2. Clicca "Sign Up"
3. Registrati con GitHub (consigliato)

### 1.2 Repository GitHub

```
✅ Repository pubblico o privato su GitHub
✅ Accesso Vercel al repository
```

---

## 2. Import Progetto

### 2.1 Via Dashboard

1. Dashboard → "Add New..." → "Project"
2. Seleziona repository `ready2agent`
3. Vercel detecta automaticamente Next.js

### 2.2 Configurazione Build

Verifica impostazioni:

| Setting | Valore |
|---------|--------|
| Framework Preset | Next.js |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

---

## 3. Environment Variables

### 3.1 Via Dashboard

1. Project → Settings → Environment Variables
2. Aggiungi tutte le variabili

### 3.2 Variabili Obbligatorie

```env
# Runtime
APP_RUNTIME=live

# URL produzione
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
NEXTAUTH_URL=https://your-project.vercel.app

# Auth - GENERA VALORI FORTI
NEXTAUTH_SECRET=<min-32-char-secret>
AUTH_TOKEN_PEPPER=<min-32-char-pepper>

# Database
MONGODB_URI=mongodb+srv://...
```

### 3.3 Come Generare Secrets

```bash
# Linux/macOS
openssl rand -base64 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3.4 Applica a Tutti gli Ambienti

```
✅ Development: No
✅ Preview: Yes
✅ Production: Yes
```

---

## 4. Dominio Custom (Opzionale)

### 4.1 Aggiungi Dominio

1. Project → Settings → Domains
2. Inserisci `yourdomain.com`
3. Clicca "Add"

### 4.2 Configura DNS

```
Per Apex domain (yourdomain.com):
  A Record: @ → 76.76.21.21

Per subdomain (www.yourdomain.com):
  CNAME: www → cname.vercel-dns.com
```

### 4.3 Aggiorna Variables

```env
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXTAUTH_URL=https://yourdomain.com
```

---

## 5. Deploy

### 5.1 Deploy Manuale

```bash
# Via Vercel CLI
npm i -g vercel
vercel login
vercel --prod
```

### 5.2 Deploy Automatico (Git)

```bash
git push origin main
# Vercel triggera deploy automaticamente
```

---

## 6. Primo Accesso Production

### 6.1 Bootstrap SUPER

1. Vai a `https://your-domain.com/setup`
2. Crea il primo account SUPER
3. Questo è l'unico SUPER del sistema

### 6.2 Checklist Post-Deploy

- [ ] Login funziona con SUPER
- [ ] Nessun errore console
- [ ] API calls funzionano
- [ ] Sessioni persistenti
- [ ] Redirect corretti

---

## 7. Security Production

### 7.1 Checklist

```
✅ NEXTAUTH_SECRET generato casualmente
✅ AUTH_TOKEN_PEPPER generato casualmente
✅ MONGODB_URI non contiene placeholder
✅ .env.local non committato in git
```

### 7.2 Vercel Security

```
✅ Password account Vercel forte
✅ 2FA abilitato su Vercel
✅ Non condividere accesso
```

---

## 8. Monitoring

### 8.1 Vercel Analytics

Dashboard → Analytics

### 8.2 Logs

```bash
vercel logs your-project
```

### 8.3 Error Tracking

Considera Sentry per production error tracking.

---

## 9. Troubleshooting

### `500 Internal Server Error`

1. Verifica `NEXTAUTH_SECRET` configurato
2. Verifica `MONGODB_URI` raggiungibile
3. Check logs in Vercel dashboard

### `Database connection failed`

1. IP whitelist include `0.0.0.0/0` in Atlas
2. Credenziali Atlas corrette
3. Testa URI localmente prima

### Sessioni non persistenti

1. `NEXTAUTH_URL` match esatto con dominio
2. Dominio con HTTPS

---

## 10. Costo

| Tier | Costo | Note |
|------|-------|------|
| Hobby | $0 | Limitato |
| Pro | €20/mo | Per team |

Per small team: Vercel Free + Atlas M10.

---

*Per troubleshooting avanzato, vedere `documentation/core/storage-security/13_troubleshooting.md`.*
