# Server Layer

This folder contains the backend runtime for the Next.js monolith.

## Layering

- `src/app/api/*`: controller layer (request parsing, validation, response envelope)
- `src/server/service/*.service.ts`: business logic layer
- `src/server/repository/*.repository.ts`: data access layer
- `src/server/models/*`: persistence models
- `src/server/config/*`: server-side runtime config
- `src/server/lib/*`: server-only internals (auth/session/security, validation, policy, demo store)

## Core Folders

- `service/`
- `repository/`
- `models/`
- `dto/`
- `errors/`
- `db/`
- `config/`

## Canonical Rule

For new code, import business logic from `@/server/service/*` and
data access from `@/server/repository/*`.

Do not add new wrappers in `src/server/lib/*`.

See `src/server/ARCHITECTURE.md` for the full convention.
