# R2A Core Documentation

## Metadata

- Ultimo aggiornamento: 2026-04-29
- Pubblico: contributor tecnici e coding agent
- Status: attivo

## Scopo

`documentation/core/` definisce cosa Ready2Agent e come runtime applicativo.
Questa sezione e vincolante per architettura, sicurezza, accesso, validazione e Definition of Done tecnica.

## Struttura

- `architecture/` -> visione architetturale, stack, setup runtime
- `identity-access/` -> ruoli, permessi, modello accesso, setup SUPER
- `auth-api-validation/` -> auth, contratti API, validazione
- `storage-security/` -> storage, security baseline, deploy e troubleshooting
- `definition-of-done/` -> vincoli e criteri tecnici di completamento
- `user-detail-blueprint.md` -> blueprint documentale per ramo enterprise opzionale

## Read Order Consigliato

1. `documentation/core/architecture/01_vision_architettura.md`
2. `documentation/core/identity-access/02_identity_access.md`
3. `documentation/core/auth-api-validation/03_auth_api_validation.md`
4. `documentation/core/storage-security/04_storage_security_compliance.md`
5. `documentation/core/definition-of-done/05_constraints_dod.md`

## R2A Visual Theme Tokens

Il Core include una configurazione grafica minima in `src/config/r2a-theme.ts` per personalizzare colori superficiali.

- token modificabili: `brand`, `surface`, `text`, `state`
- integrazione: CSS custom properties globali (`src/app/globals.css`)
- confini: layout e logica runtime invariati; nessuna dipendenza da `extensions/`; nessuna configurazione runtime via DB
- nota: le extension in `extensions/` sono dev-side e non vengono caricate dal Core a runtime
