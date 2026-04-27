# Refactoring Priorities - Piano Azione

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: agenti di coding
- **Status**: attivo

---

## Scopo

Questo documento definisce le **priorità di refactoring** ordinate per:
- Impatto
- Dipendenze
- Sforzo

---

## P1 - Foundation (Critico)

### P1.1 Env Validation Centralizzata

| Aspetto | Dettaglio |
|---------|-----------|
| **Obiettivo** | Fail-fast centralizzato |
| **Stato** | Completato ✅ |
| **Note** | Validazione env in `src/server/config/env.ts` |

### P1.2 Rimozione Fallback Insicuri

| Aspetto | Dettaglio |
|---------|-----------|
| **Obiettivo** | Nessun fallback hardcoded |
| **Stato** | Completato ✅ |
| **Note** | Tutti i fallback rimossi |

### P1.3 Runtime Split Demo/Live

| Aspetto | Dettaglio |
|---------|-----------|
| **Obiettivo** | Separazione ambienti esplicita |
| **Stato** | Completato ✅ |
| **Note** | APP_RUNTIME configurato |

### P1.4 Bootstrap SUPER Corretto

| Aspetto | Dettaglio |
|---------|-----------|
| **Obiettivo** | Setup /setup funzionante |
| **Stato** | Completato ✅ |
| **Note** | Un solo SUPER, database vuoto |

### P1.5 - Structural Consolidation

| Aspetto | Dettaglio |
|---------|-----------|
| **Obiettivo** | Backend layer-first organization |
| **Stato** | Completato ✅ |
| **Note** | Service/Repository in percorsi canonici |

---

## P2 - Identity Core (Critico)

### P2.1 Access Policy Globale

| Aspetto | Dettaglio |
|---------|-----------|
| **Obiettivo** | Policy centralizzata in `access.ts` |
| **Stato** | Completato ✅ |
| **File** | `src/server/lib/auth/access.ts` |
| **Note** | Fonte della verità per autorizzazione |

### P2.2 ADMIN Self-Only Default

| Aspetto | Dettaglio |
|---------|-----------|
| **Obiettivo** | ADMIN vede solo se stesso senza permessi |
| **Stato** | Completato ✅ |
| **File** | Service files |
| **Note** | invitedByUserId filter |

### P2.3 OPERATOR Deny-by-Default

| Aspetto | Dettaglio |
|---------|-----------|
| **Obiettivo** | Capability map enforced |
| **Stato** | Completato ✅ |
| **File** | Service files |
| **Note** | Check capability prima operazione |

---

## P3 - Auth/API Contract

### P3.1 Session Semantics

| Aspetto | Dettaglio |
|---------|-----------|
| **Obiettivo** | JWT payload spec-compliant |
| **Stato** | Completato ✅ |
| **File** | `src/server/lib/auth/session.ts` |
| **Note** | userId, role, permissions nel token |

### P3.2 Envelope Standard

| Aspetto | Dettaglio |
|---------|-----------|
| **Obiettivo** | jsonSuccess/jsonError universali |
| **Stato** | Completato ✅ |
| **File** | `src/server/lib/api/response.ts` |
| **Note** | success, data, error, requestId |

### P3.3 Error Taxonomy

| Aspetto | Dettaglio |
|---------|-----------|
| **Obiettivo** | Codici uniformi |
| **Stato** | Completato ✅ |
| **File** | `src/server/errors/` |
| **Note** | VALIDATION_*, AUTH_*, BUSINESS_*, SYSTEM_* |

---

## P4 - Data Hardening

### P4.1 Schema Spec-First

| Aspetto | Dettaglio |
|---------|-----------|
| **Obiettivo** | Schema allineato a spec |
| **Stato** | Completato ✅ |
| **File** | `src/server/models/User.ts` |
| **Note** | Tutti i campi spec presenti |

### P4.2 Validation Centralizzata

| Aspetto | Dettaglio |
|---------|-----------|
| **Obiettivo** | Zod schema ai boundary |
| **Stato** | Completato ✅ |
| **File** | API routes |
| **Note** | Fail-fast in API |

---

## P5 - UI Consistency

### P5.1 Navigation Role-Aware

| Aspetto | Dettaglio |
|---------|-----------|
| **Obiettivo** | Sidebar basata su ruolo+permessi |
| **Stato** | Completato ✅ |
| **File** | `src/shared/navigation/config.ts` |
| **Note** | Filtra item per actor |

### P5.2 Copy Allineato

| Aspetto | Dettaglio |
|---------|-----------|
| **Obiettivo** | Testo UI spec-compliant |
| **Stato** | Completato ✅ |
| **File** | Componenti vari |
| **Note** | Nessun claim errato |

---

## P6 - Documentation

### P6.1 SPEC Allineata

| Aspetto | Dettaglio |
|---------|-----------|
| **Obiettivo** | Docs = Codice |
| **Stato** | Completato ✅ |
| **Note** | Operatonal spec in allineamento |

### P6.2 Workflow Tracciato

| Aspetto | Dettaglio |
|---------|-----------|
| **Obiettivo** | Artefatti workflow pubblici |
| **Stato** | Completato ✅ |
| **Note** | Task-by-task documentato |

---

## Dipendenze Di Fase

```
P1 (Foundation)
  ↓
P2 (Identity Core) - dipende da P1
  ↓
P3 (Auth/API) - dipende da P2
  ↓
P4 (Data) - parallelo a P3
  ↓
P5 (UI) - dipende da P3, P4
  ↓
P6 (Docs) - continuo
```

---

## Effort Estimation

| Priority | Area | Effort | Note |
|----------|------|--------|------|
| P1 | Foundation | Basso | Già completato |
| P2 | Identity | Medio | Implementato, da verificare |
| P3 | Auth/API | Medio | Parzialmente completo |
| P4 | Data | Basso | Schema OK |
| P5 | UI | Basso | Navigation OK |
| P6 | Docs | Medio | In corso |

---

## Note per Agenti

Quando si lavora su un task:

1. **Verifica priorità** in questo documento
2. **Controlla dipendenze** - non anticipare
3. **Segui ordine** - Foundation → Identity → Auth → API → Data → UI → Docs
4. **Aggiorna gap matrix** quando risolvi qualcosa

---

## Completamento

| Priority | Stato | % |
|----------|-------|---|
| P1 | Completato | 100% |
| P2 | Completato | 100% |
| P3 | Completato | 100% |
| P4 | Completato | 100% |
| P5 | Completato | 100% |
| P6 | In corso | ~80% |

---

*Questo documento guida le priorità di refactoring. Aggiornare quando priorità cambiano.*
