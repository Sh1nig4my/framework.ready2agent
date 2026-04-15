# Ready2Agent Master Execution Index

## Metadata

- Last Updated: 2026-04-14

Indice maestro operativo per l'esecuzione task-by-task di Ready2Agent (R2A).

Questo indice e anche un artefatto di case study: puo essere forkato come modello di governance operativa per progetti AI-native agent-assisted.

Documenti sorgente obbligatori per ogni task:
- `agent-workspace/operational/spec/README.md`
- `agent-workspace/operational/alignment/README.md`
- `agent-workspace/operational/execution/README.md`

Regole d'uso:
- eseguire un solo task per volta
- non saltare l'ordine
- non aprire task della fase successiva finche la fase corrente non supera l'exit gate
- per ogni task usare il file dedicato nella cartella di fase e copiare il blocco `Prompt operativo`

## Ordine esatto di esecuzione

1. `[PHASE-1-01]` `workflow/R2A-integration/phase_1_foundation/PHASE-1-01_env_validation.md`
2. `[PHASE-1-02]` `workflow/R2A-integration/phase_1_foundation/PHASE-1-02_secure_env_consumers.md`
3. `[PHASE-1-03]` `workflow/R2A-integration/phase_1_foundation/PHASE-1-03_demo_runtime_split.md`
4. `[PHASE-1-04]` `workflow/R2A-integration/phase_1_foundation/PHASE-1-04_super_bootstrap_seed.md`

5. `[PHASE-2-01]` `workflow/R2A-integration/phase_2_identity/PHASE-2-01_roles_permissions_model.md`
6. `[PHASE-2-02]` `workflow/R2A-integration/phase_2_identity/PHASE-2-02_access_policy_self_only.md`
7. `[PHASE-2-03]` `workflow/R2A-integration/phase_2_identity/PHASE-2-03_staff_services_alignment.md`
8. `[PHASE-2-04]` `workflow/R2A-integration/phase_2_identity/PHASE-2-04_users_navigation_alignment.md`

9. `[PHASE-3-01]` `workflow/R2A-integration/phase_3_auth/PHASE-3-01_session_duration_remember_me.md`
10. `[PHASE-3-02]` `workflow/R2A-integration/phase_3_auth/PHASE-3-02_jwt_session_payload.md`
11. `[PHASE-3-03]` `workflow/R2A-integration/phase_3_auth/PHASE-3-03_nextauth_cookie_security.md`
12. `[PHASE-3-04]` `workflow/R2A-integration/phase_3_auth/PHASE-3-04_session_guards_actor_loader.md`

13. `[PHASE-4-01]` `workflow/R2A-integration/phase_4_api/PHASE-4-01_api_envelope_error_taxonomy.md`
14. `[PHASE-4-02]` `workflow/R2A-integration/phase_4_api/PHASE-4-02_auth_controller_pattern.md`
15. `[PHASE-4-03]` `workflow/R2A-integration/phase_4_api/PHASE-4-03_staff_rest_routes.md`
16. `[PHASE-4-04]` `workflow/R2A-integration/phase_4_api/PHASE-4-04_users_rest_contract.md`
17. `[PHASE-4-05]` `workflow/R2A-integration/phase_4_api/PHASE-4-05_internal_rest_client_pages.md`

18. `[PHASE-5-01]` `workflow/R2A-integration/phase_5_validation_data/PHASE-5-01_validation_centralization.md`
19. `[PHASE-5-02]` `workflow/R2A-integration/phase_5_validation_data/PHASE-5-02_user_schema_role_alignment.md`
20. `[PHASE-5-03]` `workflow/R2A-integration/phase_5_validation_data/PHASE-5-03_remove_out_of_spec_fields.md`
21. `[PHASE-5-04]` `workflow/R2A-integration/phase_5_validation_data/PHASE-5-04_operator_permissions_db_soft_delete.md`

22. `[PHASE-6-01]` `workflow/R2A-integration/phase_6_ui_visibility/PHASE-6-01_navigation_sidebar_alignment.md`
23. `[PHASE-6-02]` `workflow/R2A-integration/phase_6_ui_visibility/PHASE-6-02_staff_users_ui_capabilities.md`
24. `[PHASE-6-03]` `workflow/R2A-integration/phase_6_ui_visibility/PHASE-6-03_auth_public_forms.md`
25. `[PHASE-6-04]` `workflow/R2A-integration/phase_6_ui_visibility/PHASE-6-04_ui_copy_dashboard_alignment.md`

26. `[PHASE-7-01]` `workflow/R2A-integration/phase_7_hardening/PHASE-7-01_core_regression_suite.md`
27. `[PHASE-7-02]` `workflow/R2A-integration/phase_7_hardening/PHASE-7-02_transversal_regression_suite.md`
28. `[PHASE-7-03]` `workflow/R2A-integration/phase_7_hardening/PHASE-7-03_final_validation_cleanup_report.md`

## Exit gate per fase

- Phase 1 -> config sicura, env validate, database obbligatorio in live/demo/test, first-run setup SUPER corretto senza utenti demo bootstrapati
- Phase 2 -> access model self-only corretto e stabile
- Phase 3 -> session/auth/cookie allineati alla spec JWT
- Phase 4 -> REST e il contratto reale del core
- Phase 5 -> model/validation coerenti e puliti
- Phase 6 -> UI coerente con backend e senza claim errati
- Phase 7 -> suite verde, clean-up completato, report finale di conformita
