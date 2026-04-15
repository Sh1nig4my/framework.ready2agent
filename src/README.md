# Source Tree

Top-level structure:

- `src/app`: Next.js App Router pages and API route handlers
- `src/components`: UI components for public and dashboard surfaces
- `src/server`: backend runtime code (services, repositories, models, config)
- `src/shared`: contracts and types shared across server and frontend

## Documentation

- `src/server/README.md`
- `src/server/ARCHITECTURE.md`
- `src/app/api/README.md`
- `src/components/README.md`
- `src/shared/README.md`

## Backend Convention

Use canonical layer imports:

- `@/server/service/*.service`
- `@/server/repository/*.repository`
- `@/server/dto/*`
- `@/server/errors/*`
- `@/server/db/*`

Examples:

- `@/server/service/users.service`
- `@/server/repository/operators.repository`
- `@/server/lib/auth/session`
