# API Layer

This folder contains the REST route handlers for the monolith.

The API layer is the controller boundary in the Controller / Service / Repository pattern.

## Responsibilities

- validate payloads with Zod
- create or propagate `requestId`
- load the authenticated actor when needed
- call only domain services (no direct repository/model access)
- return the shared `jsonSuccess` / `jsonError` envelope

## Import Convention

- Canonical service imports: `@/server/service/*.service`
- Canonical repository imports (if really needed): `@/server/repository/*.repository`
- Canonical validation imports: `@/server/lib/*/validation` or `@/server/dto/*`

## Main Areas

- `auth`: register, reauth, NextAuth
- `administrators`: admin directory, manual-link invite flow, admin permission list updates
- `operators`: operator directory, manual-link invite flow, operator permission map updates
- `users`: customer registry endpoints
- `support`: operational backoffice APIs

## Permission Notes

- API authorization does not trust the sidebar.
- Role and permission checks are resolved in the service layer so direct URL access follows the same rules as the UI.

## Layer Boundary

- `src/app/api/*` is the only REST controller entrypoint.
- Business rules stay in `src/server/service/*.service.ts`.
- DB calls stay in `src/server/repository/*.repository.ts`.
