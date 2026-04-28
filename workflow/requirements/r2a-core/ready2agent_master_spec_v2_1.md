# Ready2Agent Master Specification v2.1

## ⚠️ DEPRECATO

> **Nota importante**: Questo file è mantenuto per riferimento storico ma è **DEPRECATO**.
>
> Per navigazione operativa, usa la nuova struttura documentale:
>
> - **Source of truth operativa**: `documentation/documentation/core/`
> - **Navigazione modulare**: `documentation/core/README.md`
> - **Documentazione umani**: `documentation/core/`
>
> Questo file monolitico non viene piu aggiornato. Tutte le modifiche alla spec devono essere fatte nei file della cartella `documentation/documentation/core/`.

> Nota workflow: questo documento e l'input requisito storico da cui e partita la realizzazione in `workflow/R2A-integration/`.

---

## Metadata

- Last Updated: 2026-04-10

## 0. Scopo del documento

Questo documento e la **source of truth** ufficiale di Ready2Agent.
Definisce in modo vincolante cosa Ready2Agent e, cosa deve includere, cosa
deve escludere e quali regole architetturali, tecniche e funzionali
devono guidarne la realizzazione.

Non Ã¨: - un piano di implementazione - un backlog task - un documento di
prompt

Serve per: - eliminare ambiguitÃ  - guidare la generazione task - fungere
da base di validazione

------------------------------------------------------------------------

## 1. Visione

Ready2Agent e un **framework fullstack plug-and-play** con impostazione
enterprise e complessitÃ  controllata.

Obiettivo: - base riusabile - pronta per produzione - chiara e
didattica - estendibile senza rompere il core

------------------------------------------------------------------------

## 2. Architettura

-   Monolite Next.js fullstack
-   Pattern obbligatorio: Controller / Service / Repository
-   REST = contratto core
-   Server Actions = solo UI composition

Regola: La business logic vive SOLO nei service.

------------------------------------------------------------------------

## 3. Identity & Access (CORE)

### 3.1 Ruoli

-   SUPER
-   ADMIN
-   OPERATOR
-   USER

------------------------------------------------------------------------

### 3.2 Principio globale di visibilitÃ 

Regola fondamentale: \> ogni utente vede solo se stesso, salvo permessi
espliciti

------------------------------------------------------------------------

### 3.3 SUPER

-   accesso totale
-   gestione sistema e configurazioni
-   puÃ² creare ADMIN
-   vede e modifica tutto

Non usa permission map.

------------------------------------------------------------------------

### 3.4 ADMIN

Creato tramite invito da SUPER.

#### Default

-   vede solo se stesso

#### Permessi (lista)

L'ADMIN ha una lista permessi limitata: - visibilitÃ  altri ADMIN
(boolean)

#### CapacitÃ 

-   invita OPERATOR
-   gestisce OPERATOR se autorizzato

------------------------------------------------------------------------

### 3.5 OPERATOR

Creato tramite invito da ADMIN o SUPER.

#### Default

-   vede solo se stesso

#### Permission Map

Obbligatoria, tipizzata, persistita.

Ambiti:

1.  Operatori

-   read
-   update

2.  Contesti operativi

-   documents
-   altri moduli

Esempio: operators: { read, update } documents: { read, upload, delete }

------------------------------------------------------------------------

### 3.6 USER

-   registrazione pubblica
-   nessun permesso configurabile
-   nessuna permission map

------------------------------------------------------------------------

### 3.7 Flussi

SUPER â†’ ADMIN â†’ OPERATOR â†’ USER

------------------------------------------------------------------------

### 3.8 Regole

-   no escalation automatica
-   permessi assegnati top-down
-   default = minimo accesso

------------------------------------------------------------------------

## 4. Modello dati

User: - email - firstName - lastName - passwordHash - role - status

Permessi: - ADMIN â†’ lista - OPERATOR â†’ map - USER â†’ none

Metadata: - createdAt - updatedAt - lastLoginAt

Compliance: - termsAcceptedAt - privacyAcceptedAt

Soft delete: - status = inactive

------------------------------------------------------------------------

## 5. Autenticazione

-   NextAuth
-   JWT
-   Credentials

Payload: - userId - role - permissions

Session: - default 24h - remember me esteso

------------------------------------------------------------------------

## 6. API Contract

Formato:

success data error

Errori: - validation - auth - business - system

Gestione errori nei service.

------------------------------------------------------------------------

## 7. Validazione

-   centralizzata per core
-   obbligatoria per utenti

------------------------------------------------------------------------

## 8. Storage

-   fuori scope nella prima demo Basepack
-   nessun upload/download allegati nel runtime corrente

------------------------------------------------------------------------

## 9. Sicurezza

-   bcrypt
-   rate limit login
-   cookie secure

------------------------------------------------------------------------

## 10. Configurazione

-   env obbligatorie
-   validazione env
-   bootstrap SUPER

------------------------------------------------------------------------

## 11. Email

-   invite
-   reset password
-   verification

------------------------------------------------------------------------

## 12. Compliance

-   privacy
-   termini
-   cookie

------------------------------------------------------------------------

## 13. Feature flags

-   centralizzate
-   non DB-driven

------------------------------------------------------------------------

## 14. Logging & Audit

-   logger wrapper
-   audit login
-   audit operazioni core

------------------------------------------------------------------------

## 15. Vincoli

-   NO multi-tenant
-   NO organization
-   NO MFA
-   NO overengineering

------------------------------------------------------------------------

## 16. Definition of Done

Sistema completo quando: - login funzionante - ruoli funzionanti -
inviti funzionanti - permission map OPERATOR funzionante - visibilitÃ 
controllata - USER registrabile - API coerenti - storage funzionante -
audit presente
