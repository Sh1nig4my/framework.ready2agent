# Ready2Agent (R2A)

<p align="center">
  <img src="/ready2agent-logo-nobg.png" alt="Ready2Agent Logo" width="120" />
</p>

---

## Metadati

- Ultimo aggiornamento: 2026-04-15
- Stato: Pronto per la produzione

Ready2Agent è un framework AI-native costruito con Next.js + TypeScript, progettato per due obiettivi paralleli:

1. **Baseline plug-and-play**: autenticazione, governance ruoli piramidale, permessi delegati, bootstrap setup, e moduli dashboard privati.
2. **Caso studio pubblico per sviluppo con agenti coding**: prompt riutilizzabili, workflow esecutivo, tracciamento artefatti e disciplina documentale.

Questo `README.md` è l'**unico punto di ingresso** per il progetto.

---

## Quick Start

```bash
# 1. Clona il repository
git clone https://github.com/your-repo/ready2agent.git
cd ready2agent

# 2. Installa le dipendenze
npm install

# 3. Configura l'ambiente
cp .env.example .env.local

# 4. Modifica .env.local con i tuoi valori (vedi DEPLOY.md per dettagli)
#    - APP_RUNTIME=local
#    - MONGODB_URI=mongodb://localhost:27017/ready2agent
#    - Genera secrets: NEXTAUTH_SECRET, AUTH_TOKEN_PEPPER

# 5. Avvia il server di sviluppo
npm run dev

# 6. Su database vuoto, vai su /setup per creare il primo account SUPER
```

---

## Cosa Ottieni Out-of-the-Box

| Modulo | Descrizione |
|--------|-------------|
| **Autenticazione** | NextAuth.js con credentials provider, sessioni JWT, rate limiting |
| **Governance Ruoli** | SUPER > ADMIN > OPERATOR > USER con permessi granulari |
| **Dashboard** | Dashboard privata basata sui ruoli con navigazione filtrata per permessi |
| **Bootstrap** | Flusso first-run per creare il primo account SUPER |
| **Gestione Staff** | Invita e gestisci ADMIN/OPERATOR con assegnazione permessi |
| **Audit Logging** | Tracciamento eventi auth e azioni admin |

---

## Stack Tecnologico

| Categoria | Tecnologia |
|-----------|------------|
| Framework | Next.js 16 + TypeScript |
| Runtime | Node.js 18+ |
| Database | MongoDB + Mongoose |
| Autenticazione | NextAuth.js |
| Styling | CSS Variables + componenti shadcn-like |
| Deployment | Vercel (consigliato) |

---

## Stack Strumentale (Consigliato)

| Scopo | Strumento | Note |
|-------|-----------|------|
| IDE (sviluppo umano) | WebStorm | Gratuito per progetti personali |
| IDE/CLI (agente) | OpenCode | Assistente coding AI-native |
| Hosting | Vercel | Tier gratuito disponibile |
| Database | MongoDB Atlas | Tier gratuito disponibile |
| Versionamento | GitHub | Workflow fork-first |

---

## Struttura del Progetto

```
ready2agent/
├── src/
│   ├── app/            # Pagine Next.js App Router e route API
│   ├── components/     # Componenti React UI
│   ├── server/          # Backend: service, repository, model
│   └── shared/         # Tipi condivisi e contratti
├── agent-workspace/    # Contesto operativo per agenti coding
├── workflow/          # Caso studio: metodologia esecutiva task-by-task
├── public/            # Asset statici
└── tests/             # Test suite
```

---

## Pattern Architetturale

```
Route API (src/app/api/*)
        ↓
    Controller
        ↓
    Service (logica di business)
        ↓
    Repository (accesso ai dati)
        ↓
    MongoDB/Mongoose
```

**Separazione dei layer:**
- `src/app/api/*` - Boundary HTTP, gestione request/response
- `src/server/service/*` - Logica di business, policy, orchestrazione
- `src/server/repository/*` - Operazioni database
- `src/shared/*` - Contratti condivisi (tipi, costanti)

---

## Modello dei Ruoli

| Ruolo | Descrizione | Livello Accesso |
|-------|-------------|-----------------|
| **SUPER** | Autorità globale | Accesso completo al sistema |
| **ADMIN** | Governance delegata | Gestione staff + oversight utenti |
| **OPERATOR** | Operatore scoped | Mappa capability granulare |
| **USER** | Utente standard | Dashboard personale |

I permessi OPERATOR sono granulari per risorsa/azione e **sempre applicati server-side**.

---

## Documentazione

| Documento | Scopo |
|----------|-------|
| `DEPLOY.md` | Guida completa al deployment (locale → produzione) |
| `R2A_full-ai-context.md` | Contesto narrativo completo per AI/umani |
| `PROMPT.md` | Modalità operative per agenti coding |
| `agent-workspace/README.md` | Base di conoscenza esecutiva agenti |
| `workflow/README.md` | Come studiare la metodologia caso studio |

---

## Validazione

Verifica sempre le modifiche con:

```bash
npm run lint    # ESLint
npm run build   # Build produzione Next.js
```

---

## Deployment

Vedi **`DEPLOY.md`** per la guida step-by-step completa che copre:

1. Setup locale con MongoDB
2. Configurazione MongoDB Atlas
3. Deployment Vercel
4. Variabili d'ambiente
5. Configurazione dominio
6. Checklist sicurezza
7. Troubleshooting

---

## Regole Open Source

- Non committare mai credenziali reali nei file `.env*`
- Mantieni codice e documentazione allineati nello stesso change set
- Rimuovi riferimenti obsoleti quando i percorsi dell'architettura cambiano
- Tratta questo repository sia come codebase production-grade che come artefatto educativo pubblico

---

## Licenza

Questo progetto è rilasciato sotto licenza **Ready2Agent License**.

Vedere il file [LICENSE.md](LICENSE.md) per i termini completi.

### Termini in Sintesi

**Permesso**: Usa, copia, modifica e distribuisci per uso personale e studio.

**Divieto**: Non è consentito vendere il software o prodotti derivati per scopi commerciali.

**Obbligo**: Menziona Ready2Agent e collega al repository GitHub quando lo utilizzi.

---

## Link

- **GitHub**: https://github.com/your-repo/ready2agent
- **Licenza**: [LICENSE.md](LICENSE.md)
- **Documentazione**: Vedere i file nella root e cartella `agent-workspace/`

---

*Ready2Agent - Il framework che costruisce se stesso.*
