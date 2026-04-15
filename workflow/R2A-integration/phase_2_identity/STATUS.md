# STATUS

Questa scheda serve per review, handoff e avanzamento della fase.

## Stato fase

- Stato corrente: completed
- Owner: OpenCode
- Reviewer:
- Ultimo aggiornamento: 2026-04-12
- Bloccanti aperti: none

## Dipendenze fase

- La fase 1 deve avere env validation stabile, runtime demo/live separato e first-run setup SUPER corretto.
- Se restano fallback insicuri o script live non conformi, non iniziare questa fase.

## Task della fase

- [x] PHASE-2-01_roles_permissions_model.md - [PHASE-2-01] Definire il modello canonico ruoli e permessi da specifica (completed 2026-04-12)
- [x] PHASE-2-02_access_policy_self_only.md - [PHASE-2-02] Riscrivere la policy centrale di accesso con self-only di default (completed 2026-04-12)
- [x] PHASE-2-03_staff_services_alignment.md - [PHASE-2-03] Riallineare servizi administrators e operators alla nuova policy (completed 2026-04-12)
- [x] PHASE-2-04_users_navigation_alignment.md - [PHASE-2-04] Riallineare users service e helper di navigazione alla nuova policy (completed 2026-04-12)

## Riferimenti task

- `[PHASE-2-01]` `workflow/R2A-integration/phase_2_identity/PHASE-2-01_roles_permissions_model.md`
- `[PHASE-2-02]` `workflow/R2A-integration/phase_2_identity/PHASE-2-02_access_policy_self_only.md`
- `[PHASE-2-03]` `workflow/R2A-integration/phase_2_identity/PHASE-2-03_staff_services_alignment.md`
- `[PHASE-2-04]` `workflow/R2A-integration/phase_2_identity/PHASE-2-04_users_navigation_alignment.md`

## Review Checklist

- Tutti i task della fase completati e validati
- Nessun blocker aperto
- Exit gate della fase verificato
- Nessuna regressione nota introdotta nella fase

## Handoff Notes

- Contesto da trasferire: PHASE-2 completa; task sequenziale successivo PHASE-3-01.
- Decisioni importanti prese: users service riallineato con self-only by default (self read sempre consentito, non-self via policy centrale), bloccata self-escalation su `profileLevel`/`status`, vietato self-delete dal generic users registry; navigation coerente con accesso reale (`Operators` visibile anche in self-only, `Users` visibile solo con `users.view`).
- File sensibili/modificati nella fase: `src/server/lib/auth/access.ts`, `src/server/service/administrators.service.ts`, `src/server/service/operators.service.ts`, `src/server/service/users.service.ts`, `src/shared/auth/admin-permissions.catalog.ts`, `src/shared/auth/permissions.catalog.ts`, `src/components/dashboard/staff-management-page-client.tsx`, suite regression identity (archiviata nel refactor test successivo).
- Test/verifiche da rilanciare prima della fase successiva: `npm run lint`, `npm run test`, `npm run build`.

## Sign-off

- Implementazione:
- Review tecnica:
- Pronto per fase successiva: yes (prossimo task sequenziale: PHASE-3-01)
