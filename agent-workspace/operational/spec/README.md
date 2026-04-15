# Operational Spec Index

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: agenti di coding, contributor
- **Status**: attivo

## Scopo

Questa sezione è la **source of truth** vincolante per Ready2Agent.

Definisce in modo non ambiguo:
- Cosa il progetto è
- Cosa deve includere
- Cosa deve escludere
- Regole architetturali, tecniche e funzionali

## Source

File monolitico legacy: `agent-workspace/ready2agent_master_spec_v2_1.md` (deprecato).

Questa sezione scompone la spec in moduli navigabili per uso operativo.

## Ordine di Lettura Consigliato

1. `operational/spec/01_vision_architettura.md`
2. `operational/spec/02_identity_access.md`
3. `operational/spec/03_auth_api_validation.md`
4. `operational/spec/04_storage_security_compliance.md`
5. `operational/spec/05_constraints_dod.md`

## File Spec

### 01 - Vision & Architecture

**Contenuto**: Vincoli architetturali non negoziabili.

**Punti chiave**:
- Monolite Next.js fullstack
- Pattern Controller/Service/Repository
- REST come contratto core
- Business logic solo nei service

### 02 - Identity & Access

**Contenuto**: Modello ruoli, visibilità e permessi.

**Punti chiave**:
- SUPER > ADMIN > OPERATOR > USER
- Self-only come default universale
- Permission map obbligatoria per OPERATOR
- Delega top-down

### 03 - Auth, API, Validation

**Contenuto**: Autenticazione, contratti API e validazione.

**Punti chiave**:
- NextAuth + JWT + Credentials
- Envelope standard `success/data/error`
- Validazione centralizzata

### 04 - Storage, Security, Compliance

**Contenuto**: Sicurezza, storage e compliance.

**Punti chiave**:
- Storage allegati out of scope per demo Basepack
- bcrypt per password
- Cookie secure
- Privacy/termini/cookie compliance

### 05 - Constraints & DoD

**Contenuto**: Vincoli non funzionali e Definition of Done.

**Punti chiave**:
- NO multi-tenant
- NO organization
- NO MFA
- NO overengineering
- Sistema completo = tutti i criteri verificati

## Regole di Priorità

Se un vincolo in un file è in conflitto con un altro:
1. `01_vision_architettura.md` ha priorità su tutto
2. `02_identity_access.md` ha priorità su `03_auth_api_validation.md`
3. La spec integrata fa fede sul codice esistente

## Aggiornamento

Quando la spec cambia:
1. Aggiorna questa sezione (`operational/spec/`)
2. Aggiorna `project-meta/decision_log.md`
3. Aggiorna `workflow/R2A-integration/` se i task sono impattati
