# Ready2Agent Master Execution Index

## Metadata

- **Ultimo aggiornamento**: 2026-04-15
- **Pubblico**: agenti di coding
- **Status**: attivo

---

## Scopo

Indice maestro operativo per l'esecuzione **task-by-task** di Ready2Agent (R2A).

Questo documento è anche un **artefatto di caso studio**: può essere forkato come modello di governance operativa per progetti AI-native agent-assisted.

---

## Documenti Sorgente Obbligatori

Per ogni task, consulta in ordine:

1. `agent-workspace/operational/spec/README.md`
2. `agent-workspace/operational/alignment/README.md`
3. `agent-workspace/operational/execution/README.md`

---

## Regole d'Uso

```
✅ Esegui un solo task per volta
✅ Non saltare l'ordine
✅ Non aprire task fase successiva finché fase corrente non supera exit gate
✅ Per ogni task usa il file dedicato nella cartella di fase
✅ Copia il blocco "Prompt operativo" dal file task
```

---

## Ordine Esatto di Esecuzione

### Phase 1 - Foundation & Config

| # | Task ID | File |
|---|---------|------|
| 1 | PHASE-1-01 | `phase_1_foundation/PHASE-1-01_env_validation.md` |
| 2 | PHASE-1-02 | `phase_1_foundation/PHASE-1-02_secure_env_consumers.md` |
| 3 | PHASE-1-03 | `phase_1_foundation/PHASE-1-03_demo_runtime_split.md` |
| 4 | PHASE-1-04 | `phase_1_foundation/PHASE-1-04_super_bootstrap_seed.md` |

**Exit Gate Phase 1**: Config sicura, env validate, database obbligatorio in live/demo/test, first-run setup SUPER corretto senza utenti demo bootstrapati.

---

### Phase 2 - Identity & Access Core

| # | Task ID | File |
|---|---------|------|
| 5 | PHASE-2-01 | `phase_2_identity/PHASE-2-01_roles_permissions_model.md` |
| 6 | PHASE-2-02 | `phase_2_identity/PHASE-2-02_access_policy_self_only.md` |
| 7 | PHASE-2-03 | `phase_2_identity/PHASE-2-03_staff_services_alignment.md` |
| 8 | PHASE-2-04 | `phase_2_identity/PHASE-2-04_users_navigation_alignment.md` |

**Exit Gate Phase 2**: Access model self-only corretto e stabile.

---

### Phase 3 - Authentication & Session

| # | Task ID | File |
|---|---------|------|
| 9 | PHASE-3-01 | `phase_3_auth/PHASE-3-01_session_duration_remember_me.md` |
| 10 | PHASE-3-02 | `phase_3_auth/PHASE-3-02_jwt_session_payload.md` |
| 11 | PHASE-3-03 | `phase_3_auth/PHASE-3-03_nextauth_cookie_security.md` |
| 12 | PHASE-3-04 | `phase_3_auth/PHASE-3-04_session_guards_actor_loader.md` |

**Exit Gate Phase 3**: Session/auth/cookie allineati alla spec JWT.

---

### Phase 4 - API Standardization

| # | Task ID | File |
|---|---------|------|
| 13 | PHASE-4-01 | `phase_4_api/PHASE-4-01_api_envelope_error_taxonomy.md` |
| 14 | PHASE-4-02 | `phase_4_api/PHASE-4-02_auth_controller_pattern.md` |
| 15 | PHASE-4-03 | `phase_4_api/PHASE-4-03_staff_rest_routes.md` |
| 16 | PHASE-4-04 | `phase_4_api/PHASE-4-04_users_rest_contract.md` |
| 17 | PHASE-4-05 | `phase_4_api/PHASE-4-05_internal_rest_client_pages.md` |

**Exit Gate Phase 4**: REST è il contratto reale del core.

---

### Phase 5 - Validation & Data Model

| # | Task ID | File |
|---|---------|------|
| 18 | PHASE-5-01 | `phase_5_validation_data/PHASE-5-01_validation_centralization.md` |
| 19 | PHASE-5-02 | `phase_5_validation_data/PHASE-5-02_user_schema_role_alignment.md` |
| 20 | PHASE-5-03 | `phase_5_validation_data/PHASE-5-03_remove_out_of_spec_fields.md` |
| 21 | PHASE-5-04 | `phase_5_validation_data/PHASE-5-04_operator_permissions_db_soft_delete.md` |

**Exit Gate Phase 5**: Model/validation coerenti e puliti.

---

### Phase 6 - UI & Visibility

| # | Task ID | File |
|---|---------|------|
| 22 | PHASE-6-01 | `phase_6_ui_visibility/PHASE-6-01_navigation_sidebar_alignment.md` |
| 23 | PHASE-6-02 | `phase_6_ui_visibility/PHASE-6-02_staff_users_ui_capabilities.md` |
| 24 | PHASE-6-03 | `phase_6_ui_visibility/PHASE-6-03_auth_public_forms.md` |
| 25 | PHASE-6-04 | `phase_6_ui_visibility/PHASE-6-04_ui_copy_dashboard_alignment.md` |

**Exit Gate Phase 6**: UI coerente con backend e senza claim errati.

---

### Phase 7 - Final Hardening

| # | Task ID | File |
|---|---------|------|
| 26 | PHASE-7-01 | `phase_7_hardening/PHASE-7-01_core_regression_suite.md` |
| 27 | PHASE-7-02 | `phase_7_hardening/PHASE-7-02_transversal_regression_suite.md` |
| 28 | PHASE-7-03 | `phase_7_hardening/PHASE-7-03_final_validation_cleanup_report.md` |

**Exit Gate Phase 7**: Suite verde, clean-up completato, report finale di conformità.

---

## Exit Gate Sintesi

| Phase | Exit Gate |
|-------|-----------|
| 1 - Foundation | Config sicura, env validate, database obbligatorio, setup SUPER corretto |
| 2 - Identity | Access model self-only corretto e stabile |
| 3 - Auth | Session/auth/cookie allineati alla spec JWT |
| 4 - API | REST è il contratto reale del core |
| 5 - Data | Model/validation coerenti e puliti |
| 6 - UI | UI coerente con backend e senza claim errati |
| 7 - Hardening | Suite verde, clean-up completato, report finale conformità |

---

## Dipendenze Diagramma

```
PHASE 1
   ↓ (completato)
PHASE 2 → dipende da 1
   ↓ (completato)
PHASE 3 → dipende da 2
   ↓ (completato)
PHASE 4 → dipende da 2, 3
   ↓ (completato)
PHASE 5 → dipende da 4
   ↓ (completato)
PHASE 6 → dipende da 5
   ↓ (completato)
PHASE 7 → dipende da tutte
```

---

## Links Utili

- **Workflow Hub**: `workflow/R2A-integration/README.md`
- **Tracker**: `workflow/R2A-integration/sh1nig4my_daily_execution_tracker.md`
- **Prompts Guide**: `workflow/prompts/README.md`
- **Operational Context**: `agent-workspace/operational/execution/README.md`

---

*Questo index è la source of truth per la sequenza operativa. Aggiornalo quando la sequenza cambia.*
