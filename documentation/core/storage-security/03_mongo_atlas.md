# MongoDB Atlas - Configurazione Cloud

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: developer
- **Status**: attivo

---

## Scopo

Guida alla configurazione di MongoDB Atlas per Ready2Agent.

---

## 1. Creare Account Atlas

1. Vai su [cloud.mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Clicca "Start Free"
3. Registrati con email o SSO GitHub/Google

---

## 2. Creare Cluster

### 2.1 Tier Consigliato

| Ambiente | Tier | Costo |
|----------|------|-------|
| Sviluppo | M0 (free) | $0 |
| Produzione | M10+ | ~$29+/mo |

### 2.2 Configurazione

1. **Provider**: AWS, Google Cloud, o Azure (scegli più vicino)
2. **Region**: Più vicina ai tuoi utenti
3. **Cluster Name**: `ready2agent` o simile
4. **Tier**: M0 Free per sviluppo

### 2.3 Attesa Creazione

```
⏱️ Cluster M0: pochi minuti
⏱️ Cluster M10+: 5-10 minuti
```

---

## 3. Creare Database User

### 3.1 Steps

1. Vai su **Security → Database Access**
2. Clicca **Add New Database User**
3. Configura:

| Campo | Valore |
|-------|--------|
| Authentication Method | Password |
| Username | `ready2agent_user` |
| Password | [genera password forte] |
| Confirm Password | [stessa] |
| Database User Privileges | "Read and write to any database" |

### 3.2 Best Practice

```
✅ Usa password univoca per Atlas
✅ Non usare credenziali Atlas per altri servizi
✅ Considera password manager
```

---

## 4. Configurare Network Access

### 4.1 Per Sviluppo

1. Vai su **Security → Network Access**
2. Clicca **Add IP Address**
3. Aggiungi:

```
Access List Entry: 0.0.0.0/0
Comment: Development access
```

### 4.2 Per Produzione

```
⚠️ USA 0.0.0.0/0 SOLO IN SVILUPPO
```

Per produzione:
1. Aggiungi solo IP del tuo server
2. Per Vercel: `0.0.0.0/0` (necessario)
3. Oppure usa VPC Peering

---

## 5. Ottenere Connection String

### 5.1 Steps

1. Vai su **Deployment → Database**
2. Clicca **Connect** sul cluster
3. Scegli **Connect your application**
4. Copia la connection string

### 5.2 Formato SRV

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority&appName=ready2agent
```

### 5.3 Esempio

```env
MONGODB_URI=mongodb+srv://ready2agent_user:StrongPassword123@cluster0.xxxxx.mongodb.net/ready2agent?retryWrites=true&w=majority&appName=ready2agent
```

---

## 6. Configurare .env

### 6.1 Sostituisci nel .env.local

```env
MONGODB_URI=mongodb+srv://ready2agent_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ready2agent?retryWrites=true&w=majority&appName=ready2agent
```

### 6.2 Caratteri Speciali

Se la password contiene caratteri speciali (`@`, `#`, `/`, etc.):

```bash
# URL encode
# @ → %40
# # → %23
# / → %2F
```

Esempio:
```
Password: pass@word#123
Encoded: pass%40word%23123
```

---

## 7. Testare Connessione

### 7.1 Localmente

```bash
# Con mongosh
mongosh "mongodb+srv://ready2agent_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ready2agent"

# Dovresti vedere:
# Current DB: ready2agent
```

### 7.2 Con App

```bash
npm run dev
# Se connessione OK → app avvia
# Se errore → controlla URI e credenziali
```

---

## 8. Troubleshooting

### 8.1 `querySrv ETIMEOUT`

```
Problema: DNS lookup fallisce per URI SRV
Soluzione: Usa URI non-SRV
```

**URI non-SRV**:
```env
MONGODB_URI=mongodb://ready2agent_user:YOUR_PASSWORD@cluster0-shard-00-00.xxxxx.mongodb.net:27017,cluster0-shard-00-01.xxxxx.mongodb.net:27017,cluster0-shard-00-02.xxxxx.mongodb.net:27017/ready2agent?retryWrites=true&w=majority&appName=ready2agent
```

### 8.2 Authentication Failed

```
Problema: Credenziali errate
Soluzione: Verifica username e password in Atlas
```

### 8.3 Cluster Sleeping

```
Problema: Cluster M10+ va in sleep dopo inattività
Soluzione: Attiva cluster dalla dashboard Atlas
```

### 8.4 IP Non Whitelisted

```
Problema: IP non in access list
Soluzione: Aggiungi IP in Network Access
```

---

## 9. Production Checklist

- [ ] Cluster M10+ (non M0)
- [ ] Database user con permessi minimi
- [ ] IP whitelist configurata
- [ ] Connection string sicura
- [ ] Password non in git
- [ ] Backup configurato (consigliato)

---

## 10. Links Utili

- [Atlas Getting Started](https://www.mongodb.com/docs/atlas/getting-started/)
- [Connection String](https://www.mongodb.com/docs/manual/reference/connection-string/)
- [Security Best Practices](https://www.mongodb.com/docs/atlas/security/)
