# Human Start Here - Guida Sviluppatori

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: sviluppatori umani
- **Status**: attivo

---

## Benvenuto

Questa è la guida rapida per **nuovi sviluppatori** che vogliono capire, usare o contribuire a **Ready2Agent**.

---

## 1. Cos'è Ready2Agent?

### 1.1 In Breve

**Ready2Agent** è un framework fullstack plug-and-play con **doppia identità**:

1. **Framework applicativo**: Base con auth, IAM, dashboard
2. **Caso studio**: Dimostrazione metodo di sviluppo AI-native

### 1.2 Stack Tecnologico

```
Runtime:    Next.js + TypeScript
Database:   MongoDB + Mongoose
Auth:       NextAuth.js (JWT)
Styling:    CSS Custom + Tailwind utilities
```

---

## 2. Per Iniziare (Quick Start)

### 2.1 Setup Locale

```bash
# 1. Clona repository
git clone https://github.com/your-fork/ready2agent.git
cd ready2agent

# 2. Installa dipendenze
npm install

# 3. Crea env file
cp .env.example .env.local

# 4. Configura .env.local
#    - MONGODB_URI: mongodb://localhost:27017/ready2agent (locale)
#    - NEXTAUTH_SECRET: generato casualmente

# 5. Avvia
npm run dev
```

### 2.2 Primo Accesso

Su database vuoto, l'app redirige a `/setup`:
1. Inserisci email e password
2. Clicca "Inizializza"
3. Verrai loggato come SUPER

---

## 3. Navigazione Documentale

### 3.1 Per Capire il Progetto

```
1. README.md                    → Panoramica
2. R2A_full-ai-context.md      → Contesto completo
3. agent-workspace/project-docs/01_vision_architettura.md → Architettura
```

### 3.2 Per Contributi

```
1. agent-workspace/operational/spec/ → Vincoli tecnici
2. agent-workspace/operational/alignment/ → Stato repository
3. workflow/R2A-integration/ → Come il lavoro è tracciato
```

### 3.3 Per Setup

```
1. agent-workspace/project-docs/03_setup_locale.md
2. agent-workspace/project-docs/04_deploy_produzione.md
3. agent-workspace/project-docs/05_troubleshooting.md
```

---

## 4. Architettura Tecnica

### 4.1 Pattern

```
Controller → Service → Repository
(app/api)   (service)  (repository)
```

### 4.2 Struttura Directory

```
src/
├── app/api/           # API routes (controller)
├── components/        # UI components
├── server/
│   ├── service/      # Business logic
│   ├── repository/   # Data access
│   ├── models/       # Schemi Mongoose
│   └── lib/          # Utilities server
└── shared/           # Tipi condivisi
```

---

## 5. Ruoli e Permessi

### 5.1 Gerarchia

```
SUPER → ADMIN → OPERATOR → USER
 (1)    (n)      (n)       (n)
```

### 5.2 Principio

> **Ogni utente vede solo se stesso, salvo permessi espliciti.**

---

## 6. Workflow di Sviluppo

### 6.1 Per Bug Fix

```
1. Apri issue con descrizione
2. Crea branch: fix/descrizione-breve
3. Implementa fix
4. Aggiungi test
5. PR con review
```

### 6.2 Per Feature

```
1. Discuti in issue/discussion
2. Crea branch: feature/descrizione
3. Implementa con test
4. Aggiorna documentazione
5. PR con review
```

---

## 7. Comandi Utili

```bash
# Development
npm run dev          # Avvia dev server

# Quality
npm run lint         # ESLint
npm test             # Test suite
npm run typecheck    # TypeScript

# Build
npm run build        # Build produzione
npm start           # Avvia produzione
```

---

## 8. Contributing Guidelines

### 8.1 Prima di Contribuire

```
✅ Leggi README e contesto
✅ Capisci architettura
✅ Verifica setup locale funziona
```

### 8.2 Durante

```
✅ Segui convenzioni naming
✅ Aggiungi test per nuovo codice
✅ Aggiorna documentazione se necessario
✅ Valida con lint/test/build
```

### 8.3 PR

```
✅ Titolo descrittivo
✅ Descrizione cosa fa
✅ Riferimento issue se applicabile
✅ Checks passate
```

---

## 9. Links

| Risorsa | Percorso |
|---------|----------|
| Docs | `agent-workspace/project-docs/` |
| Setup | `agent-workspace/project-docs/03_setup_locale.md` |
| Architettura | `agent-workspace/project-docs/01_vision_architettura.md` |
| Issues | GitHub Issues |
| Discussions | GitHub Discussions |

---

## 10. Aiuto

### 10.1 Quando Bloccato

```
1. Leggi troubleshooting doc
2. Cerca issue simili
3. Apri nuova issue se non trova
```

### 10.2 Canali

```
📝 GitHub Issues      → Bug report, feature request
💬 GitHub Discussions → Domande, idee
📖 Documentazione      → Già qui!
```

---

## 11. Nota Finale

```
BENVENUTO NEL TEAM.

QUESTO È UN PROGETTO CURIATO.
SI PREGA DI TRATTARLO CON CURA.

SE HAI DOMANDE, CHIEDI.
SE VUOI CONTRIBUIRE, INIZIA PICCOLO.
SE TROVI BUG, SEGNALA.

INSIEME COSTRUIAMO QUALCOSA DI BUONO.
```

---

*Grazie per il tuo interesse in Ready2Agent!*
