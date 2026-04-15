# STATUS

Questa scheda serve per review, handoff e avanzamento della fase.

## Stato fase

- Stato corrente: completed
- Owner: OpenCode
- Reviewer:
- Ultimo aggiornamento: 2026-04-12
- Bloccanti aperti: none

## Dipendenze fase

- La fase 2 deve avere il modello self-only corretto in `access.ts` e nei service staff/users.
- Se ADMIN o OPERATOR mantengono broad access impliciti, non iniziare questa fase.

## Task della fase

- [x] PHASE-3-01_session_duration_remember_me.md - [PHASE-3-01] Allineare durata sessione e remember me (completed)
- [x] PHASE-3-02_jwt_session_payload.md - [PHASE-3-02] Normalizzare payload JWT/session e tipi actor (completed)
- [x] PHASE-3-03_nextauth_cookie_security.md - [PHASE-3-03] Rafforzare cookie e security config di NextAuth (completed)
- [x] PHASE-3-04_session_guards_actor_loader.md - [PHASE-3-04] Riallineare guard di sessione e loader dell'attore autenticato (completed)

## Riferimenti task

- `[PHASE-3-01]` `workflow/R2A-integration/phase_3_auth/PHASE-3-01_session_duration_remember_me.md`
- `[PHASE-3-02]` `workflow/R2A-integration/phase_3_auth/PHASE-3-02_jwt_session_payload.md`
- `[PHASE-3-03]` `workflow/R2A-integration/phase_3_auth/PHASE-3-03_nextauth_cookie_security.md`
- `[PHASE-3-04]` `workflow/R2A-integration/phase_3_auth/PHASE-3-04_session_guards_actor_loader.md`

## Review Checklist

- Tutti i task della fase completati e validati
- Nessun blocker aperto
- Exit gate della fase verificato
- Nessuna regressione nota introdotta nella fase

## Handoff Notes

- Contesto da trasferire: fase avviata dopo chiusura completa di Phase 2 (`access.ts` + staff/users services allineati al modello self-only by default).
- Decisioni importanti prese: contratto auth unificato su `userId` + `role` + `permissions`, con rimozione di `standardAccess` dal payload session/JWT.
- File sensibili/modificati nella fase: `src/server/lib/auth/nextauth.ts`, `src/server/lib/auth/session.ts`, `src/server/lib/auth/guards.ts`, `src/server/lib/auth/access.ts`, `src/shared/types/next-auth.d.ts`, `src/shared/users/types.ts`, `src/server/service/auth.service.ts`.
- Test/verifiche da rilanciare prima della fase successiva: `npm run lint`, `npm run test`, `npm run build` dopo la chiusura di ogni task auth/session.

## Sign-off

- Implementazione:
- Review tecnica:
- Pronto per fase successiva: yes
