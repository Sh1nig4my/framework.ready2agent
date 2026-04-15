# Layout Components

Reusable structural components that define the app shell.

## Responsibilities

- public and dashboard wrappers
- page headers shared across management pages
- keeping layout concerns separate from domain widgets

## Main Files

- `public-shell.tsx`
- `dashboard-shell.tsx`
- `page-header.tsx`

## Notes

`dashboard-shell.tsx` receives a fully evaluated `SessionActor`, so layout components can render role-aware navigation without duplicating auth logic.