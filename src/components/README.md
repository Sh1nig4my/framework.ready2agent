# Components Layer

UI components for public and dashboard surfaces.

## Structure

- `auth/`: login, register, invite and auth-related UI
- `dashboard/`: role-aware dashboard components
- `layout/`: shell and layout primitives
- `navigation/`: sidebar and navigation widgets
- `ui/`: reusable visual primitives
- `providers/`: context providers

## Frontend Conventions

- Keep components presentation-first.
- Put API calls in route handlers or server pages, not in shared UI primitives.
- If a type is needed by both backend and frontend, move it to `src/shared/*`.
- Avoid importing `@/server/lib/*` in client components.
