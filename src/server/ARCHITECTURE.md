# Server Architecture Guide

## Goal

Keep the backend structure close to a Nest mental model while remaining idiomatic for Next.js App Router.

## Runtime Model

- Framework runtime: Next.js monolith
- Controller boundary: `src/app/api/*`
- Services: `src/server/service/*.service.ts`
- Repositories: `src/server/repository/*.repository.ts`
- Data models: `src/server/models/*`

## Mandatory Rules

- API routes must not call models or DB utilities directly.
- Service files contain business logic and authorization checks.
- Repository files contain only persistence logic and data mapping.
- Shared technical utilities belong in `src/server/lib/*`.
- Cross frontend/backend contracts belong in `src/shared/*`.

## Canonical Import Paths

- Use `@/server/service/*` for business logic imports.
- Use `@/server/repository/*` for data-access imports.
- Use `@/server/config/*` for runtime configuration.
- Use `@/server/models/*` only inside repositories or dedicated data modules.

## Compatibility Layer

`src/server/lib/*` is reserved for server-only internals.
It must not contain service/repository wrappers.

## Frontend Safety Boundary

- Frontend components should not import runtime server modules.
- If frontend needs a contract (type/schema/catalog), move it to `src/shared/*`.
- Keep server-only types in `src/server/*` and avoid importing them in client components.
